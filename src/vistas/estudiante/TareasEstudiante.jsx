import React, { useState } from 'react';

export default function TareasEstudiante() {
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [tabActiva, setTabActiva] = useState('TODAS');
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [archivoCargado, setArchivoCargado] = useState(null);
  const [comentarios, setComentarios] = useState('');
  const [cargandoEnvio, setCargandoEnvio] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(null);
  const [vistaCursos, setVistaCursos] = useState('card');   // 'card' | 'cuadrado' | 'lista'
  const [vistaTareas, setVistaTareas] = useState('card');   // 'card' | 'cuadrado' | 'lista'
  const [buscadorCursos, setBuscadorCursos] = useState('');
  const [buscadorTareas, setBuscadorTareas] = useState('');

  const [tareas, setTareas] = useState([
    {
      id: 1,
      titulo: 'Ensayo Argumentativo: El Impacto de la IA',
      cursoId: 1,
      curso: 'Inglés Avanzado',
      nivel: 'C1',
      docente: 'Prof. Carlos Mendoza',
      fechaLimite: 'Hoy, 23:59',
      urgente: true,
      estado: 'PENDIENTE',
      rubrica: 'Redactar un ensayo formal de 500 palabras con inversiones gramaticales y conectores de nivel C1.',
      calificacion: null
    },
    {
      id: 2,
      titulo: 'Presentación en Video: Mon Projet de Vie',
      cursoId: 2,
      curso: 'Francés Intermedio',
      nivel: 'B2',
      docente: 'Dra. Sophie Laurent',
      fechaLimite: 'Mañana, 14:00',
      urgente: true,
      estado: 'PENDIENTE',
      rubrica: 'Grabar un video de 3 minutos sobre tus aspiraciones. Subir el guion escrito aquí.',
      calificacion: null
    },
    {
      id: 3,
      titulo: 'Hoja de Trabajo: Vocabulario de Negocios',
      cursoId: 1,
      curso: 'Inglés Avanzado',
      nivel: 'C1',
      docente: 'Prof. Carlos Mendoza',
      fechaLimite: 'Entregado el 02/06',
      urgente: false,
      estado: 'ENTREGADA',
      rubrica: 'Completar los ejercicios del PDF con los phrasal verbs de finanzas.',
      calificacion: null
    },
    {
      id: 4,
      titulo: 'Prueba de Pronunciación: Vocales Nasales',
      cursoId: 2,
      curso: 'Francés Intermedio',
      nivel: 'B2',
      docente: 'Dra. Sophie Laurent',
      fechaLimite: 'Calificado el 01/06',
      urgente: false,
      estado: 'CALIFICADA',
      rubrica: 'Enviar audio leyendo el poema de la página 32.',
      calificacion: '9.5/10',
      retroalimentacion: 'Excelente control del aire y pronunciación perfecta del fonema nasal [on].'
    },
    {
      id: 5,
      titulo: 'Presentazione: La Mia Famiglia',
      cursoId: 3,
      curso: 'Italiano Básico',
      nivel: 'A1',
      docente: 'Prof. Giovanni Rossi',
      fechaLimite: 'Viernes, 18:00',
      urgente: false,
      estado: 'PENDIENTE',
      rubrica: 'Preparar una presentación oral de 2 minutos sobre tu familia en italiano.',
      calificacion: null
    },
    {
      id: 6,
      titulo: 'Dictado: Expresiones Básicas',
      cursoId: 3,
      curso: 'Italiano Básico',
      nivel: 'A1',
      docente: 'Prof. Giovanni Rossi',
      fechaLimite: 'Calificado el 30/05',
      urgente: false,
      estado: 'CALIFICADA',
      rubrica: 'Dictado de vocabulario de saludo y presentación.',
      calificacion: '8.0/10',
      retroalimentacion: 'Buen dominio del vocabulario básico. Revisar la ortografía de los verbos.'
    },
    {
      id: 7,
      titulo: 'Übung: Trennbare Verben',
      cursoId: 4,
      curso: 'Alemán Intermedio',
      nivel: 'B1',
      docente: 'Prof. Dieter Schmidt',
      fechaLimite: 'Jueves, 20:00',
      urgente: false,
      estado: 'PENDIENTE',
      rubrica: 'Completar los ejercicios de verbos separables del capítulo 7.',
      calificacion: null
    },
    {
      id: 8,
      titulo: 'ひらがな練習: Práctica de Hiragana',
      cursoId: 5,
      curso: 'Japonés Básico',
      nivel: 'A2',
      docente: 'Prof. Yuki Tanaka',
      fechaLimite: 'Entregado el 03/06',
      urgente: false,
      estado: 'ENTREGADA',
      rubrica: 'Escribir las 46 letras del hiragana en la plantilla proporcionada.',
      calificacion: null
    }
  ]);

  const cursos = [
    {
      id: 1,
      nombre: 'Inglés Avanzado',
      nivel: 'C1',
      profesor: 'Prof. Carlos Mendoza',
      color: 'var(--color-celeste)',
      colorPastel: 'var(--color-celeste-pastel)',
      bandera: (
        <svg viewBox="0 0 60 30" width="44" height="22" style={{ borderRadius: '5px', boxShadow: '0 2px 6px rgba(0,0,0,0.12)', flexShrink: 0 }}>
          <clipPath id="tc1"><rect width="60" height="30" rx="4"/></clipPath>
          <g clipPath="url(#tc1)">
            <rect width="60" height="30" fill="#00247d"/>
            <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6"/>
            <path d="M0 0 L60 30 M60 0 L0 30" stroke="#cf142b" strokeWidth="4"/>
            <path d="M30 0 v30 M0 15 h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30 0 v30 M0 15 h60" stroke="#cf142b" strokeWidth="6"/>
          </g>
        </svg>
      )
    },
    {
      id: 2,
      nombre: 'Francés Intermedio',
      nivel: 'B2',
      profesor: 'Dra. Sophie Laurent',
      color: 'var(--color-morado)',
      colorPastel: '#e0e7ff',
      bandera: (
        <svg viewBox="0 0 60 30" width="44" height="22" style={{ borderRadius: '5px', boxShadow: '0 2px 6px rgba(0,0,0,0.12)', flexShrink: 0 }}>
          <clipPath id="tc2"><rect width="60" height="30" rx="4"/></clipPath>
          <g clipPath="url(#tc2)">
            <rect width="20" height="30" fill="#002395"/>
            <rect x="20" width="20" height="30" fill="#fff"/>
            <rect x="40" width="20" height="30" fill="#ed2939"/>
          </g>
        </svg>
      )
    },
    {
      id: 3,
      nombre: 'Italiano Básico',
      nivel: 'A1',
      profesor: 'Prof. Giovanni Rossi',
      color: 'var(--color-verde)',
      colorPastel: 'var(--color-verde-pastel)',
      bandera: (
        <svg viewBox="0 0 60 30" width="44" height="22" style={{ borderRadius: '5px', boxShadow: '0 2px 6px rgba(0,0,0,0.12)', flexShrink: 0 }}>
          <clipPath id="tc3"><rect width="60" height="30" rx="4"/></clipPath>
          <g clipPath="url(#tc3)">
            <rect width="20" height="30" fill="#009246"/>
            <rect x="20" width="20" height="30" fill="#ffffff"/>
            <rect x="40" width="20" height="30" fill="#cd212a"/>
          </g>
        </svg>
      )
    },
    {
      id: 4,
      nombre: 'Alemán Intermedio',
      nivel: 'B1',
      profesor: 'Prof. Dieter Schmidt',
      color: '#475569',
      colorPastel: '#f1f5f9',
      bandera: (
        <svg viewBox="0 0 60 30" width="44" height="22" style={{ borderRadius: '5px', boxShadow: '0 2px 6px rgba(0,0,0,0.12)', flexShrink: 0 }}>
          <clipPath id="tc4"><rect width="60" height="30" rx="4"/></clipPath>
          <g clipPath="url(#tc4)">
            <rect width="60" height="10" fill="#000000"/>
            <rect y="10" width="60" height="10" fill="#dd0000"/>
            <rect y="20" width="60" height="10" fill="#ffce00"/>
          </g>
        </svg>
      )
    },
    {
      id: 5,
      nombre: 'Japonés Básico',
      nivel: 'A2',
      profesor: 'Prof. Yuki Tanaka',
      color: 'var(--color-rojo)',
      colorPastel: 'var(--color-rojo-pastel)',
      bandera: (
        <svg viewBox="0 0 60 30" width="44" height="22" style={{ borderRadius: '5px', boxShadow: '0 2px 6px rgba(0,0,0,0.12)', border: '1px solid #e2e8f0', flexShrink: 0 }}>
          <clipPath id="tc5"><rect width="60" height="30" rx="4"/></clipPath>
          <g clipPath="url(#tc5)">
            <rect width="60" height="30" fill="#ffffff"/>
            <circle cx="30" cy="15" r="9" fill="#bc002d"/>
          </g>
        </svg>
      )
    }
  ];

  // Calcular estadísticas por curso
  const estadisticasCurso = (cursoId) => {
    const t = tareas.filter(t => t.cursoId === cursoId);
    return {
      total: t.length,
      pendientes: t.filter(t => t.estado === 'PENDIENTE').length,
      entregadas: t.filter(t => t.estado === 'ENTREGADA').length,
      calificadas: t.filter(t => t.estado === 'CALIFICADA').length,
    };
  };

  // Tareas filtradas del curso seleccionado
  const tareasCurso = cursoSeleccionado
    ? tareas.filter(t => {
        const coincideCurso = t.cursoId === cursoSeleccionado.id;
        if (tabActiva === 'TODAS') return coincideCurso;
        return coincideCurso && t.estado === tabActiva;
      })
    : [];

  const simularSeleccionArchivo = () => {
    setArchivoCargado({
      nombre: `Entrega_${tareaSeleccionada.titulo.replace(/\s+/g, '_').substring(0, 18)}.pdf`,
      tamano: '2.4 MB',
    });
  };

  const manejarEntrega = (e) => {
    e.preventDefault();
    if (!archivoCargado) return;
    setCargandoEnvio(true);
    setTimeout(() => {
      setTareas(prev =>
        prev.map(t =>
          t.id === tareaSeleccionada.id
            ? { ...t, estado: 'ENTREGADA', fechaLimite: `Entregado el ${new Date().toLocaleDateString()}`, urgente: false }
            : t
        )
      );
      setCargandoEnvio(false);
      setMensajeExito(`✓ Tarea "${tareaSeleccionada.titulo}" enviada correctamente.`);
      setTareaSeleccionada(null);
      setArchivoCargado(null);
      setComentarios('');
      setTimeout(() => setMensajeExito(null), 4000);
    }, 1500);
  };

  const abrirEntrega = (tarea) => {
    setTareaSeleccionada(tarea);
    setArchivoCargado(null);
    setComentarios('');
  };

  // Badge de estado
  const BadgeEstado = ({ estado }) => {
    const config = {
      PENDIENTE: { label: 'Pendiente', bg: '#fff7ed', color: '#d97706', border: '#fed7aa' },
      ENTREGADA: { label: 'Entregado', bg: '#e0f2fe', color: '#0284c7', border: '#bae6fd' },
      CALIFICADA: { label: 'Calificado', bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' },
    }[estado];
    return (
      <span style={{
        fontSize: '11.5px', fontWeight: '800', padding: '4px 10px',
        borderRadius: '8px', border: `1.5px solid ${config.border}`,
        backgroundColor: config.bg, color: config.color,
        textTransform: 'uppercase', letterSpacing: '0.5px', flexShrink: 0
      }}>
        {config.label}
      </span>
    );
  };

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>

      {/* Toast de éxito */}
      {mensajeExito && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 1100,
          backgroundColor: '#dcfce7', border: '1.5px solid #bbf7d0',
          color: '#15803d', padding: '16px 22px', borderRadius: '14px',
          fontWeight: '700', fontSize: '14.5px', display: 'flex',
          alignItems: 'center', gap: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.12)'
        }}>
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          {mensajeExito}
        </div>
      )}

      {/* ─── CONTENIDO PRINCIPAL ─── */}
      <div>

          {/* Header dinámico */}
          <div style={{ marginBottom: '28px' }}>
            {cursoSeleccionado ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => { setCursoSeleccionado(null); setTabActiva('TODAS'); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: 'none', border: '2px solid var(--borde-color)',
                    borderBottom: '4px solid var(--borde-color)',
                    borderRadius: '12px', padding: '8px 16px',
                    fontSize: '13.5px', fontWeight: '800', cursor: 'pointer',
                    color: '#64748b', transition: 'all 0.1s ease'
                  }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  Mis Cursos
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {cursoSeleccionado.bandera}
                  <div>
                    <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#1e293b', margin: 0, letterSpacing: '-0.5px' }}>
                      {cursoSeleccionado.nombre}
                    </h2>
                    <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                      {cursoSeleccionado.profesor}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: '34px', fontWeight: '900', color: '#1e293b', margin: '0 0 6px 0', letterSpacing: '-0.75px' }}>
                  Mis Tareas
                </h2>
                <p style={{ fontSize: '17px', color: '#64748b', margin: 0 }}>
                  Selecciona un curso para ver y entregar tus asignaciones.
                </p>
              </>
            )}
          </div>

          {/* ─── VISTA: CURSOS ─── */}
          {!cursoSeleccionado && (() => {
            const cursosFiltrados = cursos.filter(c =>
              c.nombre.toLowerCase().includes(buscadorCursos.toLowerCase()) ||
              c.profesor.toLowerCase().includes(buscadorCursos.toLowerCase())
            );
            return (
              <div>
                {/* Barra de herramientas: buscar + toggle vista */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
                  {/* Buscador */}
                  <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="#94a3b8" strokeWidth="2.5" fill="none"
                      style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input
                      type="text"
                      placeholder="Buscar curso o docente..."
                      value={buscadorCursos}
                      onChange={e => setBuscadorCursos(e.target.value)}
                      style={{
                        width: '100%', boxSizing: 'border-box',
                        height: '44px', paddingLeft: '42px', paddingRight: '14px',
                        border: '2px solid var(--borde-color)', borderRadius: '12px',
                        fontSize: '14px', fontFamily: 'inherit', color: '#334155',
                        backgroundColor: '#fff', outline: 'none'
                      }}
                    />
                  </div>
                  {/* Toggles de vista */}
                  <div style={{ display: 'flex', gap: '4px', backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '4px' }}>
                    {[
                      { id: 'card', icon: <><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="9" rx="1"/><rect x="3" y="15" width="7" height="6" rx="1"/><rect x="14" y="15" width="7" height="6" rx="1"/></>, title: 'Tarjetas' },
                      { id: 'cuadrado', icon: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>, title: 'Cuadrícula' },
                      { id: 'lista', icon: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>, title: 'Lista' },
                    ].map(v => (
                      <button key={v.id} title={v.title} onClick={() => setVistaCursos(v.id)}
                        style={{
                          width: '38px', height: '38px', borderRadius: '9px', border: 'none',
                          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          backgroundColor: vistaCursos === v.id ? '#fff' : 'transparent',
                          boxShadow: vistaCursos === v.id ? '0 1px 4px rgba(0,0,0,0.12)' : 'none',
                          color: vistaCursos === v.id ? 'var(--color-celeste)' : '#94a3b8',
                          transition: 'all 0.15s ease'
                        }}>
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">{v.icon}</svg>
                      </button>
                    ))}
                  </div>
                  {/* Contador */}
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                    {cursosFiltrados.length} curso{cursosFiltrados.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {cursosFiltrados.length === 0 ? (
                  <div className="card-premium" style={{ textAlign: 'center', padding: '48px', color: '#64748b', margin: 0 }}>
                    <p style={{ fontWeight: '700', fontSize: '16px', margin: 0 }}>No se encontraron cursos.</p>
                  </div>
                ) : (
                  <>
                    {/* ── MODO CARD (por defecto) ── */}
                    {vistaCursos === 'card' && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '22px' }}>
                        {cursosFiltrados.map(curso => {
                          const stats = estadisticasCurso(curso.id);
                          const pct = stats.total > 0 ? Math.round(((stats.entregadas + stats.calificadas) / stats.total) * 100) : 0;
                          return (
                            <div key={curso.id} className="card-premium" style={{ borderTop: `6px solid ${curso.color}`, padding: '28px', margin: 0, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                {curso.bandera}
                                <div style={{ flex: 1, textAlign: 'left' }}>
                                  <span style={{ fontSize: '11.5px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: curso.color, backgroundColor: curso.colorPastel, padding: '3px 9px', borderRadius: '7px', display: 'inline-block' }}>Nivel {curso.nivel}</span>
                                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: '6px 0 2px 0', letterSpacing: '-0.4px' }}>{curso.nombre}</h3>
                                  <span style={{ fontSize: '13.5px', color: '#64748b', fontWeight: '600' }}>{curso.profesor}</span>
                                </div>
                              </div>
                              <div style={{ display: 'flex', gap: '10px', textAlign: 'center' }}>
                                {[{ n: stats.pendientes, label: 'Pendientes', color: '#d97706', bg: '#fff7ed', border: '#fed7aa' }, { n: stats.entregadas, label: 'Entregadas', color: '#0284c7', bg: '#e0f2fe', border: '#bae6fd' }, { n: stats.calificadas, label: 'Calificadas', color: '#16a34a', bg: '#dcfce7', border: '#bbf7d0' }].map(s => (
                                  <div key={s.label} style={{ flex: 1, backgroundColor: s.bg, border: `1.5px solid ${s.border}`, borderRadius: '12px', padding: '10px 8px' }}>
                                    <div style={{ fontSize: '22px', fontWeight: '900', color: s.color, lineHeight: 1 }}>{s.n}</div>
                                    <div style={{ fontSize: '11px', fontWeight: '700', color: s.color, marginTop: '3px', opacity: 0.85 }}>{s.label}</div>
                                  </div>
                                ))}
                              </div>
                              <div style={{ textAlign: 'left' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                  <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#64748b' }}>Progreso de entrega</span>
                                  <span style={{ fontSize: '12.5px', fontWeight: '800', color: curso.color }}>{pct}%</span>
                                </div>
                                <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                  <div style={{ height: '100%', width: `${pct}%`, backgroundColor: curso.color, borderRadius: '4px', transition: 'width 0.4s ease' }}/>
                                </div>
                              </div>
                              <button onClick={() => { setCursoSeleccionado(curso); setTabActiva('TODAS'); }} className="btn-manual-accion primario"
                                style={{ height: '50px', fontSize: '14.5px', flex: 'none', width: '100%', backgroundColor: curso.color, borderColor: curso.color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                                Ver Tareas del Curso
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* ── MODO CUADRADO ── */}
                    {vistaCursos === 'cuadrado' && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                        {cursosFiltrados.map(curso => {
                          const stats = estadisticasCurso(curso.id);
                          const pct = stats.total > 0 ? Math.round(((stats.entregadas + stats.calificadas) / stats.total) * 100) : 0;
                          return (
                            <button key={curso.id} onClick={() => { setCursoSeleccionado(curso); setTabActiva('TODAS'); }}
                              style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                                padding: '24px 16px', borderRadius: '18px', cursor: 'pointer', textAlign: 'center',
                                backgroundColor: '#fff', border: `2px solid var(--borde-color)`,
                                borderBottom: `5px solid ${curso.color}`,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'all 0.15s ease'
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'center' }}>{curso.bandera}</div>
                              <div>
                                <div style={{ fontSize: '14.5px', fontWeight: '900', color: '#1e293b', marginBottom: '4px', letterSpacing: '-0.3px' }}>{curso.nombre}</div>
                                <span style={{ fontSize: '11.5px', fontWeight: '800', color: curso.color, backgroundColor: curso.colorPastel, padding: '2px 8px', borderRadius: '6px' }}>Nivel {curso.nivel}</span>
                              </div>
                              {/* Mini barra progreso */}
                              <div style={{ width: '100%' }}>
                                <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                                  <div style={{ height: '100%', width: `${pct}%`, backgroundColor: curso.color, borderRadius: '3px' }}/>
                                </div>
                                <div style={{ marginTop: '5px', fontSize: '11px', fontWeight: '700', color: '#94a3b8' }}>{pct}% entregado</div>
                              </div>
                              {stats.pendientes > 0 && (
                                <span style={{ fontSize: '11.5px', fontWeight: '800', color: '#d97706', backgroundColor: '#fff7ed', border: '1.5px solid #fed7aa', borderRadius: '20px', padding: '2px 10px' }}>
                                  {stats.pendientes} pendiente{stats.pendientes > 1 ? 's' : ''}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* ── MODO LISTA ── */}
                    {vistaCursos === 'lista' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {cursosFiltrados.map(curso => {
                          const stats = estadisticasCurso(curso.id);
                          const pct = stats.total > 0 ? Math.round(((stats.entregadas + stats.calificadas) / stats.total) * 100) : 0;
                          return (
                            <div key={curso.id} style={{
                              display: 'flex', alignItems: 'center', gap: '18px',
                              backgroundColor: '#fff', border: '2px solid var(--borde-color)',
                              borderLeft: `6px solid ${curso.color}`, borderRadius: '14px',
                              padding: '16px 20px', boxSizing: 'border-box',
                              boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'box-shadow 0.15s ease'
                            }}>
                              {curso.bandera}
                              <div style={{ flex: 1, textAlign: 'left' }}>
                                <div style={{ fontSize: '16px', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.3px' }}>{curso.nombre}</div>
                                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', marginTop: '2px' }}>{curso.profesor} • Nivel {curso.nivel}</div>
                              </div>
                              {/* Mini stats */}
                              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                                {[{ n: stats.pendientes, color: '#d97706', bg: '#fff7ed', border: '#fed7aa', label: 'P' }, { n: stats.entregadas, color: '#0284c7', bg: '#e0f2fe', border: '#bae6fd', label: 'E' }, { n: stats.calificadas, color: '#16a34a', bg: '#dcfce7', border: '#bbf7d0', label: 'C' }].map(s => (
                                  <div key={s.label} title={s.label === 'P' ? 'Pendientes' : s.label === 'E' ? 'Entregadas' : 'Calificadas'}
                                    style={{ minWidth: '44px', textAlign: 'center', backgroundColor: s.bg, border: `1.5px solid ${s.border}`, borderRadius: '10px', padding: '6px 10px' }}>
                                    <div style={{ fontSize: '17px', fontWeight: '900', color: s.color, lineHeight: 1 }}>{s.n}</div>
                                    <div style={{ fontSize: '10px', fontWeight: '800', color: s.color, opacity: 0.8 }}>{s.label === 'P' ? 'Pend.' : s.label === 'E' ? 'Entg.' : 'Calic.'}</div>
                                  </div>
                                ))}
                              </div>
                              {/* Barra progreso */}
                              <div style={{ width: '100px', flexShrink: 0 }}>
                                <div style={{ fontSize: '11.5px', fontWeight: '800', color: curso.color, textAlign: 'right', marginBottom: '4px' }}>{pct}%</div>
                                <div style={{ height: '7px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                  <div style={{ height: '100%', width: `${pct}%`, backgroundColor: curso.color, borderRadius: '4px' }}/>
                                </div>
                              </div>
                              <button onClick={() => { setCursoSeleccionado(curso); setTabActiva('TODAS'); }}
                                style={{ height: '42px', padding: '0 20px', borderRadius: '11px', border: `2px solid ${curso.color}`, borderBottom: `4px solid ${curso.color}`, backgroundColor: curso.colorPastel, color: curso.color, fontSize: '13px', fontWeight: '800', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="9 18 15 12 9 6"/></svg>
                                Abrir
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })()}

          {/* ─── VISTA: TAREAS DE UN CURSO ─── */}
          {cursoSeleccionado && (() => {
            const tareasFiltradas = tareasCurso.filter(t =>
              t.titulo.toLowerCase().includes(buscadorTareas.toLowerCase()) ||
              t.docente.toLowerCase().includes(buscadorTareas.toLowerCase())
            );
            return (
              <div>
                {/* Tabs + buscar + toggle vista */}
                <div style={{ marginBottom: '20px' }}>
                  {/* Tabs de filtro */}
                  <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid var(--borde-color)', paddingBottom: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {[
                      { id: 'TODAS', label: 'Todas', count: tareas.filter(t => t.cursoId === cursoSeleccionado.id).length },
                      { id: 'PENDIENTE', label: 'Pendientes', count: tareas.filter(t => t.cursoId === cursoSeleccionado.id && t.estado === 'PENDIENTE').length },
                      { id: 'ENTREGADA', label: 'Entregadas', count: tareas.filter(t => t.cursoId === cursoSeleccionado.id && t.estado === 'ENTREGADA').length },
                      { id: 'CALIFICADA', label: 'Calificadas', count: tareas.filter(t => t.cursoId === cursoSeleccionado.id && t.estado === 'CALIFICADA').length },
                    ].map(tab => (
                      <button key={tab.id} onClick={() => setTabActiva(tab.id)}
                        style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', fontSize: '13.5px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: tabActiva === tab.id ? cursoSeleccionado.colorPastel : 'transparent', color: tabActiva === tab.id ? cursoSeleccionado.color : '#64748b', transition: 'all 0.15s ease' }}>
                        {tab.label}
                        <span style={{ fontSize: '11px', fontWeight: '900', backgroundColor: tabActiva === tab.id ? cursoSeleccionado.color : '#e2e8f0', color: tabActiva === tab.id ? '#fff' : '#64748b', borderRadius: '20px', padding: '1px 7px', minWidth: '20px', textAlign: 'center' }}>{tab.count}</span>
                      </button>
                    ))}
                  </div>
                  {/* Buscador + toggle vista */}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="#94a3b8" strokeWidth="2.5" fill="none"
                        style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      <input type="text" placeholder="Buscar tarea..."
                        value={buscadorTareas} onChange={e => setBuscadorTareas(e.target.value)}
                        style={{ width: '100%', boxSizing: 'border-box', height: '44px', paddingLeft: '42px', paddingRight: '14px', border: '2px solid var(--borde-color)', borderRadius: '12px', fontSize: '14px', fontFamily: 'inherit', color: '#334155', backgroundColor: '#fff', outline: 'none' }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '4px', backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '4px' }}>
                      {[
                        { id: 'card', icon: <><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="9" rx="1"/><rect x="3" y="15" width="7" height="6" rx="1"/><rect x="14" y="15" width="7" height="6" rx="1"/></>, title: 'Tarjetas' },
                        { id: 'cuadrado', icon: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>, title: 'Cuadrícula' },
                        { id: 'lista', icon: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>, title: 'Lista' },
                      ].map(v => (
                        <button key={v.id} title={v.title} onClick={() => setVistaTareas(v.id)}
                          style={{ width: '38px', height: '38px', borderRadius: '9px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: vistaTareas === v.id ? '#fff' : 'transparent', boxShadow: vistaTareas === v.id ? '0 1px 4px rgba(0,0,0,0.12)' : 'none', color: vistaTareas === v.id ? cursoSeleccionado.color : '#94a3b8', transition: 'all 0.15s ease' }}>
                          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">{v.icon}</svg>
                        </button>
                      ))}
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {tareasFiltradas.length} tarea{tareasFiltradas.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Resultados */}
                {tareasFiltradas.length === 0 ? (
                  <div className="card-premium" style={{ textAlign: 'center', padding: '48px', color: '#64748b', margin: 0 }}>
                    <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none" style={{ margin: '0 auto 14px', display: 'block', opacity: 0.5 }}>
                      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                    </svg>
                    <p style={{ fontWeight: '700', fontSize: '16px', margin: 0 }}>No hay tareas en este estado.</p>
                  </div>
                ) : (
                  <>
                    {/* ── MODO CARD ── */}
                    {vistaTareas === 'card' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {tareasFiltradas.map(tarea => (
                          <TareaCard key={tarea.id} tarea={tarea} curso={cursoSeleccionado} onEntregar={abrirEntrega} />
                        ))}
                      </div>
                    )}

                    {/* ── MODO CUADRADO ── */}
                    {vistaTareas === 'cuadrado' && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
                        {tareasFiltradas.map(tarea => {
                          const eConf = { PENDIENTE: { color: '#d97706', bg: '#fff7ed', border: '#fed7aa', label: 'Pendiente' }, ENTREGADA: { color: '#0284c7', bg: '#e0f2fe', border: '#bae6fd', label: 'Entregado' }, CALIFICADA: { color: '#16a34a', bg: '#dcfce7', border: '#bbf7d0', label: 'Calificado' } }[tarea.estado];
                          return (
                            <div key={tarea.id} style={{ backgroundColor: '#fff', border: `2px solid var(--borde-color)`, borderTop: `5px solid ${eConf.color}`, borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', boxSizing: 'border-box' }}>
                              <span style={{ fontSize: '11.5px', fontWeight: '800', padding: '4px 10px', borderRadius: '8px', border: `1.5px solid ${eConf.border}`, backgroundColor: eConf.bg, color: eConf.color, textTransform: 'uppercase', letterSpacing: '0.5px', alignSelf: 'flex-start' }}>{eConf.label}</span>
                              <p style={{ fontSize: '14.5px', fontWeight: '800', color: '#1e293b', margin: 0, lineHeight: '1.35', textAlign: 'left', flexGrow: 1 }}>{tarea.titulo}</p>
                              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.5" fill="none"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                {tarea.fechaLimite}
                              </div>
                              {tarea.calificacion && <span style={{ fontSize: '12.5px', fontWeight: '900', color: '#16a34a' }}>🏆 {tarea.calificacion}</span>}
                              {tarea.estado === 'PENDIENTE' && (
                                <button onClick={() => abrirEntrega(tarea)} style={{ height: '38px', borderRadius: '10px', border: `2px solid ${eConf.color}`, borderBottom: `4px solid ${eConf.color}`, backgroundColor: eConf.bg, color: eConf.color, fontSize: '12.5px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                  <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.5" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                  Entregar
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* ── MODO LISTA ── */}
                    {vistaTareas === 'lista' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {tareasFiltradas.map(tarea => {
                          const eConf = { PENDIENTE: { color: '#d97706', bg: '#fff7ed', border: '#fed7aa', label: 'Pendiente' }, ENTREGADA: { color: '#0284c7', bg: '#e0f2fe', border: '#bae6fd', label: 'Entregado' }, CALIFICADA: { color: '#16a34a', bg: '#dcfce7', border: '#bbf7d0', label: 'Calificado' } }[tarea.estado];
                          return (
                            <div key={tarea.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: '#fff', border: '2px solid var(--borde-color)', borderLeft: `6px solid ${eConf.color}`, borderRadius: '12px', padding: '14px 18px', boxSizing: 'border-box', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                              <span style={{ fontSize: '11px', fontWeight: '800', padding: '3px 9px', borderRadius: '7px', border: `1.5px solid ${eConf.border}`, backgroundColor: eConf.bg, color: eConf.color, textTransform: 'uppercase', letterSpacing: '0.5px', flexShrink: 0 }}>{eConf.label}</span>
                              <div style={{ flex: 1, textAlign: 'left' }}>
                                <div style={{ fontSize: '15px', fontWeight: '800', color: '#1e293b', letterSpacing: '-0.2px' }}>{tarea.titulo}</div>
                                <div style={{ fontSize: '12.5px', color: '#64748b', fontWeight: '600', marginTop: '2px' }}>{tarea.docente} • {tarea.fechaLimite}</div>
                              </div>
                              {tarea.calificacion && <span style={{ fontSize: '13px', fontWeight: '900', color: '#16a34a', flexShrink: 0 }}>🏆 {tarea.calificacion}</span>}
                              {tarea.estado === 'PENDIENTE' && (
                                <button onClick={() => abrirEntrega(tarea)} style={{ height: '38px', padding: '0 16px', borderRadius: '10px', border: `2px solid ${eConf.color}`, borderBottom: `4px solid ${eConf.color}`, backgroundColor: eConf.bg, color: eConf.color, fontSize: '12.5px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                                  <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.5" fill="none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                  Entregar
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })()}
      </div>

      {/* ─── MODAL DE ENTREGA ─── */}
      {tareaSeleccionada && (
        <div
          onClick={() => { if (!cargandoEnvio) setTareaSeleccionada(null); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1050,
            backgroundColor: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="card-premium"
            style={{
              width: '620px', maxWidth: '100%', maxHeight: '90vh',
              margin: 0, padding: 0, display: 'flex', flexDirection: 'column',
              overflow: 'hidden', borderTop: '6px solid var(--color-celeste)'
            }}
          >
            {/* Header modal */}
            <header style={{ padding: '22px 26px', borderBottom: '2px solid var(--borde-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <div>
                <span style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--color-celeste)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  📤 Formulario de Entrega
                </span>
                <h3 style={{ fontSize: '17px', fontWeight: '900', color: '#1e293b', margin: '4px 0 0 0' }}>
                  {tareaSeleccionada.titulo}
                </h3>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
                  {tareaSeleccionada.curso} • {tareaSeleccionada.docente}
                </span>
              </div>
              <button
                onClick={() => setTareaSeleccionada(null)}
                disabled={cargandoEnvio}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px', display: 'flex' }}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </header>

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '26px' }}>
              <form onSubmit={manejarEntrega} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

                {/* Instrucciones */}
                <div style={{
                  backgroundColor: '#f8fafc', border: '1.5px solid var(--borde-color)',
                  borderLeft: '5px solid var(--color-celeste)', borderRadius: '12px',
                  padding: '16px 18px', textAlign: 'left'
                }}>
                  <p style={{ fontSize: '12.5px', fontWeight: '800', color: 'var(--color-celeste)', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Instrucciones de la tarea
                  </p>
                  <p style={{ fontSize: '14.5px', color: '#334155', margin: 0, lineHeight: '1.6' }}>
                    {tareaSeleccionada.rubrica}
                  </p>
                </div>

                {/* Zona de carga */}
                <div style={{ textAlign: 'left' }}>
                  <label style={{ fontSize: '13.5px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '10px' }}>
                    Archivo Entregable <span style={{ color: 'var(--color-rojo)' }}>*</span>
                  </label>
                  {!archivoCargado ? (
                    <div
                      onClick={simularSeleccionArchivo}
                      style={{
                        border: '2px dashed #cbd5e1', borderRadius: '16px',
                        padding: '36px 24px', textAlign: 'center', cursor: 'pointer',
                        backgroundColor: '#f8fafc', transition: 'all 0.2s ease'
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="40" height="40" stroke="var(--color-celeste)" strokeWidth="1.5" fill="none" style={{ margin: '0 auto 12px', display: 'block', opacity: 0.8 }}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      <p style={{ fontSize: '14.5px', fontWeight: '800', color: '#475569', margin: '0 0 4px 0' }}>
                        Haz clic para seleccionar el archivo
                      </p>
                      <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: 0, fontWeight: '600' }}>
                        PDF, DOCX, ZIP — Máx. 10 MB
                      </p>
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      backgroundColor: '#f0fdf4', border: '2px solid #bbf7d0',
                      borderRadius: '14px', padding: '14px 18px'
                    }}>
                      <svg viewBox="0 0 24 24" width="28" height="28" stroke="#16a34a" strokeWidth="2" fill="none">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <p style={{ fontSize: '14px', fontWeight: '800', color: '#15803d', margin: '0 0 2px 0' }}>{archivoCargado.nombre}</p>
                        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{archivoCargado.tamano}</span>
                      </div>
                      <button type="button" onClick={() => setArchivoCargado(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px', display: 'flex' }}>
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Comentarios */}
                <div style={{ textAlign: 'left' }}>
                  <label style={{ fontSize: '13.5px', fontWeight: '800', color: '#334155', display: 'block', marginBottom: '10px' }}>
                    Comentarios al docente <span style={{ color: '#94a3b8', fontWeight: '600' }}>(Opcional)</span>
                  </label>
                  <textarea
                    className="comentarios-textarea"
                    placeholder="Escribe una anotación sobre tu entrega..."
                    value={comentarios}
                    onChange={e => setComentarios(e.target.value)}
                    disabled={cargandoEnvio}
                    style={{ width: '100%', fontSize: '14px', padding: '14px 16px', boxSizing: 'border-box', resize: 'vertical', minHeight: '90px' }}
                  />
                </div>

                {/* Botón enviar */}
                <button
                  type="submit"
                  disabled={!archivoCargado || cargandoEnvio}
                  className="btn-manual-accion primario"
                  style={{ height: '52px', fontSize: '15px', flex: 'none', width: '100%' }}
                >
                  {cargandoEnvio ? (
                    <>
                      <div className="spinner" style={{ borderTopColor: '#fff', width: '18px', height: '18px' }}/>
                      Enviando tarea...
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Entregar Tarea
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TARJETA PREMIUM DE TAREA INDIVIDUAL ───
function TareaCard({ tarea, curso, onEntregar }) {
  const estadoConfig = {
    PENDIENTE: { color: '#d97706', bg: '#fff7ed', border: '#fed7aa', dot: '#d97706' },
    ENTREGADA: { color: '#0284c7', bg: '#e0f2fe', border: '#bae6fd', dot: '#0284c7' },
    CALIFICADA: { color: '#16a34a', bg: '#dcfce7', border: '#bbf7d0', dot: '#16a34a' },
  }[tarea.estado];

  return (
    <div style={{
      backgroundColor: '#fff',
      border: '2px solid var(--borde-color)',
      borderBottom: `5px solid ${estadoConfig.border}`,
      borderLeft: `6px solid ${estadoConfig.dot}`,
      borderRadius: '18px',
      padding: '24px 26px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      transition: 'box-shadow 0.2s ease'
    }}>
      {/* Fila superior: título + badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <h4 style={{ fontSize: '17px', fontWeight: '900', color: '#1e293b', margin: '0 0 6px 0', letterSpacing: '-0.3px', lineHeight: '1.3' }}>
            {tarea.titulo}
          </h4>
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
            Docente: {tarea.docente}
          </span>
        </div>
        <span style={{
          fontSize: '11.5px', fontWeight: '800', padding: '5px 12px',
          borderRadius: '9px', border: `1.5px solid ${estadoConfig.border}`,
          backgroundColor: estadoConfig.bg, color: estadoConfig.color,
          textTransform: 'uppercase', letterSpacing: '0.5px', flexShrink: 0
        }}>
          {tarea.estado === 'PENDIENTE' ? 'Pendiente' : tarea.estado === 'ENTREGADA' ? 'Entregado' : 'Calificado'}
        </span>
      </div>

      {/* Rúbrica (truncada) */}
      <p style={{
        fontSize: '14px', color: '#475569', margin: 0,
        lineHeight: '1.6', textAlign: 'left',
        padding: '12px 14px', backgroundColor: '#f8fafc',
        borderRadius: '10px', border: '1px solid var(--borde-color)'
      }}>
        {tarea.rubrica}
      </p>

      {/* Fila de meta: fecha + calificación */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg viewBox="0 0 24 24" width="15" height="15" stroke={tarea.estado === 'PENDIENTE' ? '#d97706' : '#64748b'} strokeWidth="2.5" fill="none">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span style={{
            fontSize: '13px', fontWeight: '700',
            color: tarea.estado === 'PENDIENTE' && tarea.urgente ? 'var(--color-rojo)' : (tarea.estado === 'PENDIENTE' ? '#d97706' : '#64748b')
          }}>
            {tarea.urgente && tarea.estado === 'PENDIENTE' && '⚡ '}
            {tarea.fechaLimite}
          </span>
        </div>

        {tarea.calificacion && (
          <div style={{
            fontSize: '13.5px', fontWeight: '900',
            color: '#16a34a', backgroundColor: '#dcfce7',
            border: '1.5px solid #bbf7d0', borderRadius: '10px',
            padding: '4px 14px'
          }}>
            🏆 {tarea.calificacion}
          </div>
        )}
      </div>

      {/* Retroalimentación si existe */}
      {tarea.retroalimentacion && (
        <div style={{
          backgroundColor: '#f0fdf4', border: '1.5px solid #bbf7d0',
          borderRadius: '10px', padding: '12px 14px', textAlign: 'left'
        }}>
          <p style={{ fontSize: '13px', fontWeight: '700', color: '#15803d', margin: '0 0 4px 0' }}>
            💬 Retroalimentación del docente
          </p>
          <p style={{ fontSize: '13.5px', color: '#334155', margin: 0, lineHeight: '1.5', fontStyle: 'italic' }}>
            "{tarea.retroalimentacion}"
          </p>
        </div>
      )}

      {/* Botón de acción */}
      {tarea.estado === 'PENDIENTE' && (
        <button
          onClick={() => onEntregar(tarea)}
          className="btn-manual-accion primario"
          style={{ height: '48px', fontSize: '14px', flex: 'none', width: '100%' }}
        >
          <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2.5" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Subir y Entregar Tarea
        </button>
      )}
    </div>
  );
}
