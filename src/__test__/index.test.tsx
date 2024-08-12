import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/page';
import { useAppSelector } from '../redux/hooks';
import { vi } from 'vitest';
import { renderWithContext } from '../test-utils/renderWithContext';
import { useSearchParams, usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('../redux/hooks', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

const mockUseSearchParams = () => {
  (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('page=1'));
};

const setup = (path: string) => {
  (usePathname as jest.Mock).mockReturnValue(path);
  (useAppSelector as unknown as jest.Mock).mockReturnValue([]);
};

describe('Home Component', () => {
  beforeEach(mockUseSearchParams);

  it('renders without split-screen layout on the root pathname', () => {
    setup('/');

    const { container } = renderWithContext(
      <Home>
        <div>Child Component</div>
      </Home>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
    expect(container.querySelector('.split-screen')).not.toBeInTheDocument();
  });

  it('renders with split-screen layout on non-root pathname', () => {
    setup('/details/10');
    const { container } = renderWithContext(
      <Home>
        <div>Child Component</div>
      </Home>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
    expect(container.querySelector('.split-screen')).toBeInTheDocument();
  });

  it('renders Flyout component when there are selected items', () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue([
      { name: 'Falcon' },
    ]);

    renderWithContext(
      <Home>
        <div>Child Component</div>
      </Home>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
    expect(screen.getByText('1 item is selected')).toBeInTheDocument();
  });

  it('does not render Flyout component when there are no selected items', () => {
    setup('/');

    renderWithContext(
      <Home>
        <div>Child Component</div>
      </Home>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
    expect(screen.queryByText('1 item is selected')).not.toBeInTheDocument();
  });
});
