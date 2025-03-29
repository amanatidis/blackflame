import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin, User as GoogleUser } from '@react-native-google-signin/google-signin';

// Initialize Google Sign-In
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID', // You'll need to replace this with your actual web client ID
});

export const firebaseAuth = {
  // Google Sign-In
  signInWithGoogle: async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices();
      
      // Get the users ID token
      const userInfo = await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();
      
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(null, accessToken);
      
      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // Sign out from both Firebase and Google
  signOut: async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
    } catch (error) {
      throw error;
    }
  },

  // Get current user
  getCurrentUser: () => {
    return auth().currentUser;
  },

  // Listen to auth state changes
  onAuthStateChanged: (callback: (user: FirebaseAuthTypes.User | null) => void) => {
    return auth().onAuthStateChanged(callback);
  },
}; 