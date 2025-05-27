import React from 'react';

const LoadingTasks: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="py-4">
      <div className="animate-pulse space-y-4">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingTasks;