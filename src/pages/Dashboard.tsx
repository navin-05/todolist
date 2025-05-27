import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Task } from '../types';
import TaskCard from '../components/TaskCard';
import NewTaskForm from '../components/NewTaskForm';
import { ListFilter, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (!user) return;
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        setError('User not authenticated');
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title: string, description: string) => {
    try {
      if (!user) {
        setError('User not authenticated');
        return;
      }

      const newTask = {
        title,
        description,
        status: 'pending' as const,
        user_id: user.id,
      };

      const { data, error: insertError } = await supabase
        .from('tasks')
        .insert(newTask)
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      setTasks([data, ...tasks]);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      const { error: updateError } = await supabase
        .from('tasks')
        .update({
          title: updatedTask.title,
          description: updatedTask.description,
          status: updatedTask.status,
        })
        .eq('id', updatedTask.id)
        .eq('user_id', user?.id);

      if (updateError) {
        throw updateError;
      }

      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task. Please try again.');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (deleteError) {
        throw deleteError;
      }

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task. Please try again.');
    }
  };

  const filteredTasks = statusFilter === 'all'
    ? tasks
    : tasks.filter(task => task.status === statusFilter);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-gray-600">Manage your tasks and stay organized.</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 rounded-md border border-red-200">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      <NewTaskForm onAddTask={addTask} />

      <div className="mb-6 flex justify-between items-center">
        <div className="text-sm font-medium text-gray-700">
          {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'} {statusFilter !== 'all' && `(${statusFilter})`}
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

      {loading ? (
        <div className="py-12">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500">
            {tasks.length === 0
              ? 'No tasks yet. Add your first task to get started!'
              : 'No tasks match your current filter. Try changing the filter or add a new task.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;