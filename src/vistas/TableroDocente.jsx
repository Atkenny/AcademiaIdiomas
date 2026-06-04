import React, { useState } from 'react';
import '../estilos/TableroDocente.css';
import { useIdioma } from '../contextos/IdiomaContexto';
import InicioDocente from './docente/InicioDocente';
import ContenidoDocente from './docente/ContenidoDocente';
import ActividadesDocente from './docente/ActividadesDocente';
import CalificacionesDocente from './docente/CalificacionesDocente';
import AnaliticasDocente from './docente/AnaliticasDocente';
import ComunicacionDocente from './docente/ComunicacionDocente';

/**
 * Componente: TableroDocente
 * Portal principal del docente con sidebar colapsable, navegación por sub-vistas
 * y soporte completo de i18n (6 idiomas).
 *
 * @param {object} usuario - Datos del usuario logueado.
 * @param {function} alCerrarSesion - Callback para salir de la cuenta.
 */
export default function TableroDocente({ usuario, alCerrarSesion }) {
  const { idioma, cambiarIdioma, t } = useIdioma();
  const [tabActiva, setTabActiva] = useState('inicio');
  const [sidebarColapsado, setSidebarColapsado] = useState(false);
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  // Renderizado condicional de sub-vistas
  const renderizarContenido = () => {
    switch (tabActiva) {
      case 'inicio':       return <InicioDocente usuario={usuario} alCambiarTab={setTabActiva} />;
      case 'contenido':    return <ContenidoDocente />;
      case 'actividades':  return <ActividadesDocente />;
      case 'calificaciones': return <CalificacionesDocente />;
      case 'analiticas':   return <AnaliticasDocente />;
      case 'comunicacion': return <ComunicacionDocente />;
      default:             return <InicioDocente usuario={usuario} alCambiarTab={setTabActiva} />;
    }
  };

  // Ítems de navegación del sidebar
  const itemsMenu = [
    {
      id: 'inicio',
      label: t('inicioDocente'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: 'contenido',
      label: t('gestionContenido'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
    },
    {
      id: 'actividades',
      label: t('actividades'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      id: 'calificaciones',
      label: t('calificaciones'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
    {
      id: 'analiticas',
      label: t('analiticas'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      id: 'comunicacion',
      label: t('comunicacion'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={`docente-layout ${sidebarColapsado ? 'sidebar-colapsado' : ''}`}>

      {/* ── 1. SIDEBAR PC ── */}
      <aside className="docente-sidebar">
        <header className="docente-sidebar-header">
          <div className="docente-sidebar-logo-container">
            <svg className="docente-sidebar-logo" viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="12" rx="2" />
              <path d="M9 21h6" />
              <path d="M12 15v6" />
            </svg>
            {!sidebarColapsado && (
              <span className="docente-sidebar-brand">{t('portalDocente')}</span>
            )}
          </div>
        </header>

        {/* Navegación */}
        <nav className="docente-sidebar-menu">
          {itemsMenu.map(item => (
            <button
              key={item.id}
              className={`docente-sidebar-item ${tabActiva === item.id ? 'activo' : ''}`}
              onClick={() => setTabActiva(item.id)}
              title={sidebarColapsado ? item.label : undefined}
            >
              {item.icono}
              {!sidebarColapsado && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer del sidebar */}
        <footer className="docente-sidebar-footer">
          {!sidebarColapsado && (
            <div className="docente-sidebar-user">
              <span className="docente-user-email">{usuario.email}</span>
              <span className="docente-user-role">{t('docente')}</span>
            </div>
          )}

          {/* Selector de idioma */}
          <div className={`docente-sidebar-idioma-selector ${sidebarColapsado ? 'colapsado' : ''}`}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="docente-sidebar-globe-icono" title={t('idioma')}>
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {!sidebarColapsado && <span className="docente-idioma-label">{t('idioma')}:</span>}
            <select value={idioma} onChange={e => cambiarIdioma(e.target.value)} className="docente-sidebar-idioma-select" aria-label="Cambiar idioma">
              <option value="es">ES</option>
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
              <option value="it">IT</option>
              <option value="ru">RU</option>
            </select>
          </div>

          {/* Botones colapsar + logout */}
          <div className={`docente-sidebar-footer-acciones ${sidebarColapsado ? 'colapsado' : ''}`}>
            <button
              className="docente-btn-colapsar"
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

            <button className="docente-btn-logout" onClick={alCerrarSesion} title={sidebarColapsado ? t('cerrarSesion') : undefined}>
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

      {/* ── 2. ÁREA PRINCIPAL ── */}
      <main className="docente-main">
        {/* Header móvil */}
        <header className="docente-main-header">
          <button
            className="docente-btn-hamburguesa"
            onClick={() => setMenuMovilAbierto(true)}
            aria-label={t('abrirMenu')}
          >
            <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="2.5" fill="none">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="docente-header-logos-movil">
            <img src="/unan_logo.webp" alt="UNAN" className="docente-header-logo-movil" />
            <img src="/setec_logo.webp" alt="SETEC" className="docente-header-logo-movil" />
          </div>
        </header>

        {/* Contenido */}
        <div className="docente-main-content">
          {renderizarContenido()}
        </div>
      </main>

      {/* ── 3. MENÚ DRAWER MÓVIL ── */}
      {menuMovilAbierto && (
        <div className="docente-mobile-overlay" onClick={() => setMenuMovilAbierto(false)}>
          <aside className="docente-mobile-drawer" onClick={e => e.stopPropagation()}>
            <header className="docente-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="var(--doc-primario)" strokeWidth="2.5" fill="none">
                  <rect x="3" y="3" width="18" height="12" rx="2" />
                  <path d="M9 21h6" />
                  <path d="M12 15v6" />
                </svg>
                <span className="docente-drawer-brand">{t('portalDocente')}</span>
              </div>
              <button
                className="docente-btn-cerrar-drawer"
                onClick={() => setMenuMovilAbierto(false)}
                aria-label={t('cerrarMenu')}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>

            <nav className="docente-drawer-menu">
              {itemsMenu.map(item => (
                <button
                  key={item.id}
                  className={`docente-drawer-item ${tabActiva === item.id ? 'activo' : ''}`}
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

            <footer className="docente-drawer-footer">
              <div className="docente-sidebar-user" style={{ paddingLeft: 0 }}>
                <span className="docente-user-email">{usuario.email}</span>
                <span className="docente-user-role">{t('docente')}</span>
              </div>

              {/* Selector de idioma en móvil */}
              <div className="docente-drawer-idioma-selector">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="docente-drawer-globe-icono">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className="docente-idioma-label">{t('idioma')}:</span>
                <select value={idioma} onChange={e => cambiarIdioma(e.target.value)} className="docente-drawer-idioma-select" aria-label="Cambiar idioma">
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="it">Italiano</option>
                  <option value="ru">Русский</option>
                </select>
              </div>

              <button
                className="docente-btn-logout"
                style={{ width: '100%', justifyContent: 'center' }}
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
