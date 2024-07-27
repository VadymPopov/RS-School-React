import NotFound from '../views/NotFound';
import { render, screen } from '@testing-library/react';
import {
  createMemoryRouter,
  RouterProvider,
  useRouteError,
} from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useRouteError: vi.fn(),
  };
});

describe('NotFound', () => {
  it('displays the error message from useRouteError', () => {
    (useRouteError as jest.Mock).mockReturnValue({
      statusText: 'Not Found',
      message: 'This is a custom error message',
    });

    const router = createMemoryRouter(
      [{ path: '/', element: <NotFound />, errorElement: <NotFound /> }],
      { initialEntries: ['/'] }
    );

    render(<RouterProvider router={router} />);
    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(
      screen.getByText('Sorry, an unexpected error has occurred.')
    ).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('displays the error message when the status is missing', () => {
    (useRouteError as jest.Mock).mockReturnValue({
      message: 'This is a custom error message',
    });

    const router = createMemoryRouter(
      [{ path: '/', element: <NotFound />, errorElement: <NotFound /> }],
      { initialEntries: ['/'] }
    );

    render(<RouterProvider router={router} />);
    expect(
      screen.getByText('This is a custom error message')
    ).toBeInTheDocument();
  });
});
