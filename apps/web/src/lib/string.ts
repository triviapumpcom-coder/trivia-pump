export function short(value?: string, length = 3): string {
  if (!value) return "Player";
  if (value.length <= length * 2) return value;
  return `${value.slice(0, length)}…${value.slice(-length)}`;
}


