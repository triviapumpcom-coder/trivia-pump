import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAudioStore } from '../store/audio';
export function SoundToggle() {
    const { isSoundEnabled, toggleSound } = useAudioStore();
    return (_jsxs("button", { onClick: toggleSound, className: `
        flex items-center gap-1 px-2 py-1 rounded border transition-all duration-200
        ${isSoundEnabled
            ? 'bg-green-500/20 border-green-400/50 text-green-300 hover:bg-green-500/30'
            : 'bg-red-500/20 border-red-400/50 text-red-300 hover:bg-red-500/30'}
      `, title: isSoundEnabled ? 'Turn Off Sound' : 'Turn On Sound', children: [_jsx("span", { className: "text-xs", children: isSoundEnabled ? '🔊' : '🔇' }), _jsx("span", { className: "text-xs font-medium hidden sm:block", children: isSoundEnabled ? 'ON' : 'OFF' })] }));
}
