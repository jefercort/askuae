import { useNavigate } from "react-router";
import { loginWithGoogle } from "../services/auth";
import { useState } from "react";

export function Login() {

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);

  const loginGoogle = async () => {
    // esto para asegurar que si el primer intento falla y el otro funciona entonces el error no quede pegado
    setLoginError(null);
    try {
      await loginWithGoogle();
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