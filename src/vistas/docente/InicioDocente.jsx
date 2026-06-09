import React from 'react';
import { useIdioma } from '../../contextos/IdiomaContexto';

/**
 * InicioDocente — Dashboard principal del docente con métricas y accesos rápidos.
 */
export default function InicioDocente({ usuario, alCambiarTab }) {
  const { t } = useIdioma();

  const metricas = [
    {
      valor: '47',
      label: t('totalAlumnos'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      valor: '3',
      label: t('clasesActivas'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
          <rect x="3" y="3" width="18" height="12" rx="2" />
          <path d="M9 21h6" />
          <path d="M12 15v6" />
        </svg>
      ),
    },
    {
      valor: '12',
      label: t('tareasPorCalificar'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      valor: 'Hoy 18:00',
      label: t('proximaClase'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  const gruposAsignados = [
    { id: 1, nombre: 'Inglés Avanzado – C1', alumnos: 18, horario: 'Lun / Mier 18:00', codigo: 'ENG-C1', progreso: 72 },
    { id: 2, nombre: 'Conversación de Negocios – B2', alumnos: 12, horario: 'Mar / Jue 19:30', codigo: 'ENG-BUS', progreso: 55 },
    { id: 3, nombre: 'Francés Básico – A1', alumnos: 17, horario: 'Vie 17:00', codigo: 'FRA-A1', progreso: 40 },
  ];

  const accesosRapidos = [
    {
      label: t('publicarRecurso'),
      tab: 'contenido',
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
    },
    {
      label: t('crearActividad'),
      tab: 'actividades',
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      ),
    },
    {
      label: t('revisarEntregas'),
      tab: 'calificaciones',
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
    {
      label: t('agendarClase'),
      tab: 'comunicacion',
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Banner institucional — idéntico al del estudiante, solo en PC */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: '16px 24px',
        backgroundColor: 'var(--color-tarjeta, #ffffff)',
        borderRadius: '16px',
        border: '2px solid var(--color-borde, #e2e8f0)',
      }}
        className="doc-banner-inst"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/unan_logo.webp" alt="UNAN" style={{ height: '38px', objectFit: 'contain' }} />
          <span style={{ fontSize: '13px', fontWeight: '800', color: '#475569' }}>UNAN-MANAGUA</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/setec_logo.webp" alt="SETEC" style={{ height: '38px', objectFit: 'contain' }} />
        </div>
      </div>

      <div className="doc-bienvenida-banner">
        <p className="doc-bienvenida-titulo">
          {t('bienvenidoDocente')} 👋
        </p>
        <p className="doc-bienvenida-sub">{t('bienvenidaDocenteSub')}</p>
      </div>

      {/* Métricas rápidas */}
      <div className="doc-grid-metricas">
        {metricas.map((m, i) => (
          <div key={i} className="doc-metrica-card">
            <div className="doc-metrica-icono">{m.icono}</div>
            <div className="doc-metrica-valor">{m.valor}</div>
            <div className="doc-metrica-label">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Accesos rápidos */}
      <div className="doc-seccion-card">
        <div className="doc-seccion-header">
          <h3 className="doc-seccion-titulo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            {t('accesosRapidos')}
          </h3>
        </div>
        <div className="doc-accesos-grid">
          {accesosRapidos.map((acc, i) => (
            <button
              key={i}
              className="doc-acceso-btn"
              onClick={() => alCambiarTab(acc.tab)}
            >
              {acc.icono}
              {acc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grupos asignados */}
      <div className="doc-seccion-card">
        <div className="doc-seccion-header">
          <h3 className="doc-seccion-titulo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {t('gruposAsignados')}
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {gruposAsignados.map(grupo => (
            <div key={grupo.id} className="doc-clase-card">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ paddingLeft: '12px' }}>
                  <span className="doc-badge doc-badge-teal" style={{ marginBottom: '6px', display: 'inline-block' }}>
                    {grupo.codigo}
                  </span>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-texto, #0f172a)', margin: '0 0 4px' }}>
                    {grupo.nombre}
                  </h4>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '13px', color: 'var(--color-secundario, #64748b)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                      {grupo.alumnos} {t('alumnosInscritos')}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--color-secundario, #64748b)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {grupo.horario}
                    </span>
                  </div>
                </div>

                <button
                  className="doc-btn-primario"
                  onClick={() => alCambiarTab('contenido')}
                  style={{ fontSize: '13px', padding: '8px 14px' }}
                >
                  {t('administrarAula')}
                </button>
              </div>

              {/* Barra de progreso */}
              <div style={{ paddingLeft: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-secundario, #64748b)' }}>{t('avanceCiclo')}</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--doc-primario)' }}>{grupo.progreso}%</span>
                </div>
                <div className="doc-barra-progreso">
                  <div className="doc-barra-progreso-fill" style={{ width: `${grupo.progreso}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
