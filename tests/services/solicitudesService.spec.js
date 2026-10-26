import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

let solicitudesService;

describe('Torre Central - Gestión de solicitudes', () => {
  // Cada prueba importa el servicio nuevamente para recuperar los datos iniciales.
  beforeEach(async () => {
    vi.resetModules();
    ({ solicitudesService } = await import('../../src/services/solicitudesService.js'));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // CP-09: crear una solicitud agrega un registro con estado Reportada.
  it('CP-09: registra una solicitud nueva y la deja en estado Reportada', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.7);
    const cantidadInicial = solicitudesService.obtenerSolicitudes().length;

    const nueva = solicitudesService.crearSolicitud(
      'Andrea Pérez',
      'Climatización Piso 8',
      'No enfría la oficina'
    );

    expect(nueva).toEqual(expect.objectContaining({
      id: 'SOL-730',
      solicitante: 'Andrea Pérez',
      activo: 'Climatización Piso 8',
      descripcion: 'No enfría la oficina',
      prioridad: 'Alta',
      estado: 'Reportada',
      tecnico: 'Sin Asignar',
    }));

    const solicitudes = solicitudesService.obtenerSolicitudes();
    expect(solicitudes).toHaveLength(cantidadInicial + 1);
    expect(solicitudes[0]).toEqual(nueva);
  });

  // CP-10: asignar un técnico genera la OT cambiando el estado de una solicitud.
  it('CP-10: asigna un técnico y cambia el estado a En ejecución', () => {
    const solicitudInicial = solicitudesService.obtenerSolicitudes()
      .find((solicitud) => solicitud.id === 'SOL-103');
    expect(solicitudInicial.estado).toBe('Reportada');

    const resultado = solicitudesService.generarOrdenTrabajo('SOL-103', 'Juan Pérez');
    const actualizada = resultado.find((solicitud) => solicitud.id === 'SOL-103');

    expect(actualizada).toEqual(expect.objectContaining({
      id: 'SOL-103',
      estado: 'En ejecución',
      tecnico: 'Juan Pérez',
    }));
    expect(solicitudesService.obtenerSolicitudes()).toContainEqual(actualizada);

    // La asignación de una OT no debe modificar otra solicitud existente.
    const otraSolicitud = resultado.find((solicitud) => solicitud.id === 'SOL-102');
    expect(otraSolicitud.tecnico).toBe('Miguel Silva');
  });
});
