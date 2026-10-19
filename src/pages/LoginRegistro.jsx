
import { useState } from "react";
import { usuariosIniciales } from "../data/usuarios";

const cuentasPrueba = [
  {
    rol: "Administrador",
    correo: "admin@torrecentral.cl",
    disponible: false
  },
  {
    rol: "Jefe Mantenimiento",
    correo: "jefe@torrecentral.cl",
    disponible: true
  },
  {
    rol: "Técnico",
    correo: "tecnico@torrecentral.cl",
    disponible: false
  },
  {
    rol: "Encargado Activos",
    correo: "activos@torrecentral.cl",
    disponible: false
  },
  {
    rol: "Arrendatario",
    correo: "arrendatario@torrecentral.cl",
    disponible: true
  }
];

function LoginRegistro({ onLogin }) {

  // Estado para mostrar login o registro
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  // Usuarios disponibles
  const [usuarios, setUsuarios] = useState(usuariosIniciales);

  // Datos del login
  const [login, setLogin] = useState({
    correo: "",
    pass: ""
  });

  // Datos del registro
  const [registro, setRegistro] = useState({
    nombre: "",
    correo: "",
    rol: "Arrendatario",
    pass: ""
  });

  // Mensajes de validación
  const [mensaje, setMensaje] = useState({
    texto: "",
    tipo: ""
  });

  // Cambiar entre formularios
  const cambiarFormulario = (mostrar) => {
    setMostrarRegistro(mostrar);
    setMensaje({ texto: "", tipo: "" });
  };

  // Cargar credenciales de prueba
  const cargarCredenciales = (correo) => {
    setLogin({
      correo: correo,
      pass: "123456"
    });

    setMensaje({ texto: "", tipo: "" });
  };

  // Inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();

    const correo = login.correo.trim().toLowerCase();

    const usuario = usuarios.find(
      (u) => u.correo === correo && u.pass === login.pass
    );

    if (!usuario) {
      setMensaje({
        texto: "Credenciales incorrectas.",
        tipo: "danger"
      });
      return;
    }

    if (
      usuario.rol !== "Arrendatario" &&
      usuario.rol !== "Jefe de Mantenimiento"
    ) {
      setMensaje({
        texto: "Este rol todavía no tiene una vista asociada.",
        tipo: "warning"
      });
      return;
    }

    setMensaje({
      texto: `Bienvenido, ${usuario.nombre}. Inicio de sesión correcto.`,
      tipo: "success"
    });

    // Se conectará con React Router en el siguiente paso.
    if (onLogin) {
      onLogin(usuario);
    }
  };

  // Registro de usuario
  const handleRegistro = (e) => {
    e.preventDefault();

    const nombre = registro.nombre.trim();
    const correo = registro.correo.trim().toLowerCase();
    const pass = registro.pass;

    if (!nombre || !correo || !pass) {
      setMensaje({
        texto: "Debe completar todos los campos.",
        tipo: "danger"
      });
      return;
    }

    if (pass.length < 6) {
      setMensaje({
        texto: "La contraseña debe tener al menos 6 caracteres.",
        tipo: "danger"
      });
      return;
    }

    const existe = usuarios.some(
      (usuario) => usuario.correo === correo
    );

    if (existe) {
      setMensaje({
        texto: "Este correo ya está registrado.",
        tipo: "danger"
      });
      return;
    }

    const nuevoUsuario = {
      nombre,
      correo,
      rol: registro.rol,
      pass
    };

    setUsuarios((anteriores) => [
      ...anteriores,
      nuevoUsuario
    ]);

    setRegistro({
      nombre: "",
      correo: "",
      rol: "Arrendatario",
      pass: ""
    });

    setLogin({
      correo,
      pass: ""
    });

    setMostrarRegistro(false);

    setMensaje({
      texto: "Cuenta creada correctamente. Ahora inicia sesión.",
      tipo: "success"
    });
  };

  return (
    <section
      id="vistaAuth"
      className="container d-flex justify-content-center align-items-center min-vh-100 py-4 px-3"
    >
      <div className="auth-card p-4 shadow-lg rounded bg-white">

        {/* FORMULARIO LOGIN */}
        {!mostrarRegistro && (
          <div id="boxLogin">

            <div className="text-center mb-3">
              <img
                src="https://picsum.photos/id/1076/60/60"
                alt="Logo Torre Central"
                className="rounded mb-2"
                width="60"
                height="60"
              />

              <h4 className="fw-bold m-0">
                Torre Central
              </h4>

              <p className="text-muted small">
                Sistema de Control de Activos e Infraestructura
              </p>
            </div>

            <form id="formLogin" onSubmit={handleLogin}>

              <div className="mb-3">
                <label
                  htmlFor="loginCorreo"
                  className="form-label"
                >
                  Correo Electrónico
                </label>

                <input
                  type="email"
                  id="loginCorreo"
                  className="form-control btn-lg-touch"
                  placeholder="admin@torrecentral.cl"
                  value={login.correo}
                  onChange={(e) =>
                    setLogin({
                      ...login,
                      correo: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="loginPass"
                  className="form-label"
                >
                  Contraseña
                </label>

                <input
                  type="password"
                  id="loginPass"
                  className="form-control btn-lg-touch"
                  placeholder="••••••••"
                  value={login.pass}
                  onChange={(e) =>
                    setLogin({
                      ...login,
                      pass: e.target.value
                    })
                  }
                  required
                />
              </div>

              {mensaje.texto && (
                <div
                  className={`alert alert-${mensaje.tipo} py-2`}
                  role="alert"
                >
                  {mensaje.texto}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-celeste w-100 py-3 mb-3 btn-lg-touch fs-5"
              >
                Ingresar al Sistema
              </button>

            </form>

            <div className="text-center small mb-3">
              <span>¿No tienes una cuenta? </span>

              <button
                type="button"
                className="btn btn-link text-decoration-none fw-bold p-0"
                onClick={() => cambiarFormulario(true)}
              >
                Regístrate aquí
              </button>
            </div>

            {/* SELECTOR DE ROLES */}
            <div className="card bg-light border-0 p-3 text-start small">

              <div className="fw-bold mb-1 text-secondary">
                🔑 Selector de Rol para Pruebas:
              </div>

              <div className="d-grid gap-1">
                {cuentasPrueba.map((cuenta) => (
                  <button
                    key={cuenta.rol}
                    type="button"
                    disabled={!cuenta.disponible}
                    className="btn btn-outline-dark btn-sm text-start py-1"
                    onClick={() =>
                      cargarCredenciales(cuenta.correo)
                    }
                  >
                    <strong>{cuenta.rol}:</strong>{" "}
                    {cuenta.correo}

                    {!cuenta.disponible && (
                      <span> (pendiente)</span>
                    )}
                  </button>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* FORMULARIO REGISTRO */}
        {mostrarRegistro && (
          <div id="boxRegistro">

            <div className="text-center mb-4">
              <h4 className="fw-bold">
                Crear Cuenta
              </h4>
            </div>

            <form
              id="formRegistro"
              onSubmit={handleRegistro}
            >

              <div className="mb-3">
                <label
                  htmlFor="regNombre"
                  className="form-label"
                >
                  Nombre Completo
                </label>

                <input
                  type="text"
                  id="regNombre"
                  className="form-control btn-lg-touch"
                  value={registro.nombre}
                  onChange={(e) =>
                    setRegistro({
                      ...registro,
                      nombre: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="regCorreo"
                  className="form-label"
                >
                  Correo Electrónico
                </label>

                <input
                  type="email"
                  id="regCorreo"
                  className="form-control btn-lg-touch"
                  value={registro.correo}
                  onChange={(e) =>
                    setRegistro({
                      ...registro,
                      correo: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="regRol"
                  className="form-label"
                >
                  Rol en el Edificio
                </label>

                <select
                  id="regRol"
                  className="form-select btn-lg-touch"
                  value={registro.rol}
                  onChange={(e) =>
                    setRegistro({
                      ...registro,
                      rol: e.target.value
                    })
                  }
                  required
                >
                  <option value="Arrendatario">
                    Arrendatario
                  </option>

                  <option value="Técnico de Mantenimiento">
                    Técnico de Mantenimiento
                  </option>

                  <option value="Jefe de Mantenimiento">
                    Jefe de Mantenimiento
                  </option>

                  <option value="Encargado de Activos">
                    Encargado de Activos
                  </option>

                  <option value="Administrador">
                    Administrador
                  </option>
                </select>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="regPass"
                  className="form-label"
                >
                  Contraseña
                </label>

                <input
                  type="password"
                  id="regPass"
                  className="form-control btn-lg-touch"
                  minLength={6}
                  value={registro.pass}
                  onChange={(e) =>
                    setRegistro({
                      ...registro,
                      pass: e.target.value
                    })
                  }
                  required
                />
              </div>

              {mensaje.texto && (
                <div
                  className={`alert alert-${mensaje.tipo} py-2`}
                  role="alert"
                >
                  {mensaje.texto}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-celeste w-100 py-3 mb-3 btn-lg-touch fs-5"
              >
                Registrar Cuenta
              </button>

            </form>

            <div className="text-center small">
              <button
                type="button"
                className="btn btn-link text-decoration-none fw-bold p-0"
                onClick={() => cambiarFormulario(false)}
              >
                Volver al Login
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default LoginRegistro;
