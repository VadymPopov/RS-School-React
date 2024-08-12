import { describe, it, expect } from 'vitest';
import { loader } from '../routes/$';
import NotFound from '../routes/$';
import { useRouteError, isRouteErrorResponse } from '@remix-run/react';
import { render } from '@testing-library/react';

describe('NotFound loader', () => {
  it('should return a 404 status with a message', async () => {
    const result = await loader();

    const expectedResponse = {
      status: 404,
      headers: result.headers,
      data: { message: 'Page Not Found' },
    };

    expect(result.status).toBe(expectedResponse.status);
    expect(result.headers.get('Content-Type')).toBe(
      'application/json; charset=utf-8'
    );

    const resultData = await result.json();
    expect(resultData).toEqual(expectedResponse.data);
  });
});

vi.mock('@remix-run/react');

describe('NotFound component', () => {
  it('should render the default 404 message when no error is provided', () => {
    vi.mocked(useRouteError).mockReturnValue(null);
    vi.mocked(isRouteErrorResponse).mockReturnValue(false);

    const { getByText } = render(<NotFound />);

    expect(getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(
      getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
  });

  it('should render the error message when a route error occurs', () => {
    const mockError = {
      status: 404,
      statusText: 'Not Found',
      data: { message: 'Custom Not Found Message' },
    };
    vi.mocked(useRouteError).mockReturnValue(mockError);
    vi.mocked(isRouteErrorResponse).mockReturnValue(true);

    const { getByText } = render(<NotFound />);

    expect(getByText('404 - Not Found')).toBeInTheDocument();
    expect(getByText('Custom Not Found Message')).toBeInTheDocument();
  });

  it('should render the fallback message when error data is missing', () => {
    const mockError = {
      status: 404,
      statusText: 'Not Found',
      data: {},
    };
    vi.mocked(useRouteError).mockReturnValue(mockError);
    vi.mocked(isRouteErrorResponse).mockReturnValue(true);

    const { getByText } = render(<NotFound />);

    expect(getByText('404 - Not Found')).toBeInTheDocument();
    expect(
      getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
  });
});
