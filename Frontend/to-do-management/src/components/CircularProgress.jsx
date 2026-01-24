import React from 'react';

const CircularProgress = ({ progress, color }) => (
  <div className="relative w-12 h-12">
    <svg className="transform -rotate-90 w-12 h-12">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="none" className="text-gray-200" />
      <circle
        cx="24"
        cy="24"
        r="20"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        strokeDasharray={`${progress * 1.25} ${125}`}
        className={color}
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-xs font-semibold">{progress}%</span>
    </div>
  </div>
);

export default CircularProgress;