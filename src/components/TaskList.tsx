'use client';

import { Task, TaskStatus } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: number, status: TaskStatus) => void;
  onDeleteTask: (id: number) => void;
}

export default function TaskList({ tasks, onStatusChange, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-gray-400 text-center py-6">No tasks found. Add a new task above!</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm gap-4"
        >
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900 text-base">{task.title}</h3>
            <p className="text-xs text-gray-400">
              Created: {new Date(task.created_at).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
              className="px-3 py-2 text-sm bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value="todo" className="text-gray-900 bg-white">To Do</option>
              <option value="in-progress" className="text-gray-900 bg-white">In Progress</option>
              <option value="done" className="text-gray-900 bg-white">Done</option>
            </select>

            <button
              onClick={() => onDeleteTask(task.id)}
              className="px-3.5 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}