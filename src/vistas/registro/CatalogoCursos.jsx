import React, { useState } from 'react';
import '../../estilos/Registro.css';

export default function CatalogoCursos({ onSeleccionar, onVolver }) {
  const [busqueda, setBusqueda] = useState('');
  const [filtroSede, setFiltroSede] = useState('');
  const [filtroIdioma, setFiltroIdioma] = useState('');
  const [filtroHorario, setFiltroHorario] = useState('');

  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Datos simulados (mocks) extendidos
  const cursos = [
    { id: 1, nombre: 'Inglés Básico - A1', idioma: 'Inglés', nivel: 'A1 Principiante', sede: 'Managua', horario: 'Mañana' },
    { id: 2, nombre: 'Inglés Intermedio - B1', idioma: 'Inglés', nivel: 'B1 Intermedio', sede: 'León', horario: 'Tarde' },
    { id: 3, nombre: 'Francés Básico - A1', idioma: 'Francés', nivel: 'A1 Principiante', sede: 'Managua', horario: 'Mañana' },
    { id: 4, nombre: 'Italiano Conversacional', idioma: 'Italiano', nivel: 'A2 Básico', sede: 'Virtual', horario: 'Noche' },
    { id: 5, nombre: 'Portugués Intensivo', idioma: 'Portugués', nivel: 'B1 Intermedio', sede: 'Managua', horario: 'Tarde' },
  ];

  const cursosFiltrados = cursos.filter(c => {
    return (
      (filtroSede === '' || c.sede === filtroSede) &&
      (filtroIdioma === '' || c.idioma === filtroIdioma) &&
      (filtroHorario === '' || c.horario === filtroHorario) &&
      (busqueda === '' || c.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    );
  });

  // Check if any filter is active
  const filtrosActivos = filtroSede !== '' || filtroIdioma !== '' || filtroHorario !== '';

  return (
    <div className="registro-contenedor">
      <div className="registro-header" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <button 
          onClick={onVolver}
          style={{ background: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '8px', border: '2px solid #e2e8f0', borderBottom: '4px solid #cbd5e1', color: '#475569', fontSize: '14px', fontWeight: '800', cursor: 'pointer', padding: '10px 16px', borderRadius: '12px', transition: 'all 0.1s', width: 'fit-content', flexShrink: 0 }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderBottomWidth = '4px'; }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="15 18 9 12 15 6" /></svg>
          Volver al Login
        </button>

        {/* Buscador y Filtros (En PC flotan a la derecha, en móvil bajan) */}
        <div style={{ flex: '1 1 280px', maxWidth: '600px', background: '#fff', padding: '12px', borderRadius: '16px', border: '2px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div className="login-input-wrapper" style={{ flex: 1 }}>
              <input 
                className="login-input" 
                type="text" 
                placeholder="Buscar curso..." 
                value={busqueda} 
                onChange={e => setBusqueda(e.target.value)} 
                style={{ paddingLeft: '40px', paddingRight: '12px', height: '48px', background: '#fff' }}
              />
              <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ left: '12px', width: '20px', height: '20px' }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            <button 
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              style={{ 
                height: '48px', 
                width: '48px',
                flexShrink: 0,
                background: mostrarFiltros || filtrosActivos ? '#f0f9ff' : '#fff', 
                border: `2px solid ${mostrarFiltros || filtrosActivos ? '#0284c7' : '#e2e8f0'}`, 
                borderBottomWidth: '4px',
                color: mostrarFiltros || filtrosActivos ? '#0284c7' : '#64748b', 
                borderRadius: '12px', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                transition: 'all 0.1s',
                position: 'relative'
              }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderBottomWidth = '4px'; }}
            >
              {filtrosActivos && (
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '12px', height: '12px', background: '#ef4444', borderRadius: '50%', border: '2px solid #fff' }}></span>
              )}
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </button>
          </div>

          {/* Filtros Expandibles */}
          {mostrarFiltros && (
            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '2px dashed #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              
              <div className="login-grupo" style={{ marginBottom: 0, flex: '1 1 120px' }}>
                <label className="login-label" style={{ fontSize: '11px', marginBottom: '2px' }}>Sede</label>
                <div className="login-input-wrapper">
                  <select className="login-input" value={filtroSede} onChange={e => setFiltroSede(e.target.value)} style={{ paddingLeft: '32px', paddingRight: '8px', height: '38px', fontSize: '13px' }}>
                    <option value="">Todas</option>
                    <option value="Managua">Managua</option>
                    <option value="León">León</option>
                    <option value="Virtual">Virtual</option>
                  </select>
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', left: '10px' }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
              </div>

              <div className="login-grupo" style={{ marginBottom: 0, flex: '1 1 120px' }}>
                <label className="login-label" style={{ fontSize: '11px', marginBottom: '2px' }}>Idioma</label>
                <div className="login-input-wrapper">
                  <select className="login-input" value={filtroIdioma} onChange={e => setFiltroIdioma(e.target.value)} style={{ paddingLeft: '32px', paddingRight: '8px', height: '38px', fontSize: '13px' }}>
                    <option value="">Todos</option>
                    <option value="Inglés">Inglés</option>
                    <option value="Francés">Francés</option>
                    <option value="Italiano">Italiano</option>
                    <option value="Portugués">Portugués</option>
                  </select>
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', left: '10px' }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>

              <div className="login-grupo" style={{ marginBottom: 0, flex: '1 1 120px' }}>
                <label className="login-label" style={{ fontSize: '11px', marginBottom: '2px' }}>Horario</label>
                <div className="login-input-wrapper">
                  <select className="login-input" value={filtroHorario} onChange={e => setFiltroHorario(e.target.value)} style={{ paddingLeft: '32px', paddingRight: '8px', height: '38px', fontSize: '13px' }}>
                    <option value="">Cualquier</option>
                    <option value="Mañana">Mañana</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noche">Noche</option>
                  </select>
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', left: '10px' }}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h2 className="registro-titulo">Cursos Disponibles</h2>
        <p className="registro-subtitulo">Selecciona el curso de tu interés para ver los detalles e inscribirte.</p>
      </div>


      <div className="catalogo-grid">
        {cursosFiltrados.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#64748b' }}>
            No se encontraron cursos que coincidan con los filtros.
          </div>
        ) : (
          cursosFiltrados.map(c => (
          <div key={c.id} className="curso-tarjeta" onClick={() => onSeleccionar(c)}>
            <span className="curso-idioma">{c.idioma}</span>
            <h3 className="curso-nombre">{c.nombre}</h3>
            <p className="curso-nivel">{c.nivel}</p>
            <button className="curso-btn">Ver Detalles</button>
          </div>
          ))
        )}
      </div>
    </div>
  );
}
