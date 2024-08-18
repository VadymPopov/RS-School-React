import ErrorBoundary from './components/ErrorBoundary';
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';

export default function App() {
  return (
    <ErrorBoundary>
      <Navigation />
      <Outlet />
    </ErrorBoundary>
  );
}
