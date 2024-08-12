import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { render } from '@testing-library/react';

export const renderWithContext = (element: React.ReactElement) => {
  return render(<Provider store={store}>{element}</Provider>);
};
