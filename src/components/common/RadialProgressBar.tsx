// components/RadialProgressBar.tsx
import React from 'react';

interface RadialProgressBarProps {
  progress: number;
}

const RadialProgressBar: React.FC<RadialProgressBarProps> = ({ progress }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-12 h-12" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle
          className="text-[#80CDCF]"
          stroke="currentColor"
          strokeWidth="10"
          fill="none"
          r={radius}
          cx="50"
          cy="50"
        ></circle>
        <circle
          className="text-blueDark rounded-full"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
          r={radius}
          cx="50"
          cy="50"
        ></circle>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          stroke="#51c5cf"
          strokeWidth="1px"
          dy=".3em"
          className="text-2xl font-semibold text-[#51c5cf]"
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
};

export default RadialProgressBar;
