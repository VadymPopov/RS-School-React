import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from '../ThemeProvider';

export default function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  return context;
}
