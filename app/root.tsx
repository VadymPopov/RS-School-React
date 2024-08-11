import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import appStylesHref from './index.css?url';

import ThemeProvider from './ThemeProvider.tsx';
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';

import { useLocation } from '@remix-run/react';
import StarWarsView from './views/StarWars';
import Flyout from './components/Flyout';
import ErrorBoundary from './components/ErrorBoundary';
import { useAppSelector } from './redux/hooks';

// eslint-disable-next-line react-refresh/only-export-components
export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: appStylesHref },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <Meta />
            <Links />
          </head>

          <body>
            <ErrorBoundary>{children}</ErrorBoundary>
            <ScrollRestoration />
            <Scripts />
          </body>
        </html>
      </ThemeProvider>
    </Provider>
  );
}

import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { getStarships } from './api/index.ts';
import { useLoaderData } from '@remix-run/react';
import { StarShipsData } from './types/index.ts';

// eslint-disable-next-line react-refresh/only-export-components
export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const searchQuery = url.searchParams.get('search');
    const data = await getStarships(searchQuery, page);
    return json(data);
  } catch (error) {
    return json(null, { status: 500 });
  }
};

export default function App() {
  const location = useLocation();
  const showSplitScreen = location.pathname.includes('details');
  const selectedItems = useAppSelector(
    (state) => state.starships.selectedItems
  );
  const data = useLoaderData<StarShipsData>();

  return (
    <div className={showSplitScreen ? 'split-screen' : ''}>
      <div className={showSplitScreen ? 'pane' : ''}>
        <StarWarsView showSplitScreen={showSplitScreen} data={data} />
      </div>
      <div className={showSplitScreen ? 'pane' : ''}>
        <Outlet />
      </div>
      {selectedItems.length > 0 && <Flyout items={selectedItems} />}
    </div>
  );
}
