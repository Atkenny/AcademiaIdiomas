import React, { useState, useEffect } from 'react';

export default function MultimediaEstudiante() {
  const [subTab, setSubTab] = useState('VIDEOS');
  
  // Estados para Modal de Video
  const [videoModal, setVideoModal] = useState(null); // video objeto | null
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoSubtitle, setVideoSubtitle] = useState('');

  // Estados para Pronunciación
  const [grabando, setGrabando] = useState(false);
  const [progresoGrabacion, setProgresoGrabacion] = useState(0);
  const [resultadoPronunciacion, setResultadoPronunciacion] = useState(null);
  const [nativeAudioPlaying, setNativeAudioPlaying] = useState(false);

  // Estados para Comprensión (Listening)
  const [reproduciendoAudio, setReproduciendoAudio] = useState(false);
  const [audioCompletado, setAudioCompletado] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0); // 0 a 100
  const [respuestaComprension, setRespuestaComprension] = useState(null);
  const [feedbackComprension, setFeedbackComprension] = useState(null);
  const [mostrarTranscripcion, setMostrarTranscripcion] = useState(false);

  // Estados para Escritura (Writing)
  const palabrasScrambled = ['Learning', 'languages', 'is', 'opening', 'a', 'key', 'to', 'the', 'world'];
  const [palabrasSeleccionadas, setPalabrasSeleccionadas] = useState([]);
  const [feedbackEscritura, setFeedbackEscritura] = useState(null);

  const videos = [
    { 
      id: 1, 
      titulo: 'Clase 1: Pronombres Relativos Simplificados', 
      duracion: '15:24', 
      canal: 'Profra. Sophie Laurent', 
      nivel: 'B2', 
      visitas: '120 vistas',
      tema: 'Francés',
      gradiente: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
      descripcion: 'Domina el uso de "qui", "que", "dont" y "où" de una manera fácil y práctica con ejemplos reales de la literatura francesa.'
    },
    { 
      id: 2, 
      titulo: 'Clase 2: El uso correcto de Phrasal Verbs', 
      duracion: '18:40', 
      canal: 'Prof. Carlos Mendoza', 
      nivel: 'C1', 
      visitas: '350 vistas',
      tema: 'Inglés',
      gradiente: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      descripcion: 'Aprende a diferenciar los significados de phrasal verbs comunes como "put off", "call off", "carry out" y su colocación gramatical.'
    },
    { 
      id: 3, 
      titulo: 'Taller: Estilo e Inversión en Textos Formales', 
      duracion: '22:15', 
      canal: 'Prof. Carlos Mendoza', 
      nivel: 'C1', 
      visitas: '98 vistas',
      tema: 'Inglés',
      gradiente: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
      descripcion: 'Taller de escritura avanzada enfocado en estructuras invertidas para añadir formalidad, estilo y énfasis en cartas académicas.'
    },
  ];

  // Simulación de progreso de video
  useEffect(() => {
    let t;
    if (videoPlaying && videoModal) {
      t = setInterval(() => {
        setVideoProgress(p => {
          const next = p + 2.5;
          if (next >= 100) {
            setVideoPlaying(false);
            return 100;
          }
          return next;
        });
      }, 500);
    }
    return () => clearInterval(t);
  }, [videoPlaying, videoModal]);

  // Simulación de subtítulos dinámicos basados en progreso
  useEffect(() => {
    if (!videoModal) {
      setVideoSubtitle('');
      return;
    }
    if (videoProgress < 5) {
      setVideoSubtitle('Welcome to the digital multimedia language laboratory!');
    } else if (videoProgress < 25) {
      setVideoSubtitle(
        videoModal.id === 1 
          ? 'Today, we are going to explore French Relative Pronouns in detail.' 
          : videoModal.id === 2 
            ? 'Let us dive into the usage of common Phrasal Verbs in business contexts.'
            : 'In this workshop, we will study inversions to build sophisticated essays.'
      );
    } else if (videoProgress < 50) {
      setVideoSubtitle(
        videoModal.id === 1 
          ? 'Remember that the pronoun "dont" replaces an expression preceded by "de".' 
          : videoModal.id === 2 
            ? 'For instance, notice the difference between "call off" (cancel) and "put off" (postpone).'
            : 'An inversion shifts the auxiliary verb right before the subject for dramatic style.'
      );
    } else if (videoProgress < 75) {
      setVideoSubtitle(
        videoModal.id === 1 
          ? 'Let us examine some examples: "La voiture dont je t\'ai parlé..."' 
          : videoModal.id === 2 
            ? 'Always pay attention to whether the phrasal verb is separable or inseparable.'
            : 'Instead of saying "She had rarely seen", we write "Rarely had she seen..."'
      );
    } else if (videoProgress < 95) {
      setVideoSubtitle('Try testing these structures in your next class writing challenge.');
    } else {
      setVideoSubtitle('Thank you for attending this masterclass, keep practicing!');
    }
  }, [videoProgress, videoModal]);

  // Simular la grabación de voz
  const manejarGrabacion = () => {
    if (grabando) {
      // Detener
      setGrabando(false);
      setResultadoPronunciacion({
        precision: 94,
        fluidez: 89,
        intonacion: 96,
        comentario: '¡Excelente entonación y acentuación en las consonantes aspiradas!',
        detalles: [
          { palabra: 'The', estado: 'correcto' },
          { palabra: 'key', estado: 'correcto' },
          { palabra: 'parameters', estado: 'advertencia' },
          { palabra: 'of', estado: 'correcto' },
          { palabra: 'the', estado: 'correcto' },
          { palabra: 'project', estado: 'correcto' },
          { palabra: 'were', estado: 'correcto' },
          { palabra: 'successfully', estado: 'mejora' },
          { palabra: 'evaluated.', estado: 'correcto' }
        ]
      });
    } else {
      // Iniciar
      setResultadoPronunciacion(null);
      setGrabando(true);
      setProgresoGrabacion(0);
      
      // Simular progresión
      let ticks = 0;
      const interval = setInterval(() => {
        ticks += 10;
        setProgresoGrabacion(ticks);
        if (ticks >= 100) {
          clearInterval(interval);
        }
      }, 250);
    }
  };

  // Simular audio nativo
  const playNativeAudio = () => {
    if (nativeAudioPlaying) return;
    setNativeAudioPlaying(true);
    setTimeout(() => {
      setNativeAudioPlaying(false);
    }, 3000);
  };

  // Simular progreso de audio para comprensión
  useEffect(() => {
    let t;
    if (reproduciendoAudio) {
      t = setInterval(() => {
        setAudioProgress(p => {
          if (p >= 100) {
            setReproduciendoAudio(false);
            setAudioCompletado(true);
            return 100;
          }
          return p + 4;
        });
      }, 160);
    }
    return () => clearInterval(t);
  }, [reproduciendoAudio]);

  const manejarPlayAudio = () => {
    if (reproduciendoAudio) {
      setReproduciendoAudio(false);
    } else {
      if (audioProgress >= 100) {
        setAudioProgress(0);
        setAudioCompletado(false);
      }
      setReproduciendoAudio(true);
    }
  };

  // Validar respuesta de comprensión auditiva
  const validarComprension = (opcion) => {
    setRespuestaComprension(opcion);
    if (opcion === 'B') {
      setFeedbackComprension({ tipo: 'exito', mensaje: '¡Correcto! El diálogo menciona explícitamente que canceló debido a la huelga ferroviaria imprevista.' });
    } else {
      setFeedbackComprension({ tipo: 'error', mensaje: 'Incorrecto. Presta atención al fragmento sobre huelgas de trenes (train strikes).' });
    }
  };

  // Fichas de escritura
  const hacerClicPalabra = (palabra) => {
    if (palabrasSeleccionadas.includes(palabra)) return;
    setPalabrasSeleccionadas(prev => [...prev, palabra]);
    setFeedbackEscritura(null);
  };

  const removerPalabra = (palabra) => {
    setPalabrasSeleccionadas(prev => prev.filter(p => p !== palabra));
    setFeedbackEscritura(null);
  };

  const reiniciarEscritura = () => {
    setPalabrasSeleccionadas([]);
    setFeedbackEscritura(null);
  };

  // Validar juego de escritura
  const validarEscritura = () => {
    const fraseEstudiante = palabrasSeleccionadas.join(' ').toLowerCase();
    // La respuesta correcta esperada: "Learning languages is opening a key to the world" o variantes válidas
    if (fraseEstudiante === 'learning languages is opening a key to the world') {
      setFeedbackEscritura({ tipo: 'exito', mensaje: '¡Perfecto! Has ordenado la frase correctamente: "El aprendizaje de idiomas es abrir una llave al mundo".' });
    } else if (fraseEstudiante.startsWith('learning languages') && fraseEstudiante.endsWith('world')) {
      setFeedbackEscritura({ tipo: 'advertencia', mensaje: 'Estructura cercana y entendible, pero no del todo exacta. Revisa el orden de las fichas intermedias.' });
    } else {
      setFeedbackEscritura({ tipo: 'error', mensaje: 'Esa estructura no es correcta en inglés. Intenta organizar el sujeto y el verbo principal primero.' });
    }
  };

  return (
    <div className="multimedia-vista">
      <div className="vista-header-premium">
        <div className="header-glowing-dots" />
        <h2 className="vista-titulo">Laboratorio Multimedia e Interactivo</h2>
        <p className="vista-descripcion">Perfecciona tu pronunciación oral, ejercita la comprensión auditiva y consolida tu redacción mediante simuladores dinámicos de última generación.</p>
      </div>

      {/* Tabs multimedia */}
      <div className="multimedia-tabs">
        <button 
          className={`multimedia-tab-btn ${subTab === 'VIDEOS' ? 'activo' : ''}`}
          onClick={() => setSubTab('VIDEOS')}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          Videoclases
        </button>
        <button 
          className={`multimedia-tab-btn ${subTab === 'AUDIO' ? 'activo' : ''}`}
          onClick={() => setSubTab('AUDIO')}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          Listening
        </button>
        <button 
          className={`multimedia-tab-btn ${subTab === 'VOZ' ? 'activo' : ''}`}
          onClick={() => setSubTab('VOZ')}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
            <path d="M12 1v10M19 8a7 7 0 0 1-14 0" />
            <line x1="12" y1="18" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
          Speaking
        </button>
        <button 
          className={`multimedia-tab-btn ${subTab === 'WRITING' ? 'activo' : ''}`}
          onClick={() => setSubTab('WRITING')}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          Writing
        </button>
      </div>

      {/* RENDERIZADO DEL SUBTAB SELECCIONADO */}
      
      {subTab === 'VIDEOS' && (
        <div className="multimedia-video-grid">
          {videos.map(video => (
            <div key={video.id} className="video-card-premium" onClick={() => { setVideoModal(video); setVideoProgress(0); setVideoPlaying(true); }}>
              <div className="video-miniatura-wrapper" style={{ background: video.gradiente }}>
                <div className="video-overlay-gradient" />
                <button className="video-play-btn" aria-label="Ver videoclase">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </button>
                <span className="video-duracion-badge">{video.duracion}</span>
                <span className="video-nivel-tag">{video.nivel}</span>
              </div>
              <div className="video-card-detalles">
                <span className="video-meta-autor">{video.canal} • {video.visitas}</span>
                <h4 className="video-card-titulo">{video.titulo}</h4>
                <p className="video-card-desc">{video.descripcion}</p>
                <div className="video-badge-idioma">{video.tema}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {subTab === 'VOZ' && (
        <div className="card-premium lab-pantalla">
          <div className="lab-pantalla-header">
            <h3 className="seccion-titulo">Simulador de Pronunciación Oral</h3>
            <p className="seccion-subtitulo">Escucha el audio guía nativo y luego presiona el micrófono para grabar tu voz.</p>
          </div>

          <div className="lab-frase-box">
            <div className="frase-box-top">
              <span className="frase-instruccion">Oración modelo (Nivel C1):</span>
              <button 
                className={`btn-native-audio-play ${nativeAudioPlaying ? 'activo' : ''}`}
                onClick={playNativeAudio}
                title="Escuchar pronunciación nativa"
              >
                {nativeAudioPlaying ? (
                  <div className="audio-mini-visualizer">
                    <div className="audio-mini-bar" style={{ animationDelay: '0.1s' }} />
                    <div className="audio-mini-bar" style={{ animationDelay: '0.3s' }} />
                    <div className="audio-mini-bar" style={{ animationDelay: '0.2s' }} />
                  </div>
                ) : (
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                )}
                <span>{nativeAudioPlaying ? 'Reproduciendo...' : 'Escuchar guía'}</span>
              </button>
            </div>
            
            <div className="frase-texto-destacado">"The key parameters of the project were successfully evaluated."</div>
            <div className="frase-traduccion-espanol">Traducción: "Los parámetros clave del proyecto fueron evaluados exitosamente."</div>
          </div>

          <div className="mic-control-seccion-premium">
            <div className="mic-btn-container">
              {grabando && <div className="mic-pulse-ring" />}
              <button 
                className={`btn-mic-grabar-premium ${grabando ? 'grabando' : ''}`}
                onClick={manejarGrabacion}
                aria-label={grabando ? "Detener grabación de voz" : "Iniciar grabación de voz"}
              >
                {grabando ? (
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                    <rect x="5" y="5" width="14" height="14" rx="3" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                )}
              </button>
            </div>

            <div className="mic-texto-guia">
              <span className={`estado-graba-text ${grabando ? 'grabando-activo' : ''}`}>
                {grabando ? 'Grabando tu voz...' : 'Presiona el micrófono para iniciar'}
              </span>
              <span className="subtexto-graba-text">
                {grabando ? 'Lee en voz alta de forma pausada. Haz clic nuevamente para evaluar.' : 'Asegúrate de hablar en un lugar tranquilo.'}
              </span>
            </div>

            {grabando && (
              <div className="ondas-grabacion-premium">
                {Array.from({ length: 12 }).map((_, idx) => {
                  const delay = (idx % 4) * 0.15;
                  return (
                    <div 
                      key={idx} 
                      className="onda-barra-premium" 
                      style={{ animationDelay: `${delay}s`, height: `${12 + Math.random() * 32}px` }} 
                    />
                  );
                })}
              </div>
            )}
          </div>

          {resultadoPronunciacion && (
            <div className="lab-resultado-premium animate-fade-in">
              <div className="resultado-premium-stats">
                {/* Gauge circular SVG */}
                <div className="resultado-gauge-wrapper">
                  <svg viewBox="0 0 100 100" className="gauge-circular-svg">
                    <circle cx="50" cy="50" r="40" className="gauge-track" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      className="gauge-indicator"
                      style={{ 
                        strokeDasharray: `${(resultadoPronunciacion.precision / 100) * 251.2} 251.2`,
                        stroke: resultadoPronunciacion.precision >= 90 ? '#10b981' : resultadoPronunciacion.precision >= 70 ? '#f59e0b' : '#ef4444'
                      }}
                    />
                  </svg>
                  <div className="gauge-score-value">
                    <span className="gauge-num">{resultadoPronunciacion.precision}%</span>
                    <span className="gauge-label">Precisión</span>
                  </div>
                </div>

                <div className="resultado-breakdown-details">
                  <h4 className="breakdown-titulo">Evaluación de Inteligencia Artificial</h4>
                  <div className="breakdown-stats-grid">
                    <div className="stat-row">
                      <span className="stat-label">Fluidez:</span>
                      <div className="stat-progress-bar">
                        <div className="stat-progress-fill fluidez" style={{ width: `${resultadoPronunciacion.fluidez}%` }} />
                      </div>
                      <span className="stat-pct">{resultadoPronunciacion.fluidez}%</span>
                    </div>
                    <div className="stat-row">
                      <span className="stat-label">Entonación:</span>
                      <div className="stat-progress-bar">
                        <div className="stat-progress-fill entonacion" style={{ width: `${resultadoPronunciacion.intonacion}%` }} />
                      </div>
                      <span className="stat-pct">{resultadoPronunciacion.intonacion}%</span>
                    </div>
                  </div>
                  <p className="resultado-comentario-texto">
                    <strong>Resumen:</strong> {resultadoPronunciacion.comentario}
                  </p>
                </div>
              </div>

              {/* Feedback palabra por palabra */}
              <div className="resultado-palabra-analisis">
                <h4 className="analisis-titulo">Retroalimentación palabra por palabra:</h4>
                <div className="palabras-flex-container">
                  {resultadoPronunciacion.detalles.map((det, index) => (
                    <div key={index} className={`palabra-badge-estado ${det.estado}`} title={`Estado: ${det.estado}`}>
                      {det.palabra}
                      <span className="dot-indicador" />
                    </div>
                  ))}
                </div>
                <div className="leyenda-palabras">
                  <span className="leyenda-item"><span className="dot leyenda-correcto" /> Correcto</span>
                  <span className="leyenda-item"><span className="dot leyenda-advertencia" /> Desviación leve</span>
                  <span className="leyenda-item"><span className="dot leyenda-mejora" /> Por mejorar</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {subTab === 'AUDIO' && (
        <div className="card-premium lab-pantalla">
          <div className="lab-pantalla-header">
            <h3 className="seccion-titulo">Comprensión Auditiva (Listening)</h3>
            <p className="seccion-subtitulo">Reproduce el fragmento de audio tantas veces como desees y responde la pregunta de comprensión.</p>
          </div>

          <div className="audio-player-card-premium">
            <button className="btn-audio-play-premium" onClick={manejarPlayAudio} title={reproduciendoAudio ? 'Pausar' : 'Reproducir'}>
              {reproduciendoAudio ? (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <rect x="5" y="4" width="4" height="16" rx="1" />
                  <rect x="15" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ marginLeft: '2px' }}>
                  <polygon points="5 3 20 12 5 21 5 3" />
                </svg>
              )}
            </button>

            {/* Onda de sonido tipo SoundCloud */}
            <div className="soundcloud-waves-container">
              {Array.from({ length: 35 }).map((_, idx) => {
                const heightVal = 8 + Math.sin(idx * 0.4) * 16 + Math.cos(idx * 0.2) * 12;
                const activePercentage = (idx / 35) * 100;
                const isActive = audioProgress >= activePercentage;
                return (
                  <div 
                    key={idx} 
                    className={`soundcloud-wave-bar ${isActive ? 'activa' : ''} ${reproduciendoAudio && isActive ? 'bouncing' : ''}`}
                    style={{ 
                      height: `${Math.max(6, heightVal)}px`,
                      animationDelay: `${idx * 0.03}s`
                    }}
                    onClick={() => {
                      setAudioProgress(activePercentage);
                      setAudioCompletado(activePercentage >= 98);
                    }}
                  />
                );
              })}
            </div>

            <div className="audio-timer-badge">
              {reproduciendoAudio 
                ? `0:${Math.round((audioProgress / 100) * 4).toString().padStart(2, '0')} / 0:04` 
                : audioCompletado 
                  ? '0:04 / 0:04' 
                  : '0:00 / 0:04'
              }
            </div>
          </div>

          <div className="cuestionario-pregunta-card-premium">
            <div className="pregunta-cabecera-row">
              <span className="pregunta-badge-categoria">Comprensión B2</span>
              <h4 className="pregunta-enunciado-premium">
                Pregunta: ¿Por qué decidió el hablante cancelar su viaje original?
              </h4>
            </div>
            
            <div className="pregunta-opciones-premium">
              {[
                { id: 'A', text: 'El clima estaba demasiado lluvioso en el destino.' },
                { id: 'B', text: 'Hubo una huelga imprevista en el sistema ferroviario de pasajeros.' },
                { id: 'C', text: 'Decidió quedarse en casa a repasar los contenidos para el examen final.' }
              ].map(op => {
                const seleccionada = respuestaComprension === op.id;
                const esCorrecta = op.id === 'B';
                return (
                  <button 
                    key={op.id}
                    className={`opcion-btn-3d ${seleccionada ? 'seleccionada' : ''} ${respuestaComprension && esCorrecta ? 'correcto-reveal' : ''}`}
                    onClick={() => validarComprension(op.id)}
                    disabled={respuestaComprension !== null}
                  >
                    <span className="opcion-letra">{op.id}</span>
                    <span className="opcion-texto">{op.text}</span>
                    {seleccionada && (
                      <span className="opcion-valida-icon">
                        {esCorrecta ? '✓' : '✗'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {feedbackComprension && (
              <div className={`login-alerta-premium ${feedbackComprension.tipo} animate-fade-in`}>
                <div className="alerta-icon-wrapper">
                  {feedbackComprension.tipo === 'exito' ? '✓' : '⚠'}
                </div>
                <div className="alerta-cuerpo">
                  <strong>{feedbackComprension.tipo === 'exito' ? '¡Respuesta correcta!' : 'Respuesta incorrecta'}</strong>
                  <p>{feedbackComprension.mensaje}</p>
                </div>
                {feedbackComprension.tipo === 'exito' && !mostrarTranscripcion && (
                  <button className="btn-revelar-transcrip" onClick={() => setMostrarTranscripcion(true)}>
                    Ver Transcripción
                  </button>
                )}
              </div>
            )}

            {mostrarTranscripcion && (
              <div className="transcripcion-box-premium animate-fade-in">
                <h5 className="transcripcion-titulo">Transcripción del Audio (Inglés):</h5>
                <p className="transcripcion-parrafo">
                  "I was planning to catch the 10:30 express train, but due to the unexpected rail union strike, all departures were cancelled until tomorrow morning. Thus, I had no choice but to call off the entire trip."
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {subTab === 'WRITING' && (
        <div className="card-premium lab-pantalla">
          <div className="lab-pantalla-header">
            <h3 className="seccion-titulo">Taller de Composición Gramatical</h3>
            <p className="seccion-subtitulo">Ordena las fichas para estructurar una frase coherente y con sentido sobre el aprendizaje.</p>
          </div>

          <div className="escritura-taller-contenedor">
            <div className="escritura-seccion-tablero">
              <span className="escritura-tablero-label">Frase armada (haz clic en las palabras para quitarlas):</span>
              
              <div className="escritura-respuesta-premium">
                {palabrasSeleccionadas.length > 0 ? (
                  palabrasSeleccionadas.map((palabra, idx) => (
                    <button 
                      key={idx} 
                      className="word-chip-selected animate-scale-up"
                      onClick={() => removerPalabra(palabra)}
                      title="Quitar palabra"
                    >
                      {palabra}
                      <span className="word-chip-remove-x">×</span>
                    </button>
                  ))
                ) : (
                  <span className="escritura-placeholder-text">
                    Selecciona las palabras de abajo en el orden correspondiente para rellenar este panel...
                  </span>
                )}

                {/* Slots vacíos guías de Duolingo */}
                {Array.from({ length: Math.max(0, palabrasScrambled.length - palabrasSeleccionadas.length) }).map((_, idx) => (
                  <div key={idx} className="escritura-slot-guia" />
                ))}
              </div>

              {palabrasSeleccionadas.length > 0 && (
                <button className="btn-limpiar-respuesta-3d" onClick={reiniciarEscritura}>
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Limpiar tablero
                </button>
              )}
            </div>

            <div className="escritura-opciones-premium">
              <span className="escritura-fichas-label">Fichas disponibles:</span>
              <div className="fichas-chips-grid">
                {palabrasScrambled.map((palabra, idx) => {
                  const usada = palabrasSeleccionadas.includes(palabra);
                  return (
                    <button
                      key={idx}
                      className={`word-chip-3d ${usada ? 'usada' : ''}`}
                      onClick={() => !usada && hacerClicPalabra(palabra)}
                      disabled={usada}
                    >
                      {palabra}
                    </button>
                  );
                })}
              </div>
            </div>

            <button 
              className="btn-evaluar-escritura-3d" 
              onClick={validarEscritura}
              disabled={palabrasSeleccionadas.length === 0}
            >
              Evaluar Composición
            </button>

            {feedbackEscritura && (
              <div className={`login-alerta-premium ${feedbackEscritura.tipo} animate-fade-in`} style={{ marginTop: '24px' }}>
                <div className="alerta-icon-wrapper">
                  {feedbackEscritura.tipo === 'exito' ? '✓' : feedbackEscritura.tipo === 'advertencia' ? 'ℹ' : '⚠'}
                </div>
                <div className="alerta-cuerpo">
                  <strong>
                    {feedbackEscritura.tipo === 'exito' ? '¡Estructura correcta!' : feedbackEscritura.tipo === 'advertencia' ? 'Detalle por corregir' : 'Estructura incorrecta'}
                  </strong>
                  <p>{feedbackEscritura.mensaje}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MODAL DEL REPRODUCTOR DE VIDEO SIMULADO ── */}
      {videoModal && (
        <div className="video-player-modal-overlay" onClick={() => { setVideoModal(null); setVideoPlaying(false); }}>
          <div className="video-player-modal-content animate-slide-up" onClick={e => e.stopPropagation()}>
            {/* Cabecera modal */}
            <div className="video-modal-header">
              <div className="video-modal-header-text">
                <span className="video-modal-label">Videoclase Interactiva ({videoModal.nivel})</span>
                <h3 className="video-modal-titulo">{videoModal.titulo}</h3>
              </div>
              <button className="btn-cerrar-video-modal" onClick={() => { setVideoModal(null); setVideoPlaying(false); }}>
                ×
              </button>
            </div>

            {/* Pantalla de video principal */}
            <div className="video-pantalla-simulada" style={{ background: videoModal.gradiente }}>
              <div className="video-particulas-fondo" />
              
              {/* Marca de agua / Logo */}
              <div className="video-watermark">
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" fill="none">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                </svg>
                <span>Academia de Idiomas</span>
              </div>

              {/* Icono de Reproducción / Pausa Gigante en pantalla */}
              {!videoPlaying && videoProgress < 100 && (
                <button className="video-play-center-btn" onClick={() => setVideoPlaying(true)}>
                  <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </button>
              )}

              {videoProgress >= 100 && (
                <div className="video-replay-screen">
                  <p>Clase completada con éxito</p>
                  <button className="btn-replay-video-sim" onClick={() => { setVideoProgress(0); setVideoPlaying(true); }}>
                    Volver a ver
                  </button>
                </div>
              )}

              {/* Subtítulos */}
              {videoSubtitle && videoProgress < 100 && (
                <div className="video-subtitulos-box">
                  <span className="subtitulo-texto">{videoSubtitle}</span>
                </div>
              )}
            </div>

            {/* Barra de progreso interactiva del reproductor */}
            <div className="video-player-timeline-wrapper">
              <div 
                className="video-player-timeline-track"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const pct = (clickX / rect.width) * 100;
                  setVideoProgress(pct);
                  setVideoCompleted(pct >= 98);
                }}
              >
                <div className="video-player-timeline-fill" style={{ width: `${videoProgress}%` }} />
                <div className="video-player-timeline-handle" style={{ left: `${videoProgress}%` }} />
              </div>
            </div>

            {/* Barra de controles inferior del reproductor */}
            <div className="video-player-controles-bar">
              <div className="controles-grupo-izq">
                <button className="btn-control-play-pause" onClick={() => { if (videoProgress >= 100) { setVideoProgress(0); setVideoPlaying(true); } else { setVideoPlaying(!videoPlaying); } }}>
                  {videoPlaying ? (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <rect x="5" y="4" width="4" height="16" rx="1" />
                      <rect x="15" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <polygon points="5 3 20 12 5 21 5 3" />
                    </svg>
                  )}
                </button>
                <span className="video-player-tiempo-label">
                  {Math.floor((videoProgress / 100) * 15)}:{(Math.floor((videoProgress / 100) * 60) % 60).toString().padStart(2, '0')} / {videoModal.duracion}
                </span>
              </div>

              <div className="controles-grupo-der">
                {/* Control de volumen ficticio */}
                <div className="volumen-control-wrapper">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                  <div className="volumen-slider-track">
                    <div className="volumen-slider-fill" style={{ width: '80%' }} />
                  </div>
                </div>

                <div className="hd-badge">1080p HD</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
