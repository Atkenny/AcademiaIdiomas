import React, { useState } from 'react';
import { useIdioma } from '../../contextos/IdiomaContexto';

const alumnosData = [
  { id: 1, nombre: 'Ana García', email: 'ana@estudiante.com', grupo: 'ENG-C1', progreso: 85, estado: true },
  { id: 2, nombre: 'Carlos Mendoza', email: 'carlos@estudiante.com', grupo: 'ENG-BUS', progreso: 62, estado: true },
  { id: 3, nombre: 'María López', email: 'maria@estudiante.com', grupo: 'ENG-C1', progreso: 91, estado: true },
  { id: 4, nombre: 'Pedro Ramírez', email: 'pedro@estudiante.com', grupo: 'FRA-A1', progreso: 30, estado: false },
  { id: 5, nombre: 'Sofía Torres', email: 'sofia@estudiante.com', grupo: 'ENG-BUS', progreso: 74, estado: true },
  { id: 6, nombre: 'Luis Hernández', email: 'luis@estudiante.com', grupo: 'FRA-A1', progreso: 55, estado: true },
];

const recursosIniciales = [
  { id: 1, titulo: 'Guía de Gramática Avanzada – C1', tipo: 'documento', grupo: 'ENG-C1', fecha: '2026-05-28', vistas: 14 },
  { id: 2, titulo: 'Video: Idioms en Negocios', tipo: 'video', grupo: 'ENG-BUS', fecha: '2026-05-30', vistas: 22 },
  { id: 3, titulo: 'Pronunciación Francesa – Audio MP3', tipo: 'audio', grupo: 'FRA-A1', fecha: '2026-06-01', vistas: 8 },
  { id: 4, titulo: 'Recursos Cambridge Online', tipo: 'enlace', grupo: 'ENG-C1', fecha: '2026-06-02', vistas: 18 },
];

const TIPO_ICONOS = {
  documento: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  enlace: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  audio: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),
};

