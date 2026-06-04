import React, { useState, useEffect } from 'react';

/* ── DATOS ───────────────────────────────────────────── */
const EVALUACIONES = [
  {
    id: 1,
    titulo: 'Test de Suficiencia: Phrasal Verbs Avanzados',
    curso: 'Inglés Avanzado',
    nivel: 'C1',
    categoria: 'Gramática',
    duracionMinutos: 10,
    color: '#0284c7',
    colorPastel: '#e0f2fe',
    estado: 'DISPONIBLE',
    intentos: 0,
    bandera: (
      <svg viewBox="0 0 60 30" width="38" height="19" style={{ borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.12)', flexShrink: 0 }}>
        <clipPath id="ef1"><rect width="60" height="30" rx="3"/></clipPath>
        <g clipPath="url(#ef1)">
          <rect width="60" height="30" fill="#00247d"/>
          <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="6"/>
          <path d="M0 0 L60 30 M60 0 L0 30" stroke="#cf142b" strokeWidth="4"/>
          <path d="M30 0 v30 M0 15 h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30 0 v30 M0 15 h60" stroke="#cf142b" strokeWidth="6"/>
        </g>
      </svg>
    ),
    preguntas: [
      { id: 1, enunciado: 'Complete the sentence: "The board members decided to _______ the meeting until next Thursday due to scheduling conflicts."', opciones: [{ id: 'A', texto: 'put off' }, { id: 'B', texto: 'call off' }, { id: 'C', texto: 'carry out' }, { id: 'D', texto: 'hold on' }], respuestaCorrecta: 'A' },
      { id: 2, enunciado: 'What does the phrasal verb "bring about" mean?', opciones: [{ id: 'A', texto: 'To introduce someone' }, { id: 'B', texto: 'To cause something to happen' }, { id: 'C', texto: 'To carry an object upwards' }, { id: 'D', texto: 'To cancel a project' }], respuestaCorrecta: 'B' },
      { id: 3, enunciado: 'Identify the correct phrasal verb: "She really _______ her mother; they have the exact same personality."', opciones: [{ id: 'A', texto: 'takes after' }, { id: 'B', texto: 'looks up to' }, { id: 'C', texto: 'runs into' }, { id: 'D', texto: 'brings up' }], respuestaCorrecta: 'A' },
    ]
  },
  {
    id: 2,
    titulo: 'Grammaire & Pronoms Relatifs',
    curso: 'Francés Intermedio',
    nivel: 'B2',
    categoria: 'Gramática',
    duracionMinutos: 15,
    color: '#6366f1',
    colorPastel: '#e0e7ff',
    estado: 'DISPONIBLE',
    intentos: 1,
    ultimaNota: '8.0',
    bandera: (
      <svg viewBox="0 0 60 30" width="38" height="19" style={{ borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.12)', flexShrink: 0 }}>
        <clipPath id="ef2"><rect width="60" height="30" rx="3"/></clipPath>
        <g clipPath="url(#ef2)">
          <rect width="20" height="30" fill="#002395"/>
          <rect x="20" width="20" height="30" fill="#fff"/>
          <rect x="40" width="20" height="30" fill="#ed2939"/>
        </g>
      </svg>
    ),
    preguntas: [
      { id: 1, enunciado: "Choisissez le pronom relatif correct : \"C'est la voiture _______ mon père rêve d'acheter.\"", opciones: [{ id: 'A', texto: 'dont' }, { id: 'B', texto: 'que' }, { id: 'C', texto: 'qui' }, { id: 'D', texto: 'où' }], respuestaCorrecta: 'A' },
      { id: 2, enunciado: 'Complétez : "La ville _______ je suis né est très touristique."', opciones: [{ id: 'A', texto: 'qui' }, { id: 'B', texto: 'que' }, { id: 'C', texto: 'où' }, { id: 'D', texto: 'dont' }], respuestaCorrecta: 'C' },
      { id: 3, enunciado: 'Choisissez : "La personne _______ m\'a aidé était très gentille."', opciones: [{ id: 'A', texto: 'dont' }, { id: 'B', texto: 'qui' }, { id: 'C', texto: 'que' }, { id: 'D', texto: 'lequel' }], respuestaCorrecta: 'B' },
    ]
  },
  {
    id: 3,
    titulo: 'Vocabolario Italiano: La Casa e la Famiglia',
    curso: 'Italiano Básico',
    nivel: 'A1',
    categoria: 'Vocabulario',
    duracionMinutos: 8,
    color: '#16a34a',
    colorPastel: '#e8f9e1',
    estado: 'DISPONIBLE',
    intentos: 0,
    bandera: (
      <svg viewBox="0 0 60 30" width="38" height="19" style={{ borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.12)', flexShrink: 0 }}>
        <clipPath id="ef3"><rect width="60" height="30" rx="3"/></clipPath>
        <g clipPath="url(#ef3)">
          <rect width="20" height="30" fill="#009246"/>
          <rect x="20" width="20" height="30" fill="#ffffff"/>
          <rect x="40" width="20" height="30" fill="#cd212a"/>
        </g>
      </svg>
    ),
    preguntas: [
      { id: 1, enunciado: 'Come si dice "bedroom" in italiano?', opciones: [{ id: 'A', texto: 'cucina' }, { id: 'B', texto: 'camera da letto' }, { id: 'C', texto: 'bagno' }, { id: 'D', texto: 'soggiorno' }], respuestaCorrecta: 'B' },
      { id: 2, enunciado: '¿Cuál es la traducción de "fratello" al español?', opciones: [{ id: 'A', texto: 'padre' }, { id: 'B', texto: 'primo' }, { id: 'C', texto: 'hermano' }, { id: 'D', texto: 'tío' }], respuestaCorrecta: 'C' },
      { id: 3, enunciado: 'Completa: "Io abito in una _______ grande con tre piani."', opciones: [{ id: 'A', texto: 'appartamento' }, { id: 'B', texto: 'strada' }, { id: 'C', texto: 'scuola' }, { id: 'D', texto: 'casa' }], respuestaCorrecta: 'D' },
    ]
  },
  {
    id: 4,
    titulo: 'Deutsche Verben: Trennbare Verben',
    curso: 'Alemán Intermedio',
    nivel: 'B1',
    categoria: 'Gramática',
    duracionMinutos: 12,
    color: '#475569',
    colorPastel: '#f1f5f9',
    estado: 'COMPLETADA',
    intentos: 2,
    ultimaNota: '9.5',
    bandera: (
      <svg viewBox="0 0 60 30" width="38" height="19" style={{ borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.12)', flexShrink: 0 }}>
        <clipPath id="ef4"><rect width="60" height="30" rx="3"/></clipPath>
        <g clipPath="url(#ef4)">
          <rect width="60" height="10" fill="#000000"/>
          <rect y="10" width="60" height="10" fill="#dd0000"/>
          <rect y="20" width="60" height="10" fill="#ffce00"/>
        </g>
      </svg>
    ),
    preguntas: [
      { id: 1, enunciado: 'Wählen Sie das richtige trennbare Verb: "Ich _______ um 7 Uhr morgens _______."', opciones: [{ id: 'A', texto: 'auf / stehe' }, { id: 'B', texto: 'stehe / auf' }, { id: 'C', texto: 'ein / steige' }, { id: 'D', texto: 'steige / ein' }], respuestaCorrecta: 'B' },
      { id: 2, enunciado: 'Completa: "Kannst du das Licht _______?" (anmachen)', opciones: [{ id: 'A', texto: 'anmachen' }, { id: 'B', texto: 'machen an' }, { id: 'C', texto: 'an machen' }, { id: 'D', texto: 'machen' }], respuestaCorrecta: 'C' },
      { id: 3, enunciado: '¿Qué significa "aufräumen"?', opciones: [{ id: 'A', texto: 'Levantarse' }, { id: 'B', texto: 'Ordenar/limpiar' }, { id: 'C', texto: 'Salir afuera' }, { id: 'D', texto: 'Llegar' }], respuestaCorrecta: 'B' },
    ]
  },
  {
    id: 5,
    titulo: 'Comprensión Lectora: Le Petit Prince',
    curso: 'Francés Intermedio',
    nivel: 'B2',
    categoria: 'Comprensión',
    duracionMinutos: 20,
    color: '#6366f1',
    colorPastel: '#e0e7ff',
    estado: 'DISPONIBLE',
    intentos: 0,
    bandera: (
      <svg viewBox="0 0 60 30" width="38" height="19" style={{ borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.12)', flexShrink: 0 }}>
        <clipPath id="ef5"><rect width="60" height="30" rx="3"/></clipPath>
        <g clipPath="url(#ef5)">
          <rect width="20" height="30" fill="#002395"/>
          <rect x="20" width="20" height="30" fill="#fff"/>
          <rect x="40" width="20" height="30" fill="#ed2939"/>
        </g>
      </svg>
    ),
    preguntas: [
      { id: 1, enunciado: '"L\'essentiel est invisible pour les yeux." — Qui dit cette phrase dans le livre?', opciones: [{ id: 'A', texto: 'Le renard' }, { id: 'B', texto: 'Le Petit Prince' }, { id: 'C', texto: 'Le pilote' }, { id: 'D', texto: 'Le serpent' }], respuestaCorrecta: 'A' },
      { id: 2, enunciado: '¿De qué planeta viene el Principito?', opciones: [{ id: 'A', texto: 'B-614' }, { id: 'B', texto: 'B-612' }, { id: 'C', texto: 'B-624' }, { id: 'D', texto: 'B-622' }], respuestaCorrecta: 'B' },
      { id: 3, enunciado: 'Quelle fleur le Petit Prince chérit-il sur sa planète?', opciones: [{ id: 'A', texto: 'Un tournesol' }, { id: 'B', texto: 'Une tulipe' }, { id: 'C', texto: 'Une rose' }, { id: 'D', texto: 'Un œillet' }], respuestaCorrecta: 'C' },
    ]
  },
];

const CATEGORIAS = ['Todas', 'Gramática', 'Vocabulario', 'Comprensión'];

/* ── COMPONENTE PRINCIPAL ───────────────────────────── */
export default function EvaluacionesEstudiante() {
  const [vista, setVista] = useState('card');
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [evaluacionActiva, setEvaluacionActiva] = useState(null);
  const [preguntaIdx, setPreguntaIdx] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [segundos, setSegundos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [animEntrada, setAnimEntrada] = useState(false);

  /* Temporizador */
  useEffect(() => {
    if (!evaluacionActiva || finalizado) return;
    if (segundos <= 0) { setFinalizado(true); return; }
    const t = setInterval(() => setSegundos(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [evaluacionActiva, segundos, finalizado]);

  /* Animación al cambiar pregunta */
  useEffect(() => {
    setAnimEntrada(true);
    const t = setTimeout(() => setAnimEntrada(false), 300);
    return () => clearTimeout(t);
  }, [preguntaIdx, evaluacionActiva]);

  const tiempoFormato = () => {
    const m = Math.floor(segundos / 60).toString().padStart(2, '0');
    const s = (segundos % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const iniciar = (ev) => {
    setEvaluacionActiva(ev);
    setPreguntaIdx(0);
    setRespuestas({});
    setSegundos(ev.duracionMinutos * 60);
    setFinalizado(false);
  };

  const seleccionar = (pregId, opId) => {
    setRespuestas(prev => ({ ...prev, [pregId]: opId }));
  };

  const avanzar = () => {
    if (preguntaIdx < evaluacionActiva.preguntas.length - 1) {
      setPreguntaIdx(i => i + 1);
    } else {
      setFinalizado(true);
    }
  };

  const retroceder = () => {
    if (preguntaIdx > 0) setPreguntaIdx(i => i - 1);
  };

  const puntaje = () => {
    if (!evaluacionActiva) return { nota: 0, correctas: 0, total: 0 };
    let correctas = 0;
    evaluacionActiva.preguntas.forEach(p => {
      if (respuestas[p.id] === p.respuestaCorrecta) correctas++;
    });
    return { nota: ((correctas / evaluacionActiva.preguntas.length) * 10).toFixed(1), correctas, total: evaluacionActiva.preguntas.length };
  };

  /* Filtros */
  const evaluacionesFiltradas = EVALUACIONES.filter(e => {
    const matchBusq = e.titulo.toLowerCase().includes(busqueda.toLowerCase()) || e.curso.toLowerCase().includes(busqueda.toLowerCase());
    const matchCat = categoriaActiva === 'Todas' || e.categoria === categoriaActiva;
    return matchBusq && matchCat;
  });

  const tiempoUrgente = segundos < 60 && !finalizado && evaluacionActiva;

  /* ── PANTALLA QUIZ ── */
  if (evaluacionActiva && !finalizado) {
    const pregunta = evaluacionActiva.preguntas[preguntaIdx];
    const pct = ((preguntaIdx + 1) / evaluacionActiva.preguntas.length) * 100;
    const respondida = respuestas[pregunta.id];

    return (
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        {/* Header quiz */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <button onClick={() => { if (window.confirm('¿Salir? Tu progreso se perderá.')) setEvaluacionActiva(null); }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: '2px solid var(--borde-color)', borderBottom: '4px solid var(--borde-color)', borderRadius: '12px', padding: '8px 16px', fontSize: '13.5px', fontWeight: '800', cursor: 'pointer', color: '#64748b' }}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="15 18 9 12 15 6"/></svg>
            Salir
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#64748b' }}>{evaluacionActiva.curso}</div>
            <h3 style={{ fontSize: '18px', fontWeight: '900', color: '#1e293b', margin: '2px 0 0 0', letterSpacing: '-0.3px' }}>{evaluacionActiva.titulo}</h3>
          </div>
          {/* Timer */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 18px', borderRadius: '14px', fontWeight: '900',
            fontSize: '20px', letterSpacing: '0.5px', flexShrink: 0,
            backgroundColor: tiempoUrgente ? '#fff1f2' : '#f8fafc',
            border: `2px solid ${tiempoUrgente ? '#fecdd3' : 'var(--borde-color)'}`,
            color: tiempoUrgente ? '#dc2626' : '#334155',
            transition: 'all 0.3s ease'
          }}>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {tiempoFormato()}
          </div>
        </div>

        {/* Barra de progreso de preguntas */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#64748b' }}>Pregunta {preguntaIdx + 1} de {evaluacionActiva.preguntas.length}</span>
            <span style={{ fontSize: '13px', fontWeight: '800', color: evaluacionActiva.color }}>{Math.round(pct)}% completado</span>
          </div>
          <div style={{ height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, backgroundColor: evaluacionActiva.color, borderRadius: '5px', transition: 'width 0.4s ease' }}/>
          </div>
          {/* Dots de preguntas */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            {evaluacionActiva.preguntas.map((p, i) => (
              <button key={p.id} onClick={() => setPreguntaIdx(i)}
                style={{
                  width: '34px', height: '34px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  fontSize: '13px', fontWeight: '900', transition: 'all 0.15s ease',
                  backgroundColor: i === preguntaIdx ? evaluacionActiva.color : respuestas[p.id] ? evaluacionActiva.colorPastel : '#f1f5f9',
                  color: i === preguntaIdx ? '#fff' : respuestas[p.id] ? evaluacionActiva.color : '#94a3b8',
                  border: `2px solid ${i === preguntaIdx ? evaluacionActiva.color : respuestas[p.id] ? evaluacionActiva.color + '55' : '#e2e8f0'}`
                }}>{i + 1}</button>
            ))}
          </div>
        </div>

        {/* Tarjeta de pregunta */}
        <div style={{
          backgroundColor: '#fff', border: `2px solid var(--borde-color)`,
          borderTop: `5px solid ${evaluacionActiva.color}`,
          borderRadius: '20px', padding: '32px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
          opacity: animEntrada ? 0 : 1, transform: animEntrada ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.25s ease, transform 0.25s ease'
        }}>
          <p style={{ fontSize: '17.5px', fontWeight: '800', color: '#1e293b', margin: '0 0 28px 0', lineHeight: '1.55', textAlign: 'left' }}>
            {pregunta.enunciado}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pregunta.opciones.map(op => {
              const seleccionada = respondida === op.id;
              return (
                <button key={op.id} onClick={() => seleccionar(pregunta.id, op.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '16px 20px', borderRadius: '14px', cursor: 'pointer',
                    textAlign: 'left', width: '100%', transition: 'all 0.15s ease',
                    backgroundColor: seleccionada ? evaluacionActiva.colorPastel : '#f8fafc',
                    border: seleccionada ? `2px solid ${evaluacionActiva.color}` : '2px solid #e2e8f0',
                    borderBottom: seleccionada ? `4px solid ${evaluacionActiva.color}` : '4px solid #e2e8f0',
                    boxShadow: seleccionada ? `0 4px 14px ${evaluacionActiva.color}22` : 'none'
                  }}>
                  <span style={{
                    width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13.5px', fontWeight: '900',
                    backgroundColor: seleccionada ? evaluacionActiva.color : '#e2e8f0',
                    color: seleccionada ? '#fff' : '#64748b',
                    transition: 'all 0.15s ease'
                  }}>{op.id}</span>
                  <span style={{ fontSize: '15px', fontWeight: seleccionada ? '800' : '600', color: seleccionada ? '#1e293b' : '#475569' }}>
                    {op.texto}
                  </span>
                  {seleccionada && (
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke={evaluacionActiva.color} strokeWidth="2.5" fill="none" style={{ marginLeft: 'auto', flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Acciones de navegación */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px', justifyContent: 'flex-end' }}>
          {preguntaIdx > 0 && (
            <button onClick={retroceder}
              style={{ height: '50px', padding: '0 24px', borderRadius: '14px', border: '2px solid var(--borde-color)', borderBottom: '4px solid var(--borde-color)', backgroundColor: '#fff', color: '#64748b', fontSize: '14.5px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="15 18 9 12 15 6"/></svg>
              Anterior
            </button>
          )}
          <button onClick={avanzar} disabled={!respondida}
            style={{
              height: '50px', padding: '0 28px', borderRadius: '14px', fontSize: '14.5px', fontWeight: '900', cursor: respondida ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', gap: '8px',
              backgroundColor: respondida ? evaluacionActiva.color : '#e2e8f0',
              color: respondida ? '#fff' : '#94a3b8',
              border: `2px solid ${respondida ? evaluacionActiva.color : '#e2e8f0'}`,
              borderBottom: `4px solid ${respondida ? evaluacionActiva.color + 'bb' : '#e2e8f0'}`,
              transition: 'all 0.15s ease', opacity: respondida ? 1 : 0.7
            }}>
            {preguntaIdx === evaluacionActiva.preguntas.length - 1 ? 'Finalizar Evaluación' : 'Siguiente'}
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  /* ── PANTALLA RESULTADOS ── */
  if (evaluacionActiva && finalizado) {
    const { nota, correctas, total } = puntaje();
    const notaNum = parseFloat(nota);
    const excelente = notaNum >= 9;
    const aprobado = notaNum >= 7;
    const radio = 54;
    const circunferencia = 2 * Math.PI * radio;
    const dash = (notaNum / 10) * circunferencia;

    return (
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#1e293b', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>Resultados</h2>
          <p style={{ fontSize: '16px', color: '#64748b', margin: 0 }}>{evaluacionActiva.titulo}</p>
        </div>

        {/* Card de resultado */}
        <div style={{ backgroundColor: '#fff', border: '2px solid var(--borde-color)', borderTop: `6px solid ${excelente ? '#16a34a' : aprobado ? evaluacionActiva.color : '#dc2626'}`, borderRadius: '22px', padding: '36px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', marginBottom: '20px', textAlign: 'center' }}>
          {/* Círculo SVG */}
          <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto 20px' }}>
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r={radio} fill="none" stroke="#e2e8f0" strokeWidth="12"/>
              <circle cx="70" cy="70" r={radio} fill="none"
                stroke={excelente ? '#16a34a' : aprobado ? evaluacionActiva.color : '#dc2626'}
                strokeWidth="12" strokeLinecap="round"
                strokeDasharray={`${dash} ${circunferencia}`}
                transform="rotate(-90 70 70)"
                style={{ transition: 'stroke-dasharray 1s ease' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '30px', fontWeight: '900', color: '#1e293b', lineHeight: 1 }}>{nota}</span>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginTop: '2px' }}>de 10</span>
            </div>
          </div>

          {/* Badge de resultado */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 22px', borderRadius: '14px', marginBottom: '14px', backgroundColor: excelente ? '#dcfce7' : aprobado ? evaluacionActiva.colorPastel : '#fff1f2', border: `1.5px solid ${excelente ? '#bbf7d0' : aprobado ? evaluacionActiva.color + '44' : '#fecdd3'}` }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: excelente ? '#bbf7d0' : aprobado ? evaluacionActiva.color + '22' : '#fecdd3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {excelente
                ? <svg viewBox="0 0 24 24" width="18" height="18" stroke="#16a34a" strokeWidth="2" fill="none"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
                : aprobado
                  ? <svg viewBox="0 0 24 24" width="18" height="18" stroke={evaluacionActiva.color} strokeWidth="2" fill="none"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
                  : <svg viewBox="0 0 24 24" width="18" height="18" stroke="#dc2626" strokeWidth="2" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              }
            </div>
            <span style={{ fontSize: '15px', fontWeight: '900', color: excelente ? '#15803d' : aprobado ? evaluacionActiva.color : '#dc2626' }}>
              {excelente ? '¡Excelente trabajo!' : aprobado ? '¡Buen trabajo!' : 'Necesitas repasar'}
            </span>
          </div>

          <p style={{ fontSize: '15px', color: '#64748b', margin: '0 0 24px 0', lineHeight: '1.6' }}>
            Respondiste correctamente <strong style={{ color: '#1e293b' }}>{correctas} de {total}</strong> preguntas.
          </p>

          {/* Mini stats */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
            {[
              { label: 'Correctas',  n: correctas,          color: '#16a34a', bg: '#dcfce7', border: '#bbf7d0', icon: <polyline points="20 6 9 17 4 12"/> },
              { label: 'Incorrectas', n: total - correctas,  color: '#dc2626', bg: '#fff1f2', border: '#fecdd3', icon: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> },
              { label: 'Total',       n: total,              color: '#0284c7', bg: '#e0f2fe', border: '#bae6fd', icon: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></> },
            ].map(s => (
              <div key={s.label} style={{ backgroundColor: s.bg, border: `1.5px solid ${s.border}`, borderRadius: '14px', padding: '12px 20px', textAlign: 'center', minWidth: '100px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke={s.color} strokeWidth="2.5" fill="none">{s.icon}</svg>
                </div>
                <div style={{ fontSize: '24px', fontWeight: '900', color: s.color, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: s.color, opacity: 0.85, marginTop: '3px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Revisión de respuestas */}
        <div style={{ backgroundColor: '#fff', border: '2px solid var(--borde-color)', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '900', color: '#1e293b', margin: '0 0 18px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            Revisión detallada
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {evaluacionActiva.preguntas.map((preg, idx) => {
              const resp = respuestas[preg.id];
              const ok = resp === preg.respuestaCorrecta;
              const opRespuesta = preg.opciones.find(o => o.id === resp);
              const opCorrecta = preg.opciones.find(o => o.id === preg.respuestaCorrecta);
              return (
                <div key={preg.id} style={{ backgroundColor: ok ? '#f0fdf4' : '#fff1f2', border: `1.5px solid ${ok ? '#bbf7d0' : '#fecdd3'}`, borderLeft: `5px solid ${ok ? '#16a34a' : '#dc2626'}`, borderRadius: '14px', padding: '16px 18px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '8px', flexShrink: 0, backgroundColor: ok ? '#dcfce7' : '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {ok
                        ? <svg viewBox="0 0 24 24" width="14" height="14" stroke="#16a34a" strokeWidth="3" fill="none"><polyline points="20 6 9 17 4 12"/></svg>
                        : <svg viewBox="0 0 24 24" width="14" height="14" stroke="#dc2626" strokeWidth="3" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      }
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: 0, lineHeight: '1.4' }}>
                      <span style={{ color: ok ? '#16a34a' : '#dc2626', fontWeight: '900' }}>Pregunta {idx + 1}:</span> {preg.enunciado}
                    </p>
                  </div>
                  <div style={{ paddingLeft: '36px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: ok ? '#16a34a' : '#dc2626' }}>
                      Tu respuesta: <strong>{resp ? `${resp}. ${opRespuesta?.texto}` : 'No respondida'}</strong>
                    </span>
                    {!ok && (
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#16a34a' }}>
                        Respuesta correcta: <strong>{preg.respuestaCorrecta}. {opCorrecta?.texto}</strong>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Botón volver */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button onClick={() => { setEvaluacionActiva(null); setFinalizado(false); }}
            className="btn-manual-accion primario"
            style={{ height: '52px', fontSize: '15px', flex: 'none', padding: '0 32px' }}>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Volver a Evaluaciones
          </button>
        </div>
      </div>
    );
  }

  /* ── PANTALLA LISTADO ── */
  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '34px', fontWeight: '900', color: '#1e293b', margin: '0 0 6px 0', letterSpacing: '-0.75px' }}>Evaluaciones</h2>
        <p style={{ fontSize: '17px', color: '#64748b', margin: 0 }}>Realiza tests de suficiencia, cuestionarios y exámenes de tus cursos.</p>
      </div>

      {/* Categorías */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          { id: 'Todas',       icono: <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></> },
          { id: 'Gramática',   icono: <><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></> },
          { id: 'Vocabulario', icono: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></> },
          { id: 'Comprensión', icono: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></> },
        ].map(cat => (
          <button key={cat.id} onClick={() => setCategoriaActiva(cat.id)}
            style={{
              padding: '8px 16px', borderRadius: '22px', border: 'none', cursor: 'pointer',
              fontSize: '13.5px', fontWeight: '800', transition: 'all 0.15s ease',
              backgroundColor: categoriaActiva === cat.id ? '#1e293b' : '#f1f5f9',
              color: categoriaActiva === cat.id ? '#fff' : '#64748b',
              boxShadow: categoriaActiva === cat.id ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
              display: 'flex', alignItems: 'center', gap: '7px'
            }}>
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">{cat.icono}</svg>
            {cat.id}
          </button>
        ))}
      </div>

      {/* Buscador + toggle vista */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="#94a3b8" strokeWidth="2.5" fill="none"
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Buscar evaluación o curso..."
            value={busqueda} onChange={e => setBusqueda(e.target.value)}
            style={{ width: '100%', boxSizing: 'border-box', height: '44px', paddingLeft: '42px', paddingRight: '14px', border: '2px solid var(--borde-color)', borderRadius: '12px', fontSize: '14px', fontFamily: 'inherit', color: '#334155', backgroundColor: '#fff', outline: 'none' }}
          />
        </div>
        {/* Toggles vista */}
        <div style={{ display: 'flex', gap: '4px', backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '4px' }}>
          {[
            { id: 'card', icon: <><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="9" rx="1"/><rect x="3" y="15" width="7" height="6" rx="1"/><rect x="14" y="15" width="7" height="6" rx="1"/></>, title: 'Tarjetas' },
            { id: 'cuadrado', icon: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>, title: 'Cuadrícula' },
            { id: 'lista', icon: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>, title: 'Lista' },
          ].map(v => (
            <button key={v.id} title={v.title} onClick={() => setVista(v.id)}
              style={{ width: '38px', height: '38px', borderRadius: '9px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: vista === v.id ? '#fff' : 'transparent', boxShadow: vista === v.id ? '0 1px 4px rgba(0,0,0,0.12)' : 'none', color: vista === v.id ? '#0284c7' : '#94a3b8', transition: 'all 0.15s ease' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">{v.icon}</svg>
            </button>
          ))}
        </div>
        <span style={{ fontSize: '13px', fontWeight: '700', color: '#94a3b8', whiteSpace: 'nowrap' }}>
          {evaluacionesFiltradas.length} evaluación{evaluacionesFiltradas.length !== 1 ? 'es' : ''}
        </span>
      </div>

      {/* Vacío */}
      {evaluacionesFiltradas.length === 0 && (
        <div className="card-premium" style={{ textAlign: 'center', padding: '56px', margin: 0 }}>
          <svg viewBox="0 0 24 24" width="48" height="48" stroke="#94a3b8" strokeWidth="1.5" fill="none" style={{ margin: '0 auto 14px', display: 'block' }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <p style={{ fontWeight: '700', fontSize: '16px', color: '#64748b', margin: 0 }}>No se encontraron evaluaciones.</p>
        </div>
      )}

      {/* ── MODO CARD ── */}
      {vista === 'card' && evaluacionesFiltradas.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '22px' }}>
          {evaluacionesFiltradas.map(ev => (
            <EvalCard key={ev.id} ev={ev} onIniciar={iniciar} />
          ))}
        </div>
      )}

      {/* ── MODO CUADRADO ── */}
      {vista === 'cuadrado' && evaluacionesFiltradas.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {evaluacionesFiltradas.map(ev => {
            const completada = ev.estado === 'COMPLETADA';
            return (
              <div key={ev.id} style={{ backgroundColor: '#fff', border: '2px solid var(--borde-color)', borderTop: `5px solid ${ev.color}`, borderRadius: '18px', padding: '22px 18px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', boxSizing: 'border-box', minHeight: '280px' }}>
                {ev.bandera}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
                  <div style={{ fontSize: '14px', fontWeight: '900', color: '#1e293b', lineHeight: '1.3' }}>{ev.titulo}</div>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: ev.color, backgroundColor: ev.colorPastel, padding: '2px 8px', borderRadius: '6px' }}>{ev.categoria}</span>
                  {/* Meta */}
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {ev.duracionMinutos} min
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      {ev.preguntas.length} preg.
                    </span>
                  </div>
                  {ev.ultimaNota && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: '900', color: '#16a34a', backgroundColor: '#dcfce7', border: '1.5px solid #bbf7d0', borderRadius: '8px', padding: '4px 10px' }}>
                      <svg viewBox="0 0 24 24" width="13" height="13" stroke="#16a34a" strokeWidth="2" fill="none"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
                      Nota: {ev.ultimaNota}
                    </div>
                  )}
                </div>
                {/* Botón anclado al fondo */}
                <button onClick={() => iniciar(ev)}
                  style={{ width: '100%', height: '40px', borderRadius: '11px', border: `2px solid ${ev.color}`, borderBottom: `4px solid ${ev.color}bb`, backgroundColor: completada ? ev.colorPastel : ev.color, color: completada ? ev.color : '#fff', fontSize: '12.5px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2.5" fill={completada ? 'none' : 'currentColor'}><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  {completada ? 'Repetir' : 'Iniciar'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ── MODO LISTA ── */}
      {vista === 'lista' && evaluacionesFiltradas.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {evaluacionesFiltradas.map(ev => {
            const completada = ev.estado === 'COMPLETADA';
            return (
              <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: '18px', backgroundColor: '#fff', border: '2px solid var(--borde-color)', borderLeft: `6px solid ${ev.color}`, borderRadius: '14px', padding: '16px 22px', boxSizing: 'border-box', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                {ev.bandera}
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: '15.5px', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.2px' }}>{ev.titulo}</div>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', marginTop: '2px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <span>{ev.curso}</span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {ev.duracionMinutos} min
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      {ev.preguntas.length} preguntas
                    </span>
                  </div>
                </div>
                <span style={{ fontSize: '11.5px', fontWeight: '800', color: ev.color, backgroundColor: ev.colorPastel, padding: '4px 10px', borderRadius: '8px', flexShrink: 0 }}>{ev.categoria}</span>
                {ev.ultimaNota && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: '900', color: '#16a34a', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="#16a34a" strokeWidth="2" fill="none"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
                    {ev.ultimaNota}
                  </span>
                )}
                <button onClick={() => iniciar(ev)}
                  style={{ height: '42px', padding: '0 22px', borderRadius: '12px', border: `2px solid ${ev.color}`, borderBottom: `4px solid ${ev.color}bb`, backgroundColor: completada ? ev.colorPastel : ev.color, color: completada ? ev.color : '#fff', fontSize: '13px', fontWeight: '900', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  {completada ? 'Repetir' : 'Iniciar'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── TARJETA DE EVALUACIÓN (modo card) ───────────────── */
function EvalCard({ ev, onIniciar }) {
  const completada = ev.estado === 'COMPLETADA';
  return (
    <div style={{ backgroundColor: '#fff', border: '2px solid var(--borde-color)', borderTop: `6px solid ${ev.color}`, borderRadius: '20px', padding: '26px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '18px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', transition: 'box-shadow 0.2s ease, transform 0.15s ease' }}>
      {/* Cabecera */}
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        {ev.bandera}
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: ev.color, backgroundColor: ev.colorPastel, padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{ev.categoria}</span>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '6px' }}>Nivel {ev.nivel}</span>
          </div>
          <h3 style={{ fontSize: '16.5px', fontWeight: '900', color: '#1e293b', margin: '0 0 3px 0', letterSpacing: '-0.3px', lineHeight: '1.3' }}>{ev.titulo}</h3>
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>{ev.curso}</span>
        </div>
      </div>

      {/* Meta info */}
      <div style={{ display: 'flex', gap: '12px' }}>
        {[
          { icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>, label: `${ev.duracionMinutos} min` },
          { icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></>, label: `${ev.preguntas.length} preguntas` },
        ].map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13.5px', fontWeight: '600' }}>
            <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none">{m.icon}</svg>
            {m.label}
          </div>
        ))}
      </div>

      {/* Última nota si existe */}
      {ev.ultimaNota && (
        <div style={{ backgroundColor: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="#16a34a" strokeWidth="2" fill="none">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
              <path d="M4 22h16"/>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
            </svg>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>Último intento ({ev.intentos} vez{ev.intentos > 1 ? 'ces' : ''})</div>
            <div style={{ fontSize: '17px', fontWeight: '900', color: '#16a34a' }}>{ev.ultimaNota} / 10</div>
          </div>
        </div>
      )}

      {/* Botón */}
      <button onClick={() => onIniciar(ev)}
        className="btn-manual-accion primario"
        style={{ height: '50px', fontSize: '14.5px', flex: 'none', width: '100%', backgroundColor: completada ? ev.colorPastel : ev.color, borderColor: ev.color, color: completada ? ev.color : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill={completada ? 'none' : 'currentColor'}>
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        {completada ? 'Repetir Evaluación' : 'Iniciar Evaluación'}
      </button>
    </div>
  );
}
