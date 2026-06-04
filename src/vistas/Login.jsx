import React, { useState } from 'react';
import '../estilos/Login.css';

/**
 * Componente: Login
 * Pantalla de inicio de sesión educativa unificada en formato Split-Screen (pantalla dividida).
 *
 * @param {function} alIniciarSesion - Callback cuando el inicio de sesión es exitoso. Recibe { email, rol }.
 */
export default function Login({ alIniciarSesion }) {
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
        mensaje: `Acceso concedido (Beta). Cargando portal de ${rolSeleccionado === 'estudiante' ? 'Estudiante' : 'Docente'}...`
      });

      setTimeout(() => {
        alIniciarSesion({ email: emailBeta, rol: rolSeleccionado });
      }, 1000);
    }, 1200);
  };

  // Manejar el envío del formulario
  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAlerta({ tipo: 'error', mensaje: 'Por favor, completa todos los campos.' });
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
          mensaje: 'Acceso concedido. Cargando portal de Estudiante...'
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
          mensaje: 'Acceso concedido. Cargando portal de Docente...'
        });
        setTimeout(() => {
          alIniciarSesion({ email: emailNormalizado, rol: 'docente' });
        }, 1000);
      }, 1200);
    } else {
      setAlerta({
        tipo: 'error',
        mensaje: 'Credenciales de prueba inválidas. Revisa las cuentas beta de abajo.'
      });
    }
  };

  return (
    <div className="login-pantalla">
      
      {/* PANEL IZQUIERDO: Marca e Inspiración (Se oculta en móvil) */}
      <aside className="login-lateral-marca">
        <div className="marca-contenido">
          {/* Icono de Globo + Libro grande y detallado */}
          <svg className="marca-logo-svg" viewBox="0 0 24 24" width="80" height="80" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5V15a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v4.5M2 10l10-6 10 6-10 6-10-6z" />
            <path d="M6 14v4c0 1.5 1.5 2.5 6 2.5s6-1 6-2.5v-4" />
            <circle cx="12" cy="10" r="1" opacity="0.5" />
          </svg>
          <h2 className="marca-titulo">Conecta con el Mundo</h2>
          <p className="marca-subtitulo">
            Únete a nuestra academia de idiomas y adquiere nuevas herramientas para tu futuro profesional y personal de la mano de docentes calificados.
          </p>
        </div>
      </aside>

      {/* PANEL DERECHO: Formulario de Login */}
      <section className="login-lateral-formulario">

        {/* Contenedor del Formulario (Grande y Cómodo) */}
        <div className="login-contenedor">
          
          {/* Encabezado */}
          <header className="login-encabezado">
            <h1 className="login-titulo">Academia de Idiomas</h1>
            <p className="login-subtitulo">Ingresa tus credenciales de acceso para comenzar</p>
          </header>

          {/* Formulario de Login Único */}
          <form className="login-formulario" onSubmit={manejarSubmit}>
            
            {/* Correo Electrónico */}
            <div className="login-grupo">
              <label className="login-label" htmlFor="email-input">
                Correo Electrónico
              </label>
              <div className="login-input-wrapper">
                <input
                  id="email-input"
                  className="login-input"
                  type="email"
                  placeholder="ejemplo@academia.com"
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

            {/* Contraseña */}
            <div className="login-grupo">
              <label className="login-label" htmlFor="password-input">
                Contraseña
              </label>
              <div className="login-input-wrapper">
                <input
                  id="password-input"
                  className="login-input"
                  type={mostrarPassword ? 'text' : 'password'}
                  placeholder="••••••••"
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
                    // Ojo Tachado
                    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    // Ojo
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
                Recordarme
              </label>
              <a href="#olvido" className="login-olvido" onClick={(e) => e.preventDefault()}>
                ¿Olvidaste la contraseña?
              </a>
            </div>

            {/* Alertas */}
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
                  Validando...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>

          </form>

          {/* Crear Cuenta */}
          <div className="login-crear-cuenta">
            <span>¿No tienes una cuenta?</span>
            <a href="#registro" className="login-link-registro" onClick={(e) => e.preventDefault()}>
              Crear cuenta
            </a>
          </div>

          {/* Acceso Rápido Beta */}
          <div className="login-seccion-beta">
            {!mostrarOpcionesBeta ? (
              <button 
                type="button" 
                className="btn-beta-principal"
                onClick={() => setMostrarOpcionesBeta(true)}
                disabled={cargando}
              >
                Prueba Beta
              </button>
            ) : (
              <div className="login-beta-opciones">
                <p className="beta-opciones-titulo">Selecciona tu rol de prueba:</p>
                <div className="beta-opciones-botones">
                  <button 
                    type="button" 
                    className="btn-beta-opcion estudiante"
                    onClick={() => manejarLoginBeta('estudiante')}
                    disabled={cargando}
                  >
                    Estudiante
                  </button>
                  <button 
                    type="button" 
                    className="btn-beta-opcion docente"
                    onClick={() => manejarLoginBeta('docente')}
                    disabled={cargando}
                  >
                    Docente
                  </button>
                </div>
                <button 
                  type="button" 
                  className="btn-beta-cancelar"
                  onClick={() => setMostrarOpcionesBeta(false)}
                  disabled={cargando}
                >
                  Regresar al login manual
                </button>
              </div>
            )}
          </div>

        </div>
      </section>
      
    </div>
  );
}
