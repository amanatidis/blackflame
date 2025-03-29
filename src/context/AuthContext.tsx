import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { Platform } from 'react-native';
import { OAUTH_CONFIG, APP_CONFIG } from '../config/config';


WebBrowser.maybeCompleteAuthSession();


interface AuthContextType {
  user: any | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const redirectUri = makeRedirectUri({
    scheme: APP_CONFIG.scheme,
    path: 'oauth2redirect'
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: OAUTH_CONFIG.google.clientId,
    iosClientId: OAUTH_CONFIG.google.iosClientId,
    androidClientId: OAUTH_CONFIG.google.androidClientId,
    redirectUri,
    scopes: ['profile', 'email'],
    responseType: 'token',
  });

  useEffect(() => {
    loadStoredUser();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      handleSignInSuccess(response.authentication?.accessToken);
    }
  }, [response]);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInSuccess = async (accessToken: string | undefined) => {
    if (!accessToken) return;

    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userData = await response.json();
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const signIn = async () => {
    try {
      const result = await promptAsync();
      if (result?.type === 'success') {
        await handleSignInSuccess(result.authentication?.accessToken);
        // Ensure the WebBrowser session is completed
        if (Platform.OS !== 'web') {
          await WebBrowser.dismissAuthSession();
        }
      }
    } catch (error) {
      console.error('Error signing in:', error);
      // Ensure the WebBrowser session is dismissed even if there's an error
      if (Platform.OS !== 'web') {
        await WebBrowser.dismissAuthSession();
      }
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 