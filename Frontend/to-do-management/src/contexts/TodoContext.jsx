import React, { createContext, useContext, useState } from 'react';

const TodoContext = createContext();

const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    todo: [
      { id: 1, title: 'Mobile App Design', subtitle: 'Wireframing, Colors, Fonts', progress: 50, color: 'bg-purple-600', comments: 3, links: 5, date: '22 March 2025' },
      { id: 2, title: 'UI/Ux Design', subtitle: 'Wireframing, Colors, Fonts', progress: 50, color: 'bg-purple-600', comments: 3, links: 5, date: '22 March 2025' },
    ],
    inProgress: [
      { id: 3, title: 'Website Design', subtitle: 'Wireframing, Colors, Fonts', progress: 70, color: 'bg-blue-600', comments: 3, links: 5, date: '22 March 2025' },
      { id: 4, title: 'Website Design', subtitle: 'Wireframing, Colors, Fonts', progress: 70, color: 'bg-blue-600', comments: 3, links: 5, date: '22 March 2025' },
    ],
    done: [
      { id: 5, title: 'Website Design', subtitle: 'Wireframing, Colors, Fonts', progress: 30, color: 'bg-orange-500', comments: 3, links: 5, date: '22 March 2025' },
      { id: 6, title: 'Finance App Design', subtitle: 'Wireframing, Colors, Fonts', progress: 40, color: 'bg-orange-500', comments: 3, links: 5, date: '22 March 2025' },
    ],
  });

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentColumn, setCurrentColumn] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  const addTask = (newTaskData) => {
    const colorMap = {
      todo: 'bg-purple-600',
      inProgress: 'bg-blue-600',
      done: 'bg-orange-500'
    };

    const task = {
      id: Date.now(),
      title: newTaskData.title,
      subtitle: newTaskData.subtitle || 'Wireframing, Colors, Fonts',
      progress: newTaskData.progress,
      color: colorMap[currentColumn],
      comments: 0,
      links: 0,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
    };

    if (editingTask) {
      setTasks(prev => ({
        ...prev,
        [currentColumn]: prev[currentColumn].map(t => 
          t.id === editingTask.id ? { ...task, id: editingTask.id } : t
        )
      }));
      setEditingTask(null);
    } else {
      setTasks(prev => ({
        ...prev,
        [currentColumn]: [...prev[currentColumn], task]
      }));
    }
  };

  const deleteTask = (column, taskId) => {
    setTasks(prev => ({
      ...prev,
      [column]: prev[column].filter(t => t.id !== taskId)
    }));
  };

  const moveTask = (task, fromColumn, toColumn) => {
    const colorMap = {
      todo: 'bg-purple-600',
      inProgress: 'bg-blue-600',
      done: 'bg-orange-500'
    };

    setTasks(prev => ({
      ...prev,
      [fromColumn]: prev[fromColumn].filter(t => t.id !== task.id),
      [toColumn]: [...prev[toColumn], { ...task, color: colorMap[toColumn] }]
    }));
  };

  const updateProgress = (column, taskId, newProgress) => {
    setTasks(prev => ({
      ...prev,
      [column]: prev[column].map(t => 
        t.id === taskId ? { ...t, progress: newProgress } : t
      )
    }));
  };

  const filteredTasks = (column) => {
    return tasks[column].filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const openEditModal = (task, column) => {
    setEditingTask(task);
    setCurrentColumn(column);
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingTask(null);
  };

  const value = {
    tasks,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    showAddModal,
    setShowAddModal,
    currentColumn,
    setCurrentColumn,
    editingTask,
    setEditingTask,
    leftSidebarOpen,
    setLeftSidebarOpen,
    rightSidebarOpen,
    setRightSidebarOpen,
    addTask,
    deleteTask,
    moveTask,
    updateProgress,
    filteredTasks,
    openEditModal,
    closeModal,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export { useTodo };