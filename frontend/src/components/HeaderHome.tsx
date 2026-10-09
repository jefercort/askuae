import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/auth";

export function HeaderHome() {

  const { user, isLoading } = useAuth();

  if (isLoading) return <p>Cargando usuario...</p>

  return (
    <>
      <section>
        {
          user ? (
            <>
              <p>{user.displayName}</p>
              <button
                onClick={logout}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link
              to={'/login'}
              className="btn"
              style={{ margin: '10px' }}
            >
              Iniciar sesion
            </Link>
          )
        }
      </section>
    </>
  );
}