import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ThemeProvider from '../ThemeProvider';
import { createRemixStub } from '@remix-run/testing';
export const renderWithContext = (element: React.ReactElement) => {
  return render(<Provider store={store}>{element}</Provider>);
};

export const renderWithMemoryProviders = (ui: React.ReactNode) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <ThemeProvider>{ui}</ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
};

export const renderWithProviders = (ui: React.ComponentType, route: string) => {
  const RemixStub = createRemixStub([
    {
      path: route,
      Component: ui,
    },
  ]);

  return render(
    <Provider store={store}>
      <ThemeProvider>
        <RemixStub initialEntries={[route]} />
      </ThemeProvider>
    </Provider>
  );
};
