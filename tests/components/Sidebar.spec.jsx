import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Sidebar from '../../src/components/Sidebar.jsx';

describe('Torre Central - Navegación del Sidebar', () => {
  afterEach(() => {
    cleanup();
  });

  // CP-07: el arrendatario puede cambiar entre las secciones del menú.
  it('CP-07: ejecuta setPestaña al seleccionar Mis Solicitudes', () => {
    const cambiarPestaña = vi.fn();

    render(
      <Sidebar
        usuario={{ nombre: 'Andrea Pérez', rol: 'Arrendatario' }}
        sidebarAbierta={true}
        pestaña="crear"
        setPestaña={cambiarPestaña}
      />
    );

    const botonCrear = screen.getByRole('button', { name: /Crear Solicitud/i });
    const botonSolicitudes = screen.getByRole('button', { name: /Mis Solicitudes/i });

    expect(botonCrear.classList.contains('active')).toBe(true);
    expect(botonSolicitudes).toBeTruthy();

    fireEvent.click(botonSolicitudes);
    expect(cambiarPestaña).toHaveBeenCalledTimes(1);
    expect(cambiarPestaña).toHaveBeenCalledWith('solicitudes');
  });
});
