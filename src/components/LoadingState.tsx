import React, { useMemo, useState, useEffect } from 'react';

const COLORS = [
  'border-blue-200',
  'border-red-200',
  'border-green-200',
  'border-yellow-200',
  'border-pink-200',
  'border-purple-200',
  'border-indigo-200',
  'border-teal-200',
  'border-orange-200',
];

const COLORS_DARK = [
  'border-blue-400',
  'border-red-400',
  'border-green-400',
  'border-yellow-400',
  'border-pink-400',
  'border-purple-400',
  'border-indigo-400',
  'border-teal-400',
  'border-orange-400',
];

const LoadingState: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    const check = () => setIsDark(document.documentElement.classList.contains('dark') || match.matches);
    check();
    match.addEventListener('change', check);
    return () => match.removeEventListener('change', check);
  }, []);

  const spinnerColor = useMemo(() => {
    const colorArray = isDark ? COLORS_DARK : COLORS;
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  }, [isDark]);

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-gray-200 rounded-full dark:border-gray-700"></div>
        <div className={`w-20 h-20 border-4 rounded-full border-t-transparent animate-spin absolute top-0 left-0 ${spinnerColor}`}></div>
      </div>
      <p className="mt-4 text-gray-700 font-medium dark:text-gray-200">Loading...</p>
    </div>
  );
};

export default LoadingState;