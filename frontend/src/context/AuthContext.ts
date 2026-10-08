import type { User } from "firebase/auth";
import { createContext } from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

//  aca se define la forma del contexto: user es un usuario o null, más isLoading
export const AuthContext = createContext<AuthContextType | undefined>(undefined);