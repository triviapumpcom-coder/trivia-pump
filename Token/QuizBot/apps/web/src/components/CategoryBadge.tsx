import React from "react";

interface CategoryBadgeProps {
  category: string;
  difficulty?: string;
}

export function CategoryBadge({ category, difficulty }: CategoryBadgeProps): JSX.Element {
  // Category color mapping - simple orange style like "easy"
  const getCategoryColor = (cat: string) => {
    return 'bg-orange-500/20 text-orange-300 border-orange-400/50';
  };

  // Difficulty color mapping
  const getDifficultyColor = (diff: string) => {
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

  return (
    <div className="flex items-center gap-2 mb-4">
      {/* Category Badge */}
      <div className={`inline-flex items-center px-3 py-1.5 rounded-full border font-bold text-sm shadow-lg ${getCategoryColor(category)}`}>
        <span className="capitalize">{category}</span>
      </div>

      {/* Difficulty Badge */}
      {difficulty && (
        <div className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-semibold uppercase tracking-wide ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </div>
      )}
    </div>
  );
}
