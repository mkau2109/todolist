import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../component/Pagination';
import { expect } from 'chai';

// Random task number generator
const generateTotalTasks = () => Math.floor(Math.random() * 50) + 10; // Generate random tasks between 10 and 50

describe('<Pagination />', () => {
  it('renders pagination controls and handles navigation', () => {
    const paginate = chai.spy();
    const tasksPerPage = 5;
    const totalTasks = generateTotalTasks(); // Dynamically generate total number of tasks
    const currentPage = 1;

    render(<Pagination tasksPerPage={tasksPerPage} totalTasks={totalTasks} paginate={paginate} currentPage={currentPage} />);

    // Test pagination buttons are rendered dynamically
    const totalPages = Math.ceil(totalTasks / tasksPerPage);
    expect(screen.getByText(`${totalPages}`)).to.exist;

    // Test next button action
    fireEvent.click(screen.getByText('Next'));
    expect(paginate).to.have.been.called.with(2);

    // Test last button action
    fireEvent.click(screen.getByText('Last'));
    expect(paginate).to.have.been.called.with(totalPages);
  });
});
