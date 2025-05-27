import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types';
import { supabase } from '../lib/supabase';

export const useTasks = (userId: string | undefined) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setTasks(data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTasks();

    // Set up a real-time subscription for tasks
    if (userId) {
      const subscription = supabase
        .channel('tasks-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'tasks',
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            console.log('Real-time update:', payload);
            fetchTasks();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [userId, fetchTasks]);

  const addTask = async (title: string, description: string) => {
    if (!userId) {
      setError('User not authenticated');
      return null;
    }

    try {
      const newTask = {
        title,
        description,
        status: 'pending' as const,
        user_id: userId,
      };

      const { data, error: insertError } = await supabase
        .from('tasks')
        .insert(newTask)
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      // Real-time subscription should update the list, but we'll update it manually too
      setTasks((prevTasks) => [data, ...prevTasks]);
      return data;
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task');
      return null;
    }
  };

  const updateTask = async (updatedTask: Task) => {
    if (!userId) {
      setError('User not authenticated');
      return false;
    }

    try {
      const { error: updateError } = await supabase
        .from('tasks')
        .update({
          title: updatedTask.title,
          description: updatedTask.description,
          status: updatedTask.status,
        })
        .eq('id', updatedTask.id)
        .eq('user_id', userId);

      if (updateError) {
        throw updateError;
      }

      // Real-time subscription should update the list, but we'll update it manually too
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      
      return true;
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task');
      return false;
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!userId) {
      setError('User not authenticated');
      return false;
    }

    try {
      const { error: deleteError } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
        .eq('user_id', userId);

      if (deleteError) {
        throw deleteError;
      }

      // Real-time subscription should update the list, but we'll update it manually too
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      
      return true;
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task');
      return false;
    }
  };

  return { tasks, loading, error, fetchTasks, addTask, updateTask, deleteTask };
};