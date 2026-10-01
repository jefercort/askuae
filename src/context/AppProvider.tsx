import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";

// este es el distribuidor de todos los contextos al main.tsx
export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}