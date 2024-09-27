import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../component/TaskList';
import { expect } from 'chai';

// Function to generate random task data
const generateTask = () => ({
  id: Math.floor(Math.random() * 1000),
  assignedTo: `User${Math.floor(Math.random() * 1000)}`, // Dynamic user name
  status: ['Not Started', 'In Progress', 'Completed'][Math.floor(Math.random() * 3)],
  dueDate: new Date().toISOString().split('T')[0], // Dynamic current date
  priority: ['Low', 'Normal', 'High'][Math.floor(Math.random() * 3)],
  description: `Task Description ${Math.floor(Math.random() * 1000)}`,
});

describe('<TaskList />', () => {
  it('renders tasks dynamically from user data and handles Edit/Delete actions', () => {
    const tasks = [generateTask()]; // Generate dynamic task data
    
    const onEdit = chai.spy();
    const onDelete = chai.spy();

    render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} />);

    // Verify task row rendering
    expect(screen.getByText(tasks[0].assignedTo)).to.exist;
    expect(screen.getByText(tasks[0].status)).to.exist;
    expect(screen.getByText(tasks[0].description)).to.exist;

    // Test the Edit button action
    fireEvent.click(screen.getByText('Edit'));
    expect(onEdit).to.have.been.called();

    // Test the Delete button action
    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).to.have.been.called();
  });
});
