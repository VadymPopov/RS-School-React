import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShipItem from '../components/ShipItem';
import { StarShip } from '../types';
import { renderWithContext } from '../test-utils/renderWithContext';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToSelected } from '../redux/starShipSlice';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import { createMockRouter } from '../test-utils/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
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

describe('ShipItem Component', () => {
  beforeEach(() => {
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(vi.fn());
    (useAppSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        starships: {
          items: [
            {
              name: 'Falcon',
              model: 'YT-1300 light freighter',
              manufacturer: 'Corellian Engineering Corporation',
              url: 'https://swapi.dev/api/starships/10',
            },
          ],
          selectedItems: [],
        },
      })
    );
  });

  it('renders the relevant card data', () => {
    renderWithContext(
      <RouterContext.Provider
        value={createMockRouter({ asPath: '/details/10' })}
      >
        <ShipItem {...mockShip} />
      </RouterContext.Provider>
    );

    const headerName = screen.getByRole('heading', { name: /falcon/i });
    const modelParagraph = screen.getByText(/Model:/).closest('p');
    const manufacturerParagraph = screen
      .getByText(/Manufacturer:/)
      .closest('p');

    expect(headerName).toBeInTheDocument();
    expect(modelParagraph).toHaveTextContent('Model: YT-1300 light freighter');
    expect(manufacturerParagraph).toHaveTextContent(
      'Manufacturer: Corellian Engineering Corporation'
    );
  });

  it('handles checkbox change', () => {
    const dispatch = vi.fn();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatch);

    renderWithContext(
      <RouterContext.Provider
        value={createMockRouter({ asPath: '/details/10' })}
      >
        <ShipItem {...mockShip} />
      </RouterContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(dispatch).toHaveBeenCalledWith(addToSelected(mockShip));
  });

  it('navigates on link click', () => {
    const mockRouter = createMockRouter({
      asPath: '/details/10',
    });

    renderWithContext(
      <RouterContext.Provider value={mockRouter}>
        <ShipItem {...mockShip} />
      </RouterContext.Provider>
    );

    const link = screen.getByRole('link', { name: /falcon/i });
    fireEvent.click(link);

    expect(mockRouter.push).toHaveBeenCalledWith(
      `/details/10`,
      `/details/10`,
      expect.objectContaining({
        locale: undefined,
        scroll: true,
        shallow: undefined,
      })
    );
  });
});
