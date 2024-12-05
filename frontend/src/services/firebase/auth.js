import { 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth 
} from 'firebase/auth';
import { auth } from './config';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logoutUser = async () => {
  return signOut(auth);
};

// Export auth instance
export { auth };