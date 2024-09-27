const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from React frontend running on this port
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type'], // Allowed headers
};

app.use(cors(corsOptions)); // Enable CORS with specific options
app.use(bodyParser.json());

// In-memory array to store tasks
let tasks = [];

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Get a single task by ID
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Create a new task
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: Date.now(), // Unique ID
    assignedTo: req.body.assignedTo,
    status: req.body.status,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    description: req.body.description,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update an existing task
app.put('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  res.json({ message: 'Task deleted' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
