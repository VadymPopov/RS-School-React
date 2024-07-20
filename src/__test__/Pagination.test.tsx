import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../components/Pagination';
import { MemoryRouter } from 'react-router-dom';

const MockPagination = ({ pages, page }: { pages: number; page: number }) => {
  return (
    <MemoryRouter initialEntries={[`/?page=${page}`]}>
      <Pagination totalPages={pages} />
    </MemoryRouter>
  );
};

describe('Pagination Component', () => {
  it('does not render when totalPages is 1 or less', () => {
    render(<MockPagination pages={1} page={1} />);
    expect(screen.queryByText(/Page/)).toBeNull();
  });

  it('renders correctly with totalPages greater than 1', () => {
    render(<MockPagination pages={3} page={2} />);
    expect(screen.getByText(/Page 2 of 3/)).toBeInTheDocument();
    expect(screen.getByText(/Previous/)).toBeInTheDocument();
    expect(screen.getByText(/Next/)).toBeInTheDocument();
  });

  it('disables Previous button on the first page', () => {
    render(<MockPagination pages={3} page={1} />);
    expect(screen.getByText(/Previous/)).toBeDisabled();
  });

  it('disables Next button on the last page', () => {
    render(<MockPagination pages={3} page={3} />);
    expect(screen.getByText(/Next/)).toBeDisabled();
  });
});
