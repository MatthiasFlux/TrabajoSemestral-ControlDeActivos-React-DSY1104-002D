import React from 'react';

export default function Sidebar({ usuario, sidebarAbierta, pestaña, setPestaña }) {
  const esArrendatario = usuario?.rol === 'Arrendatario';

  return (
    <aside className={`sidebar shadow-sm ${!sidebarAbierta ? 'cerrada' : ''}`}>
      <div className="sidebar-title">
        {esArrendatario ? 'MENÚ ARRENDATARIO' : 'MÓDULOS DEL SISTEMA'}
      </div>
      <ul className="nav flex-column mb-auto">
        {esArrendatario ? (
          <>
            <li className="nav-item">
              <button
                type="button"
                className={`sidebar-link ${pestaña === 'crear' ? 'active' : ''}`}
                onClick={() => setPestaña && setPestaña('crear')}
              >
                📝 Crear Solicitud
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={`sidebar-link ${pestaña === 'solicitudes' ? 'active' : ''}`}
                onClick={() => setPestaña && setPestaña('solicitudes')}
              >
                🔍 Mis Solicitudes
              </button>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <button
              type="button"
              className={`sidebar-link ${pestaña === 'gestion' || !pestaña ? 'active' : ''}`}
              onClick={() => setPestaña && setPestaña('gestion')}
            >
              📋 Gestión y Programación
            </button>
          </li>
        )}
      </ul>
    </aside>
  );
}