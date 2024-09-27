import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../component/TaskForm';
import { expect } from 'chai';

// Function to generate random form data
const generateTaskData = () => ({
  assignedTo: `User${Math.floor(Math.random() * 1000)}`, // Dynamic user name
  description: `Task Description ${Math.floor(Math.random() * 1000)}`,
});

describe('<TaskForm />', () => {
  it('renders the form and handles form submission with dynamic user data', () => {
    const onSave = chai.spy();
    const onClose = chai.spy();

    render(<TaskForm currentTask={null} onSave={onSave} onClose={onClose} />);

    const { assignedTo, description } = generateTaskData();

    // Simulate user input
    fireEvent.change(screen.getByLabelText('Assigned To'), { target: { value: assignedTo } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: description } });

    // Submit the form
    fireEvent.click(screen.getByText('Save'));

    // Check that onSave has been called with dynamic input
    expect(onSave).to.have.been.called();
  });

  it('closes the form when cancel button is clicked', () => {
    const onClose = chai.spy();
    
    render(<TaskForm currentTask={null} onSave={() => {}} onClose={onClose} />);
    
    // Simulate close action
    fireEvent.click(screen.getByText('Cancel'));
    
    // Expect close callback to be triggered
    expect(onClose).to.have.been.called();
  });
});
