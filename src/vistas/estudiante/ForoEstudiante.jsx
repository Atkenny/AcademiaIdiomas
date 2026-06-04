import React, { useState, useRef, useEffect, useCallback } from 'react';

/* ── DATOS INICIALES ─────────────────────────────────── */
const CANALES = [
  { id: 'GENERAL',  label: 'General',        icono: '💬', color: '#6366f1', descripcion: 'Discusiones generales para toda la comunidad de la academia.' },
  { id: 'INGLES',   label: 'Dudas de Inglés', icono: '🇬🇧', color: '#0284c7', descripcion: 'Resuelve tus dudas de inglés con profesores y compañeros.' },
  { id: 'FRANCES',  label: 'Club de Francés', icono: '🇫🇷', color: '#dc2626', descripcion: 'Practica el francés, comparte recursos y consejos.' },
  { id: 'ITALIANO', label: 'Italiano',        icono: '🇮🇹', color: '#16a34a', descripcion: 'Espacio de práctica e intercambio sobre el idioma italiano.' },
  { id: 'RECURSOS', label: 'Recursos',        icono: '📚', color: '#d97706', descripcion: 'Comparte y descarga materiales de estudio útiles.' },
];

const AVATARES = {
  estudiante_ana:    { inicial: 'A', color: '#6366f1' },
  estudiante_pedro:  { inicial: 'P', color: '#0284c7' },
  estudiante_sofia:  { inicial: 'S', color: '#ec4899' },
  estudiante_juan:   { inicial: 'J', color: '#16a34a' },
  estudiante_lucas:  { inicial: 'L', color: '#d97706' },
  docente_carlos:    { inicial: 'C', color: '#0f172a', esDocente: true },
  docente_sophie:    { inicial: 'S', color: '#9f1239', esDocente: true },
  'tú (estudiante)': { inicial: 'T', color: '#7c3aed' },
};

const getAvatar = (autor) => AVATARES[autor] || { inicial: autor[0]?.toUpperCase() || '?', color: '#475569' };

const HILOS_INICIALES = {
  GENERAL: [
    {
      id: 101, titulo: 'Consejos para mejorar la fluidez al hablar', autor: 'estudiante_ana',
      fecha: 'Hace 2 horas', fechaCompleta: '4 Jun 2026, 06:30',
      descripcion: 'Hola a todos, me cuesta mucho soltarme al hablar en público en las clases conversacionales de inglés. ¿Alguien tiene técnicas o consejos que le hayan funcionado?',
      etiqueta: 'Consejo', etiquetaColor: '#6366f1', etiquetaBg: '#e0e7ff',
      respuestasCount: 2,
      comentarios: [
        { id: 1, autor: 'estudiante_juan',  fecha: 'Hace 1 hora',  texto: 'A mí me sirvió mucho hablar solo frente al espejo o grabarme en audios cortos todos los días. También ver series en versión original con subtítulos en inglés ayuda muchísimo.' },
        { id: 2, autor: 'docente_carlos',   fecha: 'Hace 30 min', texto: '¡Hola Ana! Un gran consejo es enfocarse primero en transmitir la idea antes de preocuparse por la gramática perfecta. Equivocarse es parte vital del proceso de aprendizaje. ¡Sigue adelante!' }
      ]
    },
    {
      id: 102, titulo: 'Reunión de estudio grupal este sábado', autor: 'estudiante_pedro',
      fecha: 'Ayer', fechaCompleta: '3 Jun 2026, 16:00',
      descripcion: 'Estaremos repasando en biblioteca los temas gramaticales de la unidad 4 para el examen final. ¿Quién se une? Llevaremos material impreso.',
      etiqueta: 'Evento', etiquetaColor: '#d97706', etiquetaBg: '#fff4e1',
      respuestasCount: 1,
      comentarios: [
        { id: 1, autor: 'estudiante_sofia', fecha: 'Ayer', texto: '¡Me anoto! Llevaré mis apuntes de phrasal verbs y ejercicios de pronunciación.' }
      ]
    }
  ],
  INGLES: [
    {
      id: 201, titulo: 'Duda con el uso de "Inversion" en C1', autor: 'estudiante_sofia',
      fecha: 'Hace 3 días', fechaCompleta: '1 Jun 2026, 11:20',
      descripcion: '¿Cuándo es correcto invertir el verbo auxiliar al inicio en estructuras negativas? ¿Es solo para escritura formal?',
      etiqueta: 'Gramática', etiquetaColor: '#0284c7', etiquetaBg: '#e0f2fe',
      respuestasCount: 1,
      comentarios: [
        { id: 1, autor: 'docente_carlos', fecha: 'Hace 2 días', texto: 'Hola Sofía. La inversión se usa principalmente en contextos formales escritos y literarios para dar énfasis, pero también es común en discursos hablados muy estructurados (ej. "Never have I seen..."). Siempre requiere un adverbio negativo o restrictivo al inicio.' }
      ]
    }
  ],
  FRANCES: [
    {
      id: 301, titulo: 'Les meilleurs podcasts pour pratiquer le français B2', autor: 'estudiante_lucas',
      fecha: 'Hace 5 días', fechaCompleta: '30 May 2026, 09:00',
      descripcion: 'Je cherche des recommandations de podcasts intéressants pour améliorer ma compréhension orale. Quelqu\'un a des suggestions ?',
      etiqueta: 'Recursos', etiquetaColor: '#dc2626', etiquetaBg: '#fff1f2',
      respuestasCount: 1,
      comentarios: [
        { id: 1, autor: 'docente_sophie', fecha: 'Hace 4 días', texto: 'Je te recommande vivement "InnerFrench" et "Journal en français facile" de RFI. C\'est parfait pour le niveau B2 !' }
      ]
    }
  ],
  ITALIANO: [],
  RECURSOS: [],
};

