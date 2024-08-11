import { loader } from '../routes/details.$shipId';
import { getStarshipsDetails } from '../api';
import { vi, describe, it, expect } from 'vitest';

vi.mock('../api');

describe('loader', () => {
  it('returns data on success', async () => {
    const mockData = {
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

    (
      getStarshipsDetails as jest.MockedFunction<typeof getStarshipsDetails>
    ).mockResolvedValue(mockData);

    const mockRequest = new Request('http://localhost/details/10');
    const args: LoaderFunctionArgs = {
      request: mockRequest,
      params: { shipId: '10' },
      context: {},
    };

    const response = await loader(args);

    if (response instanceof Response) {
      const result = await response.json();
      expect(result).toEqual(mockData);
      expect(response.status).toBe(200);
    } else {
      throw new Error('Loader did not return a Response object');
    }
  });

  it('returns 500 on error', async () => {
    (
      getStarshipsDetails as jest.MockedFunction<typeof getStarshipsDetails>
    ).mockRejectedValue(new Error('Failed to fetch'));

    const mockRequest = new Request('http://localhost/details/10');
    const args: LoaderFunctionArgs = {
      request: mockRequest,
      params: { shipId: '10' },
      context: {},
    };

    const response = await loader(args);
    if (response instanceof Response) {
      const result = await response.json();
      expect(result).toBeNull();
      expect(response.status).toBe(500);
    } else {
      throw new Error('Loader did not return a Response object');
    }
  });
});

import { screen, waitFor } from '@testing-library/react';
import Details from '../routes/details.$shipId';
import { renderWithContext } from './test-utils';
import { createRemixStub } from '@remix-run/testing';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { StarShipDetails } from '../types';

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

describe('Details component', () => {
  const MockComponent = () => {
    return <Details />;
  };

  const setup = () => {
    const RemixStub = createRemixStub([
      {
        path: '/details/10',
        Component: MockComponent,
        loader() {
          return json(mockDetails);
        },
      },
    ]);

    renderWithContext(<RemixStub initialEntries={['/details/10']} />);
  };

  it('renders ship details correctly', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText(/Millennium Falcon/i)).toBeInTheDocument();
      expect(screen.getByText(/YT-1300 light freighter/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Corellian Engineering Corporation/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/34.37/i)).toBeInTheDocument();
      expect(screen.getByText(/1050/i)).toBeInTheDocument();
      expect(screen.getByText(/6/i)).toBeInTheDocument();
      expect(screen.getByText(/100000/i)).toBeInTheDocument();
    });
  });

  it('handles 500 error correctly', async () => {
    const MockComponent = () => {
      return <Details />;
    };

    const RemixStub = createRemixStub([
      {
        path: '/details/10',
        Component: MockComponent,
        loader() {
          return json(null, { status: 500 });
        },
      },
    ]);

    renderWithContext(<RemixStub initialEntries={['/details/10']} />);
  });
});
