import React, { useState } from 'react';
import { useIdioma } from '../../contextos/IdiomaContexto';

const mensajesIniciales = [
  { id: 1, remitente: 'Ana García', inicial: 'A', asunto: 'Consulta sobre el Essay', cuerpo: 'Hola profesor, tenía una duda sobre el formato del ensayo...', fecha: '2026-06-03', leido: false },
  { id: 2, remitente: 'Carlos Mendoza', inicial: 'C', asunto: 'Problema con el acceso', cuerpo: 'No puedo abrir el enlace de recursos, me aparece error 404.', fecha: '2026-06-02', leido: false },
  { id: 3, remitente: 'Sofía Torres', inicial: 'S', asunto: 'Feedback del test', cuerpo: 'Muchas gracias por la retroalimentación, fue muy útil!', fecha: '2026-06-01', leido: true },
  { id: 4, remitente: 'Luis Hernández', inicial: 'L', asunto: 'Solicitud de tutoría', cuerpo: 'Me gustaría agendar una sesión de práctica de conversación.', fecha: '2026-05-30', leido: true },
];

const videoclasesIniciales = [
  { id: 1, titulo: 'Clase de Repaso – C1 Avanzado', grupo: 'ENG-C1', fecha: '2026-06-06', hora: '18:00', enlace: 'https://meet.google.com/abc-defg-hij' },
  { id: 2, titulo: 'Business Presentations – B2', grupo: 'ENG-BUS', fecha: '2026-06-07', hora: '19:30', enlace: 'https://meet.google.com/xyz-abcd-efg' },
];

