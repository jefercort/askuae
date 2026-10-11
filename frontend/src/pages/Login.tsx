import { Navigate, useNavigate } from "react-router";
import { loginWithGoogle } from "../services/auth";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ensureUserProfile } from "../services/users";

export function Login() {

  const { user, isLoading } = useAuth();

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  if (isLoading) return <p>Cargando Sesión...</p>
  if (user) return <Navigate to={'/'} replace />

  const loginGoogle = async () => {
    // esto para asegurar que si el primer intento falla y el otro funciona entonces el error no quede pegado
    setLoginError(null);
    try {
      const responseGoogle = await loginWithGoogle();
      // aca asegura que exista o no el usuario para crearlo o no
      await ensureUserProfile(responseGoogle, 'GOOGLE');
      // cuando el inicio de sesion es exitoso entonces se devuelve al home
      navigate('/');
    } catch (error) {
      console.error(error);
      setLoginError('No se pudo iniciar sesion usando Google')
    }
  }

  return (
    <>
      <h1>INICIAR SESION</h1>
      <section>
        <button
          onClick={loginGoogle}
        >
          Iniciar con Google
        </button>
        {loginError && <p>{loginError}</p>}
      </section>
    </>
  );
}