import { render, screen, fireEvent } from '@testing-library/react';
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
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  it('disables Previous button on the first page', () => {
    render(<MockPagination pages={3} page={1} />);
    expect(screen.getByText(/Previous/)).toBeDisabled();
  });

  it('disables Next button on the last page', () => {
    render(<MockPagination pages={3} page={3} />);
    expect(screen.getByText(/next/i)).toBeDisabled();
  });
  it('correctly handles page changes', () => {
    render(<MockPagination pages={5} page={1} />);

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous/i })).toBeEnabled();

    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    expect(screen.getByText('Page 5 of 5')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });
});
