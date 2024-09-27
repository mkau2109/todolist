import React from 'react';
import { Button, Table } from 'react-bootstrap';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Comments</th>
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
              <Button variant="danger" onClick={() => onDelete(task.id)}>
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
