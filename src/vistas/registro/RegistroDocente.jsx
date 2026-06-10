import React, { useState } from 'react';
import { useIdioma } from '../../contextos/IdiomaContexto';
import '../../estilos/Registro.css'; // Reutilizamos los estilos del registro de estudiantes

import { supabase } from '../../supabase/client';

export default function RegistroDocente({ onVolver, onCompletar }) {
  const { t } = useIdioma();
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    cedula: '',
    correo: '',
    password: '',
    telefono: '',
    especialidades: []
  });
  
  const [cargando, setCargando] = useState(false);
  const [errorMsj, setErrorMsj] = useState(null);

  const idiomasDisponibles = [
    { id: 'en', nombre: 'Inglés', badge: 'EN' },
    { id: 'fr', nombre: 'Francés', badge: 'FR' },
    { id: 'pt', nombre: 'Portugués', badge: 'PT' },
    { id: 'it', nombre: 'Italiano', badge: 'IT' },
    { id: 'es', nombre: 'Español', badge: 'ES' }
  ];

  const manejarEspecialidad = (idiomaId) => {
    setFormData(prev => {
      const especialidades = prev.especialidades.includes(idiomaId)
        ? prev.especialidades.filter(id => id !== idiomaId)
        : [...prev.especialidades, idiomaId];
      return { ...prev, especialidades };
    });
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setErrorMsj(null);

    try {
      // 1. Crear el usuario en Supabase Auth y enviar metadatos para el Trigger
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.correo,
        password: formData.password,
      });

      if (authError) throw authError;

      const userId = authData.user?.id;

      if (userId) {
        // Insertamos manualmente en la tabla perfiles
        const { error: dbError } = await supabase
          .from('perfiles')
          .insert([
            {
              id: userId,
              nombre: formData.nombres,
              apellido: formData.apellidos,
              rol: 'docente'
            }
          ]);

        if (dbError) {
          console.error("Error al insertar en perfiles:", dbError);
          throw new Error(`Error de base de datos: ${dbError.message}`);
        }
      }
      
      // Si todo sale bien
      onCompletar(formData);
    } catch (error) {
      console.error('Error al registrar docente:', error);
      setErrorMsj(error.message || 'Ocurrió un error al registrar. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="wizard-contenedor">
      <div className="registro-header">
        <button
          onClick={onVolver}
          style={{ background: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '8px', border: '2px solid #e2e8f0', borderBottom: '4px solid #cbd5e1', color: '#475569', fontSize: '14px', fontWeight: '800', cursor: 'pointer', padding: '10px 16px', borderRadius: '12px', transition: 'all 0.1s', width: 'fit-content' }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderBottomWidth = '4px'; }}
        >
          <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Volver al Login
        </button>
      </div>

      <div className="wizard-contenido">
        <div className="wizard-paso active" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          <div className="wizard-paso-header" style={{ marginBottom: '24px' }}>
            <h2 className="wizard-paso-titulo" style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>Crea tu cuenta de Docente</h2>
            <p className="wizard-paso-desc" style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>Regístrate como docente independiente para comenzar a crear y gestionar tus cursos.</p>
          </div>

          <form onSubmit={manejarSubmit} style={{ background: '#fff', padding: '32px', borderRadius: '24px', border: '2px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.1)' }}>
            
            {errorMsj && (
              <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px 16px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {errorMsj}
              </div>
            )}

            <div className="form-grid">
              <div className="login-grupo">
                <label className="login-label">Nombres</label>
                <div className="login-input-wrapper">
                  <input
                    type="text"
                    name="nombres"
                    className="login-input"
                    placeholder="Tus nombres"
                    value={formData.nombres}
                    onChange={manejarCambio}
                    required
                  />
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
              <div className="login-grupo">
                <label className="login-label">Apellidos</label>
                <div className="login-input-wrapper">
                  <input
                    type="text"
                    name="apellidos"
                    className="login-input"
                    placeholder="Tus apellidos"
                    value={formData.apellidos}
                    onChange={manejarCambio}
                    required
                  />
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="form-grid" style={{ marginTop: '16px' }}>
              <div className="login-grupo">
                <label className="login-label">Cédula de Identidad</label>
                <div className="login-input-wrapper">
                  <input
                    type="text"
                    name="cedula"
                    className="login-input"
                    placeholder="Tu número de cédula"
                    value={formData.cedula}
                    onChange={(e) => {
                      let val = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
                      manejarCambio({ target: { name: 'cedula', value: val }});
                    }}
                    required
                  />
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
              </div>

              <div className="login-grupo">
                <label className="login-label">Correo Electrónico</label>
                <div className="login-input-wrapper">
                  <input
                    type="email"
                    name="correo"
                    className="login-input"
                    placeholder="correo@ejemplo.com"
                    value={formData.correo}
                    onChange={manejarCambio}
                    required />
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <polyline points="3 7 12 13 21 7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="form-grid" style={{ marginTop: '16px' }}>
              <div className="login-grupo">
                <label className="login-label">Contraseña</label>
                <div className="login-input-wrapper">
                  <input
                    type="password"
                    name="password"
                    className="login-input"
                    placeholder="Crea una contraseña"
                    value={formData.password}
                    onChange={manejarCambio}
                    required
                    minLength={6}
                  />
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
              </div>
              <div className="login-grupo">
                <label className="login-label">Teléfono (Opcional)</label>
                <div className="login-input-wrapper">
                  <input
                    type="tel"
                    name="telefono"
                    className="login-input"
                    placeholder="+505 0000 0000"
                    value={formData.telefono}
                    onChange={manejarCambio}
                  />
                  <svg className="input-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="login-grupo" style={{ marginTop: '16px' }}>
              <label className="login-label">Especialidades (Puedes seleccionar varias)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px', marginTop: '8px' }}>
                {idiomasDisponibles.map(idioma => {
                  const seleccionado = formData.especialidades.includes(idioma.id);
                  return (
                    <button
                      key={idioma.id}
                      type="button"
                      onClick={() => manejarEspecialidad(idioma.id)}
                      style={{
                        padding: '12px 8px',
                        borderRadius: '12px',
                        border: seleccionado ? '2px solid #0ea5e9' : '2px solid #e2e8f0',
                        borderBottom: seleccionado ? '4px solid #0284c7' : '4px solid #cbd5e1',
                        background: seleccionado ? '#f0f9ff' : '#f8fafc',
                        color: seleccionado ? '#0369a1' : '#475569',
                        fontWeight: '700',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.1s',
                        transform: seleccionado ? 'translateY(2px)' : 'none',
                        borderBottomWidth: seleccionado ? '2px' : '4px'
                      }}
                      onMouseDown={(e) => { if (!seleccionado) { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.borderBottomWidth = '2px'; } }}
                      onMouseUp={(e) => { if (!seleccionado) { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderBottomWidth = '4px'; } }}
                    >
                      <span style={{ width: '100%', textAlign: 'center' }}>{idioma.nombre}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="wizard-footer" style={{ marginTop: '32px', borderTop: 'none', paddingTop: 0 }}>
              <button type="submit" className="login-btn-enviar" style={{ width: '100%', opacity: cargando ? 0.7 : 1, cursor: cargando ? 'not-allowed' : 'pointer' }} disabled={cargando}>
                {cargando ? 'Registrando docente...' : 'Completar Registro'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
