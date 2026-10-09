import type { User } from "firebase/auth";
import { createContext, useContext } from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

//  aca se define la forma del contexto: user es un usuario o null, más isLoading
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// hook propio para que cada componente no tenga que revisar si el context de auth esta vacio o no
// acá solo se validaria una vez
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  return context;
}