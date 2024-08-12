import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../root';
import ErrorBoundary from '../components/ErrorBoundary';
import { addToSelected } from '../redux/starShipSlice';
import { renderWithMemoryProviders, renderWithProviders } from './test-utils';
import { store } from '../redux/store';

vi.mock('../views/StarWars', () => ({
  default: () => <div>StarWarsView Mock</div>,
}));

vi.mock('../components/Flyout', () => ({
  default: () => <div>Flyout Mock</div>,
}));

describe('App Component', () => {
  it('renders correctly with the split-screen layout', () => {
    renderWithProviders(App, '/details');

    expect(screen.getByText('StarWarsView Mock')).toBeInTheDocument();
    expect(screen.getByText('StarWarsView Mock').parentElement).toHaveClass(
      'pane'
    );
  });

  it('renders the Flyout component when items are selected', () => {
    store.dispatch(
      addToSelected({
        name: 'item1',
        model: 'Model 1',
        manufacturer: 'manu 1',
        url: 'url.com',
      })
    );

    renderWithProviders(App, '/');

    expect(screen.getByText('Flyout Mock')).toBeInTheDocument();
  });

  it('handles ErrorBoundary', () => {
    const BrokenComponent = () => {
      throw new Error('Test Error');
    };

    renderWithMemoryProviders(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>,
      '/'
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
