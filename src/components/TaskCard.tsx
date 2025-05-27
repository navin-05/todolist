import React, { useState } from 'react';
import { Task } from '../types';
import { Edit, Trash2, CheckCircle, Circle, Clock } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
  };

  const statusIcons = {
    'pending': <Circle className="h-4 w-4 text-yellow-500" />,
    'in-progress': <Clock className="h-4 w-4 text-blue-500" />,
    'completed': <CheckCircle className="h-4 w-4 text-green-500" />,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    const updatedTask = { ...task, status: newStatus };
    onUpdate(updatedTask);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
      {isEditing ? (
        <div className="p-4 space-y-3">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Task title"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Description"
            rows={3}
          />
          <select
            name="status"
            value={editedTask.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-600 line-clamp-3">{task.description}</p>
            <div className="mt-3 flex justify-between items-center">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColors[task.status]}`}>
                {statusIcons[task.status]}
                <span className="ml-1 capitalize">{task.status.replace('-', ' ')}</span>
              </span>
              <span className="text-xs text-gray-500">
                {new Date(task.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
            <div className="flex justify-between">
              <div className="text-xs font-medium text-gray-500">Change status:</div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleStatusChange('pending')}
                  className={`p-1 rounded-full ${task.status === 'pending' ? 'bg-yellow-100' : 'hover:bg-gray-100'}`}
                  disabled={task.status === 'pending'}
                >
                  <Circle className="h-4 w-4 text-yellow-500" />
                </button>
                <button
                  onClick={() => handleStatusChange('in-progress')}
                  className={`p-1 rounded-full ${task.status === 'in-progress' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                  disabled={task.status === 'in-progress'}
                >
                  <Clock className="h-4 w-4 text-blue-500" />
                </button>
                <button
                  onClick={() => handleStatusChange('completed')}
                  className={`p-1 rounded-full ${task.status === 'completed' ? 'bg-green-100' : 'hover:bg-gray-100'}`}
                  disabled={task.status === 'completed'}
                >
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;