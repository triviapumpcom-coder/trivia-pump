import { create } from "zustand";

export type ChoiceLetter = "A" | "B" | "C" | "D";

export interface WinnerInfo {
  id: string;
  name: string;
  score?: number;
  latencySec?: number | null;
}

export interface RoundState {
  roundId: string | null;
  question: string;
  options: [string, string, string, string];
  correct?: ChoiceLetter;
  endsAt: number; // ms epoch
  status: "idle" | "running" | "ended";
  winners: WinnerInfo[];
  media?: Array<{ type: "image"; url: string }>;
  durationSec?: number;
  category?: string;
  difficulty?: string;
}

export interface RoundEvent {
  id: string;
  roundId: string;
  type: "round_start" | "round_end" | "answer" | "system";
  text: string;
  timestamp: number;
  userId?: string;
  choice?: ChoiceLetter;
  status?: string;
}

export interface RoundGroup {
  roundId: string;
  question: string;
  status: "running" | "ended";
  correct?: ChoiceLetter;
  events: RoundEvent[];
  startTime: number;
  endTime?: number;
}

export type GamePhase = 'question' | 'reveal' | 'waiting';

interface GameStore {
  round: RoundState;
  events: Array<{ id: string; text: string }>;
  roundGroups: RoundGroup[];
  winnersHistory: Array<{ roundId: string; winners: WinnerInfo[] }>;
  optionStats: Record<ChoiceLetter, number>;
  totalAnswers: number;
  scores: Record<string, number>;
  latencies: Record<string, number | null>;
  phase: GamePhase;
  setRoundStart: (payload: Partial<RoundState> & { roundId: string; endsAt: number; category?: string; difficulty?: string }) => void;
  setRoundEnd: (payload: { id: string; correct: ChoiceLetter; winners: WinnerInfo[]; total: number }) => void;
  pushEvent: (text: string) => void;
  resetEvents: () => void;
  applyAnswer: (payload: { roundId: string; userId: string; choice: ChoiceLetter; status: string; total?: number; latencySec?: number | null }) => void;
  addRoundEvent: (event: Omit<RoundEvent, "id" | "timestamp">) => void;
  setPhase: (phase: GamePhase) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  round: {
    roundId: null,
    question: "",
    options: ["", "", "", ""],
    endsAt: Date.now(),
    status: "idle",
    winners: [],
  },
  events: [],
  roundGroups: [],
  winnersHistory: [],
  optionStats: { A: 0, B: 0, C: 0, D: 0 },
  totalAnswers: 0,
  scores: {},
  latencies: {},
  phase: 'waiting',
  setRoundStart: (payload) =>
    set((s) => {
      const now = Date.now();
      const newRoundGroup: RoundGroup = {
        roundId: payload.roundId,
        question: payload.question ?? "Unknown question",
        status: "running",
        events: [{
          id: `${now}`,
          roundId: payload.roundId,
          type: "round_start",
          text: "Round started",
          timestamp: now,
        }],
        startTime: now,
      };
      
      return {
        round: {
          roundId: payload.roundId,
          question: payload.question ?? s.round.question,
          options: (payload.options as [string, string, string, string]) ?? s.round.options,
          endsAt: payload.endsAt,
          status: "running",
          winners: [],
          media: payload.media ?? [],
          durationSec: payload.durationSec,
          category: payload.category,
          difficulty: payload.difficulty,
        },
        events: [
          ...s.events,
          { id: `${now}`, text: `Round started` },
        ].slice(-20),
        roundGroups: [...s.roundGroups, newRoundGroup].slice(-5),
        optionStats: { A: 0, B: 0, C: 0, D: 0 },
        totalAnswers: 0,
        latencies: {},
        phase: 'question',
      };
    }),
  setRoundEnd: (payload) =>
    set((s) => {
      const now = Date.now();
      const updatedRoundGroups = s.roundGroups.map(rg => 
        rg.roundId === payload.id 
          ? {
              ...rg,
              status: "ended" as const,
              correct: payload.correct,
              endTime: now,
              events: [
                ...rg.events,
                {
                  id: `${now}`,
                  roundId: payload.id,
                  type: "round_end" as const,
                  text: `Round ended: Correct answer ${payload.correct}`,
                  timestamp: now,
                }
              ]
            }
          : rg
      );

      // Add scores to leaderboard for winners
      if (payload.winners && payload.winners.length > 0) {
        payload.winners.forEach(async (winner) => {
          try {
            // Calculate score based on position and speed
            let score = 0;
            if (winner.rank === 1) score = 100; // First place
            else if (winner.rank === 2) score = 75; // Second place  
            else if (winner.rank === 3) score = 50; // Third place
            else score = 25; // Other correct answers
            
            // Bonus for speed (if latency < 5 seconds)
            const latency = s.latencies[winner.id];
            if (latency && latency < 5) {
              score += 10;
            }
            
            await fetch('/api/leaderboard/add-score', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: winner.id,
                name: winner.name || `Player ${winner.id.slice(-4)}`,
                score: score,
                roundId: payload.id
              })
            });
          } catch (error) {
            // Silent error handling
          }
        });
      }

      return {
        round: {
          ...s.round,
          status: "ended",
          correct: payload.correct,
          winners: payload.winners,
        },
        events: [
          ...s.events,
          { id: `${now}`, text: `Round ended: Correct ${payload.correct}` },
        ].slice(-20),
        roundGroups: updatedRoundGroups,
        winnersHistory:
          payload.winners && payload.winners.length
            ? (() => {
                const newWinnersEntry = {
                  roundId: payload.id,
                  winners: payload.winners.map((w, idx) => {
                    // Handle both string and object formats
                    const userId = typeof w === 'string' ? w : w.id;
                    return {
                      id: userId,
                      rank: idx + 1,
                      score: s.scores[userId] ?? 0,
                      latencySec: s.latencies[userId] ?? null,
                    };
                  }),
                };
                return [...s.winnersHistory, newWinnersEntry].slice(-10);
              })()
            : s.winnersHistory,
        phase: 'reveal',
      };
    }),
  pushEvent: (text) =>
    set((s) => ({ events: [...s.events, { id: `${Date.now()}`, text }].slice(-20) })),
  resetEvents: () => set({ events: [] }),
  applyAnswer: ({ roundId, userId, choice, status, total, latencySec }) =>
    set((s) => {
      const now = Date.now();
      const shortUserId = userId.length > 8 ? `${userId.slice(0, 4)}...${userId.slice(-4)}` : userId;
      
      // Add event to current round group (avoid duplicates)
      const updatedRoundGroups = s.roundGroups.map(rg => 
        rg.roundId === roundId 
          ? {
              ...rg,
              events: [
                // Remove any existing events from this user in this round
                ...rg.events.filter(e => e.userId !== userId),
                {
                  id: `${now}-${userId}`,
                  roundId,
                  type: "answer" as const,
                  text: status === "accepted" 
                    ? `${shortUserId} answered ${choice}` 
                    : `${shortUserId} answered ${choice} (${status})`,
                  timestamp: now,
                  userId,
                  choice,
                  status,
                }
              ]
            }
          : rg
      );

      if (status !== "accepted") {
        return { roundGroups: updatedRoundGroups };
      }
      
      const optionStats = { ...s.optionStats, [choice]: (s.optionStats[choice] ?? 0) + 1 };
      const scores = { ...s.scores };
      
      // Give points for accepted answers (will be updated when round ends with correct ranking)
      if (status === "accepted") {
        scores[userId] = (scores[userId] || 0) + 25; // Base points for correct answer
      }
      
      const latencies = { ...s.latencies, [userId]: latencySec ?? s.latencies[userId] ?? null };
      
      return {
        optionStats,
        totalAnswers: s.totalAnswers + 1,
        scores,
        latencies,
        roundGroups: updatedRoundGroups,
      };
    }),
  addRoundEvent: (event) =>
    set((s) => {
      const now = Date.now();
      const fullEvent: RoundEvent = {
        ...event,
        id: `${now}`,
        timestamp: now,
      };
      
      const updatedRoundGroups = s.roundGroups.map(rg => 
        rg.roundId === event.roundId 
          ? { ...rg, events: [...rg.events, fullEvent] }
          : rg
      );
      
      return { roundGroups: updatedRoundGroups };
    }),
  setPhase: (phase) => set({ phase }),
}));


