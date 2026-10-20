import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginRegistro from './pages/LoginRegistro';
import DashArrendatario from './pages/DashArrendatario';

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [sidebarAbierta, setSidebarAbierta] = useState(true);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header
        usuario={usuario}
        onLogout={() => setUsuario(null)}
        onToggleSidebar={() => setSidebarAbierta(!sidebarAbierta)}
      />

      <main className="flex-grow-1 d-flex flex-column">
        {!usuario ? (
          <LoginRegistro onLogin={(u) => setUsuario(u)} />
        ) : usuario.rol === 'Arrendatario' ? (
          <DashArrendatario usuario={usuario} />
        ) : (
          <div className="container py-5 text-center">
            <h3>Bienvenido, {usuario.nombre}</h3>
            <p className="text-muted">El panel para el rol "{usuario.rol}" está en desarrollo.</p>
            <button className="btn btn-secondary mt-3" onClick={() => setUsuario(null)}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}