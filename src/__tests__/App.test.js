import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect } from 'chai';
import App from '../App';

// Function to generate random user and task data
const generateRandomTaskData = () => ({
  assignedTo: `User${Math.floor(Math.random() * 1000)}`, // Dynamic user name
  description: `Task Description ${Math.floor(Math.random() * 1000)}`,
});

describe('<App />', () => {
  it('renders the app, allows task creation and search', () => {
    render(<App />);

    // Test if app header is rendered
    expect(screen.getByText('Task')).to.exist;

    // Test New Task button functionality
    fireEvent.click(screen.getByText('New Task'));

    // Generate dynamic task data
    const { assignedTo, description } = generateRandomTaskData();

    // Simulate filling out the form with dynamic data
    fireEvent.change(screen.getByLabelText('Assigned To'), { target: { value: assignedTo } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: description } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Save'));

    // Verify the task is added and displayed in the task list
    expect(screen.getByText(assignedTo)).to.exist;
    expect(screen.getByText(description)).to.exist;

    // Test search functionality
    const searchInput = screen.getByPlaceholderText('Search by Assigned To');
    fireEvent.change(searchInput, { target: { value: assignedTo } });

    // Verify that only the searched task is displayed
    expect(screen.getByText(assignedTo)).to.exist;
  });

  it('allows editing and deleting tasks', () => {
    render(<App />);

    // Generate dynamic task data and add a new task
    fireEvent.click(screen.getByText('New Task'));
    const { assignedTo, description } = generateRandomTaskData();
    fireEvent.change(screen.getByLabelText('Assigned To'), { target: { value: assignedTo } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: description } });
    fireEvent.click(screen.getByText('Save'));

    // Verify the task was added
    expect(screen.getByText(assignedTo)).to.exist;

    // Simulate clicking the Edit button for the task
    fireEvent.click(screen.getByText('Edit'));

    // Update task description
    const newDescription = `Updated ${description}`;
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: newDescription } });
    fireEvent.click(screen.getByText('Save'));

    // Verify the task description is updated
    expect(screen.getByText(newDescription)).to.exist;

    // Simulate clicking the Delete button
    fireEvent.click(screen.getByText('Delete'));

    // Verify the task is removed from the list
    expect(screen.queryByText(assignedTo)).to.not.exist;
  });
});
