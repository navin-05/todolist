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
    'pending': 'bg-purple-900 text-purple-300',
    'in-progress': 'bg-purple-700 text-purple-200',
    'completed': 'bg-purple-600 text-white',
  };

  const statusIcons = {
    'pending': <Circle className="h-4 w-4 text-purple-400" />,
    'in-progress': <Clock className="h-4 w-4 text-purple-300" />,
    'completed': <CheckCircle className="h-4 w-4 text-purple-200" />,
  };

  // Title color classes based on status
  const titleColor = {
    'pending': 'text-red-400',
    'in-progress': 'text-yellow-300',
    'completed': 'text-green-400',
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
    <div className="bg-gray-800 rounded-lg shadow-sm border border-purple-500 overflow-hidden transition-all duration-200 hover:shadow-md text-white">
      {isEditing ? (
        <div className="p-4 space-y-3">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900 text-white"
            placeholder="Task title"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900 text-white"
            placeholder="Description"
            rows={3}
          />
          <select
            name="status"
            value={editedTask.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900 text-white"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 border border-purple-500 text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className={`text-lg font-medium ${titleColor[task.status]}`}>{task.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
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
            <p className="mt-1 text-sm text-purple-200 line-clamp-3">{task.description}</p>
            <div className="mt-3 flex justify-between items-center">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColors[task.status]}`}>
                {statusIcons[task.status]}
                <span className="ml-1 capitalize">{task.status.replace('-', ' ')}</span>
              </span>
              <div className="flex flex-col items-end">
                <span className="text-xs text-purple-400">Created: {new Date(task.created_at).toLocaleDateString()}</span>
                {task.due_date && (
                  <span className="text-xs text-purple-300 mt-1">Due: {new Date(task.due_date).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-900 px-4 py-3 border-t border-purple-700">
            <div className="flex justify-between">
              <div className="text-xs font-medium text-purple-400">Change status:</div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleStatusChange('pending')}
                  className={`p-1 rounded-full border-2 border-purple-700 ${task.status === 'pending' ? 'bg-purple-800' : 'hover:bg-purple-900'}`}
                  disabled={task.status === 'pending'}
                >
                  <Circle className="h-4 w-4 text-purple-400" />
                </button>
                <button
                  onClick={() => handleStatusChange('in-progress')}
                  className={`p-1 rounded-full border-2 border-purple-700 ${task.status === 'in-progress' ? 'bg-purple-700' : 'hover:bg-purple-900'}`}
                  disabled={task.status === 'in-progress'}
                >
                  <Clock className="h-4 w-4 text-purple-300" />
                </button>
                <button
                  onClick={() => handleStatusChange('completed')}
                  className={`p-1 rounded-full border-2 border-purple-700 ${task.status === 'completed' ? 'bg-purple-600' : 'hover:bg-purple-900'}`}
                  disabled={task.status === 'completed'}
                >
                  <CheckCircle className="h-4 w-4 text-purple-200" />
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