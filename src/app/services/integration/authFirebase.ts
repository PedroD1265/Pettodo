import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  type User,
} from 'firebase/auth';
import { getFirebaseAuth } from '../../../firebase';
import type { IAuthService, AuthUser } from '../interfaces';

function mapUser(user: User | null): AuthUser | null {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
}

const googleProvider = new GoogleAuthProvider();

export const authFirebaseAdapter: IAuthService = {
  getCurrentUser: () => mapUser(getFirebaseAuth().currentUser),

  getIdToken: async () => {
    const user = getFirebaseAuth().currentUser;
    if (!user) return null;
    return user.getIdToken();
  },

  signInWithGoogle: async () => {
    const result = await signInWithPopup(getFirebaseAuth(), googleProvider);
    return mapUser(result.user)!;
  },

  signOut: async () => {
    await firebaseSignOut(getFirebaseAuth());
  },

  onAuthStateChanged: (callback) => {
    return firebaseOnAuthStateChanged(getFirebaseAuth(), (user) => {
      callback(mapUser(user));
    });
  },
};
