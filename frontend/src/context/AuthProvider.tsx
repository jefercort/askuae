import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

// aca creo el contexto para poder usarlo luego
export const AuthContext = createContext({ user: null, isLoading: true });

// aca recibo el children en las props
export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false); // Cuando Firebase responde, se apaga el loader
    });

    return () => unsubscribe();
  }, []);

  // aca devuelvo el componente de React que envuelve a los hijos
  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );

}
