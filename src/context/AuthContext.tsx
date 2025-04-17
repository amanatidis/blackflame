import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleAuthProvider, signInWithCredential, signOut } from '@firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { Platform } from 'react-native';
import { OAUTH_CONFIG, APP_CONFIG } from '../config/config';
import { firebaseAuth, firestore } from '../services/firebaseService';
import { collection, doc, getDoc } from '@firebase/firestore';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';

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
    responseType: 'id_token',
  });

  useEffect(() => {
    let unsubscribe: () => void;

    const initializeAuth = async () => {
      try {
        // Set up Firebase auth listener first
        unsubscribe = firebaseAuth.onAuthStateChanged(async (firebaseUser) => {
          if (firebaseUser) {
            const userData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
            };
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
          } else {
            // If no Firebase user, check AsyncStorage
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            } else {
              setUser(null);
            }
            await AsyncStorage.removeItem('user');
          }
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      handleSignInSuccess(id_token);
    }
  }, [response]);

  const handleSignInSuccess = async (idToken: string) => {
    if (!idToken) return;

    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(firebaseAuth, credential);
      
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error signing in with Firebase:', error);
    }
  };

  const signIn = async () => {
    // try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const response = await GoogleSignin.signIn();
  
    //   // const result = await promptAsync();
  
    //   if (Platform.OS !== 'web') {
    //     await WebBrowser.dismissAuthSession();
    //   }
    // } catch (error) {
    //   console.error('Error signing in:', error);
    //   if (Platform.OS !== 'web') {
    //     await WebBrowser.dismissAuthSession();
      // }
    // }
  };

  const signOut = async () => {
    try {
      await firebaseAuth.signOut();
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

export const checkProductLike = async (userId: string, productId: string) => {
  try {
    const likesCollection = collection(firestore, 'productLikes');
    const likeDocRef = doc(likesCollection, `${userId}_${productId}`);
    const likeDoc = await getDoc(likeDocRef);
    return { success: true, isLiked: likeDoc.exists() };
  } catch (error) {
    console.error('Error checking product like:', error);
    return { success: false, error };
  }
}; 