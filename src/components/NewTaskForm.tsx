import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';

interface NewTaskFormProps {
  onAddTask: (title: string, description: string) => Promise<void>;
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onAddTask }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    
    try {
      setIsSubmitting(true);
      await onAddTask(title, description);
      setTitle('');
      setDescription('');
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-6">
      {isFormOpen ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Add New Task</h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Task title"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Description (optional)"
              rows={3}
            />
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsFormOpen(false)}
                className="px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={!title.trim() || isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Task'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-colors duration-200"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Task
        </button>
      )}
    </div>
  );
};

export default NewTaskForm;