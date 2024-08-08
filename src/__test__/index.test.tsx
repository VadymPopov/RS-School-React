import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages';
import { useAppSelector } from '../redux/hooks';
import { vi } from 'vitest';
import { renderWithContext } from '../test-utils/renderWithContext';
import { createMockRouter } from '../test-utils/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

vi.mock('../redux/hooks', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without split-screen layout on the root pathname', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue([]);

    const { container } = renderWithContext(
      <RouterContext.Provider value={createMockRouter({})}>
        <Home>
          <div>Child Component</div>
        </Home>
      </RouterContext.Provider>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
    expect(container.querySelector('.split-screen')).not.toBeInTheDocument();
  });

  it('renders with split-screen layout on non-root pathname', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue([]);

    const { container } = renderWithContext(
      <RouterContext.Provider
        value={createMockRouter({ pathname: '/details/10' })}
      >
        <Home>
          <div>Child Component</div>
        </Home>
      </RouterContext.Provider>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
    expect(container.querySelector('.split-screen')).toBeInTheDocument();
  });

  it('renders Flyout component when there are selected items', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue([
      { name: 'Falcon' },
    ]);

    renderWithContext(
      <RouterContext.Provider value={createMockRouter({ pathname: '/' })}>
        <Home>
          <div>Child Component</div>
        </Home>
      </RouterContext.Provider>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
    expect(screen.getByText('1 item is selected')).toBeInTheDocument();
  });

  it('does not render Flyout component when there are no selected items', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue([]);

    renderWithContext(
      <RouterContext.Provider value={createMockRouter({ pathname: '/' })}>
        <Home>
          <div>Child Component</div>
        </Home>
      </RouterContext.Provider>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
    expect(screen.queryByText('1 item is selected')).not.toBeInTheDocument();
  });
});
