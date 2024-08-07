import { ThemeToggleContext } from '@/providers/Theme';
import { useContext } from 'react';

// Custom hook to use the ThemeToggleContext
export const useThemeToggle = () => useContext(ThemeToggleContext);
