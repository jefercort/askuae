import type { User as FirebaseUser } from "firebase/auth";
import type { AuthProviderPayload, CreateUserPayload, UserProfile } from "../types/user";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const createUser = async (payload: CreateUserPayload, token: string): Promise<UserProfile> => {
  const userResponse = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // acá agrego authorization para pasarle el token con la palabra Bearer para que sea spliteado en el guard
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });

  if (!userResponse.ok) {
    // aca como capture el error entonces voy a transformar el cuerpo para saber si viene un solo error o un array de errores
    const errorBody = await userResponse.json();
    // el validationPipe manda un array de mensajes; las excepciones, un string
    const messageError = Array.isArray(errorBody.message) ? errorBody.message.join(', ') : errorBody.message;
    throw new Error(messageError);
  }
  // En ese punto la petición ya fue y volvió. userResponse.json() toma la respuesta que NestJS mandó y la convierte en objeto aquí, en el frontend. La dirección es backend → frontend
  return await userResponse.json();
}

const getMyProfile = async (token: string): Promise<UserProfile | null> => {
  const profileResponse = await fetch(`${API_URL}/users/me`, {
    headers: {
      // acá agrego authorization para pasarle el token con la palabra Bearer para que sea spliteado en el guard
      Authorization: `Bearer ${token}`
    }
  });

  if (profileResponse.status === 404) return null;

  if (!profileResponse.ok) {
    const errorBody = await profileResponse.json();
    const messageError = Array.isArray(errorBody.message) ? errorBody.message.join(', ') : errorBody.message;
    throw new Error(messageError);
  }

  return await profileResponse.json();
}

export const ensureUserProfile = async (firebaseUser: FirebaseUser, authProvider: AuthProviderPayload): Promise<UserProfile> => {

  if (!firebaseUser.email) {
    throw new Error('La cuenta de Firebase no tiene email');
  }
  const token = await firebaseUser.getIdToken();
  const existUser = await getMyProfile(token);

  if (existUser) return existUser;

  const payload: CreateUserPayload = {
    nameUser: firebaseUser.displayName ?? firebaseUser.email.split('@')[0],
    profileImg: firebaseUser.photoURL ?? undefined,
    authProvider,
  };

  return await createUser(payload, token);

}
