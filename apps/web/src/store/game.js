import { create } from "zustand";
export const useGameStore = create((set) => ({
    round: {
        roundId: null,
        question: "",
        options: ["", "", "", ""],
        endsAt: Date.now(),
        status: "idle",
        winners: [],
    },
    events: [],
    roundGroups: [],
    winnersHistory: [],
    optionStats: { A: 0, B: 0, C: 0, D: 0 },
    totalAnswers: 0,
    scores: {},
    latencies: {},
    phase: 'waiting',
    setRoundStart: (payload) => set((s) => {
        const now = Date.now();
        const newRoundGroup = {
            roundId: payload.roundId,
            question: payload.question ?? "Unknown question",
            status: "running",
            events: [{
                    id: `${now}`,
                    roundId: payload.roundId,
                    type: "round_start",
                    text: "Round started",
                    timestamp: now,
                }],
            startTime: now,
        };
        return {
            round: {
                roundId: payload.roundId,
                question: payload.question ?? s.round.question,
                options: payload.options ?? s.round.options,
                endsAt: payload.endsAt,
                status: "running",
                winners: [],
                media: payload.media ?? [],
                durationSec: payload.durationSec,
                category: payload.category,
                difficulty: payload.difficulty,
            },
            events: [
                ...s.events,
                { id: `${now}`, text: `Round started` },
            ].slice(-20),
            roundGroups: [...s.roundGroups, newRoundGroup].slice(-5),
            optionStats: { A: 0, B: 0, C: 0, D: 0 },
            totalAnswers: 0,
            latencies: {},
            phase: 'question',
        };
    }),
    setRoundEnd: (payload) => set((s) => {
        const now = Date.now();
        const updatedRoundGroups = s.roundGroups.map(rg => rg.roundId === payload.id
            ? {
                ...rg,
                status: "ended",
                correct: payload.correct,
                endTime: now,
                events: [
                    ...rg.events,
                    {
                        id: `${now}`,
                        roundId: payload.id,
                        type: "round_end",
                        text: `Round ended: Correct answer ${payload.correct}`,
                        timestamp: now,
                    }
                ]
            }
            : rg);
        return {
            round: {
                ...s.round,
                status: "ended",
                correct: payload.correct,
                winners: payload.winners,
            },
            events: [
                ...s.events,
                { id: `${now}`, text: `Round ended: Correct ${payload.correct}` },
            ].slice(-20),
            roundGroups: updatedRoundGroups,
            winnersHistory: payload.winners && payload.winners.length
                ? [
                    ...s.winnersHistory,
                    {
                        roundId: payload.id,
                        winners: payload.winners.map((w) => ({
                            ...w,
                            score: s.scores[w.id] ?? 0,
                            latencySec: s.latencies[w.id] ?? null,
                        })),
                    },
                ].slice(-10)
                : s.winnersHistory,
            phase: 'reveal',
        };
    }),
    pushEvent: (text) => set((s) => ({ events: [...s.events, { id: `${Date.now()}`, text }].slice(-20) })),
    resetEvents: () => set({ events: [] }),
    applyAnswer: ({ roundId, userId, choice, status, total, latencySec }) => set((s) => {
        const now = Date.now();
        const shortUserId = userId.length > 8 ? `${userId.slice(0, 4)}...${userId.slice(-4)}` : userId;
        // Add event to current round group (avoid duplicates)
        const updatedRoundGroups = s.roundGroups.map(rg => rg.roundId === roundId
            ? {
                ...rg,
                events: [
                    // Remove any existing events from this user in this round
                    ...rg.events.filter(e => e.userId !== userId),
                    {
                        id: `${now}-${userId}`,
                        roundId,
                        type: "answer",
                        text: status === "accepted"
                            ? `${shortUserId} answered ${choice}`
                            : `${shortUserId} answered ${choice} (${status})`,
                        timestamp: now,
                        userId,
                        choice,
                        status,
                    }
                ]
            }
            : rg);
        if (status !== "accepted") {
            return { roundGroups: updatedRoundGroups };
        }
        const optionStats = { ...s.optionStats, [choice]: (s.optionStats[choice] ?? 0) + 1 };
        const scores = { ...s.scores };
        if (typeof total === "number" && !Number.isNaN(total)) {
            scores[userId] = total;
        }
        const latencies = { ...s.latencies, [userId]: latencySec ?? s.latencies[userId] ?? null };
        return {
            optionStats,
            totalAnswers: s.totalAnswers + 1,
            scores,
            latencies,
            roundGroups: updatedRoundGroups,
        };
    }),
    addRoundEvent: (event) => set((s) => {
        const now = Date.now();
        const fullEvent = {
            ...event,
            id: `${now}`,
            timestamp: now,
        };
        const updatedRoundGroups = s.roundGroups.map(rg => rg.roundId === event.roundId
            ? { ...rg, events: [...rg.events, fullEvent] }
            : rg);
        return { roundGroups: updatedRoundGroups };
    }),
    setPhase: (phase) => set({ phase }),
}));
