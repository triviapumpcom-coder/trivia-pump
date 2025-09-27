import React from "react";
import { useGameStore, type ChoiceLetter } from "../store/game";
import { CategoryBadge } from "./CategoryBadge";

interface RoundRevealProps {
  correctAnswer: ChoiceLetter;
  winners: Array<{ id: string; name: string; score?: number; latencySec?: number | null }>;
  totalAnswers: number;
  optionStats: Record<ChoiceLetter, number>;
  question: string;
  options: [string, string, string, string];
  category?: string;
  difficulty?: string;
}

export function RoundReveal({ 
  correctAnswer, 
  winners, 
  totalAnswers, 
  optionStats, 
  question, 
  options,
  category,
  difficulty
}: RoundRevealProps): JSX.Element {
  const setPhase = useGameStore((s) => s.setPhase);

  React.useEffect(() => {
    // Auto transition to waiting after 5 seconds
    const timer = setTimeout(() => {
      setPhase('waiting');
    }, 5000);

    return () => clearTimeout(timer);
  }, [setPhase]);

  const correctIndex = correctAnswer.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
  const correctPercentage = totalAnswers > 0 ? Math.round((optionStats[correctAnswer] / totalAnswers) * 100) : 0;

  return (
    <div className="rounded-3xl bg-black/60 p-4 shadow-2xl border border-white/20 text-center">
      {/* Category Badge */}
      {category && (
        <div className="mb-2 flex justify-center">
          <CategoryBadge category={category} difficulty={difficulty} />
        </div>
      )}
      
      {/* Round Ended Header */}
      <div className="mb-3">
        <h2 className="text-2xl font-black text-white mb-1">🎯 Round Ended!</h2>
        <p className="text-sm text-white/80">Here's how everyone did...</p>
      </div>

      {/* Question Recap */}
      <div className="mb-4 p-3 bg-white/10 rounded-xl">
        <h3 className="text-lg font-bold text-white mb-2">{question}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx) as ChoiceLetter;
            const isCorrect = idx === correctIndex;
            const count = optionStats[letter] || 0;
            const percentage = totalAnswers > 0 ? Math.round((count / totalAnswers) * 100) : 0;
            
            // Dynamic font sizing for reveal screen
            const getRevealFontSize = (text: string) => {
              if (text.length <= 30) return 'text-base font-semibold';
              if (text.length <= 50) return 'text-sm font-semibold';
              if (text.length <= 70) return 'text-xs font-semibold';
              return 'text-xs font-medium';
            };
            
            return (
              <div 
                key={idx}
                className={`p-3 rounded-lg border-2 transition-all duration-500 ${
                  isCorrect 
                    ? 'bg-green-500/30 border-green-400 shadow-lg shadow-green-400/30' 
                    : 'bg-white/10 border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black flex-shrink-0 mt-1 ${
                      isCorrect ? 'bg-green-400 text-black' : 'bg-white/20 text-white'
                    }`}>
                      {letter}
                    </span>
                    <span className={`${getRevealFontSize(option)} ${isCorrect ? 'text-green-300' : 'text-white'} leading-tight`}>
                      {option}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className={`font-black ${isCorrect ? 'text-green-300' : 'text-white/80'}`}>
                      {percentage}%
                    </div>
                    <div className={`text-sm ${isCorrect ? 'text-green-400' : 'text-white/60'}`}>
                      {count} votes
                    </div>
                  </div>
                </div>
                {isCorrect && (
                  <div className="mt-2 flex items-center justify-center gap-2 text-green-300">
                    <span className="text-2xl">✅</span>
                    <span className="font-bold">Correct Answer!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Winners Section */}
      {winners && winners.length > 0 ? (
        <div className="mb-3">
          <h3 className="text-lg font-bold text-green-400 mb-2">
            🏆 Winners ({winners.length} players got it right!)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {(winners || []).slice(0, 6).map((winner, idx) => (
              <div key={winner.id} className="bg-green-500/20 border border-green-400/50 rounded-lg p-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '🎉'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-green-300 truncate">
                      {winner.name && winner.name.length > 8 ? `${winner.name.slice(0, 4)}...${winner.name.slice(-4)}` : winner.name || winner.id}
                    </div>
                    <div className="text-sm text-green-400">
                      {winner.latencySec ? `${winner.latencySec}s` : 'Fast!'} • Score: {winner.score || 0}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {winners.length > 6 && (
            <p className="text-white/60 mt-2">+{winners.length - 6} more winners!</p>
          )}
        </div>
      ) : (
        <div className="mb-3 p-3 bg-red-500/20 border border-red-400/50 rounded-lg">
          <h3 className="text-lg font-bold text-red-400 mb-1">😔 No Winners</h3>
          <p className="text-sm text-red-300">Nobody got the correct answer this round!</p>
        </div>
      )}

      {/* Stats Summary */}
      <div className="bg-white/10 rounded-lg p-3">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-xl font-black text-white">{totalAnswers}</div>
            <div className="text-xs text-white/60">Total Answers</div>
          </div>
          <div>
            <div className="text-xl font-black text-green-400">{correctPercentage}%</div>
            <div className="text-xs text-white/60">Got it Right</div>
          </div>
          <div>
            <div className="text-xl font-black text-blue-400">{winners.length}</div>
            <div className="text-xs text-white/60">Winners</div>
          </div>
        </div>
      </div>

      {/* Next Round Countdown */}
      <div className="mt-3 text-white/60">
        <p className="text-xs">Next round starting soon...</p>
      </div>
    </div>
  );
}
