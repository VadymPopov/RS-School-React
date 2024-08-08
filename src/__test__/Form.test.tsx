import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from '../components/Form';
import { FormProps } from '../components/Form';

const onSubmit = vi.fn((e) => e.preventDefault());
const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

const MockForm = ({ onSubmit }: FormProps) => {
  return <Form onSubmit={onSubmit} />;
};

describe('Form Component', async () => {
  beforeEach(() => {
    getItemSpy.mockImplementation((key) => {
      if (key === 'searchQuery') {
        return 'savedStarShip';
      }
      return null;
    });
  });

  afterEach(() => {
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
  });

  it('clicking the Search button saves the entered value to the local storage', () => {
    render(<MockForm onSubmit={onSubmit} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const btn = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'starShip' } });
    fireEvent.click(btn);

    expect(input.value).toBe('starShip');
    expect(onSubmit).toHaveBeenCalled();
  });

  it('retrieves the value from the local storage upon mounting', () => {
    render(<MockForm onSubmit={onSubmit} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input.value).toBe('savedStarShip');
    expect(getItemSpy).toHaveBeenCalledWith('searchQuery');
  });
});
