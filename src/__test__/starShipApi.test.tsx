import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { starshipApi } from '../redux/swapi';
import { render, waitFor } from '@testing-library/react';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe('starshipApi', () => {
  it('fetches starships list based on search query and page', async () => {
    render(<div />, { wrapper });

    const { dispatch, getState } = store;
    dispatch(
      starshipApi.endpoints.getStarShips.initiate({
        searchQuery: 'Falcon',
        page: '1',
      })
    );

    await waitFor(() => {
      const state = getState();
      expect(
        starshipApi.endpoints.getStarShips.select({
          searchQuery: 'Falcon',
          page: '1',
        })(state).status
      ).toBe('fulfilled');
    });

    const state = getState();
    const data = starshipApi.endpoints.getStarShips.select({
      searchQuery: 'Falcon',
      page: '1',
    })(state).data;

    expect(data?.results[0].name).toBe('Falcon');
  });

  it('fetches starship details based on shipId', async () => {
    render(<div />, { wrapper });

    const { dispatch, getState } = store;
    dispatch(starshipApi.endpoints.getStarShipDetails.initiate('10'));

    await waitFor(() => {
      const state = getState();
      expect(
        starshipApi.endpoints.getStarShipDetails.select('10')(state).status
      ).toBe('fulfilled');
    });

    const state = getState();
    const data =
      starshipApi.endpoints.getStarShipDetails.select('10')(state).data;

    expect(data?.name).toBe('Falcon');
  });
});
