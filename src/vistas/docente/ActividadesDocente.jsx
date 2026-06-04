import React, { useState } from 'react';
import { useIdioma } from '../../contextos/IdiomaContexto';

const actividadesIniciales = [
  { id: 1, titulo: 'Essay: My Career Goals', tipo: 'tarea', grupo: 'ENG-C1', fechaLimite: '2026-06-10', puntaje: 100, entregas: 14, total: 18, cerrada: false },
  { id: 2, titulo: 'Business Email Writing', tipo: 'tarea', grupo: 'ENG-BUS', fechaLimite: '2026-06-08', puntaje: 50, entregas: 10, total: 12, cerrada: false },
  { id: 3, titulo: 'Test: Vocabulaire de Base', tipo: 'test', grupo: 'FRA-A1', fechaLimite: '2026-06-05', puntaje: 100, entregas: 17, total: 17, cerrada: true },
  { id: 4, titulo: 'Mid-term Listening Test', tipo: 'test', grupo: 'ENG-C1', fechaLimite: '2026-05-20', puntaje: 80, entregas: 18, total: 18, cerrada: true },
];

export default function ActividadesDocente() {
  const { t } = useIdioma();
  const [tabActiva, setTabActiva] = useState('activas');
  const [tipoForm, setTipoForm] = useState(null); // 'tarea' | 'test' | null
  const [actividades, setActividades] = useState(actividadesIniciales);
  const [form, setForm] = useState({
    titulo: '', grupo: 'ENG-C1', instrucciones: '', fechaLimite: '', puntaje: '100',
  });
  const [preguntas, setPreguntas] = useState([
    { enunciado: '', opciones: ['', '', '', ''], correcta: 0 },
  ]);

  const activas = actividades.filter(a => !a.cerrada);
  const cerradas = actividades.filter(a => a.cerrada);
  const lista = tabActiva === 'activas' ? activas : cerradas;

  const handleCrear = () => {
    if (!form.titulo) return;
    const nueva = {
      id: Date.now(),
      titulo: form.titulo,
      tipo: tipoForm,
      grupo: form.grupo,
      fechaLimite: form.fechaLimite || '2026-12-31',
      puntaje: parseInt(form.puntaje) || 100,
      entregas: 0,
      total: tipoForm === 'tarea' ? 18 : 17,
      cerrada: false,
    };
    setActividades([nueva, ...actividades]);
    setForm({ titulo: '', grupo: 'ENG-C1', instrucciones: '', fechaLimite: '', puntaje: '100' });
    setPreguntas([{ enunciado: '', opciones: ['', '', '', ''], correcta: 0 }]);
    setTipoForm(null);
  };

  const agregarPregunta = () => {
    setPreguntas([...preguntas, { enunciado: '', opciones: ['', '', '', ''], correcta: 0 }]);
  };

  const actualizarPregunta = (idx, campo, valor) => {
    const copia = [...preguntas];
    if (campo === 'enunciado') copia[idx].enunciado = valor;
    else if (campo === 'correcta') copia[idx].correcta = valor;
    setPreguntas(copia);
  };

  const actualizarOpcion = (pIdx, oIdx, valor) => {
    const copia = [...preguntas];
    copia[pIdx].opciones[oIdx] = valor;
    setPreguntas(copia);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-texto, #0f172a)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--doc-primario)" strokeWidth="2.5" width="24" height="24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
          </svg>
          {t('actividadesTitulo')}
        </h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="doc-btn-secundario" onClick={() => setTipoForm('tarea')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            {t('nuevaTarea')}
          </button>
          <button className="doc-btn-primario" onClick={() => setTipoForm('test')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            {t('nuevaEvaluacion')}
          </button>
        </div>
      </div>

      {/* Formulario de tarea */}
      {tipoForm === 'tarea' && (
        <div className="doc-seccion-card" style={{ border: '1.5px solid var(--doc-primario)' }}>
          <h3 className="doc-seccion-titulo" style={{ marginBottom: '16px' }}>{t('nuevaTarea')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="doc-form-grid">
              <div className="doc-form-grupo">
                <label className="doc-label">{t('tituloActividad')}</label>
                <input className="doc-input" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} placeholder={t('tituloActividad')} />
              </div>
              <div className="doc-form-grupo">
                <label className="doc-label">{t('grupoDestino')}</label>
                <select className="doc-select" value={form.grupo} onChange={e => setForm({ ...form, grupo: e.target.value })}>
                  <option value="ENG-C1">Inglés Avanzado – C1</option>
                  <option value="ENG-BUS">Conversación de Negocios – B2</option>
                  <option value="FRA-A1">Francés Básico – A1</option>
                </select>
              </div>
            </div>
            <div className="doc-form-grid">
              <div className="doc-form-grupo">
                <label className="doc-label">{t('fechaLimite')}</label>
                <input className="doc-input" type="date" value={form.fechaLimite} onChange={e => setForm({ ...form, fechaLimite: e.target.value })} />
              </div>
              <div className="doc-form-grupo">
                <label className="doc-label">{t('puntajeMaximo')}</label>
                <input className="doc-input" type="number" value={form.puntaje} onChange={e => setForm({ ...form, puntaje: e.target.value })} min="1" max="200" />
              </div>
            </div>
            <div className="doc-form-grupo">
              <label className="doc-label">{t('instrucciones')}</label>
              <textarea className="doc-textarea" value={form.instrucciones} onChange={e => setForm({ ...form, instrucciones: e.target.value })} placeholder={t('instrucciones')} rows={4} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="doc-btn-secundario" onClick={() => setTipoForm(null)}>{t('cancelar')}</button>
              <button className="doc-btn-primario" onClick={handleCrear}>{t('crearTarea')}</button>
            </div>
          </div>
        </div>
      )}

      {/* Formulario de test */}
      {tipoForm === 'test' && (
        <div className="doc-seccion-card" style={{ border: '1.5px solid var(--doc-primario)' }}>
          <h3 className="doc-seccion-titulo" style={{ marginBottom: '16px' }}>{t('nuevaEvaluacion')}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="doc-form-grid">
              <div className="doc-form-grupo">
                <label className="doc-label">{t('tituloActividad')}</label>
                <input className="doc-input" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} placeholder={t('tituloActividad')} />
              </div>
              <div className="doc-form-grupo">
                <label className="doc-label">{t('grupoDestino')}</label>
                <select className="doc-select" value={form.grupo} onChange={e => setForm({ ...form, grupo: e.target.value })}>
                  <option value="ENG-C1">Inglés Avanzado – C1</option>
                  <option value="ENG-BUS">Conversación de Negocios – B2</option>
                  <option value="FRA-A1">Francés Básico – A1</option>
                </select>
              </div>
            </div>
            <div className="doc-form-grid">
              <div className="doc-form-grupo">
                <label className="doc-label">{t('fechaLimite')}</label>
                <input className="doc-input" type="date" value={form.fechaLimite} onChange={e => setForm({ ...form, fechaLimite: e.target.value })} />
              </div>
              <div className="doc-form-grupo">
                <label className="doc-label">{t('puntajeMaximo')}</label>
                <input className="doc-input" type="number" value={form.puntaje} onChange={e => setForm({ ...form, puntaje: e.target.value })} />
              </div>
            </div>

            {/* Preguntas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {preguntas.map((preg, pIdx) => (
                <div key={pIdx} style={{ background: 'var(--color-fondo, #f0fdfa)', borderRadius: '10px', padding: '16px', border: '1px solid var(--color-borde, #e2e8f0)' }}>
                  <div className="doc-form-grupo" style={{ marginBottom: '12px' }}>
                    <label className="doc-label">{t('pregunta')} {pIdx + 1}</label>
                    <input
                      className="doc-input"
                      value={preg.enunciado}
                      onChange={e => actualizarPregunta(pIdx, 'enunciado', e.target.value)}
                      placeholder={`${t('pregunta')} ${pIdx + 1}`}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {preg.opciones.map((op, oIdx) => (
                      <div key={oIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="radio"
                          name={`correcta-${pIdx}`}
                          checked={preg.correcta === oIdx}
                          onChange={() => actualizarPregunta(pIdx, 'correcta', oIdx)}
                          style={{ accentColor: 'var(--doc-primario)' }}
                        />
                        <input
                          className="doc-input"
                          value={op}
                          onChange={e => actualizarOpcion(pIdx, oIdx, e.target.value)}
                          placeholder={`${t('opcion')} ${oIdx + 1}`}
                          style={{ flex: 1 }}
                        />
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--doc-primario)', marginTop: '8px' }}>
                    ● {t('respuestaCorrecta')}
                  </p>
                </div>
              ))}
            </div>

            <button className="doc-btn-secundario" onClick={agregarPregunta} style={{ alignSelf: 'flex-start' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              {t('agregarPregunta')}
            </button>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="doc-btn-secundario" onClick={() => setTipoForm(null)}>{t('cancelar')}</button>
              <button className="doc-btn-primario" onClick={handleCrear}>{t('crearEvaluacion')}</button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="doc-tabs">
        <button className={`doc-tab ${tabActiva === 'activas' ? 'activo' : ''}`} onClick={() => setTabActiva('activas')}>
          {t('actividadesActivas')} <span className="doc-badge doc-badge-teal" style={{ marginLeft: '6px' }}>{activas.length}</span>
        </button>
        <button className={`doc-tab ${tabActiva === 'cerradas' ? 'activo' : ''}`} onClick={() => setTabActiva('cerradas')}>
          {t('actividadesCerradas')} <span className="doc-badge doc-badge-gris" style={{ marginLeft: '6px' }}>{cerradas.length}</span>
        </button>
      </div>

      {/* Lista de actividades */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {lista.length === 0 ? (
          <div className="doc-seccion-card">
            <div className="doc-estado-vacio">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg>
              <p>{t('sinActividades')}</p>
            </div>
          </div>
        ) : lista.map(act => (
          <div key={act.id} className="doc-seccion-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', padding: '18px 24px' }}>
            <div style={{ display: 'flex', flex: 1, alignItems: 'flex-start', gap: '12px', minWidth: 0 }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0,
                background: act.tipo === 'test' ? 'var(--doc-primario-light)' : 'rgba(16,185,129,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: act.tipo === 'test' ? 'var(--doc-primario)' : '#059669',
              }}>
                {act.tipo === 'test' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                )}
              </div>
              <div style={{ minWidth: 0 }}>
                <h4 style={{ fontWeight: '700', fontSize: '15px', color: 'var(--color-texto, #0f172a)', marginBottom: '4px' }}>{act.titulo}</h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <span className={`doc-badge ${act.tipo === 'test' ? 'doc-badge-teal' : 'doc-badge-verde'}`}>
                    {act.tipo === 'test' ? t('tipoTest') : t('tipoTarea')}
                  </span>
                  <span className="doc-badge doc-badge-gris">{act.grupo}</span>
                  <span style={{ fontSize: '12px', color: 'var(--color-secundario, #64748b)' }}>
                    📅 {act.fechaLimite}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-secundario, #64748b)' }}>
                    🏆 {act.puntaje} pts
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--doc-primario)' }}>{act.entregas}/{act.total}</div>
                <div style={{ fontSize: '11px', color: 'var(--color-secundario, #64748b)' }}>{t('entregasRecibidas')}</div>
              </div>
              <div className="doc-barra-progreso" style={{ width: '80px' }}>
                <div className="doc-barra-progreso-fill" style={{ width: `${(act.entregas / act.total) * 100}%` }} />
              </div>
              <button className="doc-btn-secundario" style={{ fontSize: '13px', padding: '7px 12px' }}>
                {t('verEntregas')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
