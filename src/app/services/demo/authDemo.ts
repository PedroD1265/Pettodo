import type { IAuthService, AuthUser } from '../interfaces';

const DEMO_USER: AuthUser = {
  uid: 'demo-user',
  email: 'demo@pettodo.app',
  displayName: 'Demo User',
  photoURL: null,
};

export const authDemoAdapter: IAuthService = {
  getCurrentUser: () => DEMO_USER,
  getIdToken: async () => null,
  signInWithGoogle: async () => DEMO_USER,
  signOut: async () => {},
  onAuthStateChanged: (callback) => {
    callback(DEMO_USER);
    return () => {};
  },
};
