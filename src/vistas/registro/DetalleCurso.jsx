import React from 'react';
import '../../estilos/Registro.css';

export default function DetalleCurso({ curso, onVolver, onMatricular }) {
  if (!curso) return null;

  return (
    <div className="registro-contenedor">
      <div className="registro-header">
        <button 
          onClick={onVolver}
          style={{ background: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '8px', border: '2px solid #e2e8f0', borderBottom: '4px solid #cbd5e1', color: '#475569', fontSize: '14px', fontWeight: '800', cursor: 'pointer', padding: '10px 16px', borderRadius: '12px', transition: 'all 0.1s', width: 'fit-content' }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderBottomWidth = '4px'; }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="15 18 9 12 15 6" /></svg>
          Volver al Catálogo
        </button>
      </div>

      <div>
        <span className="curso-idioma" style={{ display: 'inline-block', marginBottom: '8px' }}>{curso.idioma}</span>
        <h2 className="registro-titulo">{curso.nombre}</h2>
      </div>

      <div className="detalle-seccion">
        <h3>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          Descripción del Curso
        </h3>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
          Este curso está diseñado para brindarte las habilidades necesarias para comunicarte fluidamente.
          Aprenderás vocabulario, gramática y práctica conversacional.
        </p>
      </div>

      <div className="detalle-seccion">
        <h3>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          Información de Matrícula y Horario
        </h3>
        <ul className="detalle-lista">
          <li><strong>Inicio:</strong> 24 de mayo de 2026</li>
          <li><strong>Horario:</strong> Domingo (08:00 AM - 12:00 PM)</li>
          <li><strong>Cupos:</strong> 0/35 matriculados</li>
        </ul>
      </div>

      <div className="detalle-seccion">
        <h3>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Requisitos
        </h3>
        <ul className="detalle-lista" style={{ listStyleType: 'decimal' }}>
          <li>Cédula de identidad vigente</li>
          <li>Fotocopia de cédula</li>
          <li>Compromiso de asistencia</li>
        </ul>
      </div>

      <div className="detalle-seccion">
        <h3>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          El Curso Incluye
        </h3>
        <ul className="detalle-lista" style={{ listStyleType: 'decimal' }}>
          <li>Material didáctico</li>
          <li>Certificado al finalizar</li>
          <li>Acceso a plataforma virtual</li>
          <li>Biblioteca de recursos</li>
        </ul>
      </div>

      <div className="gratuito-banner">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <div>
          <div style={{ fontSize: '16px' }}>Curso Gratuito</div>
          <div style={{ fontSize: '13px', fontWeight: 'normal', marginTop: '2px' }}>Sin costo de matrícula ni mensualidad</div>
        </div>
      </div>

      <button className="btn-matricularse" onClick={onMatricular}>
        Matricularme ya
      </button>
    </div>
  );
}
