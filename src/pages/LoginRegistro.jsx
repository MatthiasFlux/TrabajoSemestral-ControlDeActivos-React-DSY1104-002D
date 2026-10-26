import { useState } from "react";
import { Container, Card, Form, Alert } from "react-bootstrap";
import { usuariosIniciales } from "../data/usuarios";
import Boton from "../components/Boton";

const cuentasPrueba = [
  { rol: "Administrador", correo: "admin@torrecentral.cl", disponible: false },
  { rol: "Jefe Mantenimiento", correo: "jefe@torrecentral.cl", disponible: true },
  { rol: "Técnico", correo: "tecnico@torrecentral.cl", disponible: false },
  { rol: "Encargado Activos", correo: "activos@torrecentral.cl", disponible: false },
  { rol: "Arrendatario", correo: "arrendatario@torrecentral.cl", disponible: true }
];

function LoginRegistro({ onLogin }) {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [usuarios, setUsuarios] = useState(usuariosIniciales || []);
  const [login, setLogin] = useState({ correo: "", pass: "" });
  const [registro, setRegistro] = useState({ nombre: "", correo: "", rol: "Arrendatario", pass: "" });
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  const cambiarFormulario = (mostrar) => {
    setMostrarRegistro(mostrar);
    setMensaje({ texto: "", tipo: "" });
  };

  const cargarCredenciales = (correo) => {
    setLogin({ correo, pass: "123456" });
    setMensaje({ texto: "", tipo: "" });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const correo = login.correo.trim().toLowerCase();
    const usuario = usuarios.find((u) => u.correo === correo && u.pass === login.pass);

    if (!usuario) {
      setMensaje({ texto: "Credenciales incorrectas.", tipo: "danger" });
      return;
    }

    if (
      usuario.rol !== "Arrendatario" &&
      usuario.rol !== "Jefe de Mantenimiento" &&
      usuario.rol !== "Jefe Mantenimiento"
    ) {
      setMensaje({ texto: "Este rol todavía no tiene una vista asociada.", tipo: "warning" });
      return;
    }

    setMensaje({ texto: `Bienvenido, ${usuario.nombre}. Inicio de sesión correcto.`, tipo: "success" });
    if (onLogin) onLogin(usuario);
  };

  const handleRegistro = (e) => {
    e.preventDefault();
    const nombre = registro.nombre.trim();
    const correo = registro.correo.trim().toLowerCase();
    const pass = registro.pass;

    if (!nombre || !correo || !pass) {
      setMensaje({ texto: "Debe completar todos los campos.", tipo: "danger" });
      return;
    }

    if (pass.length < 6) {
      setMensaje({ texto: "La contraseña debe tener al menos 6 caracteres.", tipo: "danger" });
      return;
    }

    if (usuarios.some((u) => u.correo === correo)) {
      setMensaje({ texto: "Este correo ya está registrado.", tipo: "danger" });
      return;
    }

    const nuevoUsuario = { nombre, correo, rol: registro.rol, pass };
    setUsuarios((anteriores) => [...anteriores, nuevoUsuario]);
    setRegistro({ nombre: "", correo: "", rol: "Arrendatario", pass: "" });
    setLogin({ correo, pass: "" });
    setMostrarRegistro(false);
    setMensaje({ texto: "Cuenta creada correctamente. Ahora inicia sesión.", tipo: "success" });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 py-4">
      <Card style={{ maxWidth: '450px', width: '100%' }} className="p-4 shadow-lg border-0 rounded">
        {!mostrarRegistro ? (
          <div>
            <div className="text-center mb-3">
              <img
                src="https://picsum.photos/id/1076/60/60"
                alt="Logo Torre Central"
                className="rounded mb-2"
                width="60"
                height="60"
              />
              <h4 className="fw-bold m-0">Torre Central</h4>
              <p className="text-muted small">Sistema de Control de Activos e Infraestructura</p>
            </div>

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="admin@torrecentral.cl"
                  value={login.correo}
                  onChange={(e) => setLogin({ ...login, correo: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={login.pass}
                  onChange={(e) => setLogin({ ...login, pass: e.target.value })}
                  required
                />
              </Form.Group>

              {mensaje.texto && <Alert variant={mensaje.tipo} className="py-2">{mensaje.texto}</Alert>}

              <Boton variant="info" type="submit" className="w-100 py-2 mb-3 text-white">
                Ingresar al Sistema
              </Boton>
            </Form>

            <div className="text-center small mb-3">
              <span>¿No tienes una cuenta? </span>
              <Boton variant="link" className="p-0 border-0" onClick={() => cambiarFormulario(true)}>
                Regístrate aquí
              </Boton>
            </div>

            <Card bg="light" className="border-0 p-3 small">
              <div className="fw-bold mb-1 text-secondary">🔑 Selector de Rol para Pruebas:</div>
              <div className="d-grid gap-1">
                {cuentasPrueba.map((cuenta) => (
                  <Boton
                    key={cuenta.rol}
                    variant="outline-dark"
                    size="sm"
                    className="text-start py-1 fw-normal"
                    disabled={!cuenta.disponible}
                    onClick={() => cargarCredenciales(cuenta.correo)}
                  >
                    <strong>{cuenta.rol}:</strong> {cuenta.correo}
                    {!cuenta.disponible && <span> (pendiente)</span>}
                  </Boton>
                ))}
              </div>
            </Card>
          </div>
        ) : (
          <div>
            <div className="text-center mb-4">
              <h4 className="fw-bold">Crear Cuenta</h4>
            </div>

            <Form onSubmit={handleRegistro}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control
                  type="text"
                  value={registro.nombre}
                  onChange={(e) => setRegistro({ ...registro, nombre: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  value={registro.correo}
                  onChange={(e) => setRegistro({ ...registro, correo: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Rol en el Edificio</Form.Label>
                <Form.Select
                  value={registro.rol}
                  onChange={(e) => setRegistro({ ...registro, rol: e.target.value })}
                  required
                >
                  <option value="Arrendatario">Arrendatario</option>
                  <option value="Técnico de Mantenimiento">Técnico de Mantenimiento</option>
                  <option value="Jefe de Mantenimiento">Jefe de Mantenimiento</option>
                  <option value="Encargado de Activos">Encargado de Activos</option>
                  <option value="Administrador">Administrador</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  minLength={6}
                  value={registro.pass}
                  onChange={(e) => setRegistro({ ...registro, pass: e.target.value })}
                  required
                />
              </Form.Group>

              {mensaje.texto && <Alert variant={mensaje.tipo} className="py-2">{mensaje.texto}</Alert>}

              <Boton variant="info" type="submit" className="w-100 py-2 mb-3 text-white">
                Registrar Cuenta
              </Boton>
            </Form>

            <div className="text-center small">
              <Boton variant="link" className="p-0 border-0" onClick={() => cambiarFormulario(false)}>
                Volver al Login
              </Boton>
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default LoginRegistro;