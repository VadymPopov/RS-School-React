import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from '../ThemeProvider';

export default function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
