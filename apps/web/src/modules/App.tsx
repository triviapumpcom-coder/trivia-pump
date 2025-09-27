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
import { ErrorBoundary } from "../components/ErrorBoundary";
import { useGameStore } from "../store/game";
import { useBackgroundStore } from "../store/background";
import { useFlashStore } from "../store/flash";
import { useAudioManager } from "../hooks/useAudio";
import { useAudioStore } from "../store/audio";
import { getSocket } from "../lib/socket";

export function App(): JSX.Element {
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
          const roundGroups: any = {};
          
          eventsData.events.forEach((event: any) => {
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
          
          const roundGroupsArray = (Object.values(roundGroups) || []).slice(-5);
          useGameStore.setState(state => ({
            ...state,
            roundGroups: roundGroupsArray as any
          }));
        }
        
        // Restore winners history
        if (winnersData.winners && Array.isArray(winnersData.winners) && winnersData.winners.length > 0) {
          useGameStore.setState(state => ({
            ...state,
            winnersHistory: (winnersData.winners || []).slice(-10)
          }));
        }
      }).catch(err => {/* Silent error handling */});
    };
    
    socket.on("connect", handleConnection);
    socket.on("hello", handleConnection);
    socket.on("round:start", (p: any) => {
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
      } else {
        console.log('🔇 Round-start sound disabled');
      }
    });
    socket.on("round:end", (p: any) => {
      setRoundEnd(p);
      
      // FORCE STOP ALL SOUNDS
      console.log('🛑 FORCING ALL SOUNDS TO STOP - Round ended');
      stopAllSounds();
      
      // Play time-up sound for round ended screen (instead of gong)
      setTimeout(() => {
        if (isSoundEnabled) {
          console.log('🔔 Playing time-up sound for round ended screen');
          playSound('time-up');
        } else {
          console.log('🔇 Time-up sound disabled');
        }
      }, 500); // 500ms delay
    });
    socket.on("answer:accepted", (a: any) => {
      applyAnswer(a);
      
      // Trigger flash effect for the chosen option
      if (a.choice && ['A', 'B', 'C', 'D'].includes(a.choice)) {
        addFlash(a.choice as 'A' | 'B' | 'C' | 'D');
      }
    });
    socket.on("feed:event", (e: any) => pushEvent(e.text));
    
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

  return (
    <div 
      className="h-screen overflow-hidden flex flex-col transition-all duration-1000 ease-in-out"
      style={
        backgrounds[currentBackground].type === 'gradient' 
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
            }
      }
    >
      
      <div className="flex-shrink-0 px-4 pt-1 pb-0.5">
        <HeaderBar />
      </div>
      <div className="flex-shrink-0 px-4 mb-0">
            <ErrorBoundary>
              <WinnersTicker />
            </ErrorBoundary>
      </div>
      <div className="flex-1 px-4 pb-2 min-h-0">
        {/* Desktop Layout (1024px+) */}
        <div className="hidden lg:grid gap-2 h-full" style={{ gridTemplateColumns: "300px 1fr 280px", gridTemplateRows: "auto 1fr auto" }}>
          {/* Left Sidebar - Round Info & Leaderboard */}
          <div className="grid gap-2" style={{ gridTemplateRows: "auto 1fr" }}>
            <div className="rounded-2xl bg-black/30 p-2 border border-white/10">
              <div className="text-center">
                <div className="text-white/70 text-xs mb-1">Round #{round.roundId || "0"}</div>
                <Countdown endsAtMs={round.endsAt} durationSec={round.durationSec} isActive={phase === 'question'} enableSounds={isSoundEnabled} />
                <div className="text-white/60 text-xs mt-1">
                  {round.status === "idle" ? (
                    <span className="flex items-center justify-center gap-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span className="text-red-400 font-semibold">LIVE</span>
                    </span>
                  ) : round.status === "running" ? (
                    <span className="flex items-center justify-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-green-400 font-semibold">ACTIVE</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span className="text-blue-400 font-semibold">ENDED</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="min-h-0">
              <ErrorBoundary>
                <LeaderboardPanel />
              </ErrorBoundary>
            </div>
          </div>
          
          {/* Center - Main Question Area */}
          <div className="flex items-start justify-center pt-0">
            <div className="w-full max-w-4xl">
              {phase === 'waiting' ? (
                <div className="rounded-3xl bg-black/40 p-6 shadow-2xl border border-white/20 text-center w-full">
                  <h2 className="text-4xl font-black text-white mb-4">⏳ Next Round Starting Soon...</h2>
                  <p className="text-xl text-white/80">Get ready for the next question!</p>
                  <div className="mt-6">
                    <div className="animate-spin w-12 h-12 border-4 border-white/20 border-t-white rounded-full mx-auto"></div>
                  </div>
                </div>
              ) : phase === 'reveal' && round.correct ? (
                <RoundReveal
                  correctAnswer={round.correct}
                  winners={round.winners || []}
                  totalAnswers={totalAnswers}
                  optionStats={optionStats}
                  question={round.question}
                  options={round.options}
                  category={round.category}
                  difficulty={round.difficulty}
                />
              ) : (
                <QuestionCard 
                  question={round.question} 
                  options={round.options} 
                  media={round.media}
                  category={round.category}
                  difficulty={round.difficulty}
                />
              )}
            </div>
          </div>
          
          {/* Right Sidebar - Stats */}
          <div className="grid gap-2" style={{ gridTemplateRows: "1fr 1fr" }}>
            <div className="min-h-0">
              <ErrorBoundary>
                <TokenHoldersPanel />
              </ErrorBoundary>
            </div>
            <div className="min-h-0">
              <RecentWinners />
            </div>
          </div>
          
          {/* Bottom Live Feed - Spans all columns */}
          <div className="col-span-3 min-h-0">
            <LiveFeed events={events} />
          </div>
        </div>

        {/* Mobile Layout (< 1024px) */}
        <div className="lg:hidden flex flex-col gap-2 h-full">
          {/* Mobile Top Bar - Round Info */}
          <div className="flex-shrink-0">
            <div className="rounded-xl bg-black/30 p-2 border border-white/10">
              <div className="flex items-center justify-between">
                <div className="text-white/70 text-xs">Round #{round.roundId || "0"}</div>
                <div className="flex items-center gap-2">
                  <Countdown endsAtMs={round.endsAt} durationSec={round.durationSec} isActive={phase === 'question'} enableSounds={false} />
                  <div className="text-white/60 text-xs">
                    {round.status === "idle" ? (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="text-red-400 font-semibold">LIVE</span>
                      </span>
                    ) : round.status === "running" ? (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-green-400 font-semibold">ACTIVE</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        <span className="text-blue-400 font-semibold">ENDED</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Main Question */}
          <div className="flex-1 flex items-start justify-center min-h-0">
            <div className="w-full">
              {phase === 'waiting' ? (
                <div className="rounded-3xl bg-black/40 p-4 shadow-2xl border border-white/20 text-center w-full">
                  <h2 className="text-xl font-black text-white mb-3">⏳ Next Round Starting Soon...</h2>
                  <p className="text-sm text-white/80">Get ready for the next question!</p>
                  <div className="mt-3">
                    <div className="animate-spin w-6 h-6 border-2 border-white/20 border-t-white rounded-full mx-auto"></div>
                  </div>
                </div>
              ) : phase === 'reveal' && round.correct ? (
                <RoundReveal
                  correctAnswer={round.correct}
                  winners={round.winners || []}
                  totalAnswers={totalAnswers}
                  optionStats={optionStats}
                  question={round.question}
                  options={round.options}
                  category={round.category}
                  difficulty={round.difficulty}
                />
              ) : (
                <QuestionCard 
                  question={round.question} 
                  options={round.options} 
                  media={round.media}
                  category={round.category}
                  difficulty={round.difficulty}
                />
              )}
            </div>
          </div>

          {/* Mobile Stats Grid */}
          <div className="flex-shrink-0 grid grid-cols-2 gap-2" style={{ height: "120px" }}>
            <div className="min-h-0">
              <ErrorBoundary>
                <LeaderboardPanel />
              </ErrorBoundary>
            </div>
            <div className="min-h-0">
              <ErrorBoundary>
                <TokenHoldersPanel />
              </ErrorBoundary>
            </div>
          </div>

          {/* Mobile Live Feed */}
          <div className="flex-shrink-0">
            <LiveFeed events={events} />
          </div>
        </div>
      </div>
          
          {/* Background Queue Status */}
          <BackgroundQueue />
          
        </div>
  );
}


