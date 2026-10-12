import { onAuthStateChanged, type User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { AuthContext } from "./AuthContext";
import { ensureUserProfile } from "../services/users";
import type { AuthProviderPayload, UserProfile } from "../types/user";

const mapProviders: Record<string, AuthProviderPayload> = {
  'google.com': 'GOOGLE',
  'microsoft.com': 'MICROSOFT',
  'password': 'EMAIL',
  'apple.com': 'APPLE'
}
// aca recibo el children en las props y la llena: escucha a Firebase y guarda el usuario en el estado
export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const provider = currentUser.providerData[0]?.providerId;
          const sessionProvider = mapProviders[provider];
          if (!sessionProvider) throw new Error(`Actualmente no soportamos inicio de session con: ${provider}`);
          // aca asegura que exista o no el usuario para crearlo o no
          const userSession = await ensureUserProfile(currentUser, sessionProvider);
          setProfile(userSession);
        } catch (error) {
          console.error(error);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setUser(currentUser);
      setIsLoading(false); // Cuando Firebase responde, se apaga el loader
    });
    return () => unsubscribe();
  }, []);

  // aca devuelvo el componente de React que envuelve a los hijos
  return (
    <AuthContext.Provider value={{ user, profile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );

}
