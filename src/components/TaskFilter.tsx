import React from 'react';
import { ListFilter } from 'lucide-react';

interface TaskFilterProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  taskCount: number;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ statusFilter, setStatusFilter, taskCount }) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div className="text-sm font-medium text-gray-700">
        {taskCount} {taskCount === 1 ? 'task' : 'tasks'} {statusFilter !== 'all' && `(${statusFilter})`}
      </div>
      <div className="flex items-center">
        <ListFilter className="h-4 w-4 mr-2 text-gray-500" />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;