export default function ComunicacionDocente() {
  const { t } = useIdioma();
  const [tab, setTab] = useState('mensajes');
  const [mensajes, setMensajes] = useState(mensajesIniciales);
  const [videoclases, setVideoclases] = useState(videoclasesIniciales);
  const [mensajeSel, setMensajeSel] = useState(null);
  const [mostrarNuevoMsg, setMostrarNuevoMsg] = useState(false);
  const [mostrarNuevaVC, setMostrarNuevaVC] = useState(false);
  const [respuestaTexto, setRespuestaTexto] = useState('');
  const [copiado, setCopiado] = useState(null);
  const [formMsg, setFormMsg] = useState({ destinatario: '', asunto: '', cuerpo: '' });
  const [formVC, setFormVC] = useState({ titulo: '', grupo: 'ENG-C1', fecha: '', hora: '', enlace: '' });

  const handleLeer = (msg) => {
    setMensajeSel(msg);
    setMensajes(prev => prev.map(m => m.id === msg.id ? { ...m, leido: true } : m));
    setRespuestaTexto('');
  };

  const handleResponder = () => {
    if (!respuestaTexto) return;
    alert(`${t('enviar')} → ${mensajeSel.remitente}: "${respuestaTexto}"`);
    setRespuestaTexto('');
  };

  const handleEnviarNuevo = () => {
    if (!formMsg.destinatario || !formMsg.asunto) return;
    const nuevo = {
      id: Date.now(),
      remitente: `→ ${formMsg.destinatario}`,
      inicial: formMsg.destinatario.charAt(0).toUpperCase(),
      asunto: formMsg.asunto,
      cuerpo: formMsg.cuerpo,
      fecha: new Date().toISOString().split('T')[0],
      leido: true,
    };
    setMensajes([nuevo, ...mensajes]);
    setFormMsg({ destinatario: '', asunto: '', cuerpo: '' });
    setMostrarNuevoMsg(false);
  };

  const handleAgendarVC = () => {
    if (!formVC.titulo) return;
    const nueva = {
      id: Date.now(),
      titulo: formVC.titulo,
      grupo: formVC.grupo,
      fecha: formVC.fecha || '2026-12-01',
      hora: formVC.hora || '18:00',
      enlace: formVC.enlace || `https://meet.google.com/${Math.random().toString(36).substring(2, 8)}`,
    };
    setVideoclases([nueva, ...videoclases]);
    setFormVC({ titulo: '', grupo: 'ENG-C1', fecha: '', hora: '', enlace: '' });
    setMostrarNuevaVC(false);
  };

  const copiarEnlace = (id, enlace) => {
    navigator.clipboard.writeText(enlace).catch(() => {});
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2000);
  };

  const noLeidos = mensajes.filter(m => !m.leido).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-texto, #0f172a)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--doc-primario)" strokeWidth="2.5" width="24" height="24">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          {t('comunicacionTitulo')}
        </h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          {tab === 'mensajes' && (
            <button className="doc-btn-primario" onClick={() => setMostrarNuevoMsg(!mostrarNuevoMsg)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              {t('nuevoMensaje')}
            </button>
          )}
          {tab === 'videoclases' && (
            <button className="doc-btn-primario" onClick={() => setMostrarNuevaVC(!mostrarNuevaVC)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
              {t('agendarVideoclase')}
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="doc-tabs">
        <button className={`doc-tab ${tab === 'mensajes' ? 'activo' : ''}`} onClick={() => setTab('mensajes')}>
          {t('mensajes')}
          {noLeidos > 0 && <span className="doc-badge doc-badge-teal" style={{ marginLeft: '6px' }}>{noLeidos}</span>}
        </button>
        <button className={`doc-tab ${tab === 'videoclases' ? 'activo' : ''}`} onClick={() => setTab('videoclases')}>
          {t('videoclases')}
        </button>
      </div>

      {/* ── MENSAJES ── */}
      {tab === 'mensajes' && (
        <>
          {/* Formulario nuevo mensaje */}
          {mostrarNuevoMsg && (
            <div className="doc-seccion-card" style={{ border: '1.5px solid var(--doc-primario)' }}>
              <h3 className="doc-seccion-titulo" style={{ marginBottom: '14px' }}>{t('nuevoMensaje')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="doc-form-grid">
                  <div className="doc-form-grupo">
                    <label className="doc-label">{t('destinatario')}</label>
                    <input className="doc-input" placeholder={t('destinatario')} value={formMsg.destinatario} onChange={e => setFormMsg({ ...formMsg, destinatario: e.target.value })} />
                  </div>
                  <div className="doc-form-grupo">
                    <label className="doc-label">{t('asunto')}</label>
                    <input className="doc-input" placeholder={t('asunto')} value={formMsg.asunto} onChange={e => setFormMsg({ ...formMsg, asunto: e.target.value })} />
                  </div>
                </div>
                <div className="doc-form-grupo">
                  <label className="doc-label">{t('cuerpoMensaje')}</label>
                  <textarea className="doc-textarea" rows={4} placeholder={t('cuerpoMensaje')} value={formMsg.cuerpo} onChange={e => setFormMsg({ ...formMsg, cuerpo: e.target.value })} />
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button className="doc-btn-secundario" onClick={() => setMostrarNuevoMsg(false)}>{t('cancelar')}</button>
                  <button className="doc-btn-primario" onClick={handleEnviarNuevo}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    {t('enviar')}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {/* Lista de mensajes */}
            <div style={{ flex: 1, minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-secundario, #64748b)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {t('mensajesRecibidos')}
              </h3>
              {mensajes.length === 0 ? (
                <div className="doc-seccion-card">
                  <div className="doc-estado-vacio">
                    <p>{t('sinMensajes')}</p>
                  </div>
                </div>
              ) : mensajes.map(msg => (
                <div
                  key={msg.id}
                  className={`doc-mensaje-card ${!msg.leido ? 'no-leido' : ''}`}
                  onClick={() => handleLeer(msg)}
                  style={{ borderLeftColor: mensajeSel?.id === msg.id ? 'var(--doc-acento)' : undefined }}
                >
                  <div className="doc-mensaje-avatar">{msg.inicial}</div>
                  <div className="doc-mensaje-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="doc-mensaje-remitente" style={{ fontWeight: !msg.leido ? '700' : '600' }}>
                        {msg.remitente}
                      </span>
                      <span className="doc-mensaje-fecha">{msg.fecha}</span>
                    </div>
                    <div className="doc-mensaje-asunto">{msg.asunto}</div>
                    {!msg.leido && (
                      <span className="doc-badge doc-badge-teal" style={{ marginTop: '4px', fontSize: '10px' }}>Nuevo</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Panel de lectura */}
            {mensajeSel && (
              <div className="doc-seccion-card" style={{ flex: 1, minWidth: '260px', maxWidth: '400px', height: 'fit-content' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'flex-start' }}>
                  <div className="doc-mensaje-avatar" style={{ flexShrink: 0 }}>{mensajeSel.inicial}</div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--color-texto, #0f172a)' }}>{mensajeSel.remitente}</div>
                    <div style={{ fontSize: '13px', color: 'var(--color-secundario, #64748b)' }}>{mensajeSel.asunto}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-secundario, #94a3b8)' }}>{mensajeSel.fecha}</div>
                  </div>
                </div>
                <div style={{ background: 'var(--color-fondo, #f0fdfa)', borderRadius: '10px', padding: '16px', fontSize: '14px', color: 'var(--color-texto, #0f172a)', lineHeight: '1.7', marginBottom: '16px', border: '1px solid var(--color-borde, #e2e8f0)' }}>
                  {mensajeSel.cuerpo}
                </div>
                <div className="doc-form-grupo">
                  <label className="doc-label">{t('responder')}</label>
                  <textarea className="doc-textarea" rows={3} placeholder={`${t('responder')} a ${mensajeSel.remitente}...`} value={respuestaTexto} onChange={e => setRespuestaTexto(e.target.value)} />
                </div>
                <button className="doc-btn-primario" style={{ marginTop: '10px', width: '100%' }} onClick={handleResponder}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  {t('enviar')}
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── VIDEOCLASES ── */}
      {tab === 'videoclases' && (
        <>
          {/* Formulario agendar */}
          {mostrarNuevaVC && (
            <div className="doc-seccion-card" style={{ border: '1.5px solid var(--doc-primario)' }}>
              <h3 className="doc-seccion-titulo" style={{ marginBottom: '14px' }}>{t('agendarVideoclase')}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="doc-form-grid">
                  <div className="doc-form-grupo">
                    <label className="doc-label">{t('tituloVideoclase')}</label>
                    <input className="doc-input" placeholder={t('tituloVideoclase')} value={formVC.titulo} onChange={e => setFormVC({ ...formVC, titulo: e.target.value })} />
                  </div>
                  <div className="doc-form-grupo">
                    <label className="doc-label">{t('grupoDestino')}</label>
                    <select className="doc-select" value={formVC.grupo} onChange={e => setFormVC({ ...formVC, grupo: e.target.value })}>
                      <option value="ENG-C1">Inglés Avanzado – C1</option>
                      <option value="ENG-BUS">Conversación de Negocios – B2</option>
                      <option value="FRA-A1">Francés Básico – A1</option>
                    </select>
                  </div>
                </div>
                <div className="doc-form-grid">
                  <div className="doc-form-grupo">
                    <label className="doc-label">{t('fechaHora')} – Fecha</label>
                    <input className="doc-input" type="date" value={formVC.fecha} onChange={e => setFormVC({ ...formVC, fecha: e.target.value })} />
                  </div>
                  <div className="doc-form-grupo">
                    <label className="doc-label">{t('fechaHora')} – Hora</label>
                    <input className="doc-input" type="time" value={formVC.hora} onChange={e => setFormVC({ ...formVC, hora: e.target.value })} />
                  </div>
                </div>
                <div className="doc-form-grupo">
                  <label className="doc-label">{t('enlaceReunion')}</label>
                  <input className="doc-input" placeholder="https://meet.google.com/..." value={formVC.enlace} onChange={e => setFormVC({ ...formVC, enlace: e.target.value })} />
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button className="doc-btn-secundario" onClick={() => setMostrarNuevaVC(false)}>{t('cancelar')}</button>
                  <button className="doc-btn-primario" onClick={handleAgendarVC}>{t('agendarVideoclase')}</button>
                </div>
              </div>
            </div>
          )}

          {/* Lista de videoclases */}
          <div className="doc-seccion-card">
            <h3 className="doc-seccion-titulo" style={{ marginBottom: '16px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
              {t('proximasVideoclases')}
            </h3>
            {videoclases.length === 0 ? (
              <div className="doc-estado-vacio">
                <p>{t('sinVideoclases')}</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {videoclases.map(vc => (
                  <div key={vc.id} className="doc-videoclase-card">
                    <div className="doc-videoclase-info">
                      <div className="doc-videoclase-titulo">{vc.titulo}</div>
                      <div className="doc-videoclase-fecha">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {vc.fecha} – {vc.hora}
                        <span className="doc-badge doc-badge-teal" style={{ marginLeft: '6px' }}>{vc.grupo}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-secundario, #64748b)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                        {vc.enlace}
                      </div>
                    </div>
                    <div className="doc-videoclase-acciones">
                      <button
                        className="doc-btn-secundario"
                        onClick={() => copiarEnlace(vc.id, vc.enlace)}
                        style={{ fontSize: '13px', padding: '7px 12px' }}
                      >
                        {copiado === vc.id ? (
                          <>✓ {t('enlaceCopiado')}</>
                        ) : (
                          <>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            {t('copiarEnlace')}
                          </>
                        )}
                      </button>
                      <button className="doc-btn-primario" style={{ fontSize: '13px', padding: '7px 14px' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        {t('iniciarClase')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
