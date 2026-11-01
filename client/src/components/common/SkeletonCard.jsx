import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="flex-shrink-0 w-44 sm:w-52 animate-pulse">
      <div className="aspect-[2/3] w-full rounded-xl bg-cine-surface border border-cine-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      </div>
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-cine-surface rounded w-3/4" />
        <div className="h-3 bg-cine-surface/60 rounded w-1/2" />
      </div>
    </div>
  );
};

export default SkeletonCard;

