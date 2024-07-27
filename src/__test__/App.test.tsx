import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../App';
import { store } from '../redux/store';
import ErrorBoundary from '../components/ErrorBoundary';

describe('App Component', () => {
  const renderWithProviders = (ui: JSX.Element) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  it('renders StarWarsView', () => {
    renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('shows split-screen layout when pathname includes "details"', () => {
    const { container } = renderWithProviders(
      <MemoryRouter initialEntries={['/details']}>
        <App />
      </MemoryRouter>
    );
    expect(container.querySelector('.split-screen')).toBeInTheDocument();
    expect(container.querySelector('.pane')).toBeInTheDocument();
  });

  it('does not show Flyout if selectedItems is empty', () => {
    const { container } = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(container.querySelector('.flyout')).not.toBeInTheDocument();
  });

  it('handles ErrorBoundary', () => {
    const BrokenComponent = () => {
      throw new Error('Test Error');
    };

    renderWithProviders(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
