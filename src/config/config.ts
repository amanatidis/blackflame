import { Platform } from 'react-native';

// App configuration
export const APP_CONFIG = {
  name: 'Sunlight',
  scheme: Platform.select({
    web: 'http://127.0.0.1:8081',
    default: 'myapp'
  }),
  version: '1.0.0',
};

// OAuth configuration
export const OAUTH_CONFIG = {
  google: {
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || '',
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '',
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || '',
  },
};

// API configuration
export const API_CONFIG = {
  baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://127.0.0.1:3000',
  timeout: 10000, // 10 seconds
};

// Feature flags
export const FEATURE_FLAGS = {
  enableAnalytics: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS === 'true',
  enableCrashReporting: process.env.EXPO_PUBLIC_ENABLE_CRASH_REPORTING === 'true',
}; 