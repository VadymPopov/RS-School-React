import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShipItem from '../components/ShipItem';
import { StarShip } from '../types';
import { renderWithContext } from '../test-utils/renderWithContext';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToSelected } from '../redux/starShipSlice';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import { usePathname, useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

vi.mock('../redux/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

const mockShip: StarShip = {
  name: 'Falcon',
  model: 'YT-1300 light freighter',
  manufacturer: 'Corellian Engineering Corporation',
  url: 'https://swapi.dev/api/starships/10',
};

const setupMocks = () => {
  const mockPush = vi.fn();
  const dispatch = vi.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  });
  (usePathname as jest.Mock).mockReturnValue('/details/10');
  (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  (useAppSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
    selectorFn({
      starships: {
        items: [mockShip],
        selectedItems: [],
      },
    })
  );
  return { mockPush, dispatch };
};

describe('ShipItem Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupMocks();
  });

  it('renders the relevant card data', () => {
    renderWithContext(<ShipItem {...mockShip} />);

    expect(
      screen.getByRole('heading', { name: /falcon/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Model:/).closest('p')).toHaveTextContent(
      'Model: YT-1300 light freighter'
    );
    expect(screen.getByText(/Manufacturer:/).closest('p')).toHaveTextContent(
      'Manufacturer: Corellian Engineering Corporation'
    );
  });

  it('handles checkbox change', () => {
    const { dispatch } = setupMocks();

    renderWithContext(<ShipItem {...mockShip} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(dispatch).toHaveBeenCalledWith(addToSelected(mockShip));
  });

  it('navigates to the ship details page when the link is clicked', () => {
    renderWithContext(<ShipItem {...mockShip} />);

    const link = screen.getByRole('link', { name: /falcon/i });
    expect(link).toHaveAttribute('href', '/details/10');
  });
});
