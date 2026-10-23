import { useState, useEffect } from 'react';
import { Container, Card, Form, Table, ProgressBar, Row, Col, Alert, Badge } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import { solicitudesService } from '../services/solicitudesService';

export default function DashAdministrador({ usuario, sidebarAbierta }) {
  const [alertaVisible, setAlertaVisible] = useState(true);
  const [pestaña, setPestaña] = useState('gestion');
  const [solicitudes, setSolicitudes] = useState([]);
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState({});

  // Estados para Sección 2: Programar Mantenimiento Preventivo
  const [equipo, setEquipo] = useState('ACT004 - Generador Eléctrico 1');
  const [fechaProgramada, setFechaProgramada] = useState('');
  const [tecnicoEncargado, setTecnicoEncargado] = useState('Miguel Silva');
  const [mensajeCalendarizacion, setMensajeCalendarizacion] = useState(null);

  // Cargar solicitudes compartidas
  useEffect(() => {
    setSolicitudes(solicitudesService.obtenerSolicitudes());
  }, []);

  // Manejar cambio de técnico por fila en la tabla
  const handleCambioTecnico = (id, tecnico) => {
    setTecnicoSeleccionado({ ...tecnicoSeleccionado, [id]: tecnico });
  };

  // Asignar técnico y generar OT
  const handleGenerarOT = (id) => {
    const tecnico = tecnicoSeleccionado[id] || "Miguel Silva (Técnico)";
    const actualizadas = solicitudesService.generarOrdenTrabajo(id, tecnico);
    setSolicitudes(actualizadas);
  };

  // Procesar la calendarización
  const handleCalendarizar = (e) => {
    e.preventDefault();

    if (!fechaProgramada) {
      setMensajeCalendarizacion({
        tipo: 'danger',
        texto: 'Por favor, seleccione una fecha programada.'
      });
      return;
    }

    setMensajeCalendarizacion({
      tipo: 'success',
      texto: `Mantenimiento preventivo para "${equipo}" asignado con éxito a ${tecnicoEncargado} para la fecha ${fechaProgramada}.`
    });

    setTimeout(() => {
      setFechaProgramada('');
      setMensajeCalendarizacion(null);
    }, 4000);
  };

  return (
    <div className="d-flex flex-fill overflow-hidden dashboard-layout">
      {/* Sidebar Reutilizable */}
      <Sidebar 
        usuario={usuario} 
        sidebarAbierta={sidebarAbierta} 
        pestaña={pestaña} 
        setPestaña={setPestaña} 
      />

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content bg-light p-4">
        {alertaVisible && (
          <Alert 
            variant="warning" 
            onClose={() => setAlertaVisible(false)} 
            dismissible 
            className="mb-4 shadow-sm border-warning"
          >
            <strong style={{ color: '#856404' }}>⚠️ Alerta Automática de Mantenimiento:</strong> 
            <span style={{ color: '#856404' }}> El activo crítico ACT003 - Climatización requiere revisión preventiva en menos de 5 días.</span>
          </Alert>
        )}

        <Container fluid className="px-0">
          <div className="mb-4">
            <h2 className="fw-normal mb-1">Gestión y Calendarización de Mantenimiento</h2>
            <p className="text-muted small">Evaluación de solicitudes, balance de carga y programación preventiva.</p>
          </div>

          {/* 1. RECEPCIÓN Y ASIGNACIÓN DE SOLICITUDES */}
          <Card className="border-0 shadow-sm rounded-3 mb-4">
            <Card.Body className="p-4">
              <Card.Title className="fw-bold mb-4">1. Recepción y Asignación de Solicitudes (RF-03)</Card.Title>
              <Table responsive hover align="middle" className="border mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Folio</th>
                    <th>Solicitante</th>
                    <th>Activo</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Asignar Técnico</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.map((sol) => (
                    <tr key={sol.id}>
                      <td><strong>{sol.id}</strong></td>
                      <td>{sol.solicitante}</td>
                      <td>{sol.activo}</td>
                      <td>{sol.descripcion}</td>
                      <td>
                        <Badge 
                          bg={sol.estado === 'En ejecución' ? 'warning' : 'info'} 
                          text={sol.estado === 'En ejecución' ? 'dark' : 'white'}
                        >
                          {sol.estado}
                        </Badge>
                      </td>
                      <td>
                        {sol.estado === 'En ejecución' ? (
                          <span className="small fw-bold text-success">✓ {sol.tecnico}</span>
                        ) : (
                          <Form.Select 
                            size="sm" 
                            className="w-auto"
                            onChange={(e) => handleCambioTecnico(sol.id, e.target.value)}
                          >
                            <option value="Miguel Silva (Técnico)">Miguel Silva (Técnico)</option>
                            <option value="Juan Pérez (Técnico)">Juan Pérez (Técnico)</option>
                          </Form.Select>
                        )}
                      </td>
                      <td>
                        {sol.estado !== 'En ejecución' && (
                          <button 
                            className="btn btn-celeste btn-sm px-3"
                            onClick={() => handleGenerarOT(sol.id)}
                          >
                            Generar OT
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Row className="g-4">
            {/* 2. PROGRAMAR MANTENIMIENTO PREVENTIVO */}
            <Col lg={6}>
              <Card className="border-0 shadow-sm rounded-3 h-100">
                <Card.Body className="p-4">
                  <Card.Title className="fw-bold mb-4">2. Programar Mantenimiento Preventivo (RF-05)</Card.Title>
                  
                  {mensajeCalendarizacion && (
                    <Alert 
                      variant={mensajeCalendarizacion.tipo} 
                      onClose={() => setMensajeCalendarizacion(null)} 
                      dismissible
                      className="py-2 mb-3 small"
                    >
                      {mensajeCalendarizacion.texto}
                    </Alert>
                  )}

                  <Form onSubmit={handleCalendarizar}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold small">Seleccionar Equipo</Form.Label>
                      <Form.Select 
                        value={equipo} 
                        onChange={(e) => setEquipo(e.target.value)}
                      >
                        <option value="ACT004 - Generador Eléctrico 1">ACT004 - Generador Eléctrico 1</option>
                        <option value="ACT001 - Ascensor Principal 1">ACT001 - Ascensor Principal 1</option>
                        <option value="ACT003 - Climatización Central">ACT003 - Climatización Central</option>
                        <option value="ACT005 - Bomba de Agua Subterráneo">ACT005 - Bomba de Agua Subterráneo</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold small">Fecha Programada</Form.Label>
                      <Form.Control 
                        type="date" 
                        value={fechaProgramada}
                        onChange={(e) => setFechaProgramada(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold small">Técnico Encargado</Form.Label>
                      <Form.Select 
                        value={tecnicoEncargado} 
                        onChange={(e) => setTecnicoEncargado(e.target.value)}
                      >
                        <option value="Miguel Silva">Miguel Silva</option>
                        <option value="Juan Pérez">Juan Pérez</option>
                      </Form.Select>
                    </Form.Group>

                    <button type="submit" className="btn btn-celeste w-100 py-2 fw-bold">
                      Calendarizar Tarea
                    </button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* 3. CARGA DE TRABAJO TÉCNICOS */}
            <Col lg={6}>
              <Card className="border-0 shadow-sm rounded-3 h-100">
                <Card.Body className="p-4">
                  <Card.Title className="fw-bold mb-4">3. Carga de Trabajo Técnicos (RF-04)</Card.Title>
                  <div className="mb-4 bg-light p-3 rounded border">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-bold">Miguel Silva:</span>
                      <span className="text-muted small">2 Órdenes Asignadas</span>
                    </div>
                    <ProgressBar variant="warning" now={66} label={<span className="text-dark fw-bold">66% Ocupado</span>} style={{ height: '20px' }} />
                  </div>
                  <div className="bg-light p-3 rounded border">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-bold">Juan Pérez:</span>
                      <span className="text-muted small">1 Orden Asignada</span>
                    </div>
                    <ProgressBar variant="success" now={33} label={<span className="fw-bold">33% Ocupado</span>} style={{ height: '20px' }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}