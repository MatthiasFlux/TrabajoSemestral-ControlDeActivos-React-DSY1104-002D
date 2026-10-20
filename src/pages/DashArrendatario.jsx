import { useState } from 'react';
import { Container, Card, Form, Table, Badge, Alert } from 'react-bootstrap';
import Boton from '../components/Boton';

export default function DashArrendatario({ usuario }) {
  const [pestaña, setPestaña] = useState('solicitudes'); // 'crear' o 'solicitudes'
  const [activo, setActivo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [solicitudes, setSolicitudes] = useState([
    {
      id: "SOL-102",
      activo: "Ascensor 2 (Piso 1)",
      fecha: "2026-03-10",
      estado: "En ejecución",
      tecnico: "Miguel Silva",
      descripcion: "Ruidos al detenerse en piso 3"
    },
    {
      id: "SOL-089",
      activo: "Climatización Piso 8",
      fecha: "2026-02-15",
      estado: "Finalizada",
      tecnico: "Miguel Silva",
      descripcion: "Falla en termostato de la sala de reuniones"
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaSolicitud = {
      id: `SOL-${Math.floor(100 + Math.random() * 900)}`,
      activo,
      descripcion,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Reportada',
      tecnico: 'Sin Asignar'
    };

    setSolicitudes([nuevaSolicitud, ...solicitudes]);
    setMensaje(`Solicitud ingresada correctamente con el folio ${nuevaSolicitud.id}.`);
    setActivo('');
    setDescripcion('');
    
    // Opcional: Redirigir a la vista de mis solicitudes tras enviar
    setTimeout(() => {
      setPestaña('solicitudes');
      setMensaje('');
    }, 2000);
  };

  return (
    <div className="d-flex flex-grow-1 bg-light">
      {/* Sidebar Lateral */}
      <aside
        className="bg-dark text-white p-3"
        style={{ width: '240px', minHeight: 'calc(100vh - 56px)' }}
      >
        <div className="d-grid gap-2">
          <button
            type="button"
            className={`btn text-start fw-bold py-2 px-3 border-0 ${
              pestaña === 'crear' ? 'btn-primary text-white' : 'btn-dark text-white-50'
            }`}
            onClick={() => {
              setPestaña('crear');
              setMensaje('');
            }}
          >
            📝 Crear Solicitud
          </button>

          <button
            type="button"
            className={`btn text-start fw-bold py-2 px-3 border-0 ${
              pestaña === 'solicitudes' ? 'btn-primary text-white' : 'btn-dark text-white-50'
            }`}
            onClick={() => {
              setPestaña('solicitudes');
              setMensaje('');
            }}
          >
            🔍 Mis Solicitudes
          </button>
        </div>
      </aside>

      {/* Área Principal de Contenido */}
      <main className="flex-grow-1 p-4">
        <Container fluid>
          {pestaña === 'crear' ? (
            /* Vista 1: Reportar Falla o Avería */
            <div>
              <h2 className="fw-normal mb-1">Reportar Falla o Avería</h2>
              <p className="text-muted small mb-4">
                Ingrese los detalles del problema detectado en su oficina o espacio.
              </p>

              {mensaje && (
                <Alert variant="success" onClose={() => setMensaje('')} dismissible>
                  {mensaje}
                </Alert>
              )}

              <Card className="p-4 border-0 shadow-sm rounded-3 bg-white">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      Activo o Ubicación Afectada
                    </Form.Label>
                    <Form.Select
                      value={activo}
                      onChange={(e) => setActivo(e.target.value)}
                      required
                      className="py-2"
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="Ascensor 1 (Piso 1)">Ascensor 1 (Piso 1)</option>
                      <option value="Ascensor 2 (Piso 1)">Ascensor 2 (Piso 1)</option>
                      <option value="Climatización Piso 8">Climatización Piso 8</option>
                      <option value="Luminaria Pasillo Central">Luminaria Pasillo Central</option>
                      <option value="Bomba de Agua Subterráneo">Bomba de Agua Subterráneo</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">
                      Descripción del Problema
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Describa brevemente la falla..."
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <button type="submit" className="btn btn-celeste btn-lg-touch w-100 fs-5 fw-bold py-2">
                    Enviar Solicitud
                  </button>
                </Form>
              </Card>
            </div>
          ) : (
            /* Vista 2: Mis Solicitudes de Reparación */
            <div>
              <h2 className="fw-normal mb-1">Mis Solicitudes de Reparación</h2>
              <p className="text-muted small mb-4">
                Estado actualizado en tiempo real de sus reportes.
              </p>

              <Card className="p-4 border-0 shadow-sm rounded-3 bg-white">
                <Table responsive hover align="middle" className="mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>Folio</th>
                      <th>Activo</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th>Técnico Asignado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitudes.map((sol) => (
                      <tr key={sol.id}>
                        <td><strong>{sol.id}</strong></td>
                        <td>{sol.activo}</td>
                        <td>{sol.fecha}</td>
                        <td>
                          <Badge
                            bg={
                              sol.estado === 'En ejecución'
                                ? 'warning'
                                : sol.estado === 'Finalizada'
                                ? 'success'
                                : 'info'
                            }
                            text={sol.estado === 'En ejecución' ? 'dark' : 'white'}
                            className="px-2 py-1"
                          >
                            {sol.estado}
                          </Badge>
                        </td>
                        <td>{sol.tecnico}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}