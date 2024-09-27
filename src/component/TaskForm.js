import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';

const TaskForm = ({ currentTask, onSave, onClose }) => {
  const [task, setTask] = useState({
    assignedTo: '',
    status: 'Not Started',
    dueDate: '',
    priority: 'Normal',
    description: ''
  });

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    }
  }, [currentTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = currentTask ? 'PUT' : 'POST';
    const url = currentTask
      ? `http://localhost:5000/api/tasks/${currentTask.id}`
      : 'http://localhost:5000/api/tasks';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then((res) => res.json())
      .then((data) => {
        onSave(data); // Pass data to parent component
        onClose(); // Close the modal
      })
      .catch((err) => console.error('Error saving task:', err));
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{currentTask ? 'Edit Task' : 'New Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="assignedTo">
                <Form.Label>Assigned To</Form.Label>
                <Form.Control
                  type="text"
                  name="assignedTo"
                  value={task.assignedTo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={task.status}
                  onChange={handleChange}
                >
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="dueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="priority">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                >
                  <option>Low</option>
                  <option>Normal</option>
                  <option>High</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={task.description}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="form-buttons">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TaskForm;
