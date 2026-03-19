import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  type User,
} from 'firebase/auth';
import { getFirebaseAuth } from '../../../firebase';
import type { AuthAccessProfile, AuthRole, IAuthService, AuthUser } from '../interfaces';

function mapUser(user: User | null): AuthUser | null {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
}

function normalizeRole(value: unknown): AuthRole | null {
  if (value === 'operator' || value === 'moderator' || value === 'user') {
    return value;
  }

  return null;
}

function extractRoleFromClaims(claims: Record<string, unknown>): AuthRole | null {
  if (claims.operator === true) return 'operator';
  if (claims.moderator === true) return 'moderator';

  const directRole = normalizeRole(claims.role);
  if (directRole) return directRole;

  if (Array.isArray(claims.roles)) {
    if (claims.roles.includes('operator')) return 'operator';
    if (claims.roles.includes('moderator')) return 'moderator';
    if (claims.roles.includes('user')) return 'user';
  }

  return null;
}

const googleProvider = new GoogleAuthProvider();

export const authFirebaseAdapter: IAuthService = {
  getCurrentUser: () => mapUser(getFirebaseAuth().currentUser),

  getIdToken: async () => {
    const user = getFirebaseAuth().currentUser;
    if (!user) return null;
    return user.getIdToken();
  },

  getAccessProfile: async (): Promise<AuthAccessProfile> => {
    const user = getFirebaseAuth().currentUser;
    if (!user) {
      return {
        role: null,
        canAccessModeration: false,
        source: 'none',
      };
    }

    const tokenResult = await user.getIdTokenResult();
    const role = extractRoleFromClaims(tokenResult.claims as Record<string, unknown>);

    return {
      role,
      canAccessModeration: role === 'moderator' || role === 'operator',
      source: role ? 'token_claims' : 'none',
    };
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
