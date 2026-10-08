import type { CreateUserPayload, UserProfile } from "../types/user";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const createUser = async (payload: CreateUserPayload): Promise<UserProfile> => {
  const userResponse = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
