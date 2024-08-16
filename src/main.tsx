import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import UncontrolledForm from './views/UncontrolledForm.tsx';
import ControlledForm from './views/ControlledForm.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './views/NotFound.tsx';
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';
import Home from './views/Home.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'uncontrolled-form',
        element: <UncontrolledForm />,
      },
      {
        path: 'controlled-form',
        element: <ControlledForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
