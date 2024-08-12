import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from '../components/Error';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

const fetchBaseQueryError: FetchBaseQueryError = {
  status: 404,
  data: 'Not Found',
};

const serializedError: SerializedError = {
  name: 'SerializedError',
  message: 'An error occurred',
};

describe('Error component', () => {
  it('renders FetchBaseQueryError correctly', () => {
    render(<Error error={fetchBaseQueryError} />);
    expect(screen.getByText('An error has occurred:')).toBeInTheDocument();
    expect(screen.getByText('"Not Found"')).toBeInTheDocument();
  });

  it('renders SerializedError correctly', () => {
    render(<Error error={serializedError} />);
    expect(
      screen.queryByText('An error has occurred:')
    ).not.toBeInTheDocument();
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });
});
