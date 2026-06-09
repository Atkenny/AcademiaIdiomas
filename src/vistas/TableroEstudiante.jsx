import React, { useState } from 'react';
import '../estilos/TableroEstudiante.css';
import ProgresoEstudiante from './estudiante/ProgresoEstudiante';
import BibliotecaEstudiante from './estudiante/BibliotecaEstudiante';
import TareasEstudiante from './estudiante/TareasEstudiante';
import EvaluacionesEstudiante from './estudiante/EvaluacionesEstudiante';
import MultimediaEstudiante from './estudiante/MultimediaEstudiante';
import ForoEstudiante from './estudiante/ForoEstudiante';
import { useIdioma } from '../contextos/IdiomaContexto';

/**
 * Componente: TableroEstudiante
 * Panel de control y vista principal para los estudiantes.
 *
 * @param {object} usuario - Datos del usuario logueado.
 * @param {function} alCerrarSesion - Callback para salir de la cuenta.
 */
export default function TableroEstudiante({ usuario, alCerrarSesion }) {
  const { idioma, cambiarIdioma, t } = useIdioma();
  const [tabActiva, setTabActiva] = useState('progreso'); // progreso | biblioteca | tareas | evaluaciones | multimedia | foro
  const [sidebarColapsado, setSidebarColapsado] = useState(false); // Colapsar menú en PC
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false); // Menú hamburguesa móvil

  // Renderizar la vista correspondiente a la pestaña activa
  const renderizarContenido = () => {
    switch (tabActiva) {
      case 'progreso':
        return <ProgresoEstudiante usuario={usuario} alCambiarTab={setTabActiva} />;
      case 'biblioteca':
        return <BibliotecaEstudiante />;
      case 'tareas':
        return <TareasEstudiante />;
      case 'evaluaciones':
        return <EvaluacionesEstudiante />;
      case 'multimedia':
        return <MultimediaEstudiante />;
      case 'foro':
        return <ForoEstudiante />;
      default:
        return <ProgresoEstudiante usuario={usuario} alCambiarTab={setTabActiva} />;
    }
  };

  // Ítems de navegación reutilizables
  const itemsMenu = [
    {
      id: 'progreso',
      label: t('miProgreso'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      )
    },
    {
      id: 'biblioteca',
      label: t('biblioteca'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
    },
    {
      id: 'tareas',
      label: t('tareas'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    },
    {
      id: 'evaluaciones',
      label: t('evaluaciones'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      )
    },
    {
      id: 'multimedia',
      label: t('laboratorio'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      )
    },
    {
      id: 'foro',
      label: t('comunidad'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      )
    }
  ];

  return (
    <div className={`estudiante-layout ${sidebarColapsado ? 'sidebar-colapsado' : ''}`}>
      {/* 1. SIDEBAR (Solo visible en PC) */}
      <aside className="estudiante-sidebar">
        <header className="sidebar-header">
          <div className="sidebar-logo-container">
            <svg className="sidebar-logo" viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
            {!sidebarColapsado && <span className="sidebar-brand">Academia</span>}
          </div>
        </header>

        <nav className="sidebar-menu">
          {itemsMenu.map(item => (
            <button 
              key={item.id}
              className={`sidebar-item ${tabActiva === item.id ? 'activo' : ''}`}
              onClick={() => setTabActiva(item.id)}
              title={sidebarColapsado ? item.label : undefined}
            >
              {item.icono}
              {!sidebarColapsado && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <footer className="sidebar-footer">
          {!sidebarColapsado && (
            <div className="sidebar-user">
              <span className="user-email">{usuario.email}</span>
              <span className="user-role">{t('estudiante')}</span>
            </div>
          )}

          {/* Selector de idioma en el sidebar */}
          <div className={`sidebar-idioma-selector ${sidebarColapsado ? 'colapsado' : ''}`}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="sidebar-globe-icono" title={t('idioma')}>
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {!sidebarColapsado && <span className="idioma-label">{t('idioma')}:</span>}
            <select value={idioma} onChange={(e) => cambiarIdioma(e.target.value)} className="sidebar-idioma-select" aria-label="Cambiar idioma">
              <option value="es">{sidebarColapsado ? 'ES' : 'Español'}</option>
              <option value="en">{sidebarColapsado ? 'EN' : 'Inglés'}</option>
              <option value="pt">{sidebarColapsado ? 'PT' : 'Portugués'}</option>
              <option value="it">{sidebarColapsado ? 'IT' : 'Italiano'}</option>
              <option value="fr">{sidebarColapsado ? 'FR' : 'Francés'}</option>
            </select>
          </div>
          
          {/* Contenedor de botones de acción agrupados y compactos */}
          <div className={`sidebar-footer-acciones ${sidebarColapsado ? 'colapsado' : ''}`}>
            <button 
              className="btn-colapsar-sidebar" 
              onClick={() => setSidebarColapsado(!sidebarColapsado)}
              title={sidebarColapsado ? t('expandirMenu') : t('contraerMenu')}
              aria-label="Colapsar barra lateral"
            >
              {sidebarColapsado ? (
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              )}
            </button>

            <button className="btn-logout" onClick={alCerrarSesion} title={sidebarColapsado ? t('cerrarSesion') : undefined}>
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              {!sidebarColapsado && <span>{t('cerrarSesion')}</span>}
            </button>
          </div>
        </footer>
      </aside>

      {/* 2. RENDER PRINCIPAL (Escritorio + Móvil) */}
      <main className="estudiante-main">
        {/* Cabecera Móvil (Sticky con botón Hamburguesa) */}
        <header className="main-header">
          <button 
            className="btn-hamburguesa" 
            onClick={() => setMenuMovilAbierto(true)}
            aria-label="Abrir menú"
          >
            <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="2.5" fill="none">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          
          <div className="header-institucional-logos-movil" style={{ display: 'flex', justifyContent: 'space-between', flex: 1, marginLeft: '16px' }}>
            <img src="/unan_logo.webp" alt="UNAN" className="header-inst-logo-movil" />
            <img src="/setec_logo.webp" alt="SETEC" className="header-inst-logo-movil" />
          </div>
        </header>

        {/* Contenido de la pestaña activa */}
        <div className="main-content">
          {renderizarContenido()}
        </div>
      </main>

      {/* 3. MENÚ DE HAMBURGUESA DESLIZANTE (Solo móvil) */}
      {menuMovilAbierto && (
        <div className="mobile-menu-overlay" onClick={() => setMenuMovilAbierto(false)}>
          <aside className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <header className="drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="var(--color-celeste)" strokeWidth="2.5" fill="none">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                </svg>
                <span className="drawer-brand">{t('menu')}</span>
              </div>
              
              <button 
                className="btn-cerrar-drawer" 
                onClick={() => setMenuMovilAbierto(false)}
                aria-label={t('cerrarMenu')}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>

            <nav className="drawer-menu">
              {itemsMenu.map(item => (
                <button 
                  key={item.id}
                  className={`drawer-item ${tabActiva === item.id ? 'activo' : ''}`}
                  onClick={() => {
                    setTabActiva(item.id);
                    setMenuMovilAbierto(false);
                  }}
                >
                  {item.icono}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <footer className="drawer-footer">
              <div className="sidebar-user" style={{ paddingLeft: 0 }}>
                <span className="user-email">{usuario.email}</span>
                <span className="user-role">{t('estudiante')}</span>
              </div>

              {/* Selector de idioma en el Mobile Drawer */}
              <div className="drawer-idioma-selector">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="drawer-globe-icono">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className="idioma-label">{t('idioma')}:</span>
                <select value={idioma} onChange={(e) => cambiarIdioma(e.target.value)} className="drawer-idioma-select" aria-label="Cambiar idioma">
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                  <option value="pt">Portugués</option>
                  <option value="it">Italiano</option>
                  <option value="fr">Francés</option>
                </select>
              </div>

              <button 
                className="btn-logout" 
                onClick={() => {
                  setMenuMovilAbierto(false);
                  alCerrarSesion();
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>{t('cerrarSesion')}</span>
              </button>
            </footer>
          </aside>
        </div>
      )}
    </div>
  );
}
