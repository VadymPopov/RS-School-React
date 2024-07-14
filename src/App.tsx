import StarWarsView from './views/StarWars';
import ErrorBoundary from './components/ErrorBoundary';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';

export default function App() {
  const location = useLocation();
  const showSplitScreen = location.pathname.includes('details');

  return (
    <ErrorBoundary>
      <div className={showSplitScreen ? 'split-screen' : ''}>
        <div className={showSplitScreen ? 'pane' : ''}>
          <StarWarsView showSplitScreen={showSplitScreen} />
        </div>
        <div className={showSplitScreen ? 'pane' : ''}>
          <Outlet />
        </div>
      </div>
    </ErrorBoundary>
  );
}
