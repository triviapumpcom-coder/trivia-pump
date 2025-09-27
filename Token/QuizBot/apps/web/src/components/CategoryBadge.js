import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function CategoryBadge({ category, difficulty }) {
    // Category color mapping - simple orange style like "easy"
    const getCategoryColor = (cat) => {
        return 'bg-orange-500/20 text-orange-300 border-orange-400/50';
    };
    // Difficulty color mapping
    const getDifficultyColor = (diff) => {
        switch (diff.toLowerCase()) {
            case 'easy':
                return 'bg-green-500/20 text-green-300 border-green-400/50';
            case 'medium':
                return 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50';
            case 'hard':
                return 'bg-red-500/20 text-red-300 border-red-400/50';
            default:
                return 'bg-gray-500/20 text-gray-300 border-gray-400/50';
        }
    };
    return (_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx("div", { className: `inline-flex items-center px-3 py-1.5 rounded-full border font-bold text-sm shadow-lg ${getCategoryColor(category)}`, children: _jsx("span", { className: "capitalize", children: category }) }), difficulty && (_jsx("div", { className: `inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-semibold uppercase tracking-wide ${getDifficultyColor(difficulty)}`, children: difficulty }))] }));
}
