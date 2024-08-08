import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../components/Pagination';
import { useRouter } from 'next/router';
import { vi } from 'vitest';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Pagination Component', () => {
  const mockReplace = vi.fn();
  const useRouterMock = {
    query: {},
    replace: mockReplace,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(useRouterMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when totalPages is 1 or less', () => {
    useRouterMock.query = { page: '1' };
    render(<Pagination totalPages={1} />);
    expect(screen.queryByTestId('pagination')).toBeNull();
  });

  it('renders correctly with totalPages greater than 1', () => {
    useRouterMock.query = { page: '2' };
    render(<Pagination totalPages={3} />);
    expect(screen.getByText(/Page 2 of 3/)).toBeInTheDocument();
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  it('disables Previous button on the first page', () => {
    useRouterMock.query = { page: '1' };
    render(<Pagination totalPages={3} />);
    expect(screen.getByText(/Previous/)).toBeDisabled();
    expect(screen.getByText(/next/i)).toBeEnabled();
  });

  it('disables Next button on the last page', () => {
    useRouterMock.query = { page: '3' };
    render(<Pagination totalPages={3} />);
    expect(screen.getByText(/next/i)).toBeDisabled();
    expect(screen.getByText(/previous/i)).toBeEnabled();
  });

  it('correctly handles page changes', async () => {
    useRouterMock.query = { page: '2' };
    render(<Pagination totalPages={5} />);

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith({
        pathname: '/',
        query: { page: 3 },
      });
    });

    fireEvent.click(screen.getByRole('button', { name: /previous/i }));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith({
        pathname: '/',
        query: { page: 1 },
      });
    });
  });
});
