import React, { useState } from 'react';
import { useIdioma } from '../../contextos/IdiomaContexto';

const datosGrupales = {
  'ENG-C1': [
    { semana: 'S1', promedio: 72 }, { semana: 'S2', promedio: 78 }, { semana: 'S3', promedio: 75 },
    { semana: 'S4', promedio: 82 }, { semana: 'S5', promedio: 85 }, { semana: 'S6', promedio: 88 },
  ],
  'ENG-BUS': [
    { semana: 'S1', promedio: 60 }, { semana: 'S2', promedio: 65 }, { semana: 'S3', promedio: 63 },
    { semana: 'S4', promedio: 70 }, { semana: 'S5', promedio: 68 }, { semana: 'S6', promedio: 74 },
  ],
  'FRA-A1': [
    { semana: 'S1', promedio: 50 }, { semana: 'S2', promedio: 55 }, { semana: 'S3', promedio: 58 },
    { semana: 'S4', promedio: 60 }, { semana: 'S5', promedio: 62 }, { semana: 'S6', promedio: 65 },
  ],
};

const estudiantesData = {
  'ENG-C1': [
    { nombre: 'Ana García', promedio: 91, entregas: 5, tendencia: 'alza' },
    { nombre: 'Luis Hernández', promedio: 82, entregas: 5, tendencia: 'alza' },
    { nombre: 'Jimena Vargas', promedio: 75, entregas: 4, tendencia: 'estable' },
    { nombre: 'Roberto Soto', promedio: 68, entregas: 3, tendencia: 'baja' },
    { nombre: 'Carolina Ruiz', promedio: 88, entregas: 5, tendencia: 'alza' },
  ],
  'ENG-BUS': [
    { nombre: 'Carlos Mendoza', promedio: 74, entregas: 4, tendencia: 'alza' },
    { nombre: 'Sofía Torres', promedio: 80, entregas: 4, tendencia: 'alza' },
    { nombre: 'Andrés Mora', promedio: 60, entregas: 3, tendencia: 'estable' },
    { nombre: 'Daniela Cruz', promedio: 55, entregas: 2, tendencia: 'baja' },
  ],
  'FRA-A1': [
    { nombre: 'Pedro Ramírez', promedio: 45, entregas: 3, tendencia: 'baja' },
    { nombre: 'Valeria Pérez', promedio: 68, entregas: 5, tendencia: 'alza' },
    { nombre: 'Nicolás Gómez', promedio: 72, entregas: 5, tendencia: 'alza' },
  ],
};

