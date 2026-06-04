import React, { useState } from 'react';
import { useIdioma } from '../../contextos/IdiomaContexto';

const entregasData = [
  { id: 1, alumno: 'Ana García', actividad: 'Essay: My Career Goals', grupo: 'ENG-C1', fecha: '2026-06-03', puntaje: null, comentario: '', calificado: false, contenido: 'This essay explores my goals as a future language teacher...' },
  { id: 2, alumno: 'Carlos Mendoza', actividad: 'Business Email Writing', grupo: 'ENG-BUS', fecha: '2026-06-04', puntaje: null, comentario: '', calificado: false, contenido: 'Subject: Partnership Proposal — Dear Mr. Johnson...' },
  { id: 3, alumno: 'Sofía Torres', actividad: 'Business Email Writing', grupo: 'ENG-BUS', fecha: '2026-06-02', puntaje: null, comentario: '', calificado: false, contenido: 'Subject: Meeting Request — I am writing to schedule...' },
  { id: 4, alumno: 'Luis Hernández', actividad: 'Essay: My Career Goals', grupo: 'ENG-C1', fecha: '2026-06-01', puntaje: 88, comentario: 'Excelente estructura, buena gramática.', calificado: true, contenido: 'My main career goal is to become a polyglot diplomat...' },
  { id: 5, alumno: 'María López', actividad: 'Mid-term Listening Test', grupo: 'ENG-C1', fecha: '2026-05-19', puntaje: 95, comentario: 'Perfecta comprensión auditiva.', calificado: true, contenido: '[Test respondido automáticamente]' },
];

