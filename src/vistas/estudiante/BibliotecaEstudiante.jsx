import React, { useState, useEffect } from 'react';

export default function BibliotecaEstudiante() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroNivel, setFiltroNivel] = useState('TODOS');
  const [filtroCategoria, setFiltroCategoria] = useState('TODOS');
  const [manualActivo, setManualActivo] = useState(null); // Manual seleccionado para visualizar
  const [descargandoId, setDescargandoId] = useState(null); // ID del manual que se está descargando
  const [alertaDescarga, setAlertaDescarga] = useState(null); // Alerta flotante

  // Estados de diseño del explorador (Igual a Cursos Activos)
  const [vistaTipo, setVistaTipo] = useState('card'); // card (detallada) | grid (cuadrícula) | list (lista)
  const [favoritos, setFavoritos] = useState([3]); // Manual de Francés B2 favorito por defecto
  const [filtroFavoritos, setFiltroFavoritos] = useState(false);

  // Estados de personalización de lectura
  const [lectorFontSize, setLectorFontSize] = useState(16); // en px
  const [lectorTema, setLectorTema] = useState('claro'); // claro | sepia | papel
  const [lectorTab, setLectorTab] = useState('lectura'); // lectura | pronunciacion | quiz | redaccion

  // Estados específicos para la práctica del manual Francés B2
  const [respuestasQuiz, setRespuestasQuiz] = useState({ p1: '', p2_a: '', p2_b: '', p3: '', p4: '' });
  const [quizValidados, setQuizValidados] = useState(false);
  const [redaccionTexto, setRedaccionTexto] = useState('');
  const [redaccionFeedback, setRedaccionFeedback] = useState(null);

  // Estados específicos para el reproductor de audio simulado
  const [audioReproduciendo, setAudioReproduciendo] = useState(false);
  const [audioProgreso, setAudioProgreso] = useState(0);

  // Intervalo para la barra de progreso de audio
  useEffect(() => {
    let intervalo = null;
    if (audioReproduciendo) {
      intervalo = setInterval(() => {
        setAudioProgreso(prev => {
          if (prev >= 100) {
            setAudioReproduciendo(false);
            return 0;
          }
          return prev + 1; // Avance simulado
        });
      }, 250); // 25 segundos duración simulada
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [audioReproduciendo]);

  const manuales = [
    {
      id: 1,
      titulo: 'Manual de Gramática: Inglés C1',
      nivel: 'C1',
      idioma: 'Inglés',
      paginas: 145,
      categoria: 'manuales',
      descripcion: 'Guía avanzada para comprender condicionales mixtos, estructuras invertidas y tiempos verbales complejos.',
      contenido: '<h3>Manual de Gramática Avanzada (C1)</h3><p>Bienvenidos al manual de nivel C1. En este módulo estudiaremos las inversiones gramaticales para dar énfasis literario o formal. Por ejemplo: "Rarely have I seen such a beautiful performance."</p><p>También profundizaremos en los condicionales de tipo mixto (Mixed Conditionals), los cuales conectan causas pasadas con efectos presentes o viceversa: "If I had studied harder in college, I would have a better job now."</p><p>Además, repasaremos el uso de conectores avanzados como "nonetheless", "notwithstanding", y "conversely" para redactar ensayos estructurados y coherentes.</p>',
      bandera: (
        <svg viewBox="0 0 60 30" width="30" height="15" style={{ borderRadius: '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <rect width="60" height="30" fill="#00247d"/>
          <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="5"/>
          <path d="M0 0 L60 30 M60 0 L0 30" stroke="#cf142b" strokeWidth="3"/>
          <path d="M30 0 v30 M0 15 h60" stroke="#fff" strokeWidth="8"/>
          <path d="M30 0 v30 M0 15 h60" stroke="#cf142b" strokeWidth="5"/>
        </svg>
      )
    },
    {
      id: 2,
      titulo: 'Vocabulario Académico y de Negocios',
      nivel: 'B2',
      idioma: 'Inglés',
      paginas: 98,
      categoria: 'pdf',
      descripcion: 'Terminología útil para presentaciones, redacción de correos corporativos y negociaciones en inglés.',
      contenido: '<h3>Vocabulario de Negocios (B2)</h3><p>El inglés corporativo exige precisión y el uso adecuado de phrasal verbs e idioms de negocios.</p><p>Términos claves a dominar:</p><ul><li><strong>To pencil in:</strong> Agendar provisionalmente una reunión.</li><li><strong>To wrap up:</strong> Concluir una discusión o trato.</li><li><strong>Leverage:</strong> Aprovechar o utilizar recursos estratégicamente.</li><li><strong>Bottom line:</strong> El factor más importante o el resultado neto financiero.</li></ul>',
      bandera: (
        <svg viewBox="0 0 60 30" width="30" height="15" style={{ borderRadius: '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <rect width="60" height="30" fill="#00247d"/>
          <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="5"/>
          <path d="M0 0 L60 30 M60 0 L0 30" stroke="#cf142b" strokeWidth="3"/>
          <path d="M30 0 v30 M0 15 h60" stroke="#fff" strokeWidth="8"/>
          <path d="M30 0 v30 M0 15 h60" stroke="#cf142b" strokeWidth="5"/>
        </svg>
      )
    },
    {
      id: 3,
      titulo: 'Guía de Expresión Escrita en Francés B2',
      nivel: 'B2',
      idioma: 'Francés',
      paginas: 120,
      categoria: 'pdf',
      descripcion: 'Ejemplos y esquemas para argumentar textos de opinión, cartas formales y ensayos en francés.',
      contenido: '<h3>Production Écrite - Niveau B2</h3><p>La redacción argumentativa en francés requiere de conectores lógicos claros (connecteurs logiques) y una estructura formal bien delineada.</p><p>Conectores de argumentación esenciales:</p><ul><li><strong>D\'une part / D\'autre part:</strong> Por una parte / Por otra parte.</li><li><strong>Cependant:</strong> Sin embargo.</li><li><strong>De surcroît:</strong> Adicionalmente / Por añadidura.</li><li><strong>En fin de compte:</strong> A fin de cuentas.</li></ul>',
      bandera: (
        <svg viewBox="0 0 60 30" width="30" height="15" style={{ borderRadius: '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <rect width="20" height="30" fill="#002395"/>
          <rect x="20" width="20" height="30" fill="#fff"/>
          <rect x="40" width="20" height="30" fill="#ed2939"/>
        </svg>
      )
    },
    {
      id: 4,
      titulo: 'Manual de Fonética e Iniciación: Francés A2',
      nivel: 'A2',
      idioma: 'Francés',
      paginas: 75,
      categoria: 'manuales',
      descripcion: 'Reglas básicas de la pronunciación de vocales nasales y la "liaison" en la lectura francesa.',
      contenido: '<h3>Phonétique et Prononciation (A2)</h3><p>Aprender francés requiere dominar los sonidos nasales, que no existen en español. Los sonidos principales son [an], [in], y [on].</p><p><strong>Regla de la Liaison:</strong> Consiste en pronunciar la consonante final muda de una palabra cuando esta se conecta con la vocal inicial de la palabra siguiente. Ejemplo: "Les amis" se pronuncia conectando la "s" con sonido de "z".</p>',
      bandera: (
        <svg viewBox="0 0 60 30" width="30" height="15" style={{ borderRadius: '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <rect width="20" height="30" fill="#002395"/>
          <rect x="20" width="20" height="30" fill="#fff"/>
          <rect x="40" width="20" height="30" fill="#ed2939"/>
        </svg>
      )
    },
    {
      id: 5,
      titulo: 'Expresiones Idiomáticas Avanzadas C1',
      nivel: 'C1',
      idioma: 'Inglés',
      paginas: 85,
      categoria: 'manuales',
      descripcion: 'Reopilación de modismos, argot e idioms comunes de nivel nativo para mejorar la fluidez.',
      contenido: '<h3>Advanced Idiomatic Expressions (C1)</h3><p>Los hablantes nativos usan modismos constantemente. Dominar estas expresiones te hará sonar más natural y fluido.</p><p>Ejemplos:</p><ul><li><strong>Beat around the bush:</strong> Evitar ir al grano.</li><li><strong>Bite the bullet:</strong> Afrontar una situación difícil con valentía.</li><li><strong>Under the weather:</strong> Sentirse un poco enfermo.</li><li><strong>Spill the beans:</strong> Revelar un secreto de forma accidental.</li></ul>',
      bandera: (
        <svg viewBox="0 0 60 30" width="30" height="15" style={{ borderRadius: '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <rect width="60" height="30" fill="#00247d"/>
          <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="5"/>
          <path d="M0 0 L60 30 M60 0 L0 30" stroke="#cf142b" strokeWidth="3"/>
          <path d="M30 0 v30 M0 15 h60" stroke="#fff" strokeWidth="8"/>
          <path d="M30 0 v30 M0 15 h60" stroke="#cf142b" strokeWidth="5"/>
        </svg>
      )
    },
    {
      id: 6,
      titulo: 'Comprensión Auditiva: Conversación Cotidiana A2',
      nivel: 'A2',
      idioma: 'Inglés',
      paginas: 12,
      categoria: 'material_auditivo',
      descripcion: 'Material de audio interactivo con transcripción y ejercicios sobre conversaciones diarias.',
      contenido: '<h3>Comprensión Auditiva - Conversación Cotidiana A2</h3><p>Escucha con atención la conversación grabada por profesores nativos sobre la planificación de un almuerzo y la compra de comida en un supermercado.</p><p>Usa el reproductor digital a continuación para iniciar, pausar y adelantar la grabación.</p><p><strong>Transcripción del Audio:</strong></p><p><em>- Hello Jack! Are you ready for lunch?<br/>- Yes, Sarah! Let\'s go to the new café next to the park.<br/>- Great idea! I want to try their pasta.</em></p>',
      bandera: (
        <svg viewBox="0 0 60 30" width="30" height="15" style={{ borderRadius: '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <rect width="60" height="30" fill="#00247d"/>
          <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="5"/>
          <path d="M0 0 L60 30 M60 0 L0 30" stroke="#cf142b" strokeWidth="3"/>
          <path d="M30 0 v30 M0 15 h60" stroke="#fff" strokeWidth="8"/>
          <path d="M30 0 v30 M0 15 h60" stroke="#cf142b" strokeWidth="5"/>
        </svg>
      )
    },
    {
      id: 7,
      titulo: 'Práctica Auditiva: Liaison en Francés A2',
      nivel: 'A2',
      idioma: 'Francés',
      paginas: 15,
      categoria: 'material_auditivo',
      descripcion: 'Audio de entrenamiento guiado para aprender a identificar y conectar sonidos Liaison.',
      contenido: '<h3>Práctica Auditiva: La Liaison (A2)</h3><p>Escucha los ejemplos grabados por la Dra. Sophie Laurent. Identifica cuándo se pronuncia la consonante final muda al conectarse con palabras que inician en vocal.</p><p><strong>Transcripción de Ejemplos:</strong></p><p><em>1. Les amis (Se escucha el sonido "z" al conectar "les" con "amis").<br/>2. C\'est un livre (Se escucha el sonido "t" al conectar "c\'est" con "un").<br/>3. Deux ans (Se escucha sonido "z" al conectar "deux" con "ans").</em></p>',
      bandera: (
        <svg viewBox="0 0 60 30" width="30" height="15" style={{ borderRadius: '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <rect width="20" height="30" fill="#002395"/>
          <rect x="20" width="20" height="30" fill="#fff"/>
          <rect x="40" width="20" height="30" fill="#ed2939"/>
        </svg>
      )
    }
  ];

  // Filtrado de recursos (Búsqueda + Nivel + Categoría + Favorito)
  const manualesFiltrados = manuales.filter(manual => {
    const coincideBusqueda = manual.titulo.toLowerCase().includes(busqueda.toLowerCase()) || 
                             manual.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const coincideNivel = filtroNivel === 'TODOS' || manual.nivel === filtroNivel;
    const coincideCategoria = filtroCategoria === 'TODOS' || manual.categoria === filtroCategoria;
    const coincideFavorito = !filtroFavoritos || favoritos.includes(manual.id);
    return coincideBusqueda && coincideNivel && coincideCategoria && coincideFavorito;
  });

  // Alternar favoritos
  const toggleFavorito = (id) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter(favId => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  // Simulación de descarga
  const manejarDescarga = (manual) => {
    if (descargandoId) return;
    setDescargandoId(manual.id);
    
    setTimeout(() => {
      setDescargandoId(null);
      setAlertaDescarga(`¡Descarga completada! El archivo "${manual.titulo}.pdf" se guardó en tus descargas.`);
      setTimeout(() => setAlertaDescarga(null), 4000);
    }, 1200);
  };

  // Síntesis de voz real en francés (SpeechSynthesis API)
  const pronunciarConector = (texto) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'fr-FR';
      const voces = window.speechSynthesis.getVoices();
      const vozFrancesa = voces.find(v => v.lang.startsWith('fr'));
      if (vozFrancesa) {
        utterance.voice = vozFrancesa;
      }
      window.speechSynthesis.speak(utterance);
    } else {
      alert('La síntesis de voz no está soportada en este navegador.');
    }
  };

  // Validar el cuestionario de conectores
  const validarQuiz = () => {
    setQuizValidados(true);
  };

  const reiniciarQuiz = () => {
    setRespuestasQuiz({ p1: '', p2_a: '', p2_b: '', p3: '', p4: '' });
    setQuizValidados(false);
  };

  // Analizar la redacción del estudiante y proveer feedback simulado
  const analizarRedaccion = () => {
    const texto = redaccionTexto.trim();
    if (texto.length < 15) {
      setRedaccionFeedback({
        estado: 'error',
        mensaje: 'Tu párrafo es demasiado corto. Escribe al menos una frase completa en francés de 15 palabras para poder analizarla.'
      });
      return;
    }

    const tLower = texto.toLowerCase();
    const tieneCependant = tLower.includes('cependant');
    const tieneDeSurcroit = tLower.includes('de surcroît') || tLower.includes('de surcroit');
    const tieneDunePart = tLower.includes("d'une part") || tLower.includes("d’une part");
    const tieneDautrePart = tLower.includes("d'autre part") || tLower.includes("d’autre part");
    const tieneEnFinDeCompte = tLower.includes('en fin de compte');

    const detectados = [];
    if (tieneCependant) detectados.push('Cependant');
    if (tieneDeSurcroit) detectados.push('De surcroît');
    if (tieneDunePart || tieneDautrePart) detectados.push("D'une part / D'autre part");
    if (tieneEnFinDeCompte) detectados.push('En fin de compte');

    const conteoPalabras = texto.split(/\s+/).filter(Boolean).length;

    if (detectados.length >= 2) {
      setRedaccionFeedback({
        estado: 'excelente',
        mensaje: `¡Excelente redacción! Hemos analizado tu texto (${conteoPalabras} palabras) y detectado ${detectados.length} conectores argumentativos esenciales: [${detectados.join(', ')}]. Tu estructura demuestra un nivel argumentativo B2 sólido. Nota estimada: 9.0/10.`
      });
    } else if (detectados.length === 1) {
      setRedaccionFeedback({
        estado: 'bueno',
        mensaje: `Buen trabajo. Redactaste ${conteoPalabras} palabras e integraste el conector: [${detectados[0]}]. Para alcanzar el nivel B2 con solvencia, intenta entrelazar más ideas utilizando otro conector complementario (por ejemplo, añade 'De surcroît' o 'Cependant' para contrastar). Nota estimada: 7.5/10.`
      });
    } else {
      setRedaccionFeedback({
        estado: 'regular',
        mensaje: `Tu escrito tiene ${conteoPalabras} palabras, pero no detectamos ninguno de los conectores lógicos de argumentación indicados. Es vital estructurar tus textos argumentativos franceses usando marcadores como 'Cependant' o 'En fin de compte'. Revisa el material de lectura e intenta de nuevo.`
      });
    }
  };

  return (
    <div className="biblioteca-vista" style={{ width: '100%', boxSizing: 'border-box' }}>
      
      {/* Encabezado Principal */}
      <div className="vista-header" style={{ marginBottom: '28px', textAlign: 'left' }}>
        <h2 className="vista-titulo" style={{ fontSize: '34px', color: '#1e293b', fontWeight: '800', marginBottom: '8px' }}>Biblioteca y Recursos Académicos</h2>
        <p className="vista-descripcion" style={{ fontSize: '18px', color: '#64748b', margin: 0 }}>
          Busca tus manuales, descarga guías en PDF o practica tu comprensión con el material auditivo compartido por tus profesores.
        </p>
      </div>

      {/* Alerta flotante de descarga */}
      {alertaDescarga && (
        <div 
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            backgroundColor: '#dcfce7',
            border: '1.5px solid #bbf7d0',
            color: '#15803d',
            padding: '16px 20px',
            borderRadius: '12px',
            zIndex: 1100,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            fontWeight: '700',
            fontSize: '14.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          {alertaDescarga}
        </div>
      )}

      {/* Barra de Búsqueda, Filtros y Selección de Vista */}
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
            placeholder="Buscar por título, idioma, tema..." 
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
            <span>{filtroFavoritos ? 'Mostrar Todos' : 'Sólo Favoritos'}</span>
          </button>

          {/* Selectores de Layout */}
          <div className="toggles-layout">
            {/* Vista Tarjeta (Card) */}
            <button 
              onClick={() => setVistaTipo('card')} 
              className={`btn-toggle-layout ${vistaTipo === 'card' ? 'activo' : ''}`}
              title="Vista Tarjeta Detallada"
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
              title="Vista Cuadrícula Compacta"
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

      {/* Doble Fila de Filtros Rápidos (Categorías y Niveles) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
        
        {/* Fila 1: Filtro por Categorías */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '14.5px', fontWeight: '800', color: '#64748b', marginRight: '8px', width: '90px', textAlign: 'left' }}>Recursos:</span>
          {[
            { id: 'TODOS', label: 'Todos' },
            { id: 'manuales', label: 'Manuales Académicos' },
            { id: 'pdf', label: 'PDFs y Guías' },
            { id: 'material_auditivo', label: 'Material Auditivo' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setFiltroCategoria(cat.id)}
              className={`btn-filtro ${filtroCategoria === cat.id ? 'activo' : ''}`}
              style={{ height: '36px', padding: '0 16px', fontSize: '13px', margin: 0, textTransform: 'none', fontWeight: '800', borderRadius: '10px' }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Fila 2: Filtro por Niveles */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '14.5px', fontWeight: '800', color: '#64748b', marginRight: '8px', width: '90px', textAlign: 'left' }}>Niveles:</span>
          {[
            { id: 'TODOS', label: 'Todos los niveles' },
            { id: 'A2', label: 'Nivel A2 (Básico)' },
            { id: 'B2', label: 'Nivel B2 (Intermedio)' },
            { id: 'C1', label: 'Nivel C1 (Avanzado)' }
          ].map(niv => (
            <button
              key={niv.id}
              onClick={() => setFiltroNivel(niv.id)}
              className={`btn-filtro ${filtroNivel === niv.id ? 'activo' : ''}`}
              style={{ height: '36px', padding: '0 16px', fontSize: '13px', margin: 0, textTransform: 'none', fontWeight: '800', borderRadius: '10px' }}
            >
              {niv.label}
            </button>
          ))}
        </div>

      </div>

      {/* Listado de Recursos de Biblioteca */}
      <div style={{ marginBottom: '40px' }}>
        
        {manualesFiltrados.length === 0 ? (
          <div className="card-premium" style={{ textAlign: 'center', padding: '48px', color: '#64748b' }}>
            <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="2" fill="none" style={{ margin: '0 auto 16px auto', display: 'block', opacity: 0.6 }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0' }}>No se encontraron materiales</h4>
            <p style={{ fontSize: '15px', margin: 0 }}>Intenta modificar los criterios de búsqueda, favoritos o categorías.</p>
          </div>
        ) : (
          
          // 1. VISTA TARJETA (CARD DETALLADA - IDENTICO A CURSOS)
          vistaTipo === 'card' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '28px' }}>
              {manualesFiltrados.map(manual => (
                <div 
                  key={manual.id} 
                  className="card-premium" 
                  style={{ 
                    boxSizing: 'border-box',
                    borderTop: `6px solid ${manual.nivel === 'C1' ? 'var(--color-celeste)' : (manual.nivel === 'B2' ? 'var(--color-morado)' : 'var(--color-naranja)')}`, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    gap: '24px', 
                    padding: '32px', 
                    margin: 0,
                    position: 'relative'
                  }}
                >
                  {/* Corazón Favorito */}
                  <button 
                    onClick={() => toggleFavorito(manual.id)} 
                    className="btn-favorito" 
                    style={{ position: 'absolute', top: '16px', right: '16px' }}
                    title={favoritos.includes(manual.id) ? "Quitar de favoritos" : "Marcar como favorito"}
                  >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill={favoritos.includes(manual.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>

                  <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                    {manual.bandera}
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ 
                        fontSize: '12.5px', 
                        fontWeight: '800', 
                        color: manual.nivel === 'C1' ? 'var(--color-celeste)' : (manual.nivel === 'B2' ? 'var(--color-morado)' : 'var(--color-naranja)'), 
                        textTransform: 'uppercase', 
                        backgroundColor: manual.nivel === 'C1' ? 'var(--color-celeste-pastel)' : (manual.nivel === 'B2' ? '#e0e7ff' : 'var(--color-naranja-pastel)'), 
                        padding: '4px 10px', 
                        borderRadius: '8px' 
                      }}>
                        {manual.categoria === 'manuales' ? 'Manual' : (manual.categoria === 'pdf' ? 'PDF / Guía' : 'Audio')} • {manual.nivel}
                      </span>
                      <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b', margin: '8px 0 4px 0', letterSpacing: '-0.5px' }}>
                        {manual.titulo}
                      </h4>
                      <span style={{ fontSize: '15px', color: '#64748b', fontWeight: '600' }}>
                        {manual.idioma} • {manual.paginas} páginas
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6', margin: 0, textAlign: 'left' }}>
                    {manual.descripcion}
                  </p>

                  <div style={{ display: 'flex', gap: '12px', width: '100%', flex: 'none' }}>
                    <button 
                      onClick={() => {
                        setManualActivo(manual);
                        setLectorTab('lectura');
                        setAudioReproduciendo(false);
                        setAudioProgreso(0);
                      }}
                      className="btn-manual-accion primario"
                      style={{ height: '50px', fontSize: '14.5px', margin: 0, flex: 'none', width: 'calc(50% - 6px)' }}
                    >
                      Visualizar
                    </button>

                    <button 
                      onClick={() => manejarDescarga(manual)}
                      disabled={descargandoId !== null}
                      className="btn-manual-accion secundario"
                      style={{ height: '50px', fontSize: '14.5px', margin: 0, flex: 'none', width: 'calc(50% - 6px)' }}
                    >
                      {descargandoId === manual.id ? 'Descargando...' : 'Descargar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) :

          // 2. VISTA CUADRÍCULA (GRID COMPACTO)
          vistaTipo === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {manualesFiltrados.map(manual => (
                <div 
                  key={manual.id} 
                  className="card-premium" 
                  style={{ 
                    boxSizing: 'border-box',
                    borderTop: `5px solid ${manual.nivel === 'C1' ? 'var(--color-celeste)' : (manual.nivel === 'B2' ? 'var(--color-morado)' : 'var(--color-naranja)')}`, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '16px', 
                    padding: '20px', 
                    margin: 0,
                    position: 'relative'
                  }}
                >
                  {/* Corazón en grid */}
                  <button 
                    onClick={() => toggleFavorito(manual.id)} 
                    className="btn-favorito" 
                    style={{ position: 'absolute', top: '12px', right: '12px', padding: '4px' }}
                    title={favoritos.includes(manual.id) ? "Quitar de favoritos" : "Marcar como favorito"}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill={favoritos.includes(manual.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {manual.bandera}
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b' }}>
                        {manual.nivel} • {manual.categoria === 'manuales' ? 'Manual' : (manual.categoria === 'pdf' ? 'PDF' : 'Audio')}
                      </span>
                      <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#1e293b', margin: '2px 0 0 0', letterSpacing: '-0.25px' }}>
                        {manual.titulo}
                      </h4>
                    </div>
                  </div>

                  <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.45', margin: 0, textAlign: 'left', minHeight: '40px' }}>
                    {manual.descripcion.substring(0, 75)}...
                  </p>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => {
                        setManualActivo(manual);
                        setLectorTab('lectura');
                        setAudioReproduciendo(false);
                        setAudioProgreso(0);
                      }}
                      className="btn-manual-accion primario"
                      style={{ height: '36px', fontSize: '13px', flex: 'none', width: 'calc(50% - 4px)', borderRadius: '10px' }}
                    >
                      Ver
                    </button>
                    <button 
                      onClick={() => manejarDescarga(manual)}
                      className="btn-manual-accion secundario"
                      style={{ height: '36px', fontSize: '13px', flex: 'none', width: 'calc(50% - 4px)', borderRadius: '10px' }}
                    >
                      Bajar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) :

          // 3. VISTA LISTA (HORIZONTAL)
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {manualesFiltrados.map(manual => (
              <div 
                key={manual.id} 
                className="vista-lista-item" 
                style={{ borderLeft: `6px solid ${manual.nivel === 'C1' ? 'var(--color-celeste)' : (manual.nivel === 'B2' ? 'var(--color-morado)' : 'var(--color-naranja)')}` }}
              >
                
                {/* Bandera y Nombre */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', width: '30%' }}>
                  {manual.bandera}
                  <div style={{ textAlign: 'left' }}>
                    <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: 0 }}>
                      {manual.titulo}
                    </h4>
                    <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#64748b' }}>
                      {manual.idioma} • {manual.nivel}
                    </span>
                  </div>
                </div>

                {/* Categoría y Páginas */}
                <div style={{ width: '20%', textAlign: 'left', fontSize: '15px', color: '#64748b', fontWeight: '600' }}>
                  {manual.categoria === 'manuales' ? '📚 Manual' : (manual.categoria === 'pdf' ? '📄 PDF / Guía' : '🎧 Audio')}
                  <span style={{ display: 'block', fontSize: '12px', color: '#94a3b8' }}>{manual.paginas} pág.</span>
                </div>

                {/* Descripción Corta */}
                <div style={{ width: '30%', textAlign: 'left', fontSize: '14px', color: '#64748b', paddingRight: '12px' }}>
                  {manual.descripcion.substring(0, 95)}...
                </div>

                {/* Acciones */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', width: '20%', justifyContent: 'flex-end' }}>
                  
                  {/* Corazón */}
                  <button 
                    onClick={() => toggleFavorito(manual.id)} 
                    className="btn-favorito"
                    title={favoritos.includes(manual.id) ? "Quitar de favoritos" : "Marcar como favorito"}
                  >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill={favoritos.includes(manual.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>

                  <button 
                    onClick={() => {
                      setManualActivo(manual);
                      setLectorTab('lectura');
                      setAudioReproduciendo(false);
                      setAudioProgreso(0);
                    }}
                    className="btn-manual-accion primario"
                    style={{ height: '40px', fontSize: '13.5px', padding: '0 16px', flex: 'none', width: 'auto', borderRadius: '12px' }}
                  >
                    Ver
                  </button>
                  
                  <button 
                    onClick={() => manejarDescarga(manual)}
                    className="btn-manual-accion secundario"
                    style={{ height: '40px', fontSize: '13.5px', padding: '0 16px', flex: 'none', width: 'auto', borderRadius: '12px' }}
                  >
                    Bajar
                  </button>
                </div>

              </div>
            ))}
          </div>

        )}

      </div>

      {/* LECTOR DIGITAL INTERACTIVO (Modal Re-diseñado) */}
      {manualActivo && (
        <div className="modal-overlay" onClick={() => setManualActivo(null)} style={{ zIndex: '1050', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)' }}>
          <div 
            className={`modal-contenedor card-premium lector-tema-${lectorTema}`} 
            onClick={(e) => e.stopPropagation()}
            style={{ width: '800px', maxWidth: '95%', height: '90vh', padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderBottomWidth: '5px' }}
          >
            
            {/* Lector Header */}
            <header className="modal-header" style={{ padding: '20px 24px', borderBottom: '2px solid var(--borde-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <div className="modal-titulo-seccion" style={{ textAlign: 'left' }}>
                <span className="modal-subt" style={{ textTransform: 'uppercase', fontWeight: '800', color: '#0284c7', fontSize: '12.5px', letterSpacing: '0.5px' }}>
                  {manualActivo.categoria === 'material_auditivo' ? '🎧 AUDIO INTERACTIVO' : `📖 LECTURA DIGITAL (${manualActivo.nivel})`}
                </span>
                <h3 className="modal-titulo" style={{ margin: '4px 0 0 0', fontSize: '19px', fontWeight: '900', color: '#1e293b' }}>{manualActivo.titulo}</h3>
              </div>
              <button 
                className="btn-cerrar-modal" 
                onClick={() => setManualActivo(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>

            {/* Lector Toolbar: Font Resizer & Color Theme Selector */}
            <div className="lector-toolbar">
              {/* Ajuste de Tamaño */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#64748b' }}>Tamaño de letra:</span>
                <button 
                  onClick={() => setLectorFontSize(prev => Math.max(14, prev - 1))} 
                  className="btn-ajuste-texto"
                  title="Reducir letra"
                >
                  A-
                </button>
                <span style={{ fontSize: '14.5px', fontWeight: '800', color: '#475569', minWidth: '24px', textAlign: 'center' }}>{lectorFontSize}px</span>
                <button 
                  onClick={() => setLectorFontSize(prev => Math.min(22, prev + 1))} 
                  className="btn-ajuste-texto"
                  title="Aumentar letra"
                >
                  A+
                </button>
              </div>

              {/* Ajuste de Tema */}
              <div className="lector-temas-contenedor">
                <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#64748b', marginRight: '4px' }}>Fondo:</span>
                <button 
                  onClick={() => setLectorTema('claro')} 
                  className={`btn-tema-select ${lectorTema === 'claro' ? 'activo' : ''}`}
                  style={{ backgroundColor: '#ffffff', border: '1.5px solid #cbd5e1' }}
                  title="Tema Claro"
                />
                <button 
                  onClick={() => setLectorTema('sepia')} 
                  className={`btn-tema-select ${lectorTema === 'sepia' ? 'activo' : ''}`}
                  style={{ backgroundColor: '#faf6ef', border: '1.5px solid #e4dcd0' }}
                  title="Tema Sepia"
                />
                <button 
                  onClick={() => setLectorTema('papel')} 
                  className={`btn-tema-select ${lectorTema === 'papel' ? 'activo' : ''}`}
                  style={{ backgroundColor: '#f1f5f9', border: '1.5px solid #cbd5e1' }}
                  title="Tema Papel / Azul Slate"
                />
              </div>
            </div>

            {/* Pestañas del Lector (Solo para Guía de Francés B2) */}
            {manualActivo.id === 3 && (
              <div className="lector-tabs">
                <button 
                  onClick={() => setLectorTab('lectura')} 
                  className={`btn-lector-tab ${lectorTab === 'lectura' ? 'activo' : ''}`}
                >
                  📖 Guía de Lectura
                </button>
                <button 
                  onClick={() => setLectorTab('pronunciacion')} 
                  className={`btn-lector-tab ${lectorTab === 'pronunciacion' ? 'activo' : ''}`}
                >
                  🔊 Pronunciación Activa
                </button>
                <button 
                  onClick={() => setLectorTab('quiz')} 
                  className={`btn-lector-tab ${lectorTab === 'quiz' ? 'activo' : ''}`}
                >
                  📝 Cuestionario
                </button>
                <button 
                  onClick={() => setLectorTab('redaccion')} 
                  className={`btn-lector-tab ${lectorTab === 'redaccion' ? 'activo' : ''}`}
                >
                  ✍️ Taller de Redacción
                </button>
              </div>
            )}

            {/* Lector Body Scrollable */}
            <div className="modal-body" style={{ flex: 1, overflowY: 'auto', padding: '28px', boxSizing: 'border-box' }}>
              
              {/* REPOSITORIO DE MATERIAL AUDITIVO INTERACTIVO */}
              {manualActivo.categoria === 'material_auditivo' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Reproductor de Audio Premium */}
                  <div className="audio-player-box">
                    <div className="audio-info-header">
                      <div className="audio-portada-circulo">
                        <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="2.5" fill="none">
                          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                        </svg>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '16.5px', fontWeight: '800' }}>{manualActivo.titulo}</span>
                        <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>Lección de Comprensión Oral • {manualActivo.idioma}</span>
                      </div>
                    </div>

                    {/* Onda de sonido reactiva */}
                    <div className="audio-ondas-visualizer">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`audio-onda-columna ${audioReproduciendo ? 'reproduciendo' : ''}`}
                          style={{
                            backgroundColor: manualActivo.nivel === 'C1' ? 'var(--color-celeste)' : (manualActivo.nivel === 'B2' ? 'var(--color-morado)' : 'var(--color-naranja)')
                          }}
                        />
                      ))}
                    </div>

                    {/* Barra de progreso */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div 
                        className="audio-timeline-track"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const clickX = e.clientX - rect.left;
                          const percent = Math.round((clickX / rect.width) * 100);
                          setAudioProgreso(percent);
                        }}
                      >
                        <div 
                          className="audio-timeline-fill" 
                          style={{ 
                            width: `${audioProgreso}%`,
                            backgroundColor: manualActivo.nivel === 'C1' ? 'var(--color-celeste)' : (manualActivo.nivel === 'B2' ? 'var(--color-morado)' : 'var(--color-naranja)')
                          }} 
                        />
                      </div>
                      <div className="audio-timer-display">
                        <span>0:{audioProgreso < 10 ? `0${Math.floor(audioProgreso * 0.25)}` : Math.floor(audioProgreso * 0.25)}</span>
                        <span>0:25</span>
                      </div>
                    </div>

                    {/* Botón de reproducción */}
                    <button 
                      onClick={() => setAudioReproduciendo(!audioReproduciendo)}
                      className="btn-audio-player-control"
                      title={audioReproduciendo ? "Pausar lección" : "Reproducir lección"}
                    >
                      {audioReproduciendo ? (
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" style={{ marginLeft: '4px' }}>
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Transcripción escrita */}
                  <div 
                    className="documento-texto"
                    style={{ fontSize: `${lectorFontSize}px`, transition: 'font-size 0.15s ease', textAlign: 'left' }}
                    dangerouslySetInnerHTML={{ __html: manualActivo.contenido }}
                  />

                  {/* Cuestionario rápido del audio */}
                  <div className="card-premium" style={{ padding: '24px', margin: 0, textAlign: 'left' }}>
                    <h5 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 12px 0' }}>Comprobación de Comprensión Auditiva</h5>
                    <p style={{ fontSize: '14.5px', color: '#64748b', margin: '0 0 16px 0' }}>Responde según el audio escuchado en la conversación anterior:</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div>
                        <span style={{ display: 'block', fontWeight: '700', fontSize: '14.5px', marginBottom: '6px' }}>
                          {manualActivo.id === 6 ? '1. ¿A dónde proponen ir a almorzar?' : '1. ¿Qué sonido consonántico conecta la palabra "Les" y "amis"?' }
                        </span>
                        <input 
                          type="text" 
                          placeholder="Tu respuesta..." 
                          className="input-quiz-conector"
                          style={{ width: '100%', boxSizing: 'border-box' }}
                          onChange={(e) => {
                            const val = e.target.value.toLowerCase().trim();
                            const esCorrecto = manualActivo.id === 6 
                              ? (val.includes('café') || val.includes('cafe') || val.includes('parque'))
                              : (val === 'z' || val === 'sonido z' || val.includes('letra z'));
                            e.target.className = val === '' ? 'input-quiz-conector' : (esCorrecto ? 'input-quiz-conector correcto' : 'input-quiz-conector incorrecto');
                          }}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                
                /* REPOSITORIO DE TEXTO COMÚN (MANUALES Y PDF) */
                lectorTab === 'lectura' && (
                  <div 
                    className="documento-texto"
                    style={{ fontSize: `${lectorFontSize}px`, transition: 'font-size 0.15s ease' }}
                    dangerouslySetInnerHTML={{ __html: manualActivo.contenido }}
                  />
                )
              )}

              {/* SECCIONES ESPECÍFICAS DE FRANCÉS B2 */}
              {manualActivo.id === 3 && (
                <>
                  {/* SECCIÓN 2: PRONUNCIACIÓN DE CONECTORES */}
                  {lectorTab === 'pronunciacion' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                      <h4 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>Entrenador de Pronunciación Activa</h4>
                      <p style={{ fontSize: '15px', color: '#64748b', margin: '0 0 12px 0' }}>
                        Haz clic en el altavoz para escuchar la pronunciación en francés nativo (síntesis de voz SpeechSynthesis).
                      </p>

                      <div className="lector-audio-grid">
                        
                        <div className="tarjeta-pronunciacion">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '17px', color: 'var(--color-morado)' }}>D'une part / D'autre part</strong>
                            <button onClick={() => pronunciarConector("D'une part, d'autre part")} className="btn-pronunciar" title="Escuchar pronunciación">
                              🔊
                            </button>
                          </div>
                          <span style={{ fontSize: '13.5px', color: '#94a3b8', fontStyle: 'italic', fontWeight: '600' }}>Fonética: [dyn paʁ / d-otʁ paʁ]</span>
                          <span style={{ fontSize: '15px', color: '#334155' }}><strong>Significado:</strong> Por una parte / Por otra parte.</span>
                          <div style={{ backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '8px', borderLeft: '3px solid var(--color-morado)', fontSize: '13.5px', color: '#475569' }}>
                            <em>"D'une part, je comprends; d'autre part, je ne suis pas d'accord."</em>
                          </div>
                        </div>

                        <div className="tarjeta-pronunciacion">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '17px', color: 'var(--color-morado)' }}>Cependant</strong>
                            <button onClick={() => pronunciarConector("Cependant")} className="btn-pronunciar" title="Escuchar pronunciación">
                              🔊
                            </button>
                          </div>
                          <span style={{ fontSize: '13.5px', color: '#94a3b8', fontStyle: 'italic', fontWeight: '600' }}>Fonética: [səpɑ̃dɑ̃]</span>
                          <span style={{ fontSize: '15px', color: '#334155' }}><strong>Significado:</strong> Sin embargo / No obstante.</span>
                          <div style={{ backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '8px', borderLeft: '3px solid var(--color-morado)', fontSize: '13.5px', color: '#475569' }}>
                            <em>"Il a beaucoup étudié. Cependant, il n'a pas réussi."</em>
                          </div>
                        </div>

                        <div className="tarjeta-pronunciacion">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '17px', color: 'var(--color-morado)' }}>De surcroît</strong>
                            <button onClick={() => pronunciarConector("De surcroît")} className="btn-pronunciar" title="Escuchar pronunciación">
                              🔊
                            </button>
                          </div>
                          <span style={{ fontSize: '13.5px', color: '#94a3b8', fontStyle: 'italic', fontWeight: '600' }}>Fonética: [də syʁkwa]</span>
                          <span style={{ fontSize: '15px', color: '#334155' }}><strong>Significado:</strong> Adicionalmente / Por añadidura.</span>
                          <div style={{ backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '8px', borderLeft: '3px solid var(--color-morado)', fontSize: '13.5px', color: '#475569' }}>
                            <em>"Le film est long et de surcroît ennuyeux."</em>
                          </div>
                        </div>

                        <div className="tarjeta-pronunciacion">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '17px', color: 'var(--color-morado)' }}>En fin de compte</strong>
                            <button onClick={() => pronunciarConector("En fin de compte")} className="btn-pronunciar" title="Escuchar pronunciación">
                              🔊
                            </button>
                          </div>
                          <span style={{ fontSize: '13.5px', color: '#94a3b8', fontStyle: 'italic', fontWeight: '600' }}>Fonética: [ɑ̃ fɛ̃ də kɔ̃t]</span>
                          <span style={{ fontSize: '15px', color: '#334155' }}><strong>Significado:</strong> A fin de cuentas / Al fin y al cabo.</span>
                          <div style={{ backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '8px', borderLeft: '3px solid var(--color-morado)', fontSize: '13.5px', color: '#475569' }}>
                            <em>"En fin de compte, la décision vous appartient."</em>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* SECCIÓN 3: CUESTIONARIO */}
                  {lectorTab === 'quiz' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                      <h4 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>Cuestionario de Práctica: Conectores</h4>
                      <p style={{ fontSize: '15px', color: '#64748b', margin: '0' }}>
                        Escribe el conector lógico correcto en los espacios en blanco (Cependant, De surcroît, D\'une part, d\'autre part, en fin de compte).
                      </p>

                      <div className="documento-texto" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px', fontSize: '15.5px' }}>
                        
                        <div>
                          <strong>Ejercicio 1:</strong>
                          <div style={{ marginTop: '8px', lineHeight: '2' }}>
                            "La situation économique est difficile.
                            <span className="quiz-espacio">
                              <input 
                                type="text"
                                className={`input-quiz-conector ${quizValidados ? (respuestasQuiz.p1.toLowerCase().trim() === 'cependant' ? 'correcto' : 'incorrecto') : ''}`}
                                placeholder="Conector"
                                value={respuestasQuiz.p1}
                                onChange={(e) => setRespuestasQuiz({ ...respuestasQuiz, p1: e.target.value })}
                                disabled={quizValidados}
                              />
                            </span>
                            , le gouvernement espère une reprise rapide."
                          </div>
                          {quizValidados && respuestasQuiz.p1.toLowerCase().trim() !== 'cependant' && (
                            <span style={{ color: '#b91c1c', fontSize: '13px', fontWeight: '600', display: 'block', marginTop: '4px' }}>Respuesta correcta: Cependant</span>
                          )}
                        </div>

                        <div>
                          <strong>Ejercicio 2:</strong>
                          <div style={{ marginTop: '8px', lineHeight: '2' }}>
                            "L\'apprentissage en ligne présente deux avantages:
                            <span className="quiz-espacio">
                              <input 
                                type="text"
                                className={`input-quiz-conector ${quizValidados ? (respuestasQuiz.p2_a.toLowerCase().trim() === "d'une part" || respuestasQuiz.p2_a.toLowerCase().trim() === "d’une part" ? 'correcto' : 'incorrecto') : ''}`}
                                placeholder="Conector A"
                                value={respuestasQuiz.p2_a}
                                onChange={(e) => setRespuestasQuiz({ ...respuestasQuiz, p2_a: e.target.value })}
                                disabled={quizValidados}
                              />
                            </span>
                            il offre une flexibilité de temps, et 
                            <span className="quiz-espacio">
                              <input 
                                type="text"
                                className={`input-quiz-conector ${quizValidados ? (respuestasQuiz.p2_b.toLowerCase().trim() === "d'autre part" || respuestasQuiz.p2_b.toLowerCase().trim() === "d’autre part" ? 'correcto' : 'incorrecto') : ''}`}
                                placeholder="Conector B"
                                value={respuestasQuiz.p2_b}
                                onChange={(e) => setRespuestasQuiz({ ...respuestasQuiz, p2_b: e.target.value })}
                                disabled={quizValidados}
                              />
                            </span>
                            il permet d\'étudier n\'importe où."
                          </div>
                          {quizValidados && (respuestasQuiz.p2_a.toLowerCase().trim() !== "d'une part" || respuestasQuiz.p2_b.toLowerCase().trim() !== "d'autre part") && (
                            <span style={{ color: '#b91c1c', fontSize: '13px', fontWeight: '600', display: 'block', marginTop: '4px' }}>Respuestas correctas: D'une part / d'autre part</span>
                          )}
                        </div>

                        <div>
                          <strong>Ejercicio 3:</strong>
                          <div style={{ marginTop: '8px', lineHeight: '2' }}>
                            "Ce candidat possède d\'excellentes références et, 
                            <span className="quiz-espacio">
                              <input 
                                type="text"
                                className={`input-quiz-conector ${quizValidados ? (respuestasQuiz.p3.toLowerCase().trim() === 'de surcroît' || respuestasQuiz.p3.toLowerCase().trim() === 'de surcroit' ? 'correcto' : 'incorrecto') : ''}`}
                                placeholder="Conector"
                                value={respuestasQuiz.p3}
                                onChange={(e) => setRespuestasQuiz({ ...respuestasQuiz, p3: e.target.value })}
                                disabled={quizValidados}
                              />
                            </span>
                            , il parle couramment quatre langues."
                          </div>
                          {quizValidados && respuestasQuiz.p3.toLowerCase().trim() !== 'de surcroît' && respuestasQuiz.p3.toLowerCase().trim() !== 'de surcroit' && (
                            <span style={{ color: '#b91c1c', fontSize: '13px', fontWeight: '600', display: 'block', marginTop: '4px' }}>Respuesta correcta: De surcroît</span>
                          )}
                        </div>

                        <div>
                          <strong>Ejercicio 4:</strong>
                          <div style={{ marginTop: '8px', lineHeight: '2' }}>
                            "Après des semaines de négociations tendues, 
                            <span className="quiz-espacio">
                              <input 
                                type="text"
                                className={`input-quiz-conector ${quizValidados ? (respuestasQuiz.p4.toLowerCase().trim() === 'en fin de compte' ? 'correcto' : 'incorrecto') : ''}`}
                                placeholder="Conector"
                                value={respuestasQuiz.p4}
                                onChange={(e) => setRespuestasQuiz({ ...respuestasQuiz, p4: e.target.value })}
                                disabled={quizValidados}
                              />
                            </span>
                            , les deux pays ont signé un traité de paix."
                          </div>
                          {quizValidados && respuestasQuiz.p4.toLowerCase().trim() !== 'en fin de compte' && (
                            <span style={{ color: '#b91c1c', fontSize: '13px', fontWeight: '600', display: 'block', marginTop: '4px' }}>Respuesta correcta: en fin de compte</span>
                          )}
                        </div>

                      </div>

                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                        {quizValidados ? (
                          <button onClick={reiniciarQuiz} className="btn-manual-accion secundario" style={{ width: 'auto', padding: '0 20px', height: '42px', fontSize: '13.5px' }}>
                            Reintentar
                          </button>
                        ) : (
                          <button onClick={validarQuiz} className="btn-manual-accion primario" style={{ width: 'auto', padding: '0 24px', height: '42px', fontSize: '13.5px' }}>
                            Validar Respuestas
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* SECCIÓN 4: REDACCIÓN */}
                  {lectorTab === 'redaccion' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                      <h4 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>Taller de Redacción de Opinión (Niveau B2)</h4>
                      <p style={{ fontSize: '15px', color: '#64748b', margin: '0' }}>
                        Escribe un pequeño párrafo de opinión en francés sobre las redes sociales e integra al menos 2 conectores.
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <textarea
                          className="comentarios-textarea"
                          rows="6"
                          placeholder="Écrivez votre paragraphe en français ici..."
                          value={redaccionTexto}
                          onChange={(e) => setRedaccionTexto(e.target.value)}
                          style={{ width: '100%', fontSize: '15px', padding: '16px', boxSizing: 'border-box' }}
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '13.5px', color: '#64748b', fontWeight: '700' }}>
                            Palabras: {redaccionTexto.trim() === '' ? 0 : redaccionTexto.trim().split(/\s+/).filter(Boolean).length}
                          </span>
                          
                          <button 
                            onClick={analizarRedaccion} 
                            className="btn-manual-accion primario"
                            style={{ width: 'auto', padding: '0 24px', height: '44px', fontSize: '14px' }}
                          >
                            Analizar mi Redacción
                          </button>
                        </div>
                      </div>

                      {redaccionFeedback && (
                        <div 
                          className="card-premium" 
                          style={{ 
                            padding: '20px', 
                            marginTop: '8px', 
                            marginBottom: '0', 
                            textAlign: 'left',
                            border: '2px solid',
                            borderColor: redaccionFeedback.estado === 'excelente' ? '#22c55e' : (redaccionFeedback.estado === 'bueno' ? '#0284c7' : '#ef4444'),
                            backgroundColor: redaccionFeedback.estado === 'excelente' ? '#f0fdf4' : (redaccionFeedback.estado === 'bueno' ? '#f0f9ff' : '#fef2f2'),
                            color: redaccionFeedback.estado === 'excelente' ? '#15803d' : (redaccionFeedback.estado === 'bueno' ? '#0369a1' : '#b91c1c'),
                          }}
                        >
                          <h5 style={{ fontSize: '15.5px', fontWeight: '900', margin: '0 0 6px 0', textTransform: 'uppercase' }}>
                            {redaccionFeedback.estado === 'excelente' && '🏆 Análisis Excelente'}
                            {redaccionFeedback.estado === 'bueno' && '📘 Análisis Bueno'}
                            {redaccionFeedback.estado === 'regular' && '⚠️ Sugerencia'}
                            {redaccionFeedback.estado === 'error' && '❌ Error'}
                          </h5>
                          <p style={{ fontSize: '14.5px', lineHeight: '1.6', margin: '0' }}>{redaccionFeedback.mensaje}</p>
                        </div>
                      )}

                    </div>
                  )}
                </>
              )}

            </div>

            {/* Lector Footer */}
            <footer style={{ padding: '16px 24px', borderTop: '2px solid var(--borde-color)', display: 'flex', justifyContent: 'flex-end', gap: '10px', flexShrink: 0, backgroundColor: '#f8fafc' }}>
              <button 
                className="btn-manual-accion secundario" 
                onClick={() => {
                  setManualActivo(null);
                  setAudioReproduciendo(false);
                  setAudioProgreso(0);
                }}
                style={{ height: '40px', fontSize: '13.5px', width: 'auto', padding: '0 24px' }}
              >
                Cerrar Lector
              </button>
            </footer>

          </div>
        </div>
      )}
    </div>
  );
}
