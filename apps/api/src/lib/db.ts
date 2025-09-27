// Mock Prisma Client for development (will be replaced with real Prisma when DATABASE_URL is set)
interface MockPrismaClient {
  user: {
    upsert: (args: any) => Promise<any>;
  };
  scoreWeekly: {
    upsert: (args: any) => Promise<any>;
    findMany: (args: any) => Promise<any[]>;
  };
  roundLog: {
    create: (args: any) => Promise<any>;
  };
  payout: {
    create: (args: any) => Promise<any>;
  };
  $disconnect: () => Promise<void>;
}

class MockPrisma implements MockPrismaClient {
  user = {
    upsert: async (args: any) => {
      console.log('📝 Mock DB: User upsert', args.where.id);
      return { id: args.where.id, displayName: args.create.displayName };
    }
  };

  scoreWeekly = {
    upsert: async (args: any) => {
      console.log('📊 Mock DB: Score upsert', args.create);
      return args.create;
    },
    findMany: async (args: any) => {
      console.log('📊 Mock DB: Score findMany', args);
      return [];
    }
  };

  roundLog = {
    create: async (args: any) => {
      console.log('📝 Mock DB: Round log', args.data);
      return { id: Date.now(), ...args.data };
    }
  };

  payout = {
    create: async (args: any) => {
      console.log('💰 Mock DB: Payout create', args.data);
      return { id: Date.now(), ...args.data };
    }
  };

  async $disconnect() {
    console.log('📝 Mock DB: Disconnect');
  }
}

// Use mock Prisma for now (will be replaced when DATABASE_URL is configured)
export const prisma = new MockPrisma() as any;

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
