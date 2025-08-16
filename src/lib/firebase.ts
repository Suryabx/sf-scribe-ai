import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // These are placeholder values - users will need to add their own Firebase config
  apiKey: "placeholder-api-key",
  authDomain: "sf-manager.firebaseapp.com",
  projectId: "sf-manager",
  storageBucket: "sf-manager.appspot.com",
  messagingSenderId: "123456789",
  appId: "placeholder-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;