export default function ContenidoDocente() {
  const { t } = useIdioma();
  const [tabActiva, setTabActiva] = useState('recursos');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [recursos, setRecursos] = useState(recursosIniciales);
  const [busqueda, setBusqueda] = useState('');
  const [form, setForm] = useState({
    titulo: '',
    tipo: 'documento',
    descripcion: '',
    grupo: 'ENG-C1',
    url: '',
  });

  const handlePublicar = () => {
    if (!form.titulo) return;
    const nuevo = {
      id: Date.now(),
      titulo: form.titulo,
      tipo: form.tipo,
      grupo: form.grupo,
      fecha: new Date().toISOString().split('T')[0],
      vistas: 0,
    };
    setRecursos([nuevo, ...recursos]);
    setForm({ titulo: '', tipo: 'documento', descripcion: '', grupo: 'ENG-C1', url: '' });
    setMostrarFormulario(false);
  };

  const handleEliminar = (id) => {
    setRecursos(recursos.filter(r => r.id !== id));
  };

  const alumnosFiltrados = alumnosData.filter(a =>
    a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    a.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-texto, #0f172a)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--doc-primario)" strokeWidth="2.5" width="24" height="24">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          {t('gestionContenidoTitulo')}
        </h2>
        {tabActiva === 'recursos' && (
          <button className="doc-btn-primario" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            {t('publicarNuevoRecurso')}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="doc-tabs">
        <button className={`doc-tab ${tabActiva === 'recursos' ? 'activo' : ''}`} onClick={() => setTabActiva('recursos')}>
          {t('recursosPublicados')}
        </button>
        <button className={`doc-tab ${tabActiva === 'alumnos' ? 'activo' : ''}`} onClick={() => setTabActiva('alumnos')}>
          {t('listaAlumnos')}
        </button>
      </div>

      {/* Formulario de nuevo recurso */}
      {mostrarFormulario && tabActiva === 'recursos' && (
        <div className="doc-seccion-card" style={{ border: '1.5px solid var(--doc-primario)', borderRadius: '14px' }}>
          <h3 className="doc-seccion-titulo" style={{ marginBottom: '16px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            {t('publicarNuevoRecurso')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="doc-form-grid">
              <div className="doc-form-grupo">
                <label className="doc-label">{t('tituloRecurso')}</label>
                <input
                  className="doc-input"
                  value={form.titulo}
                  onChange={e => setForm({ ...form, titulo: e.target.value })}
                  placeholder={t('tituloRecurso')}
                />
              </div>
              <div className="doc-form-grupo">
                <label className="doc-label">{t('tipoRecurso')}</label>
                <select className="doc-select" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
                  <option value="documento">{t('tipoDocumento')}</option>
                  <option value="video">{t('tipoVideo')}</option>
                  <option value="enlace">{t('tipoEnlace')}</option>
                  <option value="audio">{t('tipoAudio')}</option>
                </select>
              </div>
            </div>
            <div className="doc-form-grid">
              <div className="doc-form-grupo">
                <label className="doc-label">{t('grupoDestino')}</label>
                <select className="doc-select" value={form.grupo} onChange={e => setForm({ ...form, grupo: e.target.value })}>
                  <option value="ENG-C1">Inglés Avanzado – C1</option>
                  <option value="ENG-BUS">Conversación de Negocios – B2</option>
                  <option value="FRA-A1">Francés Básico – A1</option>
                  <option value="todos">{t('todosLosGrupos')}</option>
                </select>
              </div>
              <div className="doc-form-grupo">
                <label className="doc-label">{t('urlRecurso')}</label>
                <input
                  className="doc-input"
                  value={form.url}
                  onChange={e => setForm({ ...form, url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="doc-form-grupo">
              <label className="doc-label">{t('descripcionRecurso')}</label>
              <textarea
                className="doc-textarea"
                value={form.descripcion}
                onChange={e => setForm({ ...form, descripcion: e.target.value })}
                rows={3}
                placeholder={t('descripcionRecurso')}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="doc-btn-secundario" onClick={() => setMostrarFormulario(false)}>
                {t('cancelar')}
              </button>
              <button className="doc-btn-primario" onClick={handlePublicar}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                {t('publicar')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabla de recursos */}
      {tabActiva === 'recursos' && (
        <div className="doc-seccion-card">
          <h3 className="doc-seccion-titulo" style={{ marginBottom: '16px' }}>
            {t('recursosPublicados')} <span className="doc-badge doc-badge-teal">{recursos.length}</span>
          </h3>
          {recursos.length === 0 ? (
            <div className="doc-estado-vacio">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              </svg>
              <p>{t('sinRecursos')}</p>
            </div>
          ) : (
            <div className="doc-tabla-contenedor">
              <table className="doc-tabla">
                <thead>
                  <tr>
                    <th>{t('tipoRecurso')}</th>
                    <th>{t('tituloRecurso')}</th>
                    <th>{t('grupoDestino')}</th>
                    <th>{t('fechaPublicacion')}</th>
                    <th>{t('vistasRecurso')}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {recursos.map(r => (
                    <tr key={r.id}>
                      <td>
                        <span className="doc-badge doc-badge-teal" style={{ display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content' }}>
                          {TIPO_ICONOS[r.tipo]}
                          {r.tipo}
                        </span>
                      </td>
                      <td style={{ fontWeight: '600', maxWidth: '220px' }}>{r.titulo}</td>
                      <td>
                        <span className="doc-badge doc-badge-gris">{r.grupo}</span>
                      </td>
                      <td style={{ color: 'var(--color-secundario, #64748b)' }}>{r.fecha}</td>
                      <td style={{ fontWeight: '600' }}>{r.vistas}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button className="doc-btn-icono" title={t('editarRecurso')}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button className="doc-btn-peligro" title={t('eliminarRecurso')} onClick={() => handleEliminar(r.id)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6" />
                              <path d="M14 11v6" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Lista de alumnos */}
      {tabActiva === 'alumnos' && (
        <div className="doc-seccion-card">
          <div className="doc-seccion-header">
            <h3 className="doc-seccion-titulo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              {t('listaAlumnos')}
            </h3>
            <div className="doc-search-bar" style={{ width: '220px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                className="doc-search-input"
                placeholder={t('buscarAlumno')}
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
              />
            </div>
          </div>
          <div className="doc-tabla-contenedor">
            <table className="doc-tabla">
              <thead>
                <tr>
                  <th>{t('nombreAlumno')}</th>
                  <th>{t('grupoDestino')}</th>
                  <th>{t('progresoAlumno')}</th>
                  <th>{t('estadoAlumno')}</th>
                  <th>{t('accionAlumno')}</th>
                </tr>
              </thead>
              <tbody>
                {alumnosFiltrados.map(a => (
                  <tr key={a.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '34px', height: '34px', borderRadius: '50%',
                          background: 'var(--doc-gradiente)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: '700', fontSize: '13px', color: '#fff', flexShrink: 0,
                        }}>
                          {a.nombre.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '14px' }}>{a.nombre}</div>
                          <div style={{ fontSize: '12px', color: 'var(--color-secundario, #64748b)' }}>{a.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="doc-badge doc-badge-teal">{a.grupo}</span></td>
                    <td style={{ minWidth: '120px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="doc-barra-progreso" style={{ flex: 1 }}>
                          <div className="doc-barra-progreso-fill" style={{ width: `${a.progreso}%` }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--doc-primario)' }}>{a.progreso}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`doc-badge ${a.estado ? 'doc-badge-verde' : 'doc-badge-rojo'}`}>
                        {a.estado ? t('estadoActivo') : t('estadoInactivo')}
                      </span>
                    </td>
                    <td>
                      <button className="doc-btn-icono" title={t('verPerfil')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
