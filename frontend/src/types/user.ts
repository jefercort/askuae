export type AuthProviderPayload = 'GOOGLE' | 'MICROSOFT' | 'APPLE' | 'EMAIL';

export interface CreateUserPayload {
  nameUser: string;
  emailUser: string;
  profileImg?: string;
  authProvider: AuthProviderPayload;
  firebaseUid: string;
}

export interface UserProfile extends CreateUserPayload {
  id: string;
  role: string;
  createdAt: string;
}