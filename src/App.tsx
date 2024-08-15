import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <div>Main</div>
    </ErrorBoundary>
  );
}
