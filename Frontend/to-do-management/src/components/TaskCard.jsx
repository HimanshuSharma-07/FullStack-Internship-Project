import React, { useState } from 'react';
import { MoreVertical, Calendar, MessageCircle, Link, Edit2, Trash2, MoveRight, CheckSquare } from 'lucide-react';
import { useTodo } from '../contexts/TodoContext.jsx';

const TaskCard = ({ task, column }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { deleteTask, moveTask, updateProgress, openEditModal } = useTodo();

  return (
    <div className="bg-white rounded-lg p-4 mb-3 border border-gray-200 hover:shadow-md transition-shadow relative">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 text-sm">{task.title}</h4>
          <p className="text-xs text-gray-500 mt-1">{task.subtitle}</p>
        </div>
        <div className="relative">
          <button 
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreVertical size={16} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <button
                onClick={() => {
                  openEditModal(task, column);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 rounded-t-lg"
              >
                <Edit2 size={14} />
                Edit
              </button>
              {column !== 'inProgress' && (
                <button
                  onClick={() => {
                    moveTask(task, column, 'inProgress');
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <MoveRight size={14} />
                  Move to Progress
                </button>
              )}
              {column !== 'done' && (
                <button
                  onClick={() => {
                    moveTask(task, column, 'done');
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <CheckSquare size={14} />
                  Mark as Done
                </button>
              )}
              <button
                onClick={() => {
                  deleteTask(column, task.id);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600 rounded-b-lg"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-600">Progress {task.progress}%</span>
          <input
            type="range"
            min="0"
            max="100"
            value={task.progress}
            onChange={(e) => updateProgress(column, task.id, parseInt(e.target.value))}
            className="w-20 h-1 cursor-pointer"
          />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div className={`${task.color} h-1.5 rounded-full transition-all`} style={{ width: `${task.progress}%` }}></div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          <Calendar size={12} />
          <span>{task.date}</span>
        </div>
        <div className="flex gap-3 text-gray-500">
          <button className="flex items-center gap-1 text-xs hover:text-gray-700">
            <MessageCircle size={14} />
            <span>{task.comments}</span>
          </button>
          <button className="flex items-center gap-1 text-xs hover:text-gray-700">
            <Link size={14} />
            <span>{task.links}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;