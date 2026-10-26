import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import DashArrendatario from '../../src/pages/DashArrendatario.jsx';
import { solicitudesService } from '../../src/services/solicitudesService.js';

describe('Torre Central - Dashboard del arrendatario', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  // CP-08: las solicitudes devueltas por el servicio aparecen en la tabla.
  it('CP-08: muestra el folio, activo, estado y técnico de una solicitud', () => {
    vi.spyOn(solicitudesService, 'obtenerSolicitudes').mockReturnValue([
      {
        id: 'SOL-808',
        solicitante: 'Andrea Pérez',
        activo: 'Ascensor 1 (Piso 1)',
        descripcion: 'La puerta no cierra',
        prioridad: 'Alta',
        fecha: '2026-10-25',
        estado: 'Reportada',
        tecnico: 'Sin Asignar',
      },
    ]);

    render(
      <DashArrendatario
        usuario={{ nombre: 'Andrea Pérez', rol: 'Arrendatario' }}
        sidebarAbierta={true}
      />
    );

    expect(screen.getByRole('heading', { name: 'Mis Solicitudes de Reparación' })).toBeTruthy();
    expect(screen.getByText('SOL-808')).toBeTruthy();
    expect(screen.getByText('Ascensor 1 (Piso 1)')).toBeTruthy();
    expect(screen.getByText('Reportada')).toBeTruthy();
    expect(screen.getByText('Sin Asignar')).toBeTruthy();
    expect(solicitudesService.obtenerSolicitudes).toHaveBeenCalledTimes(1);
  });
});
