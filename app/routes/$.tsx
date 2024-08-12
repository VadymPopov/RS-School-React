import { json } from '@remix-run/node';
import { useRouteError, isRouteErrorResponse } from '@remix-run/react';

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  return json({ message: 'Page Not Found' }, { status: 404 });
};

export default function NotFound() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} - {error.statusText}
        </h1>
        <p>
          {error.data.message || 'The page you are looking for does not exist.'}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
