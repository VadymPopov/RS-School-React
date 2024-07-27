import StarWarsView from './views/StarWars';
import Flyout from './components/Flyout';
import ErrorBoundary from './components/ErrorBoundary';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { useAppSelector } from './redux/hooks';

export default function App() {
  const location = useLocation();
  const showSplitScreen = location.pathname.includes('details');
  const selectedItems = useAppSelector(
    (state) => state.starships.selectedItems
  );

  return (
    <ErrorBoundary>
      <div className={showSplitScreen ? 'split-screen' : ''}>
        <div className={showSplitScreen ? 'pane' : ''}>
          <StarWarsView showSplitScreen={showSplitScreen} />
        </div>
        <div className={showSplitScreen ? 'pane' : ''}>
          <Outlet />
        </div>
        {selectedItems.length > 0 && <Flyout items={selectedItems} />}
      </div>
    </ErrorBoundary>
  );
}
