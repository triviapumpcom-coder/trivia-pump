import { getRedis } from "../lib/redis";
import { prisma } from "../lib/db-real";

export type ChoiceLetter = "A" | "B" | "C" | "D";

export async function ingestAnswer(
  roundId: string,
  userId: string,
  choice: ChoiceLetter
): Promise<"accepted" | "ignored"> {
  const redis = getRedis();
  const answeredKey = `answered:${roundId}`;
  const answersKey = `answers:${roundId}`;
  const added = await (redis as any).sadd(answeredKey, userId);
  if (added === 1) {
    await (redis as any).hset(answersKey, userId, choice);
    return "accepted";
  }
  return "ignored";
}

export async function tallyCorrect(roundId: string, correct: ChoiceLetter): Promise<string[]> {
  const redis = getRedis();
  const answersKey = `answers:${roundId}`;
  const all = await (redis as any).hgetall(answersKey);
  const winners: string[] = [];
  for (const [uid, ch] of Object.entries(all)) {
    if (ch === correct) winners.push(uid);
  }
  return winners;
}

export async function incrementWeeklyScores(winnerIds: string[], roundId: string, correct: ChoiceLetter): Promise<void> {
  const redis = getRedis();
  const key = `scores:weekly`;
  const currentWeek = getISOWeek(new Date());
  
  for (const uid of winnerIds) {
    await (redis as any).zincrby(key, 1, uid);
    
    // Log to database (async)
    logRoundAnswer(roundId, uid, correct, true).catch(console.error);
    
    // Update database score (async)
    const newScore = await (redis as any).zscore(key, uid);
    updateDatabaseScore(uid, null, currentWeek, parseInt(newScore.toString())).catch(console.error);
  }
}

export async function debugDumpRound(roundId: string): Promise<{ answered: string[]; answers: Record<string, string> }> {
  const redis = getRedis();
  const answered = await (redis as any).smembers(`answered:${roundId}`);
  const answers = await (redis as any).hgetall(`answers:${roundId}`);
  return { answered, answers };
}

export async function resetRound(roundId: string): Promise<void> {
  const redis = getRedis();
  await (redis as any).del(`answers:${roundId}`);
  await (redis as any).del(`answered:${roundId}`);
}

// Database helper functions
async function logRoundAnswer(roundId: string, userId: string, choice: ChoiceLetter, correct: boolean, latencyMs?: number): Promise<void> {
  try {
    await prisma.roundLog.create({
      data: {
        roundId,
        userId,
        choice,
        correct,
        latencyMs,
      },
    });
    console.log(`📝 Round answer logged: ${userId} -> ${choice} (${correct ? 'correct' : 'wrong'})`);
  } catch (error) {
    console.error('Failed to log round answer:', error);
    // Fallback to console log
    console.log(`📝 Round answer: ${userId} -> ${choice} (${correct ? 'correct' : 'wrong'})`);
  }
}

async function updateDatabaseScore(userId: string, displayName: string | null, week: number, score: number): Promise<void> {
  try {
    // Upsert user
    await prisma.user.upsert({
      where: { id: userId },
      update: { displayName },
      create: { id: userId, displayName },
    });

    // Upsert weekly score
    await prisma.scoreWeekly.upsert({
      where: { 
        week_userId: { week, userId }
      },
      update: { score },
      create: { 
        id: `${week}_${userId}`,
        week, 
        userId, 
        score 
      },
    });
    console.log(`📊 Score updated: ${userId} -> ${score} points (week ${week})`);
  } catch (error) {
    console.error('Failed to update database score:', error);
    // Fallback to console log
    console.log(`📊 Score update: ${userId} -> ${score} points (week ${week})`);
  }
}

// Utility function to get ISO week number
function getISOWeek(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}


