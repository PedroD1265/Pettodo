import type { AuthAccessProfile, IAuthService, AuthUser } from '../interfaces';

const DEMO_USER: AuthUser = {
  uid: 'demo-user',
  email: 'demo@pettodo.app',
  displayName: 'Demo User',
  photoURL: null,
};

export const authDemoAdapter: IAuthService = {
  getCurrentUser: () => DEMO_USER,
  getIdToken: async () => null,
  getAccessProfile: async (): Promise<AuthAccessProfile> => ({
    role: null,
    canAccessModeration: false,
    source: 'demo',
  }),
  signInWithGoogle: async () => DEMO_USER,
  signOut: async () => {},
  onAuthStateChanged: (callback) => {
    callback(DEMO_USER);
    return () => {};
  },
};
