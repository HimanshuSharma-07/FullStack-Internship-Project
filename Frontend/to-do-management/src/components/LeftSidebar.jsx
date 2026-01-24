import React from 'react';
import { Menu, X, User, Layout, Calendar, Star, CheckSquare, Bell, Palette, HelpCircle, Info, Zap, RefreshCw } from 'lucide-react';
import { useTodo } from '../contexts/TodoContext.jsx';

const LeftSidebar = () => {
  const { leftSidebarOpen, setLeftSidebarOpen } = useTodo();

  const navItems = [
    { icon: User, label: 'Account', color: 'text-purple-600' },
    { icon: Layout, label: 'General', color: 'text-purple-600' },
    { icon: Calendar, label: 'Calendar', color: 'text-purple-600' },
    { icon: Star, label: 'Productivity', color: 'text-purple-600' },
    { icon: CheckSquare, label: 'Reminders', color: 'text-purple-600' },
    { icon: Bell, label: 'Notifications', color: 'text-purple-600' },
    { icon: Palette, label: 'Theme', color: 'text-purple-600' },
    { icon: HelpCircle, label: 'Help & feedback', color: 'text-purple-600' },
    { icon: Info, label: 'About', color: 'text-purple-600' },
    { icon: Zap, label: "What's New", color: 'text-purple-600' },
    { icon: RefreshCw, label: 'Sync', color: 'text-purple-600' },
  ];

  return (
    <div className={`
      fixed lg:static inset-y-0 left-0 z-50
      w-64 bg-white border-r border-gray-200 flex flex-col
      transform transition-transform duration-300 ease-in-out
      ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Menu size={20} className="text-gray-700" />
          <h1 className="font-bold text-lg">Todo App</h1>
        </div>
        <button 
          className="lg:hidden text-gray-600"
          onClick={() => setLeftSidebarOpen(false)}
        >
          <X size={20} />
        </button>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        {navItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 text-gray-700 text-sm transition-colors"
          >
            <item.icon size={18} className={item.color} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default LeftSidebar;