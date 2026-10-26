// Memoria compartida del sistema de solicitudes
let solicitudesMemoria = [
  {
    id: "SOL-103",
    solicitante: "Empresa TechCorp",
    activo: "Ascensor 1",
    descripcion: "Ruidos extraños en el freno.",
    prioridad: "Alta",
    fecha: "2026-03-12",
    estado: "Reportada",
    tecnico: "Sin Asignar"
  },
  {
    id: "SOL-102",
    solicitante: "Empresa TechCorp",
    activo: "Ascensor 2 (Piso 1)",
    descripcion: "Ruidos al detenerse en piso 3",
    prioridad: "Media",
    fecha: "2026-03-10",
    estado: "En ejecución",
    tecnico: "Miguel Silva"
  }
];

export const solicitudesService = {
  // Obtener todas las solicitudes
  obtenerSolicitudes: () => [...solicitudesMemoria],

  // Crear nueva solicitud desde Arrendatario
  crearSolicitud: (nombreSolicitante, activo, descripcion) => {
    const nueva = {
      id: `SOL-${Math.floor(100 + Math.random() * 900)}`,
      solicitante: nombreSolicitante || "Arrendatario",
      activo,
      descripcion,
      prioridad: "Alta",
      fecha: new Date().toISOString().split('T')[0],
      estado: "Reportada",
      tecnico: "Sin Asignar"
    };
    solicitudesMemoria = [nueva, ...solicitudesMemoria];
    return nueva;
  },

  // Generar Orden de Trabajo (OT) y asignar técnico desde Administrador
  generarOrdenTrabajo: (id, tecnico) => {
    solicitudesMemoria = solicitudesMemoria.map((s) =>
      s.id === id ? { ...s, tecnico, estado: "En ejecución" } : s
    );
    return [...solicitudesMemoria];
  }
};