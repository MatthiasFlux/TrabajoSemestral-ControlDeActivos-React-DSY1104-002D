import { useState } from 'react';
import { Container, Card, Form, Table, ProgressBar, Row, Col, Alert } from 'react-bootstrap';

export default function DashAdministrador({ usuario, sidebarAbierta }) {
  const [alertaVisible, setAlertaVisible] = useState(true);

  return (
    <div className="d-flex flex-fill overflow-hidden dashboard-layout">
      
      {/* SIDEBAR CON ANIMACION CSS */}
      <aside className={`sidebar shadow-sm ${!sidebarAbierta ? 'cerrada' : ''}`}>
        <div className="sidebar-title">MÓDULOS DEL SISTEMA</div>
        <ul className="nav flex-column mb-auto">
          <li className="nav-item">
            <button className="sidebar-link active">
              📋 Gestión y Programación
            </button>
          </li>
        </ul>
      </aside>

      {/* CONTENIDO */}
      <main className="main-content bg-light p-4">
        
        {/* ALERTA */}
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

          {/* 1 RECEPCION Y ASIGNACION */}
          <Card className="border-0 shadow-sm rounded-3 mb-4">
            <Card.Body className="p-4">
              <Card.Title className="fw-bold mb-4">1. Recepción y Asignación de Solicitudes (RF-03)</Card.Title>
              <Table responsive hover align="middle" className="border mb-0">
                <thead className="table-dark">
                  <tr>
                    <th className="fw-normal">Folio</th>
                    <th className="fw-normal">Solicitante</th>
                    <th className="fw-normal">Activo</th>
                    <th className="fw-normal">Descripción</th>
                    <th className="fw-normal">Prioridad</th>
                    <th className="fw-normal">Asignar Técnico</th>
                    <th className="fw-normal">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>SOL-103</strong></td>
                    <td>Empresa TechCorp</td>
                    <td>Ascensor 1</td>
                    <td>Ruidos extraños en el freno.</td>
                    <td><span className="badge bg-danger rounded-pill px-2 py-1">Alta</span></td>
                    <td>
                      <Form.Select size="sm" className="w-auto">
                        <option>Miguel Silva (Técnico)</option>
                        <option>Juan Pérez (Técnico)</option>
                      </Form.Select>
                    </td>
                    <td>
                      <button className="btn btn-celeste btn-sm px-3">Generar OT</button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Row className="g-4">
            {/* 2 ASIGNAR MANTENIMIENTO */}
            <Col lg={6}>
              <Card className="border-0 shadow-sm rounded-3 h-100">
                <Card.Body className="p-4">
                  <Card.Title className="fw-bold mb-4">2. Programar Mantenimiento Preventivo (RF-05)</Card.Title>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold small">Seleccionar Equipo</Form.Label>
                      <Form.Select>
                        <option>ACT004 - Generador Eléctrico 1</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold small">Fecha Programada</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-bold small">Técnico Encargado</Form.Label>
                      <Form.Select>
                        <option>Miguel Silva</option>
                      </Form.Select>
                    </Form.Group>
                    <button type="button" className="btn btn-celeste w-100 py-2">
                      Calendarizar Tarea
                    </button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* 3 CARGA DE TRABAJO */}
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