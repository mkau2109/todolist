import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const TaskList = ({ onEdit }) => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend API
  useEffect(() => {
    fetch('http://localhost:5000/api/tasks') // Backend API endpoint
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id)); // Remove task from state
      })
      .catch((err) => console.error('Error deleting task:', err));
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.assignedTo}</td>
            <td>{task.status}</td>
            <td>{task.dueDate}</td>
            <td>{task.priority}</td>
            <td>{task.description}</td>
            <td>
              <Button variant="warning" onClick={() => onEdit(task)}>
                Edit
              </Button>{' '}
              <Button variant="danger" onClick={() => handleDelete(task.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TaskList;
