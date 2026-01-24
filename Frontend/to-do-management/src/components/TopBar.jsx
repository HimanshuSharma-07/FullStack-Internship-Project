import React from 'react';
import { Menu, Search, Bell, Settings, HelpCircle, Calendar, Filter, ArrowUpDown, Plus } from 'lucide-react';
import { useTodo } from '../contexts/TodoContext.jsx';

const TopBar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    searchQuery, 
    setSearchQuery,
    setLeftSidebarOpen,
    setRightSidebarOpen,
    setShowAddModal,
    setCurrentColumn,
    setEditingTask
  } = useTodo();

  const handleCreateTask = () => {
    setCurrentColumn('todo');
    setShowAddModal(true);
    setEditingTask(null);
  };

  return (
    <div className="bg-white border-b border-gray-200 p-3 md:p-4">
      <div className="flex items-center gap-3 mb-3 md:mb-4">
        <button 
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => setLeftSidebarOpen(true)}
        >
          <Menu size={20} className="text-gray-700" />
        </button>
        
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block">
            <Bell size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg hidden md:block">
            <Settings size={20} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg hidden md:block">
            <HelpCircle size={20} className="text-gray-600" />
          </button>
          <button 
            className="xl:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setRightSidebarOpen(true)}
          >
            <Calendar size={20} className="text-gray-600" />
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              SA
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:block">Sabekun Ainan</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex gap-4 overflow-x-auto">
          {['All', 'Overview', 'Project', 'List'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm whitespace-nowrap">
            <Filter size={16} />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm whitespace-nowrap">
            <ArrowUpDown size={16} />
            <span className="hidden sm:inline">Sort</span>
          </button>
          <button 
            onClick={handleCreateTask}
            className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm whitespace-nowrap"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Create Project</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;