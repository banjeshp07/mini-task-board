'use client';

import { useState, useEffect } from 'react';
import { Task, TaskStatus } from '@/types/task';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to load tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = (newTask: Task) => {
    setTasks([newTask, ...tasks]);
  };

  const handleStatusChange = async (id: number, status: TaskStatus) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error('Failed to update task status');

      setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete task');

      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-10 font-sans">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Mini Task Board</h1>
      <p className="text-sm text-gray-500 mb-6">Full-Stack Practical Assessment</p>

      <TaskForm onTaskAdded={handleTaskAdded} />

      {loading && <p className="text-gray-500">Loading tasks...</p>}
      {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg mb-4">Error: {error}</p>}

      {!loading && !error && (
        <TaskList
          tasks={tasks}
          onStatusChange={handleStatusChange}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </main>
  );
}