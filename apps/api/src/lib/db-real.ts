// Simple mock-only database for now (avoids Prisma import issues)
import { prisma as mockPrisma } from './db.js';

console.log('🗄️ Using mock database (Prisma disabled for now)');
export const prisma = mockPrisma;

// Graceful shutdown (no-op for mock)
process.on('beforeExit', async () => {
  console.log('📝 Mock DB: Disconnect');
});

process.on('SIGINT', async () => {
  process.exit(0);
});

process.on('SIGTERM', async () => {
  process.exit(0);
});