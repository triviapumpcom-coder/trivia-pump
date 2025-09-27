import { z } from 'zod';
import { config } from 'dotenv';

// Load environment variables
config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('5001'),
  
  // Redis Configuration
  REDIS_URL: z.string().optional(),
  
  // Solana Configuration
  SOLANA_RPC: z.string().url().default('https://api.mainnet-beta.solana.com'),
  QUICKNODE_RPC: z.string().url().default('https://frosty-smart-mound.solana-mainnet.quiknode.pro/75dae04b7b364ea7f313486132f3f1c4ae170db0/'),
  
  // Pump.fun Configuration
  CONTRACT_ADDRESS: z.string().min(32, 'Contract address must be valid Solana address'),
  
  // Database Configuration (optional for now)
  DATABASE_URL: z.string().url().optional(),
  
  // Game Configuration
  ROUND_DURATION_SEC: z.string().transform(Number).default('30'),
  
  // Security
  CORS_ORIGIN: z.string().default('*'),
});

export type Env = z.infer<typeof envSchema>;

let env: Env;

export function validateEnv(): Env {
  try {
    env = envSchema.parse(process.env);
    console.log('✅ Environment validation successful');
    return env;
  } catch (error) {
    console.error('❌ Environment validation failed:');
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    }
    process.exit(1);
  }
}

export function getEnv(): Env {
  if (!env) {
    throw new Error('Environment not validated. Call validateEnv() first.');
  }
  return env;
}

// Validate on import
validateEnv();
