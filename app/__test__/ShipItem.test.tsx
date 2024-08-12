import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShipItem from '../components/ShipItem';
import { StarShip, StarShipDetails } from '../types';
import ShipDetails from '../components/ShipDetails';
import {
  createMemoryRouter,
  RouterProvider,
  RouteObject,
} from 'react-router-dom';
import { renderWithContext } from './test-utils';

const mockShip: StarShip = {
  name: 'Falcon',
  model: 'YT-1300 light freighter',
  manufacturer: 'Corellian Engineering Corporation',
  url: 'https://swapi.dev/api/starships/10',
};

const mockDetails: StarShipDetails = {
  name: 'Millennium Falcon',
  model: 'YT-1300 light freighter',
  manufacturer: 'Corellian Engineering Corporation',
  length: '34.37',
  max_atmosphering_speed: '1050',
  crew: '4',
  passengers: '6',
  created: '2014-12-10T16:59:45.094000Z',
  cost_in_credits: '100000',
};

const renderWithRouter = (routes: RouteObject[], initialEntries = ['/']) => {
  const router = createMemoryRouter(routes, { initialEntries });
  return renderWithContext(<RouterProvider router={router} />);
};

const routes = [
  {
    path: '/',
    element: <ShipItem {...mockShip} />,
  },
  {
    path: 'details/:shipId',
    element: <ShipDetails data={mockDetails} />,
  },
];

describe('ShipItem Component', () => {
  it('renders the relevant card data', async () => {
    renderWithRouter(routes);
    const headerName = screen.getByRole('heading');
    const strongModelElement = screen.getByText('Model:');
    const modelParagraph = strongModelElement.closest('p');
    const strongManufacturerElement = screen.getByText('Manufacturer:');
    const manufacturerParagraph = strongManufacturerElement.closest('p');
    expect(modelParagraph).toBeInTheDocument();
    expect(modelParagraph).toHaveTextContent('Model: YT-1300 light freighter');
    expect(manufacturerParagraph).toBeInTheDocument();
    expect(manufacturerParagraph).toHaveTextContent(
      'Manufacturer: Corellian Engineering Corporation'
    );
    expect(headerName.textContent).toBe('Falcon');
  });

  it('clicking on a card navigates to the detailed card component', async () => {
    renderWithRouter(routes);

    fireEvent.click(screen.getByRole('heading', { name: /Falcon/i }));
    await waitFor(() => {
      expect(screen.getByTestId('details')).toBeInTheDocument();
    });
  });
});

describe('ShipDetails', () => {
  it('detailed card component correctly displays the detailed card data', async () => {
    renderWithRouter(routes);

    fireEvent.click(screen.getByRole('heading', { name: /Falcon/i }));

    await waitFor(() => {
      expect(screen.getByText(/Falcon/)).toBeInTheDocument();
      expect(screen.getByText(/YT-1300 light freighter/)).toBeInTheDocument();
      expect(
        screen.getByText(/Corellian Engineering Corporation/)
      ).toBeInTheDocument();
      expect(screen.getByText(/6/)).toBeInTheDocument();
      expect(screen.getByText(/2014-12-10/)).toBeInTheDocument();
      expect(screen.getByText(/1050/)).toBeInTheDocument();
      expect(screen.getByText(/34.37/)).toBeInTheDocument();
      expect(screen.getByText(/Crew:/)).toBeInTheDocument();
      expect(screen.getByText(/100000/)).toBeInTheDocument();
    });
  });

  it('clicking the close button hides the component', async () => {
    renderWithRouter(routes);

    fireEvent.click(screen.getByRole('heading', { name: /Falcon/i }));

    const btn = screen.findByRole('button', { name: /Close/i });
    const details = await screen.findByTestId('details');

    fireEvent.click(await btn);
    await waitFor(() => {
      expect(details).not.toBeInTheDocument();
    });
  });
});
