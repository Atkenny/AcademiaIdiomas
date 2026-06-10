import React, { useState } from 'react';
import '../estilos/Login.css';
import { useIdioma } from '../contextos/IdiomaContexto';
import CatalogoCursos from './registro/CatalogoCursos';
import DetalleCurso from './registro/DetalleCurso';
import WizardMatricula from './registro/WizardMatricula';
import RegistroDocente from './registro/RegistroDocente';
import { supabase } from '../supabase/client';

/**
 * Componente: Login
 * Pantalla de inicio de sesión educativa unificada en formato Split-Screen (pantalla dividida).
 *
 * @param {function} alIniciarSesion - Callback cuando el inicio de sesión es exitoso. Recibe { email, rol }.
 */
export default function Login({ alIniciarSesion }) {
  const { idioma, cambiarIdioma, t } = useIdioma();
  const [vistaActual, setVistaActual] = useState('login'); // 'login', 'catalogo', 'detalle', 'wizard', 'exito'
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [pasoLogin, setPasoLogin] = useState(1); // 1 = Correo, 2 = Contraseña

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [alerta, setAlerta] = useState(null); // { tipo: 'exito' | 'error', mensaje: string }
  const [mostrarOpcionesBeta, setMostrarOpcionesBeta] = useState(false);

  // Iniciar sesión automáticamente con credenciales Beta
  const manejarLoginBeta = (rolSeleccionado) => {
    const emailBeta = rolSeleccionado === 'estudiante' ? 'estudiante@academia.com' : 'docente@academia.com';
    const passwordBeta = 'password123';

    setEmail(emailBeta);
    setPassword(passwordBeta);
    setAlerta(null);
    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      setAlerta({
        tipo: 'exito',
        value: rolSeleccionado,
        mensaje: t('accesoConcedidoBeta') + (rolSeleccionado === 'estudiante' ? t('estudiante') : t('docente')) + '...'
      });

      setTimeout(() => {
        alIniciarSesion({ email: emailBeta, rol: rolSeleccionado });
      }, 1000);
    }, 1200);
  };

  // Manejar el envío del formulario
  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (pasoLogin === 1) {
      if (!email) {
        setAlerta({ tipo: 'error', mensaje: 'Por favor, ingresa tu correo electrónico.' });
        return;
      }
      setAlerta(null);
      setPasoLogin(2);
      return;
    }

    if (!password) {
      setAlerta({ tipo: 'error', mensaje: t('alertaCompletar') });
      return;
    }

    setAlerta(null);

    const emailNormalizado = email.toLowerCase().trim();
    const passwordNormalizado = password.trim();

    // Validar credenciales de prueba de la versión Beta
    if (emailNormalizado === 'estudiante@academia.com' && passwordNormalizado === 'password123') {
      setCargando(true);
      setTimeout(() => {
        setCargando(false);
        setAlerta({
          tipo: 'exito',
          mensaje: t('accesoConcedido') + t('estudiante') + '...'
        });
        setTimeout(() => {
          alIniciarSesion({ email: emailNormalizado, rol: 'estudiante' });
        }, 1000);
      }, 1200);
    } else if (emailNormalizado === 'docente@academia.com' && passwordNormalizado === 'password123') {
      setCargando(true);
      setTimeout(() => {
        setCargando(false);
        setAlerta({
          tipo: 'exito',
          mensaje: t('accesoConcedido') + t('docente') + '...'
        });
        setTimeout(() => {
          alIniciarSesion({ email: emailNormalizado, rol: 'docente' });
        }, 1000);
      }, 1200);
    } else {
      setCargando(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailNormalizado,
        password: passwordNormalizado
      });

      if (error) {
        setCargando(false);
        console.error("Login error:", error);
        // Mostramos el mensaje real que devuelve Supabase
        setAlerta({ tipo: 'error', mensaje: error.message });
      } else {
        // Verificar rol en la tabla perfiles
        const { data: perfilData } = await supabase
          .from('perfiles')
          .select('id, nombre, apellido, rol')
          .eq('id', data.user.id)
          .single();

        setAlerta({
          tipo: 'exito',
          mensaje: '¡Acceso concedido!'
        });

        setTimeout(() => {
          setCargando(false);
          if (perfilData && perfilData.rol === 'docente') {
            alIniciarSesion({ 
              id: data.user.id,
              email: emailNormalizado, 
              rol: 'docente',
              nombres: perfilData.nombre,
              apellidos: perfilData.apellido
            });
          } else {
            // Si no está en perfiles o no es docente, asumimos estudiante
            alIniciarSesion({ 
              id: data.user.id,
              email: emailNormalizado, 
              rol: 'estudiante',
              nombres: perfilData?.nombre || 'Usuario',
              apellidos: perfilData?.apellido || ''
            });
          }
        }, 1000);
      }
    }
  };

  if (vistaActual !== 'login') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
        {/* Cabecera Tipo Portal */}
        <header style={{ background: '#fff', borderBottom: '2px solid #e2e8f0', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img src="/unan_logo.webp" alt="UNAN Managua" style={{ height: '48px', objectFit: 'contain' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img src="/setec_logo.webp" alt="SETEC" style={{ height: '48px', objectFit: 'contain' }} />
          </div>
        </header>

        {/* Contenido Principal */}
        <main style={{ flex: 1, padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          {vistaActual === 'catalogo' && (
            <CatalogoCursos
              onSeleccionar={(curso) => { setCursoSeleccionado(curso); setVistaActual('detalle'); }}
              onVolver={() => setVistaActual('login')}
            />
          )}
          {vistaActual === 'detalle' && (
            <DetalleCurso
              curso={cursoSeleccionado}
              onMatricular={() => setVistaActual('wizard')}
              onVolver={() => setVistaActual('catalogo')}
            />
          )}
          {vistaActual === 'wizard' && (
            <WizardMatricula
              curso={cursoSeleccionado}
              onVolver={() => setVistaActual('detalle')}
              onCompletar={(datos) => setVistaActual('exito')}
            />
          )}
          {vistaActual === 'exito' && (
            <div className="login-contenedor" style={{ textAlign: 'center', justifyContent: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '40px', border: '2px solid #86efac', borderBottom: '4px solid #4ade80' }}>✓</div>
              <h2 className="login-titulo">¡Solicitud en Espera!</h2>
              <p className="login-titulo-secundario" style={{ marginBottom: '32px' }}>Tu solicitud ha sido recibida. Se te notificará en tu correo electrónico con la confirmación y tus credenciales de acceso una vez el docente te apruebe.</p>
              <button className="login-btn-enviar" onClick={() => setVistaActual('login')}>Volver al Inicio</button>
            </div>
          )}
          {vistaActual === 'registroDocente' && (
            <RegistroDocente 
              onVolver={() => setVistaActual('login')} 
              onCompletar={(datos) => setVistaActual('exitoDocente')} 
            />
          )}
          {vistaActual === 'exitoDocente' && (
            <div className="login-contenedor" style={{ textAlign: 'center', justifyContent: 'center' }}>
              <div style={{ width: '80px', height: '80px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '40px', border: '2px solid #86efac', borderBottom: '4px solid #4ade80' }}>✓</div>
              <h2 className="login-titulo">¡Registro Exitoso!</h2>
              <p className="login-titulo-secundario" style={{ marginBottom: '32px' }}>Tu cuenta de docente independiente ha sido creada. Ahora puedes iniciar sesión con tu correo y contraseña.</p>
              <button className="login-btn-enviar" onClick={() => setVistaActual('login')}>Volver al Inicio</button>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="login-pantalla">
      {/* Selector Flotante de Idioma */}
      <div className="login-selector-idioma">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="selector-globe-icono">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <select value={idioma} onChange={(e) => cambiarIdioma(e.target.value)} className="selector-select" aria-label="Cambiar idioma / Change language">
          <option value="es">Español</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="it">Italiano</option>
          <option value="pt">Português</option>
        </select>
      </div>

      {/* PANEL IZQUIERDO: Marca e Inspiración (Se oculta en móvil) */}
      <aside className="login-lateral-marca">
        <div className="marca-contenido">
          {/* Logos Institucionales con Títulos en PC */}
          <div className="login-institucional-pc">
            <div className="institucional-logo-item">
              <img src="/unan_logo.webp" alt="UNAN Managua" className="institucional-logo-img" />
              <span className="institucional-logo-titulo">Universidad Nacional Autónoma de Nicaragua, Managua (UNAN-Managua)</span>
            </div>
            <div className="institucional-logo-item">
              <img src="/setec_logo.webp" alt="SETEC" className="institucional-logo-img" />
              <span className="institucional-logo-titulo">Secretaría Técnica para Atención a las Universidades (SETEC)</span>
            </div>
          </div>
        </div>
      </aside>

      {/* PANEL DERECHO: Formulario de Login */}
      <section className="login-lateral-formulario">
        <div className="login-contenedor">

          {/* Logos institucionales adaptados para vista móvil (Visibles solo en pantallas pequeñas) */}
          <div className="login-logos-movil">
            <img src="/unan_logo.webp" alt="UNAN Managua" className="login-logo-movil-img" />
            <img src="/setec_logo.webp" alt="SETEC" className="login-logo-movil-img" />
          </div>

          {/* Encabezado */}
          <header className="login-encabezado">
            <h1 className="login-titulo">{t('academia')}</h1>
            <h2 className="login-titulo-secundario">{t('heroe')}</h2>
          </header>

          {/* Formulario de Login Único */}
          <form className="login-formulario" onSubmit={manejarSubmit}>

            {pasoLogin === 1 ? (
              <>
                {/* Correo Electrónico */}
                <div className="login-grupo">
                  <label className="login-label" htmlFor="email-input">
                    {t('emailLabel')}
                  </label>
                  <div className="login-input-wrapper">
                    <input
                      id="email-input"
                      className="login-input"
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={cargando}
                      required
                    />
                    {/* Icono Correo */}
                    <svg className="input-icono" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                </div>

                {/* Alertas (Paso 1) */}
                {alerta && (
                  <div className={`login-alerta ${alerta.tipo}`}>
                    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{alerta.mensaje}</span>
                  </div>
                )}

                <button className="login-btn-enviar" type="submit" disabled={cargando}>
                  Continuar
                </button>
              </>
            ) : (
              <>
                {/* Indicador de correo con botón para volver */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f1f5f9', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    <div style={{ background: '#0284c7', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>
                      {email.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{email}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPasoLogin(1)}
                    style={{ background: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '4px', border: 'none', color: '#475569', fontSize: '13px', fontWeight: '700', cursor: 'pointer', padding: '6px 12px', borderRadius: '8px', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#cbd5e1'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#e2e8f0'}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Volver
                  </button>
                </div>

                {/* Contraseña */}
                <div className="login-grupo">
                  <label className="login-label" htmlFor="password-input">
                    {t('passwordLabel')}
                  </label>
                  <div className="login-input-wrapper">
                    <input
                      id="password-input"
                      className="login-input"
                      type={mostrarPassword ? 'text' : 'password'}
                      placeholder={t('passwordPlaceholder')}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={cargando}
                      required
                    />
                    {/* Icono Candado */}
                    <svg className="input-icono" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    {/* Botón Ver Contraseña */}
                    <button
                      type="button"
                      className="btn-ver-password"
                      onClick={() => setMostrarPassword(!mostrarPassword)}
                      title={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      aria-label="Ver contraseña"
                    >
                      {mostrarPassword ? (
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Opciones */}
                <div className="login-opciones">
                  <label className="login-recordar">
                    <input type="checkbox" disabled={cargando} />
                    {t('recordarme')}
                  </label>
                  <a href="#olvido" className="login-olvido" onClick={(e) => e.preventDefault()}>
                    {t('olvidoContra')}
                  </a>
                </div>

                {/* Alertas (Paso 2) */}
                {alerta && (
                  <div className={`login-alerta ${alerta.tipo}`}>
                    {alerta.tipo === 'exito' ? (
                      <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    )}
                    <span>{alerta.mensaje}</span>
                  </div>
                )}

                {/* Botón Iniciar Sesión */}
                <button className="login-btn-enviar" type="submit" disabled={cargando}>
                  {cargando ? (
                    <>
                      <div className="spinner" />
                      {t('validando')}
                    </>
                  ) : (
                    t('iniciarSesion')
                  )}
                </button>
              </>
            )}

          </form>

          {/* Botón Matrículas solo en Paso 1 */}
          {pasoLogin === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.6 }}>
                <div style={{ flex: 1, height: '1px', background: '#cbd5e1' }}></div>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>O</span>
                <div style={{ flex: 1, height: '1px', background: '#cbd5e1' }}></div>
              </div>
              <div style={{ textAlign: 'center', margin: '4px 0' }}>
                <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '15px' }}>¿Eres nuevo estudiante?</span>
              </div>
              <button
                onClick={() => setVistaActual('catalogo')}
                style={{ width: '100%', padding: '14px', background: '#f8fafc', color: '#0d9488', border: '2px solid #e2e8f0', borderBottom: '4px solid #cbd5e1', borderRadius: '12px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.1s' }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderBottomWidth = '4px'; }}
              >
                Ver Cursos Disponibles
              </button>

              <div style={{ textAlign: 'center', margin: '16px 0 4px 0' }}>
                <span style={{ fontWeight: '800', color: '#0f172a', fontSize: '15px' }}>¿Eres docente?</span>
              </div>
              <button
                onClick={() => setVistaActual('registroDocente')}
                style={{ width: '100%', padding: '14px', background: '#f8fafc', color: '#0369a1', border: '2px solid #e2e8f0', borderBottom: '4px solid #cbd5e1', borderRadius: '12px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.1s' }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderBottomWidth = '4px'; }}
              >
                Solicitar Registro
              </button>
            </div>
          )}

          {/* Acceso Rápido Beta */}
          <div className="login-seccion-beta">
            {!mostrarOpcionesBeta ? (
              <button
                type="button"
                className="btn-beta-principal"
                onClick={() => setMostrarOpcionesBeta(true)}
                disabled={cargando}
              >
                {t('pruebaBeta')}
              </button>
            ) : (
              <div className="login-beta-opciones">
                <p className="beta-opciones-titulo">{t('seleccionaRol')}</p>
                <div className="beta-opciones-botones">
                  <button type="button" className="btn-beta-opcion estudiante" onClick={() => manejarLoginBeta('estudiante')} disabled={cargando}>{t('estudiante')}</button>
                  <button type="button" className="btn-beta-opcion docente" onClick={() => manejarLoginBeta('docente')} disabled={cargando}>{t('docente')}</button>
                </div>
                <button type="button" className="btn-beta-cancelar" onClick={() => setMostrarOpcionesBeta(false)} disabled={cargando}>{t('regresarManual')}</button>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
