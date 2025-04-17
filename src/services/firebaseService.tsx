import { FirebaseApp, initializeApp } from '@firebase/app';
import { initializeAuth, browserLocalPersistence } from '@firebase/auth';
import { getFirestore, collection, doc, setDoc, deleteDoc, getDoc } from '@firebase/firestore';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfigWeb = {
  apiKey: "AIzaSyDEetzmxSjDYiqkaHP1DGyd26URCAXCrHw",
  authDomain: "pension-ex-1f88c.firebaseapp.com",
  projectId: "pension-ex-1f88c",
  storageBucket: "pension-ex-1f88c.firebasestorage.app",
  messagingSenderId: "770629654208",
  appId: "1:770629654208:web:3a2d2d868f5635b01cbf25",
  measurementId: "G-28JVCRBNRH"
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: Platform.OS === 'web' ? browserLocalPersistence : undefined
});

// Initialize Firestore
const firestore = getFirestore(app);

export { app, auth as firebaseAuth, firestore };

export const toggleProductLike = async (userId: string, productId: string) => {
  try {
    const likesCollection = collection(firestore, 'productLikes');
    const likeDocRef = doc(likesCollection, `${userId}_${productId}`);
    
    // Check if the like already exists
    const likeDoc = await getDoc(likeDocRef);
    
    if (likeDoc.exists()) {
      // Unlike: Delete the document
      await deleteDoc(likeDocRef);
      return { success: true, action: 'unliked' };
    } else {
      // Like: Create a new document
      await setDoc(likeDocRef, {
        userId,
        productId,
        timestamp: new Date().toISOString()
      });
      return { success: true, action: 'liked' };
    }
  } catch (error) {
    console.error('Error toggling product like:', error);
    return { success: false, error };
  }
};