export default function AnaliticasDocente() {
  const { t } = useIdioma();
  const [grupoSel, setGrupoSel] = useState('ENG-C1');
  const [periodo, setPeriodo] = useState('semestre');

  const datos = datosGrupales[grupoSel] || [];
  const estudiantes = estudiantesData[grupoSel] || [];

  const maxBar = Math.max(...datos.map(d => d.promedio), 1);
  const promedio = Math.round(datos.reduce((acc, d) => acc + d.promedio, 0) / (datos.length || 1));
  const mejorPuntaje = Math.max(...estudiantes.map(e => e.promedio));
  const peorPuntaje = Math.min(...estudiantes.map(e => e.promedio));
  const tasaEntrega = Math.round(
    (estudiantes.reduce((acc, e) => acc + e.entregas, 0) / (estudiantes.length * 5)) * 100
  );

  const tendenciaIcon = (t_val) => {
    if (t_val === 'alza') return { emoji: '↑', clase: 'doc-badge-verde' };
    if (t_val === 'baja') return { emoji: '↓', clase: 'doc-badge-rojo' };
    return { emoji: '→', clase: 'doc-badge-gris' };
  };

  const tendenciaLabel = (t_val) => {
    if (t_val === 'alza') return t('tendenciaAlza');
    if (t_val === 'baja') return t('tendenciaBaja');
    return t('tendenciaEstable');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--color-texto, #0f172a)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--doc-primario)" strokeWidth="2.5" width="24" height="24">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          {t('analiticasTitulo')}
        </h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <select className="doc-select" style={{ width: 'auto', minWidth: '180px' }} value={grupoSel} onChange={e => setGrupoSel(e.target.value)}>
            <option value="ENG-C1">Inglés Avanzado – C1</option>
            <option value="ENG-BUS">Conversación de Negocios – B2</option>
            <option value="FRA-A1">Francés Básico – A1</option>
          </select>
          <select className="doc-select" style={{ width: 'auto', minWidth: '150px' }} value={periodo} onChange={e => setPeriodo(e.target.value)}>
            <option value="7d">{t('periodo7dias')}</option>
            <option value="30d">{t('periodo30dias')}</option>
            <option value="semestre">{t('periodoSemestre')}</option>
          </select>
        </div>
      </div>

      {/* Métricas resumen */}
      <div className="doc-grid-metricas">
        {[
          { valor: `${promedio}%`, label: t('promedioGrupo'), color: 'var(--doc-primario)' },
          { valor: `${mejorPuntaje}%`, label: t('mejorPuntaje'), color: '#059669' },
          { valor: `${peorPuntaje}%`, label: t('peorPuntaje'), color: '#dc2626' },
          { valor: `${tasaEntrega}%`, label: t('tasaEntrega'), color: '#d97706' },
        ].map((m, i) => (
          <div key={i} className="doc-metrica-card" style={{ textAlign: 'center' }}>
            <div className="doc-metrica-valor" style={{ color: m.color, fontSize: '26px' }}>{m.valor}</div>
            <div className="doc-metrica-label">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Gráfico de rendimiento grupal */}
      <div className="doc-seccion-card">
        <div className="doc-seccion-header">
          <h3 className="doc-seccion-titulo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            {t('rendimientoGrupal')} — {grupoSel}
          </h3>
        </div>

        {/* Gráfico de barras CSS */}
        <div style={{ padding: '8px 0' }}>
          <div className="doc-grafico-barras">
            {datos.map((d, i) => (
              <div key={i} className="doc-barra-col">
                <span className="doc-barra-valor">{d.promedio}%</span>
                <div
                  className="doc-barra-fill"
                  style={{ height: `${(d.promedio / maxBar) * 100}%` }}
                />
                <span className="doc-barra-label">{d.semana}</span>
              </div>
            ))}
          </div>

          {/* Línea de referencia del 70% */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(13,148,136,0.2)', borderTop: '1.5px dashed var(--doc-primario)' }} />
            <span style={{ fontSize: '11px', color: 'var(--doc-primario)', fontWeight: '700', whiteSpace: 'nowrap' }}>70% umbral</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(13,148,136,0.2)', borderTop: '1.5px dashed var(--doc-primario)' }} />
          </div>
        </div>
      </div>

      {/* Tabla de progreso individual */}
      <div className="doc-seccion-card">
        <div className="doc-seccion-header">
          <h3 className="doc-seccion-titulo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {t('progresoIndividual')}
          </h3>
          <span className="doc-badge doc-badge-teal">{estudiantes.length} {t('alumnosInscritos')}</span>
        </div>

        <div className="doc-tabla-contenedor">
          <table className="doc-tabla">
            <thead>
              <tr>
                <th>{t('estudianteCol')}</th>
                <th>{t('promedioCol')}</th>
                <th>{t('entregasCol')}</th>
                <th>{t('tendencia')}</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((est, i) => {
                const { emoji, clase } = tendenciaIcon(est.tendencia);
                return (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '50%',
                          background: 'var(--doc-gradiente)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: '700', fontSize: '13px', color: '#fff', flexShrink: 0,
                        }}>
                          {est.nombre.charAt(0)}
                        </div>
                        <span style={{ fontWeight: '600', fontSize: '14px' }}>{est.nombre}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="doc-barra-progreso" style={{ width: '80px' }}>
                          <div className="doc-barra-progreso-fill" style={{ width: `${est.promedio}%` }} />
                        </div>
                        <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--doc-primario)' }}>
                          {est.promedio}%
                        </span>
                      </div>
                    </td>
                    <td style={{ fontWeight: '600', textAlign: 'center' }}>
                      {est.entregas}/5
                    </td>
                    <td>
                      <span className={`doc-badge ${clase}`}>
                        {emoji} {tendenciaLabel(est.tendencia)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
