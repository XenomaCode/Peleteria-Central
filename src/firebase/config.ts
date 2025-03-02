import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBKFZ_siDDjbWly9OVgCWXHxiqlZtx_GVI',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'pelteria-central.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'pelteria-central',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'pelteria-central.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '433482912791',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:433482912791:web:9a1028800a28657e533852',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-1753YJGTTW',
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || 'https://pelteria-central-default-rtdb.firebaseio.com'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(firebaseApp);

// Initialize other services
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

// Set auth persistence
if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
      console.error("Error setting auth persistence:", error);
    });
}

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(firebaseApp);
}

export { firebaseApp, auth, storage, database, analytics }; 