import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-telegram-card border border-gray-800 rounded-xl p-6 h-64 flex flex-col animate-pulse">
          <div className="flex justify-between items-start mb-4">
            <div className="w-3/4">
              <div className="h-6 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-800 rounded w-1/3"></div>
            </div>
            <div className="w-10 h-10 bg-gray-800 rounded-lg"></div>
          </div>
          <div className="flex-grow">
            <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-800 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-800 rounded w-4/6"></div>
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
            <div className="h-4 bg-gray-800 rounded w-1/4"></div>
            <div className="h-8 bg-gray-700 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
};