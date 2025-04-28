import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from './config';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.code);
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw new Error(error.code); 
  }
};

export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.code);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw new Error(error.code);
  }
};