export type AuthProviderPayload = 'GOOGLE' | 'MICROSOFT' | 'APPLE' | 'EMAIL';

export interface CreateUserPayload {
  nameUser: string;
  profileImg?: string;
  authProvider: AuthProviderPayload;
}

export interface UserProfile extends CreateUserPayload {
  id: string;
  emailUser: string;
  firebaseUid: string;
  role: string;
  createdAt: string;
}