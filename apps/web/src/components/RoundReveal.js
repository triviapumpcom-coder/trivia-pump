import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useGameStore } from "../store/game";
import { CategoryBadge } from "./CategoryBadge";
export function RoundReveal({ correctAnswer, winners, totalAnswers, optionStats, question, options, category, difficulty }) {
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
    return (_jsxs("div", { className: "rounded-3xl bg-black/60 p-4 shadow-2xl border border-white/20 text-center", children: [category && (_jsx("div", { className: "mb-2 flex justify-center", children: _jsx(CategoryBadge, { category: category, difficulty: difficulty }) })), _jsxs("div", { className: "mb-3", children: [_jsx("h2", { className: "text-2xl font-black text-white mb-1", children: "\uD83C\uDFAF Round Ended!" }), _jsx("p", { className: "text-sm text-white/80", children: "Here's how everyone did..." })] }), _jsxs("div", { className: "mb-4 p-3 bg-white/10 rounded-xl", children: [_jsx("h3", { className: "text-lg font-bold text-white mb-2", children: question }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2", children: options.map((option, idx) => {
                            const letter = String.fromCharCode(65 + idx);
                            const isCorrect = idx === correctIndex;
                            const count = optionStats[letter] || 0;
                            const percentage = totalAnswers > 0 ? Math.round((count / totalAnswers) * 100) : 0;
                            // Dynamic font sizing for reveal screen
                            const getRevealFontSize = (text) => {
                                if (text.length <= 30)
                                    return 'text-base font-semibold';
                                if (text.length <= 50)
                                    return 'text-sm font-semibold';
                                if (text.length <= 70)
                                    return 'text-xs font-semibold';
                                return 'text-xs font-medium';
                            };
                            return (_jsxs("div", { className: `p-3 rounded-lg border-2 transition-all duration-500 ${isCorrect
                                    ? 'bg-green-500/30 border-green-400 shadow-lg shadow-green-400/30'
                                    : 'bg-white/10 border-white/20'}`, children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsxs("div", { className: "flex items-start gap-2 flex-1 min-w-0", children: [_jsx("span", { className: `w-8 h-8 rounded-full flex items-center justify-center font-black flex-shrink-0 mt-1 ${isCorrect ? 'bg-green-400 text-black' : 'bg-white/20 text-white'}`, children: letter }), _jsx("span", { className: `${getRevealFontSize(option)} ${isCorrect ? 'text-green-300' : 'text-white'} leading-tight`, children: option })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: `font-black ${isCorrect ? 'text-green-300' : 'text-white/80'}`, children: [percentage, "%"] }), _jsxs("div", { className: `text-sm ${isCorrect ? 'text-green-400' : 'text-white/60'}`, children: [count, " votes"] })] })] }), isCorrect && (_jsxs("div", { className: "mt-2 flex items-center justify-center gap-2 text-green-300", children: [_jsx("span", { className: "text-2xl", children: "\u2705" }), _jsx("span", { className: "font-bold", children: "Correct Answer!" })] }))] }, idx));
                        }) })] }), winners && winners.length > 0 ? (_jsxs("div", { className: "mb-3", children: [_jsxs("h3", { className: "text-lg font-bold text-green-400 mb-2", children: ["\uD83C\uDFC6 Winners (", winners.length, " players got it right!)"] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2", children: (winners || []).slice(0, 6).map((winner, idx) => (_jsx("div", { className: "bg-green-500/20 border border-green-400/50 rounded-lg p-2", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-lg", children: idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '🎉' }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-semibold text-green-300 truncate", children: winner.name && winner.name.length > 8 ? `${winner.name.slice(0, 4)}...${winner.name.slice(-4)}` : winner.name || winner.id }), _jsxs("div", { className: "text-sm text-green-400", children: [winner.latencySec ? `${winner.latencySec}s` : 'Fast!', " \u2022 Score: ", winner.score || 0] })] })] }) }, winner.id))) }), winners.length > 6 && (_jsxs("p", { className: "text-white/60 mt-2", children: ["+", winners.length - 6, " more winners!"] }))] })) : (_jsxs("div", { className: "mb-3 p-3 bg-red-500/20 border border-red-400/50 rounded-lg", children: [_jsx("h3", { className: "text-lg font-bold text-red-400 mb-1", children: "\uD83D\uDE14 No Winners" }), _jsx("p", { className: "text-sm text-red-300", children: "Nobody got the correct answer this round!" })] })), _jsx("div", { className: "bg-white/10 rounded-lg p-3", children: _jsxs("div", { className: "grid grid-cols-3 gap-3 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xl font-black text-white", children: totalAnswers }), _jsx("div", { className: "text-xs text-white/60", children: "Total Answers" })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-xl font-black text-green-400", children: [correctPercentage, "%"] }), _jsx("div", { className: "text-xs text-white/60", children: "Got it Right" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xl font-black text-blue-400", children: winners.length }), _jsx("div", { className: "text-xs text-white/60", children: "Winners" })] })] }) }), _jsx("div", { className: "mt-3 text-white/60", children: _jsx("p", { className: "text-xs", children: "Next round starting soon..." }) })] }));
}
