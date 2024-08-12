import ErrorBoundary from '../components/ErrorBoundary';
import StarWarsView from '../components/StarWars';
import Flyout from '../components/Flyout';
import { useRouter } from 'next/router';
import { useAppSelector } from '../redux/hooks';

export default function Home({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { pathname } = router;
  const showSplitScreen = pathname !== '/';

  const selectedItems = useAppSelector(
    (state) => state.starships.selectedItems
  );

  return (
    <ErrorBoundary>
      <div className={showSplitScreen ? 'split-screen' : ''}>
        <div className={showSplitScreen ? 'pane' : ''}>
          <StarWarsView showSplitScreen={showSplitScreen} />
        </div>
        <div className={showSplitScreen ? 'pane' : ''}>{children}</div>
        {selectedItems.length > 0 && <Flyout items={selectedItems} />}
      </div>
    </ErrorBoundary>
  );
}
