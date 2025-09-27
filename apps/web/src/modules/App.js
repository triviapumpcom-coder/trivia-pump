import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Countdown } from "../components/Countdown";
import { QuestionCard } from "../components/QuestionCard";
import { LiveFeed } from "../components/LiveFeed";
import { LeaderboardPanel } from "../components/LeaderboardPanel";
import { TokenHoldersPanel } from "../components/TokenHoldersPanel";
import { WinnersTicker } from "../components/WinnersTicker";
import { HeaderBar } from "../components/HeaderBar";
import { RecentWinners } from "../components/RecentWinners";
import { BackgroundQueue } from "../components/BackgroundQueue";
import { RoundReveal } from "../components/RoundReveal";
import { useGameStore } from "../store/game";
import { useBackgroundStore } from "../store/background";
import { useFlashStore } from "../store/flash";
import { useAudioManager } from "../hooks/useAudio";
import { useAudioStore } from "../store/audio";
import { getSocket } from "../lib/socket";
export function App() {
    const round = useGameStore((s) => s.round);
    const events = useGameStore((s) => s.events);
    const setRoundStart = useGameStore((s) => s.setRoundStart);
    const setRoundEnd = useGameStore((s) => s.setRoundEnd);
    const pushEvent = useGameStore((s) => s.pushEvent);
    const applyAnswer = useGameStore((s) => s.applyAnswer);
    const phase = useGameStore((s) => s.phase);
    const optionStats = useGameStore((s) => s.optionStats);
    const totalAnswers = useGameStore((s) => s.totalAnswers);
    // Background store
    const currentBackground = useBackgroundStore((s) => s.currentBackground);
    const backgrounds = useBackgroundStore((s) => s.backgrounds);
    const addToQueue = useBackgroundStore((s) => s.addToQueue);
    const queue = useBackgroundStore((s) => s.queue);
    const processOnRoundStart = useBackgroundStore((s) => s.processOnRoundStart);
    // Flash store
    const addFlash = useFlashStore((s) => s.addFlash);
    const clearFlashes = useFlashStore((s) => s.clearFlashes);
    // Audio manager
    const { playSound, stopAllSounds, cleanup, isReady: audioReady } = useAudioManager();
    const { isSoundEnabled } = useAudioStore();
    React.useEffect(() => {
        const socket = getSocket();
        // Initial connection and reconnection handler
        const handleConnection = () => {
            pushEvent("Connected to server");
            // Request current game state on connect/reconnect
            Promise.all([
                fetch('/api/game/current').then(res => res.json()),
                fetch('/api/events/recent').then(res => res.json()),
                fetch('/api/winners/recent').then(res => res.json())
            ]).then(([gameData, eventsData, winnersData]) => {
                // Restore current round
                if (gameData.round) {
                    console.log('🔄 Restoring game state:', gameData.round);
                    setRoundStart({
                        roundId: gameData.round.roundId,
                        question: gameData.round.question,
                        options: gameData.round.options,
                        endsAt: gameData.round.endsAt,
                        durationSec: gameData.round.durationSec,
                        category: gameData.round.category,
                        difficulty: gameData.round.difficulty,
                        media: gameData.round.media || [],
                    });
                    // Restore option statistics
                    if (gameData.optionStats) {
                        console.log('🔄 Restoring option stats:', gameData.optionStats);
                        // Update option stats in store
                        useGameStore.setState(state => ({
                            ...state,
                            optionStats: gameData.optionStats,
                            totalAnswers: gameData.totalAnswers || 0
                        }));
                    }
                }
                // Restore recent events (convert to roundGroups format)
                if (eventsData.events && eventsData.events.length > 0) {
                    console.log('🔄 Restoring events:', eventsData.events.length);
                    const roundGroups = {};
                    eventsData.events.forEach((event) => {
                        if (!roundGroups[event.roundId]) {
                            roundGroups[event.roundId] = {
                                roundId: event.roundId,
                                question: event.type === 'round_start' ? 'Restored Round' : '',
                                status: event.type === 'round_end' ? 'ended' : 'running',
                                events: [],
                                startTime: event.timestamp
                            };
                        }
                        roundGroups[event.roundId].events.push(event);
                    });
                    const roundGroupsArray = Object.values(roundGroups).slice(-5);
                    useGameStore.setState(state => ({
                        ...state,
                        roundGroups: roundGroupsArray
                    }));
                }
                // Restore winners history
                if (winnersData.winners && winnersData.winners.length > 0) {
                    console.log('🔄 Restoring winners:', winnersData.winners.length);
                    useGameStore.setState(state => ({
                        ...state,
                        winnersHistory: winnersData.winners.slice(-10)
                    }));
                }
            }).catch(err => console.warn('Failed to restore game state:', err));
        };
        socket.on("connect", handleConnection);
        socket.on("hello", handleConnection);
        socket.on("round:start", (p) => {
            setRoundStart({
                roundId: p.id,
                question: p.question,
                options: p.options,
                endsAt: p.endsAt,
                media: p.media,
                durationSec: p.durationSec,
                category: p.category,
                difficulty: p.difficulty,
            });
            // Trigger background change on round start
            processOnRoundStart();
            // Clear flashes on new round
            clearFlashes();
            // Play round start sound
            if (isSoundEnabled) {
                console.log('🎯 Playing round-start sound');
                playSound('round-start');
            }
            else {
                console.log('🔇 Round-start sound disabled');
            }
        });
        socket.on("round:end", (p) => {
            setRoundEnd(p);
            // FORCE STOP ALL SOUNDS
            console.log('🛑 FORCING ALL SOUNDS TO STOP - Round ended');
            stopAllSounds();
            // Play time-up sound for round ended screen (instead of gong)
            setTimeout(() => {
                if (isSoundEnabled) {
                    console.log('🔔 Playing time-up sound for round ended screen');
                    playSound('time-up');
                }
                else {
                    console.log('🔇 Time-up sound disabled');
                }
            }, 500); // 500ms delay
        });
        socket.on("answer:accepted", (a) => {
            applyAnswer(a);
            // Trigger flash effect for the chosen option
            if (a.choice && ['A', 'B', 'C', 'D'].includes(a.choice)) {
                addFlash(a.choice);
            }
        });
        socket.on("feed:event", (e) => pushEvent(e.text));
        // Background change command listener
        socket.on("background:change", () => {
            // Calculate next background index based on current + queue
            const totalInQueue = queue.length;
            const nextIndex = (currentBackground + totalInQueue + 1) % backgrounds.length;
            addToQueue(nextIndex);
        });
        return () => {
            socket.off("connect");
            socket.off("hello");
            socket.off("round:start");
            socket.off("round:end");
            socket.off("answer:accepted");
            socket.off("feed:event");
            socket.off("background:change");
            // Cleanup audio resources
            cleanup();
        };
    }, [applyAnswer, pushEvent, setRoundEnd, setRoundStart, addToQueue, currentBackground, backgrounds.length, processOnRoundStart, addFlash, clearFlashes, playSound, cleanup, isSoundEnabled]);
    return (_jsxs("div", { className: "h-screen overflow-hidden flex flex-col transition-all duration-1000 ease-in-out", style: backgrounds[currentBackground].type === 'gradient'
            ? {
                backgroundImage: backgrounds[currentBackground].value,
                backgroundAttachment: 'fixed'
            }
            : {
                backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.6)), url(${backgrounds[currentBackground].value})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }, children: [_jsx("div", { className: "flex-shrink-0 px-4 pt-1 pb-0.5", children: _jsx(HeaderBar, {}) }), _jsx("div", { className: "flex-shrink-0 px-4 mb-0", children: _jsx(WinnersTicker, {}) }), _jsxs("div", { className: "flex-1 px-4 pb-2 min-h-0", children: [_jsxs("div", { className: "hidden lg:grid gap-2 h-full", style: { gridTemplateColumns: "300px 1fr 280px", gridTemplateRows: "auto 1fr auto" }, children: [_jsxs("div", { className: "grid gap-2", style: { gridTemplateRows: "auto 1fr" }, children: [_jsx("div", { className: "rounded-2xl bg-black/30 p-2 border border-white/10", children: _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-white/70 text-xs mb-1", children: ["Round #", round.roundId || "0"] }), _jsx(Countdown, { endsAtMs: round.endsAt, durationSec: round.durationSec, isActive: phase === 'question', enableSounds: isSoundEnabled }), _jsx("div", { className: "text-white/60 text-xs mt-1", children: round.status === "idle" ? (_jsxs("span", { className: "flex items-center justify-center gap-1", children: [_jsx("span", { className: "w-2 h-2 bg-red-500 rounded-full animate-pulse" }), _jsx("span", { className: "text-red-400 font-semibold", children: "LIVE" })] })) : round.status === "running" ? (_jsxs("span", { className: "flex items-center justify-center gap-1", children: [_jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }), _jsx("span", { className: "text-green-400 font-semibold", children: "ACTIVE" })] })) : (_jsxs("span", { className: "flex items-center justify-center gap-1", children: [_jsx("span", { className: "w-2 h-2 bg-blue-500 rounded-full" }), _jsx("span", { className: "text-blue-400 font-semibold", children: "ENDED" })] })) })] }) }), _jsx("div", { className: "min-h-0", children: _jsx(LeaderboardPanel, {}) })] }), _jsx("div", { className: "flex items-start justify-center pt-0", children: _jsx("div", { className: "w-full max-w-4xl", children: phase === 'waiting' ? (_jsxs("div", { className: "rounded-3xl bg-black/40 p-6 shadow-2xl border border-white/20 text-center w-full", children: [_jsx("h2", { className: "text-4xl font-black text-white mb-4", children: "\u23F3 Next Round Starting Soon..." }), _jsx("p", { className: "text-xl text-white/80", children: "Get ready for the next question!" }), _jsx("div", { className: "mt-6", children: _jsx("div", { className: "animate-spin w-12 h-12 border-4 border-white/20 border-t-white rounded-full mx-auto" }) })] })) : phase === 'reveal' && round.correct ? (_jsx(RoundReveal, { correctAnswer: round.correct, winners: round.winners || [], totalAnswers: totalAnswers, optionStats: optionStats, question: round.question, options: round.options, category: round.category, difficulty: round.difficulty })) : (_jsx(QuestionCard, { question: round.question, options: round.options, media: round.media, category: round.category, difficulty: round.difficulty })) }) }), _jsxs("div", { className: "grid gap-2", style: { gridTemplateRows: "1fr 1fr" }, children: [_jsx("div", { className: "min-h-0", children: _jsx(TokenHoldersPanel, {}) }), _jsx("div", { className: "min-h-0", children: _jsx(RecentWinners, {}) })] }), _jsx("div", { className: "col-span-3 min-h-0", children: _jsx(LiveFeed, { events: events }) })] }), _jsxs("div", { className: "lg:hidden flex flex-col gap-2 h-full", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("div", { className: "rounded-xl bg-black/30 p-2 border border-white/10", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "text-white/70 text-xs", children: ["Round #", round.roundId || "0"] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Countdown, { endsAtMs: round.endsAt, durationSec: round.durationSec, isActive: phase === 'question', enableSounds: false }), _jsx("div", { className: "text-white/60 text-xs", children: round.status === "idle" ? (_jsxs("span", { className: "flex items-center gap-1", children: [_jsx("span", { className: "w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" }), _jsx("span", { className: "text-red-400 font-semibold", children: "LIVE" })] })) : round.status === "running" ? (_jsxs("span", { className: "flex items-center gap-1", children: [_jsx("span", { className: "w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" }), _jsx("span", { className: "text-green-400 font-semibold", children: "ACTIVE" })] })) : (_jsxs("span", { className: "flex items-center gap-1", children: [_jsx("span", { className: "w-1.5 h-1.5 bg-blue-500 rounded-full" }), _jsx("span", { className: "text-blue-400 font-semibold", children: "ENDED" })] })) })] })] }) }) }), _jsx("div", { className: "flex-1 flex items-start justify-center min-h-0", children: _jsx("div", { className: "w-full", children: phase === 'waiting' ? (_jsxs("div", { className: "rounded-3xl bg-black/40 p-4 shadow-2xl border border-white/20 text-center w-full", children: [_jsx("h2", { className: "text-xl font-black text-white mb-3", children: "\u23F3 Next Round Starting Soon..." }), _jsx("p", { className: "text-sm text-white/80", children: "Get ready for the next question!" }), _jsx("div", { className: "mt-3", children: _jsx("div", { className: "animate-spin w-6 h-6 border-2 border-white/20 border-t-white rounded-full mx-auto" }) })] })) : phase === 'reveal' && round.correct ? (_jsx(RoundReveal, { correctAnswer: round.correct, winners: round.winners || [], totalAnswers: totalAnswers, optionStats: optionStats, question: round.question, options: round.options, category: round.category, difficulty: round.difficulty })) : (_jsx(QuestionCard, { question: round.question, options: round.options, media: round.media, category: round.category, difficulty: round.difficulty })) }) }), _jsxs("div", { className: "flex-shrink-0 grid grid-cols-2 gap-2", style: { height: "120px" }, children: [_jsx("div", { className: "min-h-0", children: _jsx(LeaderboardPanel, {}) }), _jsx("div", { className: "min-h-0", children: _jsx(TokenHoldersPanel, {}) })] }), _jsx("div", { className: "flex-shrink-0", children: _jsx(LiveFeed, { events: events }) })] })] }), _jsx(BackgroundQueue, {})] }));
}
