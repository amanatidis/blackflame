import { Theme } from '../context/ThemeContext';

export const colors = {
  light: {
    primary: '#2196F3',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#000000',
    border: '#E5E5EA',
    notification: '#FF3B30',
    headerBackground: '#2196F3',
    headerText: '#FFFFFF',
    secondaryText: '#666666',
    inputBackground: '#F5F5F5',
    inputBorder: '#E5E5EA',
    success: '#4CAF50',
    error: '#FF3B30',
    warning: '#FFC107',
    info: '#2196F3',
    tagBackground: '#E3F2FD',
    tagText: '#1976D2',
    tagBorder: '#BBDEFB',
  },
  dark: {
    primary: '#2196F3',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    border: '#272729',
    notification: '#FF3B30',
    headerBackground: '#1E1E1E',
    headerText: '#FFFFFF',
    secondaryText: '#A0A0A0',
    inputBackground: '#2C2C2E',
    inputBorder: '#3A3A3C',
    success: '#4CAF50',
    error: '#FF3B30',
    warning: '#FFC107',
    info: '#2196F3',
    tagBackground: '#1A237E',
    tagText: '#64B5F6',
    tagBorder: '#3949AB',
  },
};

export const getThemeColors = (theme: Theme) => colors[theme];

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  header: {
    fontSize: 20,
    fontWeight: '700' as const,
  },
  title: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
}; 