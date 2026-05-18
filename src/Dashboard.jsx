import { useMemo, useState } from 'react';
import './Dashboard.css';

const INITIAL_CONSULTAS = [
  {
    id: 1,
    usuario: 'test@test.com',
    mensaje: 'Quiero pizza',
    respuesta: 'Te recomendamos Pizza Spot',
    categoria: 'pizza',
    estado: 'resuelta',
    fecha: '2026-03-16',
  },
  {
    id: 2,
    usuario: 'maria@demo.com',
    mensaje: '¿Tienen opciones veganas?',
    respuesta: 'Prueba Green Bowl, tiene menú 100% vegetal',
    categoria: 'vegano',
    estado: 'pendiente',
    fecha: '2026-03-17',
  },
  {
    id: 3,
    usuario: 'juan@demo.com',
    mensaje: 'Algo rápido para cenar',
    respuesta: 'Burger Express entrega en 15 min',
    categoria: 'burger',
    estado: 'resuelta',
    fecha: '2026-03-17',
  },
];

const MOCK_TEMPLATES = [
  {
    usuario: 'demo@ubereats.com',
    mensaje: 'Busco sushi barato',
    respuesta: 'Sushi Go tiene 20% de descuento hoy',
    categoria: 'sushi',
    estado: 'pendiente',
  },
  {
    usuario: 'alumno@class.com',
    mensaje: 'Postre sin gluten',
    respuesta: 'Sweet Lab tiene tartas sin gluten',
    categoria: 'postre',
    estado: 'resuelta',
  },
];

function formatToday() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function Dashboard({ onLogout }) {
  const [consultas, setConsultas] = useState(INITIAL_CONSULTAS);
  const [mockIndex, setMockIndex] = useState(0);

  const metrics = useMemo(() => {
    const total = consultas.length;
    const resueltas = consultas.filter((c) => c.estado === 'resuelta').length;
    const recomendaciones = consultas.filter((c) => c.respuesta.trim().length > 0).length;
    return { total, resueltas, recomendaciones };
  }, [consultas]);

  const handleCrearConsulta = () => {
    const template = MOCK_TEMPLATES[mockIndex % MOCK_TEMPLATES.length];
    setMockIndex((prev) => prev + 1);

    const nuevaConsulta = {
      id: Date.now(),
      ...template,
      fecha: formatToday(),
    };

    setConsultas((prev) => [nuevaConsulta, ...prev]);
  };

  const toggleEstado = (id) => {
    setConsultas((prev) =>
      prev.map((consulta) =>
        consulta.id === id
          ? {
              ...consulta,
              estado: consulta.estado === 'resuelta' ? 'pendiente' : 'resuelta',
            }
          : consulta
      )
    );
  };

  return (
    <div className="dashboard">
      <header className="dashboard-navbar">
        <span className="dashboard-brand">
          Uber <span className="green">Eats</span>
        </span>
        <button type="button" className="dashboard-logout-btn" onClick={onLogout}>
          Cerrar sesión
        </button>
      </header>

      <section className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Panel de control</p>
          <h1 className="dashboard-title">Uber Eats Smart Assistant</h1>
          <p className="dashboard-subtitle">Gestiona las consultas del asistente IA</p>
        </div>
        <div className="dashboard-actions">
          <button type="button" className="dashboard-primary-btn" onClick={handleCrearConsulta}>
            Crear consulta de prueba
          </button>
        </div>
      </section>

      <section className="metrics-grid">
        <article className="metric-card">
          <p className="metric-label">Consultas totales</p>
          <p className="metric-value">{metrics.total}</p>
        </article>
        <article className="metric-card">
          <p className="metric-label">Consultas resueltas</p>
          <p className="metric-value">{metrics.resueltas}</p>
        </article>
        <article className="metric-card">
          <p className="metric-label">Recomendaciones generadas</p>
          <p className="metric-value">{metrics.recomendaciones}</p>
        </article>
      </section>

      <section className="table-section">
        <div className="table-section-header">
          <h2 className="table-title">Consultas recientes</h2>
          <span className="table-count">{consultas.length} registros</span>
        </div>

        <div className="table-wrapper">
          <table className="consultas-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Mensaje</th>
                <th>Respuesta IA</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {consultas.map((consulta) => (
                <tr key={consulta.id}>
                  <td data-label="Usuario">{consulta.usuario}</td>
                  <td data-label="Mensaje">{consulta.mensaje}</td>
                  <td data-label="Respuesta IA">{consulta.respuesta}</td>
                  <td data-label="Categoría">
                    <span className="category-pill">{consulta.categoria}</span>
                  </td>
                  <td data-label="Estado">
                    <span className={`status-pill status-${consulta.estado}`}>{consulta.estado}</span>
                  </td>
                  <td data-label="Fecha">{consulta.fecha}</td>
                  <td data-label="Acción">
                    <button
                      type="button"
                      className="status-toggle-btn"
                      onClick={() => toggleEstado(consulta.id)}
                    >
                      {consulta.estado === 'resuelta' ? 'Marcar pendiente' : 'Marcar resuelta'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
