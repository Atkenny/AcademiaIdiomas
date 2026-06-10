import React, { useState } from 'react';
import '../../estilos/Registro.css';

const SelectorScrolleable = ({ opciones, valor, onChange, placeholder }) => {
  const [abierto, setAbierto] = React.useState(false);
  
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {abierto && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9 }} 
          onClick={() => setAbierto(false)}
        />
      )}
      
      <div 
        className="login-input" 
        style={{ 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '0 8px',
          background: abierto ? '#f8fafc' : '#fff',
          borderColor: abierto ? '#0d9488' : '#cbd5e1'
        }}
        onClick={() => setAbierto(!abierto)}
      >
        <span style={{ color: valor ? '#0f172a' : '#94a3b8' }}>
          {valor ? opciones.find(o => o.value === valor)?.label : placeholder}
        </span>
      </div>

      {abierto && (
        <div style={{ 
          position: 'absolute', 
          top: 'calc(100% + 4px)', 
          left: '50%', 
          transform: 'translateX(-50%)',
          minWidth: '100%',
          zIndex: 10,
          background: '#fff', 
          border: '2px solid #e2e8f0', 
          borderRadius: '16px',
          maxHeight: '220px', 
          overflowY: 'auto',
          overflowX: 'hidden', 
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
          padding: '8px 0',
          overscrollBehavior: 'contain'
        }}>
          {opciones.map(opt => (
            <div 
              key={opt.value} 
              onClick={() => { onChange(opt.value); setAbierto(false); }}
              style={{ 
                padding: '12px', 
                textAlign: 'center', 
                cursor: 'pointer',
                background: opt.value === valor ? '#ccfbf1' : 'transparent',
                color: opt.value === valor ? '#0f766e' : '#475569',
                fontWeight: opt.value === valor ? '800' : '600',
                transition: 'background 0.1s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = opt.value === valor ? '#ccfbf1' : '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.background = opt.value === valor ? '#ccfbf1' : 'transparent'}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FilaResumen = ({ etiqueta, valor }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '2px solid #e2e8f0', alignItems: 'center', gap: '16px' }}>
    <span style={{ color: '#64748b', fontWeight: '800', fontSize: '13px', flexShrink: 0 }}>{etiqueta}</span>
    <span style={{ color: '#1e293b', fontWeight: '800', fontSize: '14px', textAlign: 'right', wordBreak: 'break-word' }}>{valor || '-'}</span>
  </div>
);

export default function WizardMatricula({ curso, onVolver, onCompletar }) {
  const [paso, setPaso] = useState(1);
  const [datos, setDatos] = useState({
    nombres: '', apellidos: '', cedula: '', 
    diaNac: '', mesNac: '', anioNac: '', 
    nacionalidad: '', genero: '',
    departamento: '', municipio: '', direccion: '', nivelAcademico: '', correo: '', telefono: ''
  });

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'cedula') {
      value = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    }
    setDatos({ ...datos, [e.target.name]: value });
  };

  const handleCustomDateChange = (name, value) => {
    setDatos({ ...datos, [name]: value });
  };

  const pasoSiguiente = () => setPaso(p => Math.min(p + 1, 3));
  const pasoAnterior = () => setPaso(p => Math.max(p - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Si el usuario presiona Enter en un paso anterior, avanzar en lugar de enviar
    if (paso < 3) {
      pasoSiguiente();
      return;
    }

    // Validación extra si se necesita
    // Simulamos guardado exitoso
    const fechaCompleta = `${datos.anioNac}-${datos.mesNac}-${datos.diaNac}`;
    onCompletar({ ...datos, fechaNacimiento: fechaCompleta });
  };

  return (
    <div className="registro-contenedor">
      <div className="registro-header">
        <button 
          onClick={onVolver}
          style={{ background: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '8px', border: '2px solid #e2e8f0', borderBottom: '4px solid #cbd5e1', color: '#475569', fontSize: '14px', fontWeight: '800', cursor: 'pointer', padding: '10px 16px', borderRadius: '12px', transition: 'all 0.1s' }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderBottomWidth = '4px'; }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          Volver al Curso
        </button>
      </div>

      <div>
        <h2 className="registro-titulo">Matrícula en Línea</h2>
        <p className="registro-subtitulo">Completando matrícula para: <strong>{curso?.nombre}</strong></p>
      </div>

      <div className="wizard-progreso">
        <div className={`wizard-paso ${paso >= 1 ? (paso > 1 ? 'completado' : 'activo') : ''}`}>
          <div className="paso-circulo">{paso > 1 ? '✓' : '1'}</div>
          <span className="paso-texto">Personal</span>
        </div>
        <div className={`wizard-paso ${paso >= 2 ? (paso > 2 ? 'completado' : 'activo') : ''}`}>
          <div className="paso-circulo">{paso > 2 ? '✓' : '2'}</div>
          <span className="paso-texto">Contacto</span>
        </div>
        <div className={`wizard-paso ${paso >= 3 ? 'activo' : ''}`}>
          <div className="paso-circulo">3</div>
          <span className="paso-texto">Resumen</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
        
        {paso === 1 && (
          <div className="form-paso">
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#1e293b' }}>Datos Personales</h3>
            <div className="form-grid">
              <div className="login-grupo">
                <label className="login-label">Nombres</label>
                <div className="login-input-wrapper">
                  <input className="login-input" type="text" name="nombres" value={datos.nombres} onChange={handleChange} required placeholder="Tus nombres" />
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              <div className="login-grupo">
                <label className="login-label">Apellidos</label>
                <div className="login-input-wrapper">
                  <input className="login-input" type="text" name="apellidos" value={datos.apellidos} onChange={handleChange} required placeholder="Tus apellidos" />
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              <div className="login-grupo" style={{ gridColumn: '1 / -1' }}>
                <label className="login-label">Cédula / Código</label>
                <div className="login-input-wrapper">
                  <input className="login-input" type="text" name="cedula" value={datos.cedula} onChange={handleChange} required placeholder="Tu cédula de identidad" />
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
              </div>
              <div className="login-grupo" style={{ gridColumn: '1 / -1' }}>
                <label className="login-label">Fecha de Nacimiento</label>
                <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                  
                  <div style={{ flex: 1 }}>
                    <SelectorScrolleable 
                      placeholder="Día"
                      valor={datos.diaNac}
                      onChange={(val) => handleCustomDateChange('diaNac', val)}
                      opciones={Array.from({ length: 31 }, (_, i) => ({ value: (i + 1).toString().padStart(2, '0'), label: (i + 1).toString() }))}
                    />
                  </div>

                  <div style={{ flex: 1.2 }}>
                    <SelectorScrolleable 
                      placeholder="Mes"
                      valor={datos.mesNac}
                      onChange={(val) => handleCustomDateChange('mesNac', val)}
                      opciones={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((m, i) => ({ value: (i + 1).toString().padStart(2, '0'), label: m }))}
                    />
                  </div>

                  <div style={{ flex: 1.2 }}>
                    <SelectorScrolleable 
                      placeholder="Año"
                      valor={datos.anioNac}
                      onChange={(val) => handleCustomDateChange('anioNac', val)}
                      opciones={Array.from({ length: 80 }, (_, i) => { const y = new Date().getFullYear() - 10 - i; return { value: y.toString(), label: y.toString() }; })}
                    />
                  </div>
                </div>
              </div>
              <div className="login-grupo">
                <label className="login-label">Nacionalidad</label>
                <div className="login-input-wrapper">
                  <input className="login-input" type="text" name="nacionalidad" value={datos.nacionalidad} onChange={handleChange} required placeholder="Tu nacionalidad" />
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
              </div>
              <div className="login-grupo">
                <label className="login-label">Género</label>
                <div style={{ width: '100%' }}>
                  <SelectorScrolleable 
                    placeholder="Seleccione..."
                    valor={datos.genero}
                    onChange={(val) => handleCustomDateChange('genero', val)}
                    opciones={[
                      {value: 'Masculino', label: 'Masculino'}, 
                      {value: 'Femenino', label: 'Femenino'}
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {paso === 2 && (
          <div className="form-paso">
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#1e293b' }}>Ubicación y Contacto</h3>
            <div className="form-grid">
              <div className="login-grupo">
                <label className="login-label">Departamento</label>
                <div className="login-input-wrapper">
                  <input className="login-input" type="text" name="departamento" value={datos.departamento} onChange={handleChange} required placeholder="Tu departamento" />
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
              </div>
              <div className="login-grupo">
                <label className="login-label">Municipio</label>
                <div className="login-input-wrapper">
                  <input className="login-input" type="text" name="municipio" value={datos.municipio} onChange={handleChange} required placeholder="Tu municipio" />
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
              </div>
              <div className="login-grupo" style={{ gridColumn: '1 / -1' }}>
                <label className="login-label">Dirección Completa</label>
                <div className="login-input-wrapper">
                  <textarea className="login-input" name="direccion" value={datos.direccion} onChange={handleChange} required rows="3" placeholder="Tu dirección" style={{ padding: '16px 20px 16px 52px' }}></textarea>
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ top: '16px' }}>
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
              </div>
              <div className="login-grupo" style={{ gridColumn: '1 / -1' }}>
                <label className="login-label">Correo Electrónico</label>
                <div className="login-input-wrapper">
                  <input className="login-input" type="email" name="correo" value={datos.correo} onChange={handleChange} required placeholder="Tu correo electrónico" />
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <polyline points="3 7 12 13 21 7" />
                  </svg>
                </div>
              </div>
              <div className="login-grupo" style={{ gridColumn: '1 / -1' }}>
                <label className="login-label">Teléfono/Celular</label>
                <div className="login-input-wrapper">
                  <input className="login-input" type="tel" name="telefono" value={datos.telefono} onChange={handleChange} required placeholder="Tu teléfono" />
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {paso === 3 && (
          <div className="form-paso">
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#1e293b' }}>Nivel Académico y Resumen</h3>
            <div className="login-grupo" style={{ marginBottom: '20px' }}>
              <label className="login-label">Nivel Académico Alcanzado</label>
              <div style={{ width: '100%' }}>
                <SelectorScrolleable 
                  placeholder="Seleccione..."
                  valor={datos.nivelAcademico}
                  onChange={(val) => handleCustomDateChange('nivelAcademico', val)}
                  opciones={[
                    {value: 'Primaria', label: 'Primaria'},
                    {value: 'Secundaria', label: 'Secundaria'},
                    {value: 'Técnico', label: 'Técnico'},
                    {value: 'Universitario', label: 'Universitario'},
                    {value: 'Posgrado', label: 'Posgrado'}
                  ]}
                />
              </div>
            </div>

            <div className="detalle-seccion" style={{ marginTop: '24px' }}>
              <h4 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" width="22" height="22">
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                Revisa tu información
              </h4>
              
              <div style={{ marginBottom: '24px' }}>
                <strong style={{ display: 'block', color: '#0d9488', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Información del curso</strong>
                <FilaResumen etiqueta="Curso" valor={curso?.nombre} />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <strong style={{ display: 'block', color: '#0d9488', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Datos Personales</strong>
                <FilaResumen etiqueta="Nombre" valor={`${datos.nombres} ${datos.apellidos}`} />
                <FilaResumen etiqueta="Cédula" valor={datos.cedula} />
                <FilaResumen etiqueta="Nacimiento" valor={datos.diaNac ? `${datos.diaNac}/${datos.mesNac}/${datos.anioNac}` : ''} />
                <FilaResumen etiqueta="Nacionalidad" valor={datos.nacionalidad} />
                <FilaResumen etiqueta="Género" valor={datos.genero} />
                <FilaResumen etiqueta="Nivel Académico" valor={datos.nivelAcademico} />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <strong style={{ display: 'block', color: '#0d9488', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Ubicación</strong>
                <FilaResumen etiqueta="Departamento" valor={datos.departamento} />
                <FilaResumen etiqueta="Municipio" valor={datos.municipio} />
                <FilaResumen etiqueta="Dirección" valor={datos.direccion} />
              </div>

              <div>
                <strong style={{ display: 'block', color: '#0d9488', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Información de contacto</strong>
                <FilaResumen etiqueta="Correo" valor={datos.correo} />
                <FilaResumen etiqueta="Teléfono" valor={datos.telefono} />
              </div>
            </div>
          </div>
        )}

        <div className="wizard-footer">
          {paso > 1 ? (
            <button 
              type="button" 
              onClick={pasoAnterior}
              style={{ background: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '8px', border: '2px solid #e2e8f0', borderBottom: '4px solid #cbd5e1', color: '#475569', fontSize: '15px', fontWeight: '800', cursor: 'pointer', padding: '12px 24px', borderRadius: '12px', transition: 'all 0.1s' }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderBottomWidth = '4px'; }}
            >
              Atrás
            </button>
          ) : (
            <div></div> // Placeholder para flex-between
          )}

          {paso < 3 ? (
            <button key="btn-next" type="button" className="btn-wizard-pri" onClick={pasoSiguiente}>Siguiente</button>
          ) : (
            <button key="btn-submit" type="submit" className="btn-wizard-pri">Confirmar Matrícula</button>
          )}
        </div>
      </form>
    </div>
  );
}
