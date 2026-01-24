import React from 'react';
import { Plus } from 'lucide-react';
import { useTodo } from '../contexts/TodoContext.jsx';
import  TaskCard  from '../components/TaskCard.jsx';

const KanbanColumn = ({ column, title }) => {
  const { filteredTasks, setShowAddModal, setCurrentColumn, setEditingTask } = useTodo();

  const handleAddTask = () => {
    setCurrentColumn(column);
    setShowAddModal(true);
    setEditingTask(null);
  };

  const tasks = filteredTasks(column);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">{title} ({tasks.length})</h3>
        <button 
          onClick={handleAddTask}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Plus size={18} className="text-gray-600" />
        </button>
      </div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} column={column} />
      ))}
    </div>
  );
};

export default KanbanColumn;