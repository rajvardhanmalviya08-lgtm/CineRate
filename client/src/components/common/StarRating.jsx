import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ value = 0, onChange, readOnly = false, size = 'md', showValue = true }) => {
  const [hoverValue, setHoverValue] = useState(0);

  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  const currentDisplay = hoverValue || value || 0;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
          const isFilled = star <= currentDisplay;
          return (
            <button
              key={star}
              type="button"
              disabled={readOnly}
              onClick={() => onChange && onChange(star)}
              onMouseEnter={() => !readOnly && setHoverValue(star)}
              onMouseLeave={() => !readOnly && setHoverValue(0)}
              className={`p-0.5 transition-transform duration-150 focus:outline-none ${
                readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-125'
              }`}
            >
              <Star
                className={`${starSizes[size] || starSizes.md} transition-colors ${
                  isFilled
                    ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                    : 'text-gray-600 hover:text-gray-400'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showValue && (
        <div className="flex items-center space-x-1 font-bold text-sm">
          <span className="text-amber-400 text-base">{currentDisplay > 0 ? currentDisplay : '—'}</span>
          <span className="text-gray-500 text-xs">/ 10</span>
        </div>
      )}
    </div>
  );
};

export default StarRating;

