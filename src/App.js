import React, { useState, useEffect } from 'react';
import './App.css';
import { taskService } from './services/taskService';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch, FaSyncAlt } from 'react-icons/fa';
import TaskList from './component/TaskList';
import Pagination from './component/Pagination';
import TaskForm from './component/TaskForm';
import DeleteModal from './component/DeleteModal'; // Import DeleteModal
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Track delete modal visibility
  const [taskToDelete, setTaskToDelete] = useState(null); // Track task to be deleted

  useEffect(() => {
    const loadedTasks = taskService.getTasks();
    if (loadedTasks) {
      setTasks(loadedTasks);
    }
  }, []);

  const handleSaveTask = (task) => {
    taskService.saveTask(task);
    setTasks(taskService.getTasks());
    setShowFormModal(false);
    setCurrentTask(null);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowFormModal(true);
  };

  const handleDeleteTask = (id) => {
    setTaskToDelete(id); // Set the task to be deleted
    setShowDeleteModal(true); // Show delete confirmation modal
  };

  const confirmDeleteTask = () => {
    taskService.deleteTask(taskToDelete);
    setTasks(taskService.getTasks());
    setShowDeleteModal(false); // Close modal after deletion
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks
    .filter((task) =>
      task.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="header">
        <h2>Task</h2>
        <div className="actions">
          <Button 
            variant="primary" 
            className="button-small" 
            onClick={() => setShowFormModal(true)}
          >
            New Task
          </Button>
          <Button 
            variant="light" 
            className="refresh-button button-small" 
            onClick={() => setTasks(taskService.getTasks())}
          >
            <FaSyncAlt /> Refresh
          </Button>
        </div>
      </div>

      {/* Add small margin-top and center the search bar */}
      <div className="search-bar mt-3">
        <InputGroup className="mb-3" style={{ maxWidth: '300px' }}>
          <FormControl
            placeholder="Search by Assigned To"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button variant="outline-secondary">
            <FaSearch />
          </Button>
        </InputGroup>
      </div>

      <p>{tasks.length} {tasks.length === 1 ? 'Task' : 'records'}</p>

      <TaskList
        tasks={currentTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask} // Call handleDeleteTask when delete button is clicked
      />

      <Pagination
        tasksPerPage={tasksPerPage}
        totalTasks={tasks.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {showFormModal && (
        <TaskForm
          currentTask={currentTask}
          onSave={handleSaveTask}
          onClose={() => setShowFormModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          onDeleteConfirm={confirmDeleteTask} // Call confirmDeleteTask when delete is confirmed
        />
      )}
      
    </div>
  );
}

export default App;
