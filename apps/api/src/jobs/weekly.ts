import * as cron from 'node-cron';
import { prisma } from '../lib/db-real';
import { getRedis } from '../lib/redis';

interface WeeklyWinner {
  userId: string;
  displayName: string | null;
  score: number;
  rank: number;
}

export function startWeeklyResetJob(): void {
  // Run every Sunday at 23:59 (end of week)
  cron.schedule('59 23 * * 0', async () => {
    console.log('🔄 Starting weekly reset job...');
    
    try {
      await processWeeklyReset();
      console.log('✅ Weekly reset completed successfully');
    } catch (error) {
      console.error('❌ Weekly reset failed:', error);
    }
  });

  console.log('📅 Weekly reset job scheduled (Sundays at 23:59)');
}

async function processWeeklyReset(): Promise<void> {
  const currentWeek = getISOWeek(new Date());
  
  // 1. Get top 3 winners from current week
  const winners = await getTop3Winners(currentWeek);
  
  if (winners.length > 0) {
    console.log(`🏆 Top 3 winners for week ${currentWeek}:`, winners);
    
    // 2. Create payout records
    await createPayoutRecords(currentWeek, winners);
    
    // 3. TODO: Process actual token transfers (implement later)
    // await processTokenPayouts(winners);
  }
  
  // 4. Clear Redis weekly scores for next week
  await clearWeeklyScores();
  
  console.log(`🔄 Week ${currentWeek} reset completed`);
}

async function getTop3Winners(week: number): Promise<WeeklyWinner[]> {
  const topScores = await prisma.scoreWeekly.findMany({
    where: { week },
    include: { user: true },
    orderBy: { score: 'desc' },
    take: 3,
  });

  return topScores.map((score: any, index: number) => ({
    userId: score.userId,
    displayName: score.user.displayName,
    score: score.score,
    rank: index + 1,
  }));
}

async function createPayoutRecords(week: number, winners: WeeklyWinner[]): Promise<void> {
  const payoutAmounts = [1000, 500, 250]; // Token amounts for 1st, 2nd, 3rd
  
  for (const winner of winners) {
    const amount = payoutAmounts[winner.rank - 1] || 0;
    
    await prisma.payout.create({
      data: {
        week,
        userId: winner.userId,
        rank: winner.rank,
        amount,
        status: 'PENDING',
      },
    });
    
    console.log(`💰 Created payout record: ${winner.displayName || winner.userId} - Rank ${winner.rank} - ${amount} tokens`);
  }
}

async function clearWeeklyScores(): Promise<void> {
  const redis = getRedis();
  await (redis as any).del('scores:weekly');
  console.log('🧹 Cleared weekly scores from Redis');
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

// Manual trigger for testing
export async function triggerWeeklyReset(): Promise<void> {
  console.log('🧪 Manual weekly reset triggered');
  await processWeeklyReset();
}
