import React from 'react';
import { ClipboardList } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  hasFilter?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  hasFilter = false,
}) => {
  return (
    <div className="py-12 text-center">
      <div className="flex justify-center mb-4">
        <ClipboardList className="h-16 w-16 text-gray-300" />
      </div>
      <p className="text-gray-500 mb-4">{message}</p>
      {hasFilter && (
        <p className="text-sm text-gray-400">
          Try changing the filter or add a new task.
        </p>
      )}
    </div>
  );
};

export default EmptyState;