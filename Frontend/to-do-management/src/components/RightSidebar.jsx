import React, { useState } from 'react';
import { X, Calendar, ChevronRight, MoreVertical } from 'lucide-react';
import { useTodo } from '../contexts/TodoContext.jsx';
import  CircularProgress  from './CircularProgress';

const RightSidebar = () => {
  const { rightSidebarOpen, setRightSidebarOpen, tasks } = useTodo();
  const [selectedDate, setSelectedDate] = useState(19);

  const totalTasks = tasks.todo.length + tasks.inProgress.length + tasks.done.length;

  return (
    <div className={`
      fixed xl:static inset-y-0 right-0 z-50
      w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto
      transform transition-transform duration-300 ease-in-out
      ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full xl:translate-x-0'}
    `}>
      <div className="flex items-center justify-between mb-6 xl:hidden">
        <h3 className="font-semibold text-gray-800">Calendar & Projects</h3>
        <button 
          className="text-gray-600"
          onClick={() => setRightSidebarOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      {/* Calendar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Calendar</h3>
          <button className="p-1.5 hover:bg-gray-100 rounded border border-gray-300">
            <Calendar size={16} className="text-gray-600" />
          </button>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-sm">Mar 2025</h4>
          <button>
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-xs text-gray-500 font-medium py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {[...Array(31)].map((_, i) => {
            const day = i + 1;
            const isSelected = day === selectedDate;
            return (
              <button
                key={i}
                onClick={() => setSelectedDate(day)}
                className={`py-2 text-sm rounded-lg transition-colors ${
                  isSelected
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's Project */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Today's Project</h3>
          <button>
            <MoreVertical size={18} className="text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="text-center text-gray-500 text-sm py-8">
            Total Tasks: {totalTasks}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-3">
              <h4 className="font-medium text-sm text-gray-800">To Do</h4>
              <p className="text-xs text-gray-500 mt-0.5">{tasks.todo.length} tasks</p>
            </div>
            <CircularProgress 
              progress={totalTasks > 0 ? Math.round((tasks.todo.length / totalTasks) * 100) : 0} 
              color="text-purple-500" 
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-3">
              <h4 className="font-medium text-sm text-gray-800">In Progress</h4>
              <p className="text-xs text-gray-500 mt-0.5">{tasks.inProgress.length} tasks</p>
            </div>
            <CircularProgress 
              progress={totalTasks > 0 ? Math.round((tasks.inProgress.length / totalTasks) * 100) : 0} 
              color="text-blue-500" 
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1 mr-3">
              <h4 className="font-medium text-sm text-gray-800">Completed</h4>
              <p className="text-xs text-gray-500 mt-0.5">{tasks.done.length} tasks</p>
            </div>
            <CircularProgress 
              progress={totalTasks > 0 ? Math.round((tasks.done.length / totalTasks) * 100) : 0} 
              color="text-orange-500" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;