const MIEMBROS_EN_LINEA = [
  { nombre: 'docente_carlos', esDocente: true },
  { nombre: 'docente_sophie', esDocente: true },
  { nombre: 'estudiante_ana' },
  { nombre: 'estudiante_pedro' },
  { nombre: 'estudiante_sofia' },
];

/* ── COMPONENTE PRINCIPAL ────────────────────────────── */
export default function ForoEstudiante() {
  const [canalActivo, setCanalActivo] = useState('GENERAL');
  const [hiloActivo, setHiloActivo] = useState(null);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevoContenido, setNuevoContenido] = useState('');
  const [modalNuevoHilo, setModalNuevoHilo] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarMiembros, setMostrarMiembros] = useState(true);
  const [sidebarMovilAbierto, setSidebarMovilAbierto] = useState(false);
  const comentariosRef = useRef(null);

  const [canalesData, setCanalesData] = useState(HILOS_INICIALES);

  const canalInfo = CANALES.find(c => c.id === canalActivo);
  const hilosActuales = (canalesData[canalActivo] || []).filter(h =>
    !busqueda || h.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    h.autor.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Scroll automático al agregar comentario
  useEffect(() => {
    if (hiloActivo && comentariosRef.current) {
      comentariosRef.current.scrollTop = comentariosRef.current.scrollHeight;
    }
  }, [hiloActivo?.comentarios?.length]);

  const publicarComentario = (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;
    const nuevo = { id: Date.now(), autor: 'tú (estudiante)', fecha: 'Hace un momento', texto: nuevoComentario.trim() };
    setCanalesData(prev => {
      const actualizados = (prev[canalActivo] || []).map(h =>
        h.id === hiloActivo.id
          ? { ...h, respuestasCount: h.respuestasCount + 1, comentarios: [...h.comentarios, nuevo] }
          : h
      );
      const hiloActualizado = actualizados.find(h => h.id === hiloActivo.id);
      setHiloActivo(hiloActualizado);
      return { ...prev, [canalActivo]: actualizados };
    });
    setNuevoComentario('');
  };

  const publicarNuevoHilo = (e) => {
    e.preventDefault();
    if (!nuevoTitulo.trim() || !nuevoContenido.trim()) return;
    const nuevo = {
      id: Date.now(), titulo: nuevoTitulo.trim(), autor: 'tú (estudiante)',
      fecha: 'Ahora mismo', fechaCompleta: new Date().toLocaleDateString('es-ES'),
      descripcion: nuevoContenido.trim(),
      etiqueta: 'Pregunta', etiquetaColor: '#6366f1', etiquetaBg: '#e0e7ff',
      respuestasCount: 0, comentarios: []
    };
    setCanalesData(prev => ({ ...prev, [canalActivo]: [nuevo, ...(prev[canalActivo] || [])] }));
    setNuevoTitulo('');
    setNuevoContenido('');
    setModalNuevoHilo(false);
  };

  // Cierra el sidebar móvil al rotar o agrandar la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 640) setSidebarMovilAbierto(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const abrirCanal = useCallback((canalId) => {
    setCanalActivo(canalId);
    setHiloActivo(null);
    setBusqueda('');
    setSidebarMovilAbierto(false);
  }, []);

  return (
    <div className="comunidad-layout">

      {/* ── SIDEBAR IZQUIERDO: Canales ── */}
      <aside className={`comunidad-sidebar${sidebarMovilAbierto ? ' movil-abierto' : ''}`}>
        <div className="comunidad-sidebar-header">
          <div className="sidebar-comunidad-brand">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>Comunidad</span>
          </div>
        </div>

        <div className="comunidad-canales-seccion">
          <span className="canales-seccion-titulo">Canales</span>
          {CANALES.map(canal => (
            <button
              key={canal.id}
              className={`canal-btn ${canalActivo === canal.id ? 'activo' : ''}`}
              onClick={() => abrirCanal(canal.id)}
            >
              <span className="canal-icono">{canal.icono}</span>
              <span className="canal-nombre">{canal.label}</span>
              {(canalesData[canal.id] || []).length > 0 && (
                <span className="canal-count">{(canalesData[canal.id] || []).length}</span>
              )}
            </button>
          ))}
        </div>

        <div className="comunidad-sidebar-footer">
          <div className="sidebar-yo-card">
            <div className="avatar-mini" style={{ backgroundColor: '#7c3aed' }}>T</div>
            <div className="sidebar-yo-info">
              <span className="sidebar-yo-nombre">tú (estudiante)</span>
              <span className="sidebar-yo-badge">Estudiante</span>
            </div>
            <div className="dot-online" title="En línea" />
          </div>
        </div>
      </aside>

      {/* ── PANEL CENTRAL ── */}
      <main className="comunidad-main">

        {/* Cabecera del canal */}
        <header className="comunidad-canal-header">
          <div className="canal-header-info">
            {/* Botón hamburguesa — solo visible en móvil */}
            {!hiloActivo && (
              <button
                className="btn-abrir-canales-movil"
                onClick={() => setSidebarMovilAbierto(true)}
                aria-label="Abrir canales"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <line x1="3" y1="6"  x2="21" y2="6"  />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            )}
            {hiloActivo ? (
              <button className="btn-volver-canal" onClick={() => setHiloActivo(null)}>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Volver
              </button>
            ) : (
              <span className="canal-icono-grande">{canalInfo?.icono}</span>
            )}
            <div>
              <h2 className="canal-titulo-header">
                {hiloActivo ? hiloActivo.titulo : canalInfo?.label}
              </h2>
              {!hiloActivo && (
                <p className="canal-descripcion-header">{canalInfo?.descripcion}</p>
              )}
            </div>
          </div>

          <div className="canal-header-acciones">
            {!hiloActivo && (
              <>
                <div className="busqueda-hilos-wrapper">
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="#94a3b8" strokeWidth="2.5" fill="none"
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    type="text" placeholder="Buscar hilo..."
                    value={busqueda} onChange={e => setBusqueda(e.target.value)}
                    className="busqueda-hilos-input"
                  />
                </div>
                <button className="btn-nuevo-hilo-header" onClick={() => setModalNuevoHilo(true)}>
                  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Nuevo hilo
                </button>
              </>
            )}
            <button
              className={`btn-toggle-miembros ${mostrarMiembros ? 'activo' : ''}`}
              onClick={() => setMostrarMiembros(!mostrarMiembros)}
              title="Miembros en línea"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </button>
          </div>
        </header>

        {/* Contenido central */}
        <div className="comunidad-contenido">

          {!hiloActivo ? (
            /* ── LISTA DE HILOS ── */
            <div className="hilos-lista">
              {hilosActuales.length === 0 ? (
                <div className="hilos-vacio-estado">
                  <div className="vacio-icono">💬</div>
                  <h3>No hay hilos aún</h3>
                  <p>¡Sé el primero en crear una discusión en este canal!</p>
                  <button className="btn-crear-primer-hilo" onClick={() => setModalNuevoHilo(true)}>
                    Crear primer hilo
                  </button>
                </div>
              ) : (
                hilosActuales.map(hilo => {
                  const av = getAvatar(hilo.autor);
                  return (
                    <div key={hilo.id} className="hilo-card-premium" onClick={() => setHiloActivo(hilo)}>
                      <div className="hilo-avatar-col">
                        <div className="avatar-md" style={{ backgroundColor: av.color }}>
                          {av.inicial}
                          {av.esDocente && <span className="avatar-docente-dot" title="Docente" />}
                        </div>
                      </div>
                      <div className="hilo-cuerpo">
                        <div className="hilo-meta-row">
                          <span className="hilo-autor-nombre">
                            {hilo.autor}
                            {getAvatar(hilo.autor).esDocente && <span className="badge-docente">Docente</span>}
                          </span>
                          <span className="hilo-fecha-txt">{hilo.fecha}</span>
                        </div>
                        <h3 className="hilo-titulo-premium">{hilo.titulo}</h3>
                        <p className="hilo-preview">{hilo.descripcion}</p>
                        <div className="hilo-footer-row">
                          <span className="etiqueta-chip" style={{ color: hilo.etiquetaColor, backgroundColor: hilo.etiquetaBg }}>
                            {hilo.etiqueta}
                          </span>
                          <div className="hilo-stats">
                            <span className="hilo-stat">
                              <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.5" fill="none">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                              </svg>
                              {hilo.respuestasCount} {hilo.respuestasCount === 1 ? 'respuesta' : 'respuestas'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="hilo-arrow-col">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="#cbd5e1" strokeWidth="2" fill="none">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            /* ── DETALLE DE HILO ── */
            <div className="hilo-detalle-vista">

              {/* Hilo principal */}
              <div className="hilo-detalle-principal">
                {(() => {
                  const av = getAvatar(hiloActivo.autor);
                  return (
                    <div className="hilo-detalle-cabecera">
                      <div className="avatar-md" style={{ backgroundColor: av.color }}>
                        {av.inicial}
                        {av.esDocente && <span className="avatar-docente-dot" />}
                      </div>
                      <div className="hilo-detalle-meta">
                        <div className="hilo-detalle-meta-row">
                          <span className="hilo-autor-nombre">
                            {hiloActivo.autor}
                            {av.esDocente && <span className="badge-docente">Docente</span>}
                          </span>
                          <span className="etiqueta-chip" style={{ color: hiloActivo.etiquetaColor, backgroundColor: hiloActivo.etiquetaBg }}>
                            {hiloActivo.etiqueta}
                          </span>
                          <span className="hilo-fecha-txt">{hiloActivo.fechaCompleta || hiloActivo.fecha}</span>
                        </div>
                        <h2 className="hilo-detalle-titulo">{hiloActivo.titulo}</h2>
                        <p className="hilo-detalle-descripcion">{hiloActivo.descripcion}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Separador de respuestas */}
              <div className="respuestas-separador">
                <div className="separador-linea" />
                <span className="separador-label">
                  {hiloActivo.comentarios.length} {hiloActivo.comentarios.length === 1 ? 'respuesta' : 'respuestas'}
                </span>
                <div className="separador-linea" />
              </div>

              {/* Lista de comentarios */}
              <div className="comentarios-lista-premium" ref={comentariosRef}>
                {hiloActivo.comentarios.map((com, idx) => {
                  const av = getAvatar(com.autor);
                  return (
                    <div key={com.id} className={`comentario-premium ${idx === hiloActivo.comentarios.length - 1 ? 'ultimo' : ''}`}>
                      <div className="avatar-sm" style={{ backgroundColor: av.color }}>
                        {av.inicial}
                        {av.esDocente && <span className="avatar-docente-dot" />}
                      </div>
                      <div className="comentario-cuerpo">
                        <div className="comentario-meta">
                          <span className="comentario-autor-nombre">
                            {com.autor}
                            {av.esDocente && <span className="badge-docente">Docente</span>}
                          </span>
                          <span className="comentario-fecha">{com.fecha}</span>
                        </div>
                        <p className="comentario-texto-premium">{com.texto}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Formulario de respuesta */}
              <form className="responder-form-premium" onSubmit={publicarComentario}>
                <div className="responder-input-wrapper">
                  <div className="avatar-sm responder-avatar" style={{ backgroundColor: '#7c3aed' }}>T</div>
                  <textarea
                    className="responder-textarea-premium"
                    placeholder={`Responde en #${canalInfo?.label}...`}
                    value={nuevoComentario}
                    onChange={e => setNuevoComentario(e.target.value)}
                    rows={3}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && e.ctrlKey) publicarComentario(e);
                    }}
                  />
                </div>
                <div className="responder-acciones">
                  <span className="responder-hint">Ctrl + Enter para enviar</span>
                  <button className="btn-publicar-respuesta-premium" type="submit" disabled={!nuevoComentario.trim()}>
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Publicar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* ── SIDEBAR DERECHO: Miembros en línea ── */}
      {mostrarMiembros && (
        <aside className="comunidad-miembros-sidebar">
          <div className="miembros-header">
            <span className="miembros-titulo">En línea — {MIEMBROS_EN_LINEA.length}</span>
          </div>

          <div className="miembros-seccion">
            <span className="miembros-seccion-label">Docentes</span>
            {MIEMBROS_EN_LINEA.filter(m => m.esDocente).map(m => {
              const av = getAvatar(m.nombre);
              return (
                <div key={m.nombre} className="miembro-item">
                  <div className="miembro-avatar-wrapper">
                    <div className="avatar-sm" style={{ backgroundColor: av.color }}>{av.inicial}</div>
                    <div className="dot-online-sm" />
                  </div>
                  <div className="miembro-info">
                    <span className="miembro-nombre">{m.nombre}</span>
                    <span className="miembro-rol docente">Docente</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="miembros-seccion">
            <span className="miembros-seccion-label">Estudiantes</span>
            {MIEMBROS_EN_LINEA.filter(m => !m.esDocente).map(m => {
              const av = getAvatar(m.nombre);
              return (
                <div key={m.nombre} className="miembro-item">
                  <div className="miembro-avatar-wrapper">
                    <div className="avatar-sm" style={{ backgroundColor: av.color }}>{av.inicial}</div>
                    <div className="dot-online-sm" />
                  </div>
                  <div className="miembro-info">
                    <span className="miembro-nombre">{m.nombre}</span>
                    <span className="miembro-rol">Activo</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Estadísticas del canal */}
          <div className="canal-stats-card">
            <h4 className="canal-stats-titulo">#{canalInfo?.label}</h4>
            <div className="canal-stat-item">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>{(canalesData[canalActivo] || []).length} hilos</span>
            </div>
            <div className="canal-stat-item">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
              </svg>
              <span>{MIEMBROS_EN_LINEA.length} en línea</span>
            </div>
          </div>
        </aside>
      )}

      {/* ── FAB: Botón flotante para crear hilo (solo móvil) ── */}
      {!hiloActivo && (
        <button
          className="fab-nuevo-hilo"
          onClick={() => setModalNuevoHilo(true)}
          aria-label="Crear nuevo hilo"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      )}

      {/* ── Overlay para cerrar el sidebar en móvil ── */}
      {sidebarMovilAbierto && (
        <div
          className="comunidad-overlay-movil"
          onClick={() => setSidebarMovilAbierto(false)}
        />
      )}

      {/* ── MODAL NUEVO HILO ── */}
      {modalNuevoHilo && (
        <div className="modal-overlay-comunidad" onClick={() => setModalNuevoHilo(false)}>
          <div className="modal-nuevo-hilo" onClick={e => e.stopPropagation()}>
            <div className="modal-hilo-header">
              <h3 className="modal-hilo-titulo">Crear nuevo hilo</h3>
              <button className="btn-cerrar-modal-hilo" onClick={() => setModalNuevoHilo(false)}>×</button>
            </div>
            <div className="modal-hilo-canal-badge">
              <span>{canalInfo?.icono}</span>
              <span>#{canalInfo?.label}</span>
            </div>
            <form className="modal-hilo-form" onSubmit={publicarNuevoHilo}>
              <div className="modal-form-grupo">
                <label className="modal-form-label">Título del hilo</label>
                <input
                  type="text"
                  className="modal-form-input"
                  placeholder="¿Cuál es tu pregunta o tema?"
                  value={nuevoTitulo}
                  onChange={e => setNuevoTitulo(e.target.value)}
                  required
                />
              </div>
              <div className="modal-form-grupo">
                <label className="modal-form-label">Contenido</label>
                <textarea
                  className="modal-form-textarea"
                  placeholder="Describe tu duda o tema en detalle..."
                  value={nuevoContenido}
                  onChange={e => setNuevoContenido(e.target.value)}
                  rows={5}
                  required
                />
              </div>
              <div className="modal-form-acciones">
                <button type="button" className="btn-modal-cancelar" onClick={() => setModalNuevoHilo(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-modal-publicar" disabled={!nuevoTitulo.trim() || !nuevoContenido.trim()}>
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  Publicar hilo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
