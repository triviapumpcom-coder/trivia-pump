export function short(value, length = 3) {
    if (!value)
        return "unknown";
    if (value.length <= length * 2)
        return value;
    return `${value.slice(0, length)}…${value.slice(-length)}`;
}
