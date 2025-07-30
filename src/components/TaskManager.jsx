import React, { useState, useEffect } from 'react';
import Button from './Button';
import Card from './Card';

/**
 * Custom hook for managing tasks with localStorage persistence
 */
const useLocalStorageTasks = () => {
  // Initialize state from localStorage or with empty array
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('plp-tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  });

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem('plp-tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  return [tasks, setTasks];
};

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorageTasks();
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('All');

  // Add a new task
  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks(prevTasks => [...prevTasks, task]);
      setNewTask('');
    }
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  // Clear all completed tasks
  const clearCompleted = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'Active':
        return !task.completed;
      case 'Completed':
        return task.completed;
      default:
        return true;
    }
  });

  // Handle Enter key press in input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Calculate stats
  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <Card className="max-w-4xl mx-auto">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Task Manager
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Stay organized and productive
          </p>
        </div>
        
        {/* Add Task Section */}
        <div className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            <Button 
              onClick={addTask} 
              variant="primary"
              className="px-6 py-3 font-semibold"
              disabled={!newTask.trim()}
            >
              Add Task
            </Button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-600 p-1 bg-gray-50 dark:bg-gray-800">
            {['All', 'Active', 'Completed'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  filter === filterType
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {filterType}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3 mb-8">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">
                {filter === 'All' ? 'No tasks yet' : `No ${filter.toLowerCase()} tasks`}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {filter === 'All' ? 'Add a task above to get started!' : `Try switching to a different filter.`}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-all hover:shadow-sm ${
                  task.completed ? 'opacity-75' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
                />
                <span
                  className={`flex-1 transition-all ${
                    task.completed
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {task.text}
                </span>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                  className="opacity-70 hover:opacity-100"
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Stats and Actions */}
        {totalTasks > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Stats */}
              <div className="flex gap-6 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{totalTasks}</span> total
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{activeTasks}</span> active
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-green-600 dark:text-green-400">{completedTasks}</span> completed
                </span>
              </div>

              {/* Clear Completed Button */}
              {completedTasks > 0 && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={clearCompleted}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  Clear Completed ({completedTasks})
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskManager;