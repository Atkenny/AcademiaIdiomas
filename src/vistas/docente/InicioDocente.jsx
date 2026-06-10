import React, { useState, useEffect } from 'react';
import { useIdioma } from '../../contextos/IdiomaContexto';
import { supabase } from '../../supabase/client';
import ModalCrearCurso from './ModalCrearCurso';

/**
 * InicioDocente — Dashboard principal del docente con métricas y accesos rápidos.
 */
export default function InicioDocente({ usuario, alCambiarTab }) {
  const { t } = useIdioma();
  const [modalCrearCursoAbierto, setModalCrearCursoAbierto] = useState(false);

  const metricas = [
    {
      valor: '0',
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
      valor: '0',
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
      valor: '0',
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
      valor: '--:--',
      label: t('proximaClase'),
      icono: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  const [gruposAsignados, setGruposAsignados] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      if (!usuario || !usuario.id) return;
      const { data, error } = await supabase
        .from('cursos')
        .select('*')
        .eq('docente_id', usuario.id);
      
      if (!error && data) {
        // Formatear los datos para la tarjeta
        const formateados = data.map(curso => ({
          id: curso.id,
          nombre: curso.nombre,
          alumnos: curso.inscritos || 0,
          cupos: curso.cupos_maximos || 0,
          horario: `${curso.dias_semana ? curso.dias_semana.join('/') : ''} ${curso.hora_inicio || ''}`,
          codigo: curso.nombre.substring(0, 3).toUpperCase() + '-' + curso.id.substring(0, 4).toUpperCase(),
          progreso: 0 // Aún no implementamos progreso real
        }));
        setGruposAsignados(formateados);
      }
    };
    fetchCursos();
  }, [usuario]);

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
        className="doc-banner-inst doc-banner-pc-only"
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
          {t('bienvenidoDocente')} {usuario?.nombres ? `${usuario.nombres} ${usuario.apellidos}` : ''} 👋
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
        <div className="doc-seccion-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="doc-seccion-titulo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            {t('gruposAsignados')}
          </h3>
          <button className="doc-btn-primario" onClick={() => setModalCrearCursoAbierto(true)} style={{ padding: '8px 16px', fontSize: '14px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16" style={{ marginRight: '6px', verticalAlign: 'middle', marginTop: '-2px' }}>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {t('crearCurso') || 'Crear Curso'}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {gruposAsignados.length > 0 ? gruposAsignados.map(grupo => (
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
          )) : (
            <div style={{ padding: '32px', textAlign: 'center', color: '#64748b', fontSize: '15px' }}>
              No tienes ningún curso asignado todavía. Puedes crear uno usando el botón superior.
            </div>
          )}
        </div>
      </div>

      {/* Modal Crear Curso */}
      {modalCrearCursoAbierto && (
        <ModalCrearCurso 
          docenteId={usuario.id}
          onClose={() => setModalCrearCursoAbierto(false)}
          onCursoCreado={(nuevoCurso) => {
            setModalCrearCursoAbierto(false);
            // Formatear el nuevo curso para añadirlo a la tarjeta sin recargar la página
            const formateado = {
              id: nuevoCurso.id,
              nombre: nuevoCurso.nombre,
              alumnos: nuevoCurso.inscritos || 0,
              cupos: nuevoCurso.cupos_maximos || 0,
              horario: `${nuevoCurso.dias_semana ? nuevoCurso.dias_semana.join('/') : ''} ${nuevoCurso.hora_inicio || ''}`,
              codigo: nuevoCurso.nombre.substring(0, 3).toUpperCase() + '-' + nuevoCurso.id.substring(0, 4).toUpperCase(),
              progreso: 0
            };
            setGruposAsignados([...gruposAsignados, formateado]);
          }}
        />
      )}

    </div>
  );
}
