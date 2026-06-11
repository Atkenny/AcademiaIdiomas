import React, { useState, useEffect, useRef } from 'react';
import { useIdioma } from '../../contextos/IdiomaContexto';

export default function ProgresoEstudiante({ usuario, alCambiarTab }) {
  const { idioma, cambiarIdioma, t } = useIdioma();
  const nombreUsuario = usuario.email.split('@')[0];
  const [descargaMensaje, setDescargaMensaje] = useState('');
  const [recursoVisualizar, setRecursoVisualizar] = useState(null);

  // Estados para el carrusel de cursos
  const [currentIndex, setCurrentIndex] = useState(0);
  const [esMovil, setEsMovil] = useState(false);
  const [videoSilenciado, setVideoSilenciado] = useState(false);
  const containerRef = useRef(null);

  // Estados para la vista completa "Ver Todo"
  const [verTodosLosCursos, setVerTodosLosCursos] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [filtroFavoritos, setFiltroFavoritos] = useState(false);
  const [favoritos, setFavoritos] = useState([1, 2]); // Inglés y Francés favoritos por defecto
  const [vistaTipo, setVistaTipo] = useState('card'); // card | grid | list

  // Escuchar cambio de resolución para cambiar el paso del carrusel
  useEffect(() => {
    const verificarResolucion = () => {
      setEsMovil(window.innerWidth <= 960);
    };
    verificarResolucion();
    window.addEventListener('resize', verificarResolucion);
    return () => window.removeEventListener('resize', verificarResolucion);
  }, []);

  // Datos de los 5 cursos del estudiante
  const cursos = [
    {
      id: 1,
      nombre: 'Inglés Avanzado',
      nivel: 'C1',
      profesor: 'Prof. Carlos Mendoza',
      progreso: 80,
      color: 'var(--color-celeste)',
      tab: 'multimedia',
      bandera: (
        <svg viewBox="0 0 60 30" width="40" height="20" style={{ borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <clipPath id="t"><rect width="60" height="30" rx="4" /></clipPath>
          <g clipPath="url(#t)">
            <rect width="60" height="30" fill="#00247d" />
            <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6" />
            <path d="M0 0 L60 30 M60 0 L0 30" stroke="#cf142b" strokeWidth="4" />
            <path d="M30 0 v30 M0 15 h60" stroke="#fff" strokeWidth="10" />
            <path d="M30 0 v30 M0 15 h60" stroke="#cf142b" strokeWidth="6" />
          </g>
        </svg>
      )
    },
    {
      id: 2,
      nombre: 'Portugués Intermedio',
      nivel: 'B1',
      profesor: 'Prof. João Silva',
      progreso: 45,
      color: 'var(--color-verde)',
      tab: 'biblioteca',
      bandera: (
        <svg viewBox="0 0 60 30" width="40" height="20" style={{ borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <clipPath id="pt"><rect width="60" height="30" rx="4" /></clipPath>
          <g clipPath="url(#pt)">
            <rect width="20" height="30" fill="#006600" />
            <rect x="20" width="40" height="30" fill="#ffcc00" />
            <circle cx="30" cy="15" r="8" fill="#003399" />
          </g>
        </svg>
      )
    },
    {
      id: 3,
      nombre: 'Italiano Básico',
      nivel: 'A1',
      profesor: 'Prof. Giovanni Rossi',
      progreso: 15,
      color: 'var(--color-naranja)',
      tab: 'biblioteca',
      bandera: (
        <svg viewBox="0 0 60 30" width="40" height="20" style={{ borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <clipPath id="it"><rect width="60" height="30" rx="4" /></clipPath>
          <g clipPath="url(#it)">
            <rect width="20" height="30" fill="#009246" />
            <rect x="20" width="20" height="30" fill="#ffffff" />
            <rect x="40" width="20" height="30" fill="#cd212a" />
          </g>
        </svg>
      )
    }
  ];

  // Tablón de recursos y novedades de profesores
  const novedadesDocentes = [
    {
      id: 1,
      profesor: 'Prof. Carlos Mendoza',
      iniciales: 'CM',
      avatarColor: '#0284c7',
      fecha: 'Publicado hace 2 horas',
      curso: 'Inglés Avanzado C1',
      tagColor: 'var(--color-celeste)',
      tagBg: 'var(--color-celeste-pastel)',
      mensaje: 'Hola a todos. Les he compartido la guía de estudio en PDF para nuestra evaluación de Gramática de Inversión y Énfasis de la próxima semana. Por favor, descarguen el material y repasen los ejercicios prácticos de la sección complementaria.',
      adjuntos: [
        { tipo: 'pdf', nombre: 'Guia_Estudio_Inversion.pdf', tamano: '1.2 MB' }
      ]
    },
    {
      id: 2,
      profesor: 'Dra. Sophie Laurent',
      iniciales: 'SL',
      avatarColor: '#6366f1',
      fecha: 'Publicado ayer',
      curso: 'Francés Intermedio B2',
      tagColor: 'var(--color-morado)',
      tagBg: '#e0e7ff',
      mensaje: 'Bonjour class! He subido un enlace a una clase grabada complementaria sobre el uso de los pronombres relativos "dont" y "où". Les servirá de apoyo para realizar su tarea escrita de esta semana.',
      adjuntos: [
        { tipo: 'enlace', nombre: 'Clase Grabada: Pronoms Relatifs', URL: '#' }
      ]
    },
    {
      id: 3,
      profesor: 'Prof. Carlos Mendoza',
      iniciales: 'CM',
      avatarColor: '#0284c7',
      fecha: 'Publicado hace 2 días',
      curso: 'Inglés Avanzado C1',
      tagColor: 'var(--color-celeste)',
      tagBg: 'var(--color-celeste-pastel)',
      mensaje: 'Atención: Recuerden que hoy vence el plazo para entregar la redacción de Inglés C1 a las 23:59. El sistema cerrará puntualmente. ¡Muchos éxitos en su redacción!',
      adjuntos: []
    }
  ];

  // Navegación del carrusel (Dashboard principal)
  const maxIndex = esMovil ? cursos.length - 1 : cursos.length - 3;
  const cardWidth = esMovil ? '100%' : 'calc(33.333% - 16px)';

  const irAlCursoSiguiente = () => {
    const siguienteIndice = Math.min(maxIndex, currentIndex + 1);
    desplazarAlCurso(siguienteIndice);
  };

  const irAlCursoAnterior = () => {
    const anteriorIndice = Math.max(0, currentIndex - 1);
    desplazarAlCurso(anteriorIndice);
  };

  const desplazarAlCurso = (indice) => {
    setCurrentIndex(indice);
    if (containerRef.current) {
      const targetCard = containerRef.current.children[0]?.children[indice];
      if (targetCard) {
        containerRef.current.scrollTo({
          left: targetCard.offsetLeft - 16,
          behavior: 'smooth'
        });
      }
    }
  };

  // Filtrado de cursos para la vista completa
  const cursosFiltrados = cursos.filter(curso => {
    const coincideBusqueda = curso.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      curso.nivel.toLowerCase().includes(busqueda.toLowerCase()) ||
      curso.profesor.toLowerCase().includes(busqueda.toLowerCase());
    const coincideFavorito = !filtroFavoritos || favoritos.includes(curso.id);
    return coincideBusqueda && coincideFavorito;
  });

  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter(favId => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  const abrirRecurso = (nombre) => {
    setRecursoVisualizar(nombre);
    setDescargaMensaje(`Abriendo recurso compartido "${nombre}"...`);
    setTimeout(() => {
      setDescargaMensaje('');
    }, 2500);
  };

  // Renderizado del tablón de anuncios (común)
  const renderizarTablonAnuncios = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div style={{ textAlign: 'left', borderBottom: '2px solid var(--borde-color)', paddingBottom: '16px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0' }}>
          {t('tablonRecurso')}
        </h3>
        <p style={{ fontSize: '16px', color: '#64748b', margin: 0 }}>
          {t('tablonSub')}
        </p>
      </div>

      <div className="tablon-anuncios" style={{ gap: '28px' }}>
        {novedadesDocentes.map(anuncio => (
          <div key={anuncio.id} className="anuncio-card" style={{ padding: '32px' }}>
            <div className="anuncio-header" style={{ marginBottom: '22px' }}>
              <div className="profesor-avatar" style={{ backgroundColor: anuncio.avatarColor, width: '50px', height: '50px', fontSize: '17px', borderRadius: '50%' }}>
                {anuncio.iniciales}
              </div>
              <div className="anuncio-autor-info" style={{ gap: '2px' }}>
                <span className="anuncio-autor" style={{ fontSize: '17px', fontWeight: '800' }}>{anuncio.profesor}</span>
                <span className="anuncio-fecha" style={{ fontSize: '14px', color: '#94a3b8' }}>{anuncio.fecha}</span>
              </div>
              <span className="anuncio-tag-curso" style={{
                color: anuncio.tagColor,
                backgroundColor: anuncio.tagBg,
                fontSize: '13.5px',
                fontWeight: '800',
                padding: '6px 14px',
                borderRadius: '8px'
              }}>
                {anuncio.curso}
              </span>
            </div>

            <p className="anuncio-cuerpo" style={{ fontSize: '16.5px', lineHeight: '1.75', color: '#334155', margin: '0 0 20px 0' }}>
              {anuncio.mensaje}
            </p>

            {anuncio.adjuntos.length > 0 && (
              <div className="anuncio-adjuntos" style={{ paddingTop: '22px' }}>
                {anuncio.adjuntos.map((adj, index) => (
                  <button
                    key={index}
                    className="adjunto-chip"
                    onClick={() => abrirRecurso(adj.nombre)}
                    style={{
                      background: 'none',
                      fontInherit: 'inherit',
                      border: '1.5px solid var(--borde-color)',
                      cursor: 'pointer',
                      padding: '10px 18px',
                      fontSize: '14.5px',
                      borderRadius: '12px'
                    }}
                  >
                    <div className="adjunto-icono">
                      {adj.tipo === 'pdf' ? (
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--color-rojo)" strokeWidth="2.5" fill="none">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--color-celeste)" strokeWidth="2.5" fill="none">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                      )}
                    </div>
                    <span style={{ fontWeight: '700' }}>{adj.nombre}</span>
                    {adj.tamano && <span style={{ color: '#94a3b8', fontSize: '12.5px', fontWeight: '600' }}>({adj.tamano})</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // VISTA 1: Catálogo Completo (Ver Todo)
  if (verTodosLosCursos) {
    return (
      <div className="progreso-vista" style={{ width: '100%', boxSizing: 'border-box' }}>
        {/* Banner institucional de logos y Bryan Wilson (Oculto en móvil) */}
        {!esMovil && (
          <div className="institucional-cabecera-logos" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '28px',
            padding: '16px 24px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '2px solid var(--borde-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="/unan_logo.webp" alt="UNAN" style={{ height: '38px', objectFit: 'contain' }} />
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#475569' }}>UNAN-MANAGUA</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/setec_logo.webp" alt="SETEC" style={{ height: '38px', objectFit: 'contain' }} />
            </div>
          </div>
        )}

        {/* Encabezado con Botón de Regreso */}
        <div className="vista-header" style={{ marginBottom: '32px', textAlign: 'left' }}>
          <button
            onClick={() => setVerTodosLosCursos(false)}
            className="btn-manual-accion secundario"
            style={{
              width: 'max-content',
              padding: '0 16px',
              height: '38px',
              fontSize: '14px',
              marginBottom: '16px',
              textTransform: 'none',
              fontWeight: '800'
            }}
          >
            {t('volverInicio')}
          </button>

          <h2 className="vista-titulo" style={{ fontSize: '34px', color: '#1e293b', fontWeight: '800', marginBottom: '8px' }}>
            {t('misCursosAcademicos')}
          </h2>
          <p className="vista-descripcion" style={{ fontSize: '18px', color: '#64748b', margin: 0 }}>
            {t('bienvenidaSub')}
          </p>
        </div>

        {/* Barra de Filtros, Búsqueda y Tipos de Vista */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '28px',
          backgroundColor: '#ffffff',
          padding: '16px 20px',
          borderRadius: '16px',
          border: '2px solid var(--borde-color)'
        }}>
          {/* Buscador */}
          <div className="biblioteca-buscar" style={{ flex: '1', minWidth: '260px', margin: 0 }}>
            <input
              type="text"
              className="buscar-input"
              placeholder={t('buscarCurso')}
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{ height: '44px', paddingLeft: '44px' }}
            />
            <svg className="buscar-icono" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" style={{ top: '13px', left: '16px' }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {/* Filtros rápidos y Selección de Vista */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>

            {/* Toggle Favoritos */}
            <button
              onClick={() => setFiltroFavoritos(!filtroFavoritos)}
              className={`btn-filtro ${filtroFavoritos ? 'activo' : ''}`}
              style={{ height: '44px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', margin: 0 }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill={filtroFavoritos ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>{filtroFavoritos ? t('mostrarTodos') : t('soloFavoritos')}</span>
            </button>

            {/* Selectores de Layout */}
            <div className="toggles-layout">
              {/* Vista Tarjeta (Card) */}
              <button
                onClick={() => setVistaTipo('card')}
                className={`btn-toggle-layout ${vistaTipo === 'card' ? 'activo' : ''}`}
                title="Vista Tarjeta"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <rect x="3" y="3" width="7" height="9" />
                  <rect x="14" y="3" width="7" height="5" />
                  <rect x="14" y="12" width="7" height="9" />
                  <rect x="3" y="16" width="7" height="5" />
                </svg>
              </button>

              {/* Vista Cuadrícula (Grid) */}
              <button
                onClick={() => setVistaTipo('grid')}
                className={`btn-toggle-layout ${vistaTipo === 'grid' ? 'activo' : ''}`}
                title="Vista Cuadrícula"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>

              {/* Vista Lista (List) */}
              <button
                onClick={() => setVistaTipo('list')}
                className={`btn-toggle-layout ${vistaTipo === 'list' ? 'activo' : ''}`}
                title="Vista Lista"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Listado de Cursos según la Vista Seleccionada */}
        <div style={{ marginBottom: '40px' }}>

          {cursosFiltrados.length === 0 ? (
            <div className="card-premium" style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
              <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="2" fill="none" style={{ margin: '0 auto 16px auto', display: 'block', opacity: 0.6 }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0' }}>{t('noCursos')}</h4>
              <p style={{ fontSize: '15px', margin: 0 }}>{t('noCursosSub')}</p>
            </div>
          ) : (

            // 1. RENDER VISTA TARJETA (CARD)
            vistaTipo === 'card' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
                {cursosFiltrados.map(curso => (
                  <div
                    key={curso.id}
                    className="card-premium"
                    style={{
                      boxSizing: 'border-box',
                      borderTop: `6px solid ${curso.color}`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '24px',
                      padding: '32px',
                      margin: 0,
                      position: 'relative'
                    }}
                  >
                    {/* Botón Favorito en Esquina */}
                    <button
                      onClick={() => toggleFavorito(curso.id)}
                      className="btn-favorito"
                      style={{ position: 'absolute', top: '16px', right: '16px' }}
                      title={favoritos.includes(curso.id) ? t('quitarFavorito') : t('marcarFavorito')}
                    >
                      <svg viewBox="0 0 24 24" width="22" height="22" fill={favoritos.includes(curso.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>

                    <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                      {curso.bandera}
                      <div style={{ textAlign: 'left' }}>
                        <span style={{
                          fontSize: '13px',
                          fontWeight: '800',
                          color: curso.color,
                          textTransform: 'uppercase',
                          backgroundColor: `${curso.color}15`,
                          padding: '4px 10px',
                          borderRadius: '8px'
                        }}>
                          {t('nivel')} {curso.nivel}
                        </span>
                        <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b', margin: '8px 0 4px 0', letterSpacing: '-0.5px' }}>
                          {curso.nombre}
                        </h4>
                        <span style={{ fontSize: '16px', color: '#64748b', fontWeight: '600' }}>
                          {curso.profesor}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14.5px', fontWeight: '700', color: '#64748b' }}>
                        <span>{t('avanceCurso')}</span>
                        <span style={{ color: curso.color, fontWeight: '800' }}>{curso.progreso}% {t('completado')}</span>
                      </div>
                      <div style={{ height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${curso.progreso}%`, backgroundColor: curso.color, borderRadius: '5px' }} />
                      </div>
                    </div>

                    <button
                      onClick={() => alCambiarTab(curso.tab)}
                      className="btn-manual-accion primario"
                      style={{ height: '50px', fontSize: '15px', marginTop: '4px', flex: 'none', width: '100%' }}
                    >
                      {t('ingresarAula')}
                    </button>
                  </div>
                ))}
              </div>
            ) :

              // 2. RENDER VISTA CUADRÍCULA (GRID COMPACTO)
              vistaTipo === 'grid' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                  {cursosFiltrados.map(curso => (
                    <div
                      key={curso.id}
                      className="card-premium"
                      style={{
                        boxSizing: 'border-box',
                        borderTop: `5px solid ${curso.color}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        padding: '20px',
                        margin: 0,
                        position: 'relative'
                      }}
                    >
                      <button
                        onClick={() => toggleFavorito(curso.id)}
                        className="btn-favorito"
                        style={{ position: 'absolute', top: '12px', right: '12px', padding: '4px' }}
                        title={favoritos.includes(curso.id) ? "Quitar de favoritos" : "Marcar como favorito"}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill={favoritos.includes(curso.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>

                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {curso.bandera}
                        <div style={{ textAlign: 'left' }}>
                          <span style={{ fontSize: '11px', fontWeight: '800', color: curso.color }}>
                            {t('nivel')} {curso.nivel}
                          </span>
                          <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#1e293b', margin: '2px 0 0 0', letterSpacing: '-0.25px' }}>
                            {curso.nombre}
                          </h4>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>{t('prof')}: {curso.profesor}</span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: '700', color: '#64748b' }}>
                          <span>{t('avanceCurso')}</span>
                          <span>{curso.progreso}%</span>
                        </div>
                        <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${curso.progreso}%`, backgroundColor: curso.color, borderRadius: '3px' }} />
                        </div>
                      </div>

                      <button
                        onClick={() => alCambiarTab(curso.tab)}
                        className="btn-manual-accion primario"
                        style={{ height: '36px', fontSize: '13.5px', flex: 'none', width: '100%', borderRadius: '10px' }}
                      >
                        {t('ingresar')}
                      </button>
                    </div>
                  ))}
                </div>
              ) :

                // 3. RENDER VISTA LISTA (FILAS HORIZONTALES)
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {cursosFiltrados.map(curso => (
                    <div key={curso.id} className="vista-lista-item" style={{ borderLeft: `6px solid ${curso.color}` }}>

                      {/* Bandera y Título */}
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', width: '25%' }}>
                        {curso.bandera}
                        <div style={{ textAlign: 'left' }}>
                          <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: 0 }}>
                            {curso.nombre}
                          </h4>
                          <span style={{ fontSize: '12.5px', fontWeight: '700', color: curso.color }}>
                            {t('nivel')} {curso.nivel}
                          </span>
                        </div>
                      </div>

                      {/* Profesor */}
                      <div style={{ width: '20%', textAlign: 'left', fontSize: '15px', color: '#64748b', fontWeight: '600' }}>
                        {curso.profesor}
                      </div>

                      {/* Progreso */}
                      <div style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: '#64748b' }}>
                          <span>{t('avanceCurso')}</span>
                          <span>{curso.progreso}%</span>
                        </div>
                        <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${curso.progreso}%`, backgroundColor: curso.color, borderRadius: '4px' }} />
                        </div>
                      </div>

                      {/* Acciones (Favorito + Botón) */}
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', width: '20%', justifyContent: 'flex-end' }}>

                        {/* Botón Favorito */}
                        <button
                          onClick={() => toggleFavorito(curso.id)}
                          className="btn-favorito"
                          title={favoritos.includes(curso.id) ? t('quitarFavorito') : t('marcarFavorito')}
                        >
                          <svg viewBox="0 0 24 24" width="22" height="22" fill={favoritos.includes(curso.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>

                        {/* Botón Ingresar */}
                        <button
                          onClick={() => alCambiarTab(curso.tab)}
                          className="btn-manual-accion primario"
                          style={{ height: '40px', fontSize: '13.5px', padding: '0 20px', flex: 'none', width: 'auto', borderRadius: '12px' }}
                        >
                          {t('ingresar')}
                        </button>

                      </div>

                    </div>
                  ))}
                </div>

          )}

        </div>

        {/* Modal de Simulación flotante */}
        {descargaMensaje && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#1e293b',
            color: '#ffffff',
            padding: '16px 24px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.3)',
            fontWeight: '700',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '15px'
          }}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" style={{ color: 'var(--color-celeste)' }}>
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
            {descargaMensaje}
          </div>
        )}

      </div>
    );
  }

  // VISTA 2: Dashboard de Inicio Normal (Con Carrusel de Cursos y Tablón)
  return (
    <div className="progreso-vista" style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* Banner institucional de logos y Bryan Wilson (Oculto en móvil) */}
      {!esMovil && (
        <div className="institucional-cabecera-logos" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          padding: '16px 24px',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '2px solid var(--borde-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/unan_logo.webp" alt="UNAN" style={{ height: '38px', objectFit: 'contain' }} />
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#475569' }}>UNAN-MANAGUA</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/setec_logo.webp" alt="SETEC" style={{ height: '38px', objectFit: 'contain' }} />
          </div>
        </div>
      )}

      {/* Encabezado Principal con Video Dinámico */}
      <div className="vista-header" style={{ position: 'relative', marginBottom: '28px', textAlign: 'left', padding: esMovil ? '24px 16px' : '40px 32px', borderRadius: '16px', overflow: 'hidden', backgroundColor: (idioma === 'en' || idioma === 'it' || idioma === 'pt') ? '#010001' : 'transparent' }}>
        {/* Video dinámico de fondo */}
        {(idioma === 'en' || idioma === 'it' || idioma === 'pt') && (
          <video
            key={idioma}
            src={
              idioma === 'en' ? 'https://iravaxwvergxxgfytzxn.supabase.co/storage/v1/object/public/videos-bienvenida/NuevoIngles.mp4' :
                idioma === 'it' ? 'https://iravaxwvergxxgfytzxn.supabase.co/storage/v1/object/public/videos-bienvenida/NuevoItaliano.mp4' :
                  idioma === 'pt' ? 'https://iravaxwvergxxgfytzxn.supabase.co/storage/v1/object/public/videos-bienvenida/NuevoPortugues.mp4' : ''
            }
            autoPlay
            muted={videoSilenciado}
            loop
            playsInline
            preload="auto"
            style={{ position: 'absolute', top: 0, right: 0, left: esMovil ? 'auto' : 0, width: esMovil ? '65%' : '100%', height: '100%', objectFit: 'contain', objectPosition: 'right center', zIndex: 0 }}
          />
        )}

        {/* Overlay oscuro en gradiente: oscuro a la izquierda para el texto, transparente a la derecha para el video */}
        {(idioma === 'en' || idioma === 'it' || idioma === 'pt') && (
          <>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: esMovil ? 'linear-gradient(to right, #010001 0%, #010001 40%, transparent 60%)' : 'linear-gradient(to right, #010001 0%, rgba(1,0,1,0.8) 40%, transparent 80%)', zIndex: 1 }}></div>
            {/* Botón de Audio */}
            <button
              onClick={() => setVideoSilenciado(!videoSilenciado)}
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                zIndex: 10,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              aria-label={videoSilenciado ? "Activar sonido" : "Silenciar video"}
            >
              {videoSilenciado ? (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              )}
            </button>
          </>
        )}

        <div style={{ position: 'relative', zIndex: 2, maxWidth: esMovil ? '55%' : '100%' }}>
          <h2 className="vista-titulo" style={{ fontSize: esMovil ? '20px' : '34px', color: (idioma === 'en' || idioma === 'it' || idioma === 'pt') ? '#ffffff' : '#1e293b', fontWeight: '800', marginBottom: esMovil ? '6px' : '8px', textShadow: (idioma === 'en' || idioma === 'it' || idioma === 'pt') ? '0 2px 4px rgba(0,0,0,0.5)' : 'none', lineHeight: '1.2' }}>{t('panelInicio')}</h2>
          <p className="vista-descripcion" style={{ fontSize: esMovil ? '12.5px' : '18px', color: (idioma === 'en' || idioma === 'it' || idioma === 'pt') ? '#e2e8f0' : '#64748b', margin: 0, textShadow: (idioma === 'en' || idioma === 'it' || idioma === 'pt') ? '0 1px 2px rgba(0,0,0,0.5)' : 'none', lineHeight: esMovil ? '1.4' : 'normal' }}>
            {t('bienvenido')}, <strong>{nombreUsuario}</strong>.<br />
            {t('bienvenidaSub')}
          </p>
        </div>
      </div>

      {/* Grid del Dashboard Simplificado (Fila de Cursos + Feed de Novedades) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

        {/* Sección: Mis Cursos Activos (Carrusel DVD) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b', margin: '0' }}>
                {t('misCursosActivos')}
              </h3>

              {/* Botón Ver Todo */}
              <button
                onClick={() => setVerTodosLosCursos(true)}
                className="btn-manual-accion secundario"
                style={{
                  height: '34px',
                  padding: '0 16px',
                  fontSize: '13px',
                  margin: 0,
                  textTransform: 'none',
                  fontWeight: '800',
                  borderRadius: '10px',
                  width: 'auto'
                }}
              >
                {t('verTodo')}
              </button>
            </div>

            {/* Controles carrusel */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '700', marginRight: '8px' }}>
                {currentIndex + 1} - {esMovil ? currentIndex + 1 : Math.min(cursos.length, currentIndex + 3)} de {cursos.length}
              </span>

              {/* Botón Izquierda */}
              <button
                onClick={irAlCursoAnterior}
                disabled={currentIndex === 0}
                className="btn-manual-accion secundario"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                  opacity: currentIndex === 0 ? 0.35 : 1,
                  padding: 0,
                  margin: 0
                }}
                title="Ver cursos anteriores"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Botón Derecha */}
              <button
                onClick={irAlCursoSiguiente}
                disabled={currentIndex >= maxIndex}
                className="btn-manual-accion secundario"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: currentIndex >= maxIndex ? 'not-allowed' : 'pointer',
                  opacity: currentIndex >= maxIndex ? 0.35 : 1,
                  padding: 0,
                  margin: 0
                }}
                title="Ver más cursos"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Contenedor del carrusel */}
          <div style={{ display: 'flex', width: '100%', alignItems: 'center', position: 'relative' }}>
            <div
              ref={containerRef}
              style={{
                flex: 1,
                overflowX: 'hidden',
                scrollBehavior: 'smooth',
                padding: '12px 4px'
              }}
            >
              <div style={{ display: 'flex', gap: '24px', width: '100%', boxSizing: 'border-box' }}>
                {cursos.map(curso => (
                  <div
                    key={curso.id}
                    className="card-premium"
                    style={{
                      flex: `0 0 ${cardWidth}`,
                      boxSizing: 'border-box',
                      borderTop: `6px solid ${curso.color}`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '24px',
                      padding: '32px',
                      margin: 0,
                      boxShadow: '0 8px 16px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                      {curso.bandera}
                      <div style={{ textAlign: 'left' }}>
                        <span style={{
                          fontSize: '13px',
                          fontWeight: '800',
                          color: curso.color,
                          textTransform: 'uppercase',
                          backgroundColor: `${curso.color}15`,
                          padding: '4px 10px',
                          borderRadius: '8px'
                        }}>
                          {t('nivel')} {curso.nivel}
                        </span>
                        <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b', margin: '8px 0 4px 0', letterSpacing: '-0.5px' }}>
                          {curso.nombre}
                        </h4>
                        <span style={{ fontSize: '16px', color: '#64748b', fontWeight: '600' }}>
                          {curso.profesor}
                        </span>
                      </div>
                    </div>

                    {/* Progreso */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14.5px', fontWeight: '700', color: '#64748b' }}>
                        <span>{t('avanceCiclo')}</span>
                        <span style={{ color: curso.color, fontWeight: '800' }}>{curso.progreso}% {t('completado')}</span>
                      </div>
                      <div style={{ height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${curso.progreso}%`, backgroundColor: curso.color, borderRadius: '5px' }} />
                      </div>
                    </div>

                    {/* Botón de ingresar */}
                    <button
                      onClick={() => alCambiarTab(curso.tab)}
                      className="btn-manual-accion primario"
                      style={{ height: '50px', fontSize: '15px', marginTop: '4px', flex: 'none', width: '100%' }}
                    >
                      {t('ingresarAula')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tablón de Novedades */}
        {renderizarTablonAnuncios()}

      </div>

      {/* Notificación flotante */}
      {descargaMensaje && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#1e293b',
          color: '#ffffff',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.3)',
          fontWeight: '700',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '15px'
        }}>
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" style={{ color: 'var(--color-celeste)' }}>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
          {descargaMensaje}
        </div>
      )}

      {/* Modal para visualizar archivos compartidos de los docentes */}
      {recursoVisualizar && (
        <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)', zIndex: 1000 }} onClick={() => setRecursoVisualizar(null)}>
          <div className="modal-contenedor card-premium" style={{ width: '600px', maxWidth: '90%', padding: '0', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
            <header className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '2px solid var(--borde-color)' }}>
              <h3 className="modal-titulo" style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#1e293b' }}>{t('visualizandoRecurso')}</h3>
              <button onClick={() => setRecursoVisualizar(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </header>
            <div className="modal-body" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '16.5px', fontWeight: '800', margin: '0 0 12px 0', color: '#0284c7' }}>{recursoVisualizar}</h4>
              <div className="documento-texto" style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', border: '2px solid var(--borde-color)', maxHeight: '300px', overflowY: 'auto', textAlign: 'left', fontSize: '15.5px', lineHeight: '1.6.5', color: '#334155' }}>
                {recursoVisualizar.includes('Inversion') ? (
                  <div>
                    <h5 style={{ fontWeight: '800', marginTop: '0', fontSize: '16.5px', color: '#1e293b' }}>Guía de Estudio: Gramática de Inversión (Avanzado C1)</h5>
                    <p>La inversión gramatical consiste en alterar el orden lógico de sujeto y verbo para dar mayor énfasis poético o dramático a una frase, o cuando usamos adverbios negativos al principio de la oración.</p>
                    <strong style={{ display: 'block', margin: '12px 0 6px 0', color: '#1e293b' }}>Ejemplos de Estructuras Comunes:</strong>
                    <ul style={{ paddingLeft: '20px', margin: '0 0 10px 0' }}>
                      <li style={{ marginBottom: '6px' }}><em>Normal:</em> I have never seen such a beautiful painting.</li>
                      <li style={{ marginBottom: '6px' }}><em>Inversión:</em> <strong>Never have I seen</strong> such a beautiful painting.</li>
                      <li style={{ marginBottom: '6px' }}><em>Normal:</em> He had hardly arrived when the meeting started.</li>
                      <li style={{ marginBottom: '6px' }}><em>Inversión:</em> <strong>Hardly had he arrived</strong> when the meeting started.</li>
                    </ul>
                    <p>Recuerden que la inversión requiere el uso de verbos auxiliares (do/does/did/have/had) colocados antes del sujeto, similar a una estructura de pregunta, pero terminando con punto final.</p>
                  </div>
                ) : (
                  <div>
                    <h5 style={{ fontWeight: '800', marginTop: '0', fontSize: '16.5px', color: '#1e293b' }}>Enlace de Recurso Externo</h5>
                    <p>Has abierto el recurso complementario en video para el estudio de pronombres relativos (<em>dont, où, qui, que</em>) en Francés B2.</p>
                    <p>Este video contiene 15 minutos de explicaciones interactivas por profesores nativos, analizando las diferencias sutiles entre "dont" (relativo posesivo/preposicional) y "où" (relativo de lugar o tiempo).</p>
                    <a href="#video-ver" onClick={(e) => { e.preventDefault(); alert(t('simulacionReproduccion')); }} style={{ color: 'var(--color-celeste)', fontWeight: '800', textDecoration: 'underline' }}>Haga clic aquí para reproducir la lección en video</a>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
                <button
                  className="btn-manual-accion primario"
                  onClick={() => {
                    alert(t('simulacionDescarga'));
                    setRecursoVisualizar(null);
                  }}
                  style={{ flex: 'none', padding: '0 20px', height: '40px', fontSize: '13.5px' }}
                >
                  {t('descargarArchivo')}
                </button>
                <button
                  className="btn-manual-accion secundario"
                  onClick={() => setRecursoVisualizar(null)}
                  style={{ flex: 'none', padding: '0 20px', height: '40px', fontSize: '13.5px' }}
                >
                  {t('cerrarVista')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
