import { supabase } from '../lib/supabase';
import { Task } from '../types';

export const fetchTasks = async (userId: string): Promise<Task[]> => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks');
  }

  return data || [];
};

export const createTask = async (
  title: string,
  description: string,
  userId: string
): Promise<Task> => {
  const newTask = {
    title,
    description,
    status: 'pending' as const,
    user_id: userId,
  };

  const { data, error } = await supabase
    .from('tasks')
    .insert(newTask)
    .select()
    .single();

  if (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }

  return data;
};

export const updateTask = async (task: Task, userId: string): Promise<void> => {
  const { error } = await supabase
    .from('tasks')
    .update({
      title: task.title,
      description: task.description,
      status: task.status,
    })
    .eq('id', task.id)
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating task:', error);
    throw new Error('Failed to update task');
  }
};

export const deleteTask = async (taskId: string, userId: string): Promise<void> => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId)
    .eq('user_id', userId);

  if (error) {
    console.error('Error deleting task:', error);
    throw new Error('Failed to delete task');
  }
};