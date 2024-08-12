import ThemedDropdown from '../components/ThemedDropdown';
import { screen, render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ThemeProvider, { ThemeContextType } from '../ThemeProvider';
import useTheme from '../hooks/useTheme';

vi.mock('../hooks/useTheme');
const mockUseTheme = useTheme as jest.MockedFunction<() => ThemeContextType>;

const setThemeMock = vi.fn();

const mockDropdown = () => {
  return render(
    <ThemeProvider>
      <ThemedDropdown />
    </ThemeProvider>
  );
};

describe('ThemedDropdown', () => {
  it('renders with correct initial theme', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: setThemeMock,
    });

    mockDropdown();

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('light');
    expect(select).toHaveClass('dropdown light');
    expect(document.body).toHaveClass('light-theme');
  });

  it('changes theme on selection', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: setThemeMock,
    });

    mockDropdown();

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'dark' } });
    expect(setThemeMock).toHaveBeenCalledWith('dark');
  });
});
