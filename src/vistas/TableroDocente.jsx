import React from 'react';

/**
 * Componente: TableroDocente
 * Panel de control y vista principal para los docentes/profesores.
 *
 * @param {object} usuario - Datos del usuario logueado.
 * @param {function} alCerrarSesion - Callback para salir de la cuenta.
 */
export default function TableroDocente({ usuario, alCerrarSesion }) {
  // Datos simulados de clases para el profesor
  const clases = [
    { id: 1, nombre: 'Inglés Avanzado - C1', alumnosCount: 18, horario: 'Lun y Mier - 18:00', codigo: 'ENG-C1' },
    { id: 2, nombre: 'Conversación de Negocios - B2', alumnosCount: 12, horario: 'Mar y Jue - 19:30', codigo: 'ENG-BUS' },
  ];

  return (
    <div style={estilos.contenedor}>
      {/* Cabecera del Panel */}
      <header style={estilos.cabecera}>
        <div style={estilos.logoSeccion}>
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-primario, #6366f1)' }}>
            <rect x="3" y="3" width="18" height="12" rx="2" />
            <path d="M9 21h6" />
            <path d="M12 15v6" />
          </svg>
          <span style={estilos.marca}>Portal Docente</span>
        </div>
        <div style={estilos.usuarioSeccion}>
          <span style={estilos.usuarioEmail}>{usuario.email}</span>
          <button onClick={alCerrarSesion} style={estilos.btnSalir}>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Salir
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <main style={estilos.principal}>
        <section style={estilos.bienvenidaCard}>
          <h2 style={estilos.bienvenidaTitulo}>¡Bienvenido, Docente!</h2>
          <p style={estilos.bienvenidaTexto}>
            Acceso al portal de profesores de la Academia de Idiomas. Aquí puedes administrar tus grupos, calificar tareas y registrar asistencias.
          </p>
        </section>

        {/* Sección de Clases */}
        <section style={estilos.seccionClases}>
          <h3 style={estilos.seccionTitulo}>Grupos Asignados</h3>
          <div style={estilos.gridClases}>
            {clases.map(clase => (
              <div key={clase.id} style={estilos.claseCard}>
                <div style={estilos.claseHeader}>
                  <span style={estilos.claseCodigo}>{clase.codigo}</span>
                  <h4 style={estilos.claseNombre}>{clase.nombre}</h4>
                </div>
                <div style={estilos.claseDetalles}>
                  <div style={estilos.detalleItem}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={estilos.detalleIcono}>
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>{clase.alumnosCount} Alumnos inscritos</span>
                  </div>
                  <div style={estilos.detalleItem}>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={estilos.detalleIcono}>
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{clase.horario}</span>
                  </div>
                </div>
                <button style={estilos.btnGestionar}>
                  Administrar Aula
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// Estilos en línea para evitar dependencias, adaptables a temas
const estilos = {
  contenedor: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--color-fondo, #f8fafc)',
    transition: 'background-color 0.3s ease',
  },
  cabecera: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: 'var(--color-tarjeta, #ffffff)',
    borderBottom: '1px solid var(--color-borde, #e2e8f0)',
    boxShadow: '0 1px 3px var(--color-sombra, rgba(0,0,0,0.05))',
    transition: 'all 0.3s ease',
  },
  logoSeccion: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  marca: {
    fontWeight: '700',
    fontSize: '16px',
    color: 'var(--color-texto, #0f172a)',
  },
  usuarioSeccion: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  usuarioEmail: {
    fontSize: '14px',
    color: 'var(--color-secundario, #64748b)',
  },
  btnSalir: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'none',
    border: '1px solid var(--color-borde, #e2e8f0)',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    color: '#ef4444',
    transition: 'all 0.2s',
  },
  principal: {
    flex: 1,
    padding: '32px 24px',
    maxWidth: '1000px',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
  },
  bienvenidaCard: {
    backgroundColor: 'var(--color-tarjeta, #ffffff)',
    border: '1px solid var(--color-borde, #e2e8f0)',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'left',
    boxShadow: '0 4px 6px -1px var(--color-sombra, rgba(0,0,0,0.05))',
  },
  bienvenidaTitulo: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '8px',
    color: 'var(--color-texto, #0f172a)',
  },
  bienvenidaTexto: {
    fontSize: '14px',
    color: 'var(--color-secundario, #64748b)',
    lineHeight: '1.6',
  },
  seccionClases: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  seccionTitulo: {
    fontSize: '18px',
    fontWeight: '700',
    textAlign: 'left',
    color: 'var(--color-texto, #0f172a)',
  },
  gridClases: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  claseCard: {
    backgroundColor: 'var(--color-tarjeta, #ffffff)',
    border: '1px solid var(--color-borde, #e2e8f0)',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '18px',
    textAlign: 'left',
    boxShadow: '0 2px 4px var(--color-sombra, rgba(0,0,0,0.02))',
  },
  claseHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  claseCodigo: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--color-primario, #6366f1)',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    padding: '2px 6px',
    borderRadius: '4px',
    alignSelf: 'flex-start',
  },
  claseNombre: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--color-texto, #0f172a)',
  },
  claseDetalles: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  detalleItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: 'var(--color-secundario, #64748b)',
  },
  detalleIcono: {
    color: 'var(--color-secundario, #94a3b8)',
  },
  btnGestionar: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'var(--color-primario, #6366f1)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background-color 0.2s',
  },
};
