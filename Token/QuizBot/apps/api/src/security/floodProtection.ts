import { getRedis } from "../lib/redis";

interface FloodProtectionConfig {
  maxAnswersPerRound: number;
  maxCommandsPerMinute: number;
  maxDuplicateAnswers: number;
  cooldownSeconds: number;
}

const DEFAULT_CONFIG: FloodProtectionConfig = {
  maxAnswersPerRound: 1, // Max 1 answer per user per round - STRICT
  maxCommandsPerMinute: 5, // Max 5 commands per user per minute
  maxDuplicateAnswers: 1, // Max 1 duplicate answer
  cooldownSeconds: 0, // No cooldown - allow fast answers
};

export class FloodProtection {
  private redis = getRedis();
  private config: FloodProtectionConfig;

  constructor(config: Partial<FloodProtectionConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  async checkAnswerFlood(userId: string, roundId: string, answer: string): Promise<{ allowed: boolean; reason?: string }> {
    try {
      // Check answers per round - STRICT: Only 1 answer per user per round
      const roundKey = `answers:${roundId}:${userId}`;
      const answerCount = await (this.redis as any).get(roundKey) || "0";
      if (parseInt(answerCount) >= this.config.maxAnswersPerRound) {
        return { allowed: false, reason: "max_answers_per_round" };
      }

      // No cooldown check - allow fast answers for speed competition
      
      // Increment counter immediately to prevent multiple answers
      await (this.redis as any).incr(roundKey);
      await (this.redis as any).expire(roundKey, 300); // 5 minutes

      return { allowed: true };
    } catch (error) {
      console.error("Flood protection error:", error);
      // If Redis fails, allow the request but log the error
      return { allowed: true };
    }
  }

  async checkCommandFlood(userId: string, command: string): Promise<{ allowed: boolean; reason?: string }> {
    try {
      const commandKey = `commands:${userId}`;
      const commandCount = await (this.redis as any).get(commandKey) || "0";
      
      if (parseInt(commandCount) >= this.config.maxCommandsPerMinute) {
        return { allowed: false, reason: "max_commands_per_minute" };
      }

      // Increment counter
      const count = await (this.redis as any).incr(commandKey);
      if (count === 1) {
        await (this.redis as any).expire(commandKey, 60); // 1 minute
      }

      return { allowed: true };
    } catch (error) {
      console.error("Command flood protection error:", error);
      return { allowed: true };
    }
  }

  async getStats(): Promise<{ 
    totalCooldowns: number; 
    totalAnswers: number; 
    totalCommands: number; 
  }> {
    try {
      // This is a simplified stats implementation
      // In production, you might want more detailed metrics
      return {
        totalCooldowns: 0,
        totalAnswers: 0,
        totalCommands: 0,
      };
    } catch (error) {
      console.error("Flood protection stats error:", error);
      return { totalCooldowns: 0, totalAnswers: 0, totalCommands: 0 };
    }
  }
}

// Global instance
export const floodProtection = new FloodProtection();
