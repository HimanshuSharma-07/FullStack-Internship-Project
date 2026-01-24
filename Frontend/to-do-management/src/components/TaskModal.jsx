import React, { useState, useEffect } from 'react';
import { useTodo } from '../contexts/TodoContext.jsx';

const TaskModal = () => {
  const { showAddModal, closeModal, addTask, editingTask } = useTodo();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    progress: 0,
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        subtitle: editingTask.subtitle,
        progress: editingTask.progress,
      });
    } else {
      setFormData({ title: '', subtitle: '', progress: 0 });
    }
  }, [editingTask, showAddModal]);

  const handleSubmit = () => {
    if (!formData.title.trim()) return;
    addTask(formData);
    setFormData({ title: '', subtitle: '', progress: 0 });
    closeModal();
  };

  const handleClose = () => {
    setFormData({ title: '', subtitle: '', progress: 0 });
    closeModal();
  };

  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Task title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Task description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Progress: {formData.progress}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            {editingTask ? 'Update' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;