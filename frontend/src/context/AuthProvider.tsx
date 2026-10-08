import { onAuthStateChanged, type User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { AuthContext } from "./AuthContext";

// aca recibo el children en las props y la llena: escucha a Firebase y guarda el usuario en el estado
export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null>(null);
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
