import { Navbar, Container, Badge } from 'react-bootstrap';
import Boton from './Boton';

export default function Header({ usuario, onLogout, onToggleSidebar }) {
  return (
    <Navbar bg="dark" variant="dark" className="px-3 border-bottom border-dark shadow-sm">
      <Container fluid className="px-0">
        <div className="d-flex align-items-center">
          <button
            type="button"
            className="btn btn-dark text-white me-2 border-0 fs-4 py-0 px-2"
            onClick={onToggleSidebar}
            title="Alternar Menú"
          >
            ≡
          </button>
          <Navbar.Brand className="fw-bold fs-4 mb-0 me-0">
            Torre Central
          </Navbar.Brand>
        </div>

        {usuario && (
          <div className="d-flex align-items-center gap-3">
            <div className="text-end text-white">
              <span className="d-block fw-bold small mb-0">{usuario.nombre}</span>
              <Badge bg="info" text="dark" className="px-2 py-1">
                {usuario.rol}
              </Badge>
            </div>
            <Boton
              variant="outline-light"
              size="sm"
              onClick={onLogout}
              className="px-3"
            >
              Salir
            </Boton>
          </div>
        )}
      </Container>
    </Navbar>
  );
}