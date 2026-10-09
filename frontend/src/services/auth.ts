import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

// recurso para entrar a travez de Google
const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user; // Me va a retornar el usuario de Firebase (uid, email<, displayName y photoURL)
}

// Recurso para cerrar la sesion
export const logout = async () => {
  await signOut(auth);
}
