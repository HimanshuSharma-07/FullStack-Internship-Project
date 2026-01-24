import { TodoProvider, useTodo } from './contexts/TodoContext.jsx';
import  LeftSidebar  from './components/LeftSideBar';
import  TopBar  from './components/Topbar';
import  KanbanColumn  from './components/KanbanColumn';
import  RightSidebar  from './components/RightSidebar';
import  TaskModal  from './components/TaskModal';


function AppContent() {
  const { leftSidebarOpen, rightSidebarOpen, setLeftSidebarOpen, setRightSidebarOpen } = useTodo();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <TaskModal />

      {/* Mobile Overlay */}
      {(leftSidebarOpen || rightSidebarOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => {
            setLeftSidebarOpen(false);
            setRightSidebarOpen(false);
          }}
        />
      )}

      <LeftSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        {/* Kanban Board */}
        <div className="flex-1 overflow-auto p-3 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            <KanbanColumn column="todo" title="To do List" />
            <KanbanColumn column="inProgress" title="In Progress" />
            <KanbanColumn column="done" title="Done" />
          </div>
        </div>
      </div>

      <RightSidebar />
    </div>
  );
}

export default AppContent;