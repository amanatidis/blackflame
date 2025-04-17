import { FirebaseApp, initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

const firebaseConfigWeb = {
  apiKey: 'AIzaSyDEetzmxSjDYiqkaHP1DGyd26URCAXCrHw',
  authDomain: 'pension-ex-1f88c.firebaseapp.com',
  projectId: 'pension-ex-1f88c',
  storageBucket: 'pension-ex-1f88c.appspot.com',
  messagingSenderId: '770629654208',
  appId: '1:770629654208:web:3a2d2d868f5635b01cbf25',
  measurementId: 'G-28JVCRBNRH'
};


const firebaseConfigAndroid = {
  apiKey: 'AIzaSyBNoHNR9AWHgTDLQZvXE33wtPC6D7QTz2Y',
  appId: '1:770629654208:android:5fa2f14a332eb60e1cbf25',
  messagingSenderId: '770629654208',
  projectId: 'pension-ex-1f88c',
  storageBucket: 'pension-ex-1f88c.appspot.com',
};

const firebaseConfigIos = {
  apiKey: 'AIzaSyD1N9NCkHUcroA0mPzAFeY5kYH2WmRsFas',
  appId: '1:770629654208:ios:0c36f1f14a893f7e1cbf25',
  messagingSenderId: '770629654208',
  projectId: 'pension-ex-1f88c',
  storageBucket: 'pension-ex-1f88c.appspot.com',
  iosBundleId: 'com.example.consumer',
};

let firebaseConfig;
if (Platform.OS === 'android') {
  firebaseConfig = firebaseConfigAndroid;
} else if (Platform.OS === 'ios') {
  firebaseConfig = firebaseConfigIos;
} else {
  firebaseConfig = firebaseConfigWeb;
}

const getAuth = (app: FirebaseApp) => {
    return initializeAuth(app);
}

export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firestore = getFirestore(app);


// export const firebaseAuth = {
//   // Google Sign-In
//   signInWithGoogle: async () => {
//     try {
//       // Check if your device supports Google Play
//       await GoogleSignin.hasPlayServices();
      
//       // Get the users ID token
//       const userInfo = await GoogleSignin.signIn();
//       const { accessToken } = await GoogleSignin.getTokens();
      
//       // Create a Google credential with the token
//       const googleCredential = auth.GoogleAuthProvider.credential(null, accessToken);
      
//       // Sign-in the user with the credential
//       const userCredential = await auth().signInWithCredential(googleCredential);
//       return userCredential.user;
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Sign out from both Firebase and Google
//   signOut: async () => {
//     try {
//       await GoogleSignin.signOut();
//       await auth().signOut();
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Get current user
//   getCurrentUser: () => {
//     return auth().currentUser;
//   },

//   // Listen to auth state changes
//   onAuthStateChanged: (callback: (user: FirebaseAuthTypes.User | null) => void) => {
//     return auth().onAuthStateChanged(callback);
//   },
// }; 
