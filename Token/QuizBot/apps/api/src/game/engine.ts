export interface RoundPayload {
  id: string;
  question: string;
  options: [string, string, string, string];
  endsAt: number;
  durationSec?: number;
  media?: Array<{ type: "image"; url: string }>;
  correct?: "A" | "B" | "C" | "D";
  category?: string;
  difficulty?: string;
}

export type Broadcast = (event: string, payload: unknown) => void;

import { setCurrentRoundId } from "./current";
import { resetRound, tallyCorrect, incrementWeeklyScores } from "./answers";
import { getRedis } from "../lib/redis";

import { questions } from "../data/questions";

function loadQuestions() {
  try {
    console.log(`[engine] Loaded ${questions.length} questions from TypeScript module`);
    return questions as any[];
  } catch (error) {
    console.error("[engine] Failed to load questions:", error);
    return [] as any[];
  }
}

// Shuffle array function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function startRoundLoop(broadcast: Broadcast): void {
  const questions = loadQuestions();
  const shuffledQuestions = shuffleArray(questions);
  let round = 0;
  const tick = async () => {
    round += 1;
    const q = shuffledQuestions.length ? shuffledQuestions[(round - 1) % shuffledQuestions.length] : null;
    const durationSec = q?.durationSec ?? 30;
    const now = Date.now();
    const endsAt = now + durationSec * 1000;
    const payload: RoundPayload = {
      id: String(round),
      question: q?.question ?? "Placeholder question",
      options: (q?.options as [string, string, string, string]) ?? ["A", "B", "C", "D"],
      endsAt,
      durationSec,
      media: q?.media,
      category: q?.tags?.[0] ?? "general", // Use first tag as category
      difficulty: q?.difficulty ?? "medium",
    };
    setCurrentRoundId(payload.id);
    resetRound(payload.id);
    
    // Save round data to Redis for state recovery
    const redis = getRedis();
    const roundKey = `round:${payload.id}`;
    await (redis as any).hmset(roundKey, {
      question: payload.question,
      options: JSON.stringify(payload.options),
      endsAt: payload.endsAt.toString(),
      durationSec: (payload.durationSec || 30).toString(),
      category: payload.category || 'General',
      difficulty: payload.difficulty || 'medium',
      media: JSON.stringify(payload.media || [])
    });
    // Set expiration for cleanup (1 hour)
    await (redis as any).expire(roundKey, 3600);
    
    broadcast("round:start", payload);
    setTimeout(async () => {
      const correct = (q?.correct as "A" | "B" | "C" | "D") ?? "B";
      const winners = await tallyCorrect(payload.id, correct);
      await incrementWeeklyScores(winners, payload.id, correct);
      broadcast("round:end", { id: payload.id, correct, winners, total: winners.length });
      setTimeout(tick, 5000); // cooldown 5s
    }, durationSec * 1000);
  };
  tick();
}


