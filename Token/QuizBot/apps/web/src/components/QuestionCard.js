import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useGameStore } from "../store/game";
import { useFlashStore } from "../store/flash";
import { CategoryBadge } from "./CategoryBadge";
export function QuestionCard({ question, options, media, category, difficulty }) {
    const stats = useGameStore((s) => s.optionStats);
    const total = useGameStore((s) => s.totalAnswers);
    const flashes = useFlashStore((s) => s.flashes);
    const hasMedia = media && media.length > 0;
    return (_jsxs("div", { className: "rounded-3xl bg-black/40 p-3 sm:p-4 lg:p-6 shadow-2xl border border-white/20", children: [category && (_jsx(CategoryBadge, { category: category, difficulty: difficulty })), hasMedia ? (_jsx("div", { className: "w-full mb-3 lg:mb-4 flex justify-center", children: _jsx("img", { src: media?.[0]?.url, alt: "Question image", className: "rounded-2xl max-h-48 sm:max-h-56 lg:max-h-64 max-w-full object-contain shadow-lg" }) })) : null, _jsxs("div", { className: "text-center mb-4 lg:mb-6", children: [_jsx("h2", { className: `font-black text-white leading-tight mb-2 lg:mb-3 ${hasMedia
                            ? 'text-lg sm:text-xl md:text-2xl lg:text-4xl'
                            : 'text-xl sm:text-2xl md:text-4xl lg:text-6xl'}`, children: question }), _jsxs("p", { className: `text-white/80 font-semibold ${hasMedia
                            ? 'text-sm sm:text-base lg:text-lg xl:text-xl'
                            : 'text-base sm:text-lg lg:text-xl xl:text-2xl'}`, children: ["Answer in live chat: ", _jsx("span", { className: "text-green-400", children: "/a /b /c /d" })] })] }), _jsx("div", { className: `grid grid-cols-1 lg:grid-cols-2 ${hasMedia ? 'gap-2 sm:gap-3 lg:gap-4' : 'gap-3 sm:gap-4 lg:gap-6'}`, children: options.map((opt, idx) => {
                    const letter = String.fromCharCode(65 + idx);
                    const count = stats[letter] ?? 0;
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                    const flashIntensity = flashes[letter] ?? 0;
                    // Flash colors for each option
                    const flashColors = {
                        A: 'rgba(239, 68, 68, ', // red
                        B: 'rgba(34, 197, 94, ', // green  
                        C: 'rgba(59, 130, 246, ', // blue
                        D: 'rgba(168, 85, 247, ' // purple
                    };
                    // Dynamic font sizing based on text length
                    const getOptionFontSize = (text, hasMedia) => {
                        const baseLength = hasMedia ? 25 : 35; // Shorter threshold when media present
                        const longLength = hasMedia ? 40 : 60;
                        const veryLongLength = hasMedia ? 60 : 80;
                        if (text.length <= baseLength) {
                            return hasMedia
                                ? 'text-sm sm:text-base lg:text-lg xl:text-xl'
                                : 'text-base sm:text-lg lg:text-xl xl:text-2xl';
                        }
                        else if (text.length <= longLength) {
                            return hasMedia
                                ? 'text-xs sm:text-sm lg:text-base xl:text-lg'
                                : 'text-sm sm:text-base lg:text-lg xl:text-xl';
                        }
                        else if (text.length <= veryLongLength) {
                            return hasMedia
                                ? 'text-xs sm:text-xs lg:text-sm xl:text-base'
                                : 'text-xs sm:text-sm lg:text-base xl:text-lg';
                        }
                        else {
                            return 'text-xs lg:text-sm xl:text-base';
                        }
                    };
                    return (_jsxs("div", { className: "relative rounded-2xl bg-white/10 border-2 border-white/20 overflow-hidden transition-all duration-100", style: {
                            boxShadow: flashIntensity > 0
                                ? `0 0 ${20 + flashIntensity * 30}px ${flashColors[letter]}${flashIntensity}), inset 0 0 ${10 + flashIntensity * 20}px ${flashColors[letter]}${flashIntensity * 0.3})`
                                : 'none',
                            borderColor: flashIntensity > 0
                                ? `${flashColors[letter]}${0.5 + flashIntensity * 0.5})`
                                : 'rgba(255, 255, 255, 0.2)'
                        }, children: [flashIntensity > 0 && (_jsx("div", { className: "absolute inset-0 pointer-events-none transition-opacity duration-100", style: {
                                    background: `${flashColors[letter]}${flashIntensity * 0.2})`,
                                    opacity: flashIntensity
                                } })), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-green-500/30 to-blue-500/30 transition-all duration-300", style: { width: `${Math.max(pct, 2)}%` } }), _jsx("div", { className: `relative ${hasMedia ? 'p-2 sm:p-3 lg:p-4' : 'p-3 sm:p-4 lg:p-6'}`, children: _jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsxs("div", { className: "flex items-start gap-2 lg:gap-3 flex-1 min-w-0", children: [_jsx("span", { className: `text-white bg-white/20 rounded-full flex items-center justify-center font-black flex-shrink-0 mt-1 ${hasMedia
                                                        ? 'w-8 h-8 text-sm sm:w-9 sm:h-9 sm:text-base lg:w-10 lg:h-10 lg:text-lg'
                                                        : 'w-9 h-9 text-base sm:w-10 sm:h-10 sm:text-lg lg:w-12 lg:h-12 lg:text-2xl'}`, children: letter }), _jsx("span", { className: `text-white font-bold leading-tight ${getOptionFontSize(opt, hasMedia)}`, children: opt })] }), _jsxs("div", { className: "text-right flex-shrink-0 ml-2", children: [_jsxs("div", { className: `font-black text-white ${hasMedia
                                                        ? 'text-base sm:text-lg lg:text-xl xl:text-2xl'
                                                        : 'text-lg sm:text-xl lg:text-2xl xl:text-3xl'}`, children: [pct, "%"] }), _jsxs("div", { className: `text-white/60 ${hasMedia ? 'text-xs' : 'text-sm'}`, children: [count, " votes"] })] })] }) })] }, idx));
                }) })] }));
}
