import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../components/Pagination';
import { vi } from 'vitest';
import { useSearchParams, useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('Pagination Component', () => {
  const mockPush = vi.fn();

  const setup = (page: string, totalPages: number) => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams(`page=${page}`)
    );
    render(<Pagination totalPages={totalPages} />);
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when totalPages is 1 or less', () => {
    setup('1', 1);
    expect(screen.queryByTestId('pagination')).toBeNull();
  });

  it('renders correctly with totalPages greater than 1', () => {
    setup('2', 3);
    expect(screen.getByText(/Page 2 of 3/)).toBeInTheDocument();
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  it('disables Previous button on the first page', () => {
    setup('1', 3);
    expect(screen.getByText(/Previous/)).toBeDisabled();
    expect(screen.getByText(/next/i)).toBeEnabled();
  });

  it('disables Next button on the last page', () => {
    setup('3', 3);
    expect(screen.getByText(/next/i)).toBeDisabled();
    expect(screen.getByText(/previous/i)).toBeEnabled();
  });

  it('correctly handles page changes', async () => {
    setup('2', 5);

    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('?page=3');
    });

    fireEvent.click(screen.getByRole('button', { name: /previous/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('?page=1');
    });
  });
});
