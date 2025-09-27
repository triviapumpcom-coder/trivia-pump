// Paste your real live chat client here.
// Expected API: export async function startLiveChat({ contractAddress, onMessage })

type StartArgs = {
  contractAddress: string;
  onMessage: (msg: { roomMint?: string; account: string; displayName?: string; message: string }) => void;
};

export async function startLiveChat(_args: StartArgs): Promise<void> {
  // no-op placeholder to keep types happy until you paste the real client
  // eslint-disable-next-line no-console
  console.warn("[livechat] placeholder loaded. Replace with real Pump.fun socket client.");
}


