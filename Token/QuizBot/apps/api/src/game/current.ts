let currentRoundId: string | null = null;
let roundStartTs: number | null = null;

export function setCurrentRoundId(id: string): void {
  currentRoundId = id;
  roundStartTs = Date.now();
}

export function getCurrentRoundId(): string | null {
  return currentRoundId;
}

export function getRoundStartTs(): number | null {
  return roundStartTs;
}