export default function CalificacionesDocente() {
  const { t } = useIdioma();
  const [tab, setTab] = useState('pendientes');
  const [entregas, setEntregas] = useState(entregasData);
  const [seleccionada, setSeleccionada] = useState(null);
  const [puntajeInput, setPuntajeInput] = useState('');
  const [comentarioInput, setComentarioInput] = useState('');
  const [toast, setToast] = useState(false);
  const [filtroActividad, setFiltroActividad] = useState('');
  const [filtroGrupo, setFiltroGrupo] = useState('');

  const pendientes = entregas.filter(e => !e.calificado);
  const historial = entregas.filter(e => e.calificado);
  const lista = tab === 'pendientes' ? pendientes : historial;

  const listaFiltrada = lista.filter(e => {
    const okActividad = !filtroActividad || e.actividad === filtroActividad;
    const okGrupo = !filtroGrupo || e.grupo === filtroGrupo;
    return okActividad && okGrupo;
  });

  const actividadesUnicas = [...new Set(entregasData.map(e => e.actividad))];
  const gruposUnicos = [...new Set(entregasData.map(e => e.grupo))];

  const guardarCalificacion = () => {
    if (!seleccionada || puntajeInput === '') return;
    setEntregas(prev =>
      prev.map(e =>
        e.id === seleccionada.id
          ? { ...e, puntaje: parseInt(puntajeInput), comentario: comentarioInput, calificado: true }
          : e
      )
    );
    setSeleccionada(null);
    setPuntajeInput('');
    setComentarioInput('');
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  const exportarCSV = () => {
    const rows = [
      ['Alumno', 'Actividad', 'Grupo', 'Fecha', 'Puntaje', 'Comentario'],
      ...historial.map(e => [e.alumno, e.actividad, e.grupo, e.fecha, e.puntaje, e.comentario]),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calificaciones.csv';
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Toast */}
      {toast && <div className="doc-toast">{t('calificacionGuardada')}</div>}

      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-texto, #0f172a)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--doc-primario)" strokeWidth="2.5" width="24" height="24">
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          {t('calificacionesTitulo')}
        </h2>
        {tab === 'historial' && (
          <button className="doc-btn-secundario" onClick={exportarCSV}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {t('exportarCalificaciones')}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="doc-tabs">
        <button className={`doc-tab ${tab === 'pendientes' ? 'activo' : ''}`} onClick={() => setTab('pendientes')}>
          {t('entregasPendientes')} <span className="doc-badge doc-badge-naranja" style={{ marginLeft: '6px' }}>{pendientes.length}</span>
        </button>
        <button className={`doc-tab ${tab === 'historial' ? 'activo' : ''}`} onClick={() => setTab('historial')}>
          {t('historialCalificaciones')} <span className="doc-badge doc-badge-verde" style={{ marginLeft: '6px' }}>{historial.length}</span>
        </button>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <select className="doc-select" style={{ width: 'auto', minWidth: '180px' }} value={filtroActividad} onChange={e => setFiltroActividad(e.target.value)}>
          <option value="">{t('todasLasActividades')}</option>
          {actividadesUnicas.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select className="doc-select" style={{ width: 'auto', minWidth: '140px' }} value={filtroGrupo} onChange={e => setFiltroGrupo(e.target.value)}>
          <option value="">{t('todosLosGrupos')}</option>
          {gruposUnicos.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Lista de entregas */}
        <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {listaFiltrada.length === 0 ? (
            <div className="doc-seccion-card">
              <div className="doc-estado-vacio">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                <p>{tab === 'pendientes' ? t('sinEntregas') : t('sinEntregas')}</p>
              </div>
            </div>
          ) : listaFiltrada.map(e => (
            <div
              key={e.id}
              className="doc-seccion-card"
              onClick={() => { setSeleccionada(e); setPuntajeInput(e.puntaje || ''); setComentarioInput(e.comentario || ''); }}
              style={{
                cursor: 'pointer', padding: '16px',
                borderColor: seleccionada?.id === e.id ? 'var(--doc-primario)' : undefined,
                boxShadow: seleccionada?.id === e.id ? '0 0 0 2px var(--doc-primario-light)' : undefined,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '4px' }}>{e.alumno}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-secundario, #64748b)' }}>{e.actividad}</div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
                    <span className="doc-badge doc-badge-teal">{e.grupo}</span>
                    <span style={{ fontSize: '11px', color: 'var(--color-secundario, #94a3b8)' }}>📅 {e.fecha}</span>
                  </div>
                </div>
                {e.calificado ? (
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--doc-primario)' }}>{e.puntaje}</div>
                    <div style={{ fontSize: '10px', color: 'var(--color-secundario)' }}>pts</div>
                  </div>
                ) : (
                  <span className="doc-badge doc-badge-naranja">{t('pendiente')}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Panel de calificación */}
        {seleccionada && (
          <div className="doc-seccion-card" style={{ flex: 1, minWidth: '280px', maxWidth: '380px', height: 'fit-content' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '14px', color: 'var(--color-texto, #0f172a)' }}>
              {t('verEntrega')}
            </h3>
            <div style={{ fontSize: '13px', color: 'var(--color-secundario, #64748b)', marginBottom: '8px' }}>
              <strong style={{ color: 'var(--color-texto, #0f172a)' }}>{seleccionada.alumno}</strong> — {seleccionada.actividad}
            </div>
            <div style={{ background: 'var(--color-fondo, #f0fdfa)', borderRadius: '8px', padding: '14px', fontSize: '13px', color: 'var(--color-texto, #0f172a)', marginBottom: '16px', lineHeight: '1.6', border: '1px solid var(--color-borde, #e2e8f0)', minHeight: '80px' }}>
              {seleccionada.contenido}
            </div>
            <div className="doc-form-grupo" style={{ marginBottom: '12px' }}>
              <label className="doc-label">{t('puntaje')} (0–100)</label>
              <input
                className="doc-input"
                type="number"
                min="0"
                max="100"
                value={puntajeInput}
                onChange={e => setPuntajeInput(e.target.value)}
                placeholder="0–100"
              />
            </div>
            <div className="doc-form-grupo" style={{ marginBottom: '16px' }}>
              <label className="doc-label">{t('comentario')}</label>
              <textarea
                className="doc-textarea"
                rows={3}
                value={comentarioInput}
                onChange={e => setComentarioInput(e.target.value)}
                placeholder={t('comentario')}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="doc-btn-secundario" onClick={() => setSeleccionada(null)} style={{ flex: 1 }}>
                {t('cancelar')}
              </button>
              <button className="doc-btn-primario" onClick={guardarCalificacion} style={{ flex: 2 }}>
                {t('guardarCalificacion')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
