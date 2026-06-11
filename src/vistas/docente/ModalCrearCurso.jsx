import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/client';
import { useIdioma } from '../../contextos/IdiomaContexto';

const SelectorScrolleable = ({ opciones, valor, onChange, placeholder }) => {
  const [abierto, setAbierto] = useState(false);
  
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {abierto && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9 }} 
          onClick={() => setAbierto(false)}
        />
      )}
      
      <div 
        className="doc-input" 
        style={{ 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '12px 16px',
          background: abierto ? '#f8fafc' : '#fff',
          borderColor: abierto ? 'var(--doc-primario)' : '#cbd5e1',
          minHeight: '44px',
          boxSizing: 'border-box'
        }}
        onClick={() => setAbierto(!abierto)}
      >
        <span style={{ color: valor ? '#0f172a' : '#94a3b8' }}>
          {valor ? opciones.find(o => o.value === valor)?.label : placeholder}
        </span>
      </div>

      {abierto && (
        <div style={{ 
          position: 'absolute', 
          top: 'calc(100% + 4px)', 
          left: '50%', 
          transform: 'translateX(-50%)',
          minWidth: '100%',
          zIndex: 10,
          background: '#fff', 
          border: '2px solid #e2e8f0', 
          borderRadius: '16px',
          maxHeight: '220px', 
          overflowY: 'auto',
          overflowX: 'hidden', 
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
          padding: '8px 0'
        }}>
          {opciones.map(opt => (
            <div 
              key={opt.value} 
              onClick={() => { onChange(opt.value); setAbierto(false); }}
              style={{ 
                padding: '12px', 
                textAlign: 'center', 
                cursor: 'pointer',
                background: opt.value === valor ? 'var(--doc-primario-light)' : 'transparent',
                color: opt.value === valor ? 'var(--doc-primario)' : '#475569',
                fontWeight: opt.value === valor ? '700' : '500'
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function ModalCrearCurso({ onClose, onCursoCreado, docenteId, cursoAEditar = null }) {
  const { t } = useIdioma();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [paso, setPaso] = useState(1);

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [sede, setSede] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  // Fecha
  const [diaInicio, setDiaInicio] = useState('');
  const [mesInicio, setMesInicio] = useState('');
  const [anioInicio, setAnioInicio] = useState('');
  
  const [diasSeleccionados, setDiasSeleccionados] = useState([]);
  
  // Hora Inicio
  const [hInicioHora, setHInicioHora] = useState('');
  const [hInicioMinuto, setHInicioMinuto] = useState('');
  const [hInicioAmPm, setHInicioAmPm] = useState('AM');

  // Hora Fin
  const [hFinHora, setHFinHora] = useState('');
  const [hFinMinuto, setHFinMinuto] = useState('');
  const [hFinAmPm, setHFinAmPm] = useState('AM');

  const [cuposMaximos, setCuposMaximos] = useState('');
  const [infoHorario, setInfoHorario] = useState('');
  const [infoMatricula, setInfoMatricula] = useState('');

  // Listas Dinámicas
  const [requisitoInput, setRequisitoInput] = useState('');
  const [requisitos, setRequisitos] = useState([]);
  
  const [incluyeInput, setIncluyeInput] = useState('');
  const [incluye, setIncluye] = useState([]);

  const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // Cargar datos si estamos en modo edición
  useEffect(() => {
    if (cursoAEditar) {
      setNombre(cursoAEditar.nombre || '');
      setSede(cursoAEditar.sede || '');
      setDescripcion(cursoAEditar.descripcion || '');
      setCuposMaximos(cursoAEditar.cupos_maximos?.toString() || '');
      
      try {
        if (cursoAEditar.requisitos) setRequisitos(JSON.parse(cursoAEditar.requisitos));
        if (cursoAEditar.incluye) setIncluye(JSON.parse(cursoAEditar.incluye));
      } catch (e) { console.error("Error parseando requisitos/incluye", e); }

      // Fetch horarios antiguos
      const fetchHorarios = async () => {
        const { data, error } = await supabase.from('horarios_cursos').select('*').eq('curso_id', cursoAEditar.id);
        if (!error && data && data.length > 0) {
          const [yyyy, mm, dd] = data[0].fecha_inicio.split('-');
          setAnioInicio(yyyy);
          setMesInicio(mm);
          setDiaInicio(parseInt(dd, 10).toString());

          setDiasSeleccionados(data.map(d => d.dia_semana));

          const parseTime = (timeStr) => {
            let [h, m] = timeStr.split(':');
            let hour = parseInt(h, 10);
            let ampm = 'AM';
            if (hour >= 12) {
              ampm = 'PM';
              if (hour > 12) hour -= 12;
            }
            if (hour === 0) hour = 12;
            return { hour: hour.toString(), min: m, ampm };
          };

          const inicio = parseTime(data[0].hora_inicio);
          setHInicioHora(inicio.hour);
          setHInicioMinuto(inicio.min);
          setHInicioAmPm(inicio.ampm);

          const fin = parseTime(data[0].hora_fin);
          setHFinHora(fin.hour);
          setHFinMinuto(fin.min);
          setHFinAmPm(fin.ampm);
        }
      };
      fetchHorarios();
    }
  }, [cursoAEditar]);

  // Manejo de Días
  const toggleDia = (dia) => {
    if (diasSeleccionados.includes(dia)) {
      setDiasSeleccionados(diasSeleccionados.filter(d => d !== dia));
    } else {
      setDiasSeleccionados([...diasSeleccionados, dia]);
    }
  };

  // Manejo de Listas
  const agregarRequisito = (e) => {
    e.preventDefault();
    if (requisitoInput.trim() !== '') {
      setRequisitos([...requisitos, requisitoInput.trim()]);
      setRequisitoInput('');
    }
  };
  
  const eliminarRequisito = (index) => {
    setRequisitos(requisitos.filter((_, i) => i !== index));
  };

  const agregarIncluye = (e) => {
    e.preventDefault();
    if (incluyeInput.trim() !== '') {
      setIncluye([...incluye, incluyeInput.trim()]);
      setIncluyeInput('');
    }
  };

  const eliminarIncluye = (index) => {
    setIncluye(incluye.filter((_, i) => i !== index));
  };

  const manejarSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // Si hay texto pendiente en los inputs, lo agregamos antes de guardar
    let reqFinales = requisitos;
    if (requisitoInput.trim() !== '') {
      reqFinales = [...requisitos, requisitoInput.trim()];
      setRequisitos(reqFinales);
      setRequisitoInput('');
    }

    let incFinales = incluye;
    if (incluyeInput.trim() !== '') {
      incFinales = [...incluye, incluyeInput.trim()];
      setIncluye(incFinales);
      setIncluyeInput('');
    }

    if (!nombre || !descripcion || !sede || !diaInicio || !mesInicio || !anioInicio || diasSeleccionados.length === 0 || !hInicioHora || !hFinHora || !cuposMaximos) {
      setError('Por favor, completa todos los campos principales (Nombre, Descripción, Sede, Fecha, Días, Horario y Cupos).');
      return;
    }

    const fechaFormat = `${anioInicio}-${mesInicio}-${diaInicio.toString().padStart(2, '0')}`;
    
    const formatTime24 = (h, m, ampm) => {
      let hour = parseInt(h || 0, 10);
      let min = parseInt(m || 0, 10);
      if (ampm === 'PM' && hour < 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;
      return `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:00`;
    };

    const horaInicioDb = formatTime24(hInicioHora, hInicioMinuto, hInicioAmPm);
    const horaFinDb = formatTime24(hFinHora, hFinMinuto, hFinAmPm);

    setCargando(true);
    setError(null);

    try {
      let cursoGuardadoId = null;
      let cursoGuardadoData = null;

      if (cursoAEditar) {
        // UPDATE
        const { data: cursoData, error: cursoError } = await supabase.from('cursos').update({
          nombre: nombre,
          descripcion: descripcion,
          sede: sede,
          requisitos: JSON.stringify(reqFinales),
          incluye: JSON.stringify(incFinales),
          cupos_maximos: parseInt(cuposMaximos, 10)
        }).eq('id', cursoAEditar.id).select();

        if (cursoError) throw cursoError;
        
        cursoGuardadoId = cursoAEditar.id;
        cursoGuardadoData = cursoData[0];

        // Borrar horarios antiguos antes de insertar los nuevos
        await supabase.from('horarios_cursos').delete().eq('curso_id', cursoAEditar.id);
        
      } else {
        // INSERT
        const { data: cursoData, error: cursoError } = await supabase.from('cursos').insert([{
          docente_id: docenteId,
          nombre: nombre,
          descripcion: descripcion,
          idioma: 'Español',
          nivel: 'Básico',
          sede: sede,
          requisitos: JSON.stringify(reqFinales),
          incluye: JSON.stringify(incFinales),
          cupos_maximos: parseInt(cuposMaximos, 10),
          estado: 'publicado'
        }]).select();

        if (cursoError) throw cursoError;

        cursoGuardadoId = cursoData[0].id;
        cursoGuardadoData = cursoData[0];
      }

      // 2. Insertar los horarios en 'horarios_cursos'
      const horarios = diasSeleccionados.map(dia => ({
        curso_id: cursoGuardadoId,
        fecha_inicio: fechaFormat,
        dia_semana: dia,
        hora_inicio: horaInicioDb,
        hora_fin: horaFinDb
      }));

      const { error: scheduleError } = await supabase.from('horarios_cursos').insert(horarios);

      if (scheduleError) {
        console.error("Error al guardar horarios:", scheduleError);
        throw new Error("El curso se guardó, pero falló al guardar los horarios.");
      }

      onCursoCreado(cursoGuardadoData);
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al guardar el curso: ' + err.message);
    } finally {
      setCargando(false);
    }
  };

  const avanzarPaso = () => {
    if (paso === 1) {
      if (!nombre || !descripcion || !sede || !cuposMaximos) {
        setError('Por favor completa el Nombre, Descripción, Sede y Cupos Máximos.');
        return;
      }
    }
    if (paso === 2) {
      if (!diaInicio || !mesInicio || !anioInicio || diasSeleccionados.length === 0 || !hInicioHora || !hFinHora || hInicioMinuto === '' || hFinMinuto === '') {
        setError('Por favor completa todos los campos de la Fecha, Días y las Horas/Minutos.');
        return;
      }

      const dia = parseInt(diaInicio, 10);
      if (dia < 1 || dia > 31) {
        setError('El Día de inicio debe estar entre 1 y 31.');
        return;
      }

      const hIni = parseInt(hInicioHora, 10);
      const mIni = parseInt(hInicioMinuto, 10);
      if (hIni < 1 || hIni > 12) {
        setError('La Hora de inicio debe estar entre 1 y 12.');
        return;
      }
      if (mIni < 0 || mIni > 59) {
        setError('Los Minutos de inicio deben estar entre 0 y 59.');
        return;
      }

      const hFin = parseInt(hFinHora, 10);
      const mFin = parseInt(hFinMinuto, 10);
      if (hFin < 1 || hFin > 12) {
        setError('La Hora de fin debe estar entre 1 y 12.');
        return;
      }
      if (mFin < 0 || mFin > 59) {
        setError('Los Minutos de fin deben estar entre 0 y 59.');
        return;
      }
    }
    setError(null);
    setPaso(paso + 1);
  };

  const retrocederPaso = () => {
    setError(null);
    setPaso(paso - 1);
  };

  const manejarCambioNumerico = (valor, limite, setter) => {
    if (valor === '') return setter('');
    if (valor.length > 2) return;
    const num = parseInt(valor, 10);
    if (!isNaN(num) && num <= limite) {
      setter(valor);
    }
  };

  useEffect(() => {
    // Bloquear scroll de fondo
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="doc-modal-overlay" onClick={onClose}>
      <div className="doc-modal-contenido" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', width: '95%' }}>
        <div className="doc-modal-header">
          <h2 className="doc-modal-titulo">{cursoAEditar ? 'Editar Curso' : 'Crear Nuevo Curso'}</h2>
          <p className="doc-modal-sub">
            {cursoAEditar ? 'Modifica los detalles o el horario de tu curso.' : 'Configura tu nueva clase en 3 simples pasos.'}
          </p>
          <button className="doc-btn-cerrar-modal" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        
        <div 
          className="doc-form-wrapper"
          style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}
          onKeyDown={(e) => { 
            // Prevenir que la tecla Enter envíe o cambie de paso accidentalmente
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
              e.preventDefault();
            }
          }}
        >
          <div className="doc-modal-body" style={{ flex: 1, overflowY: 'auto' }}>
            
            {/* Indicador de Pasos */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: paso >= 1 ? 'var(--doc-primario)' : '#e2e8f0', color: paso >= 1 ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                <span style={{ fontSize: '14px', fontWeight: paso >= 1 ? '700' : '500', color: paso >= 1 ? 'var(--doc-primario)' : '#64748b' }}>Detalles</span>
              </div>
              <div style={{ width: '40px', height: '2px', background: paso >= 2 ? 'var(--doc-primario)' : '#e2e8f0' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: paso >= 2 ? 'var(--doc-primario)' : '#e2e8f0', color: paso >= 2 ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                <span style={{ fontSize: '14px', fontWeight: paso >= 2 ? '700' : '500', color: paso >= 2 ? 'var(--doc-primario)' : '#64748b' }}>Horarios</span>
              </div>
              <div style={{ width: '40px', height: '2px', background: paso >= 3 ? 'var(--doc-primario)' : '#e2e8f0' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: paso >= 3 ? 'var(--doc-primario)' : '#e2e8f0', color: paso >= 3 ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
                <span style={{ fontSize: '14px', fontWeight: paso >= 3 ? '700' : '500', color: paso >= 3 ? 'var(--doc-primario)' : '#64748b' }}>Requisitos</span>
              </div>
            </div>

            {error && (
              <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', fontWeight: 'bold' }}>
                {error}
              </div>
            )}

            {/* PASO 1 */}
            {paso === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="doc-form-row">
                  <div className="doc-form-group" style={{ flex: 2 }}>
                    <label>Nombre del Curso</label>
                    <input 
                      type="text" 
                      className="doc-input" 
                      placeholder="Nombre de Tu Curso" 
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                    />
                  </div>
                  
                  <div className="doc-form-group" style={{ flex: 1 }}>
                    <label>Cupos Máximos</label>
                    <input 
                      type="number" 
                      className="doc-input" 
                      placeholder="Ej. 25" 
                      min="1"
                      value={cuposMaximos}
                      onChange={e => setCuposMaximos(e.target.value)}
                    />
                  </div>
                </div>

                <div className="doc-form-group">
                  <label>Sede (Ubicación)</label>
                  <input 
                    type="text" 
                    className="doc-input" 
                    placeholder="Ej. Sede Managua, Recinto Rubén Darío" 
                    value={sede}
                    onChange={e => setSede(e.target.value)}
                  />
                </div>
                
                <div className="doc-form-group">
                  <label>Descripción del Curso</label>
                  <textarea 
                    className="doc-input doc-textarea" 
                    rows="3" 
                    placeholder="Describe brevemente de qué trata..."
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                  ></textarea>
                </div>
              </div>
            )}

            {/* PASO 2 */}
            {paso === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="doc-form-group">
                  <label>Fecha de Inicio</label>
                  <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                    <div style={{ flex: 1 }}>
                      <input 
                        type="number"
                        className="doc-input"
                        placeholder="Día"
                        min="1" max="31"
                        value={diaInicio}
                        onChange={e => manejarCambioNumerico(e.target.value, 31, setDiaInicio)}
                        style={{ width: '100%', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div style={{ flex: 1.2 }}>
                      <SelectorScrolleable 
                        placeholder="Mes"
                        valor={mesInicio}
                        onChange={setMesInicio}
                        opciones={['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'].map((m, i) => ({ value: (i + 1).toString().padStart(2, '0'), label: m }))}
                      />
                    </div>
                    <div style={{ flex: 1.2 }}>
                      <input 
                        type="number"
                        className="doc-input"
                        placeholder="Año"
                        value={anioInicio}
                        onChange={e => {
                          if (e.target.value.length > 4) return;
                          setAnioInicio(e.target.value);
                        }}
                        style={{ width: '100%', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="doc-form-group">
                  <label>Días de Clase</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {diasDeLaSemana.map(dia => (
                      <button
                        key={dia}
                        type="button"
                        onClick={() => toggleDia(dia)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: diasSeleccionados.includes(dia) ? '2px solid var(--doc-primario)' : '1px solid #cbd5e1',
                          background: diasSeleccionados.includes(dia) ? 'var(--doc-primario-light)' : '#f8fafc',
                          color: diasSeleccionados.includes(dia) ? 'var(--doc-primario)' : '#475569',
                          fontWeight: '600',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        {dia}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="doc-form-row">
                  <div className="doc-form-group" style={{ flex: 1 }}>
                    <label>Hora de Inicio</label>
                    <div style={{ display: 'flex', gap: '4px', width: '100%' }}>
                      <div style={{ flex: 1 }}>
                        <input 
                          type="number" className="doc-input" placeholder="Hora" 
                          min="1" max="12" value={hInicioHora} onChange={e => manejarCambioNumerico(e.target.value, 12, setHInicioHora)} 
                          style={{ width: '100%', boxSizing: 'border-box' }} 
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <input 
                          type="number" className="doc-input" placeholder="Min" 
                          min="0" max="59" value={hInicioMinuto} onChange={e => manejarCambioNumerico(e.target.value, 59, setHInicioMinuto)} 
                          style={{ width: '100%', boxSizing: 'border-box' }} 
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <SelectorScrolleable placeholder="AM/PM" valor={hInicioAmPm} onChange={setHInicioAmPm} opciones={[{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }]} />
                      </div>
                    </div>
                  </div>

                  <div className="doc-form-group" style={{ flex: 1 }}>
                    <label>Hora de Fin</label>
                    <div style={{ display: 'flex', gap: '4px', width: '100%' }}>
                      <div style={{ flex: 1 }}>
                        <input 
                          type="number" className="doc-input" placeholder="Hora" 
                          min="1" max="12" value={hFinHora} onChange={e => manejarCambioNumerico(e.target.value, 12, setHFinHora)} 
                          style={{ width: '100%', boxSizing: 'border-box' }} 
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <input 
                          type="number" className="doc-input" placeholder="Min" 
                          min="0" max="59" value={hFinMinuto} onChange={e => manejarCambioNumerico(e.target.value, 59, setHFinMinuto)} 
                          style={{ width: '100%', boxSizing: 'border-box' }} 
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <SelectorScrolleable placeholder="AM/PM" valor={hFinAmPm} onChange={setHFinAmPm} opciones={[{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }]} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="doc-form-group">
                  <label>Información Adicional del Horario (Opcional)</label>
                  <textarea 
                    className="doc-input doc-textarea" 
                    rows="2" 
                    placeholder="Ej. Los viernes terminamos 30 min antes."
                    value={infoHorario}
                    onChange={e => setInfoHorario(e.target.value)}
                  ></textarea>
                </div>
              </div>
            )}

            {/* PASO 3 */}
            {paso === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="doc-form-group">
                  <label>Requisitos Previos</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input 
                      type="text" 
                      className="doc-input" 
                      style={{ flex: 1 }}
                      placeholder="Ej. Cuaderno rayado" 
                      value={requisitoInput}
                      onChange={e => setRequisitoInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') agregarRequisito(e); }}
                    />
                    <button type="button" onClick={agregarRequisito} className="doc-btn-secundario" style={{ padding: '0 16px' }}>+</button>
                  </div>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0, fontSize: '14px', color: '#475569' }}>
                    {requisitos.map((req, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>
                        {req}
                        <button type="button" onClick={() => eliminarRequisito(i)} style={{ background: 'none', border: 'none', color: '#ef4444', marginLeft: '8px', cursor: 'pointer' }}>×</button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="doc-form-group">
                  <label>El curso incluye</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input 
                      type="text" 
                      className="doc-input" 
                      style={{ flex: 1 }}
                      placeholder="Ej. Material en PDF" 
                      value={incluyeInput}
                      onChange={e => setIncluyeInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') agregarIncluye(e); }}
                    />
                    <button type="button" onClick={agregarIncluye} className="doc-btn-secundario" style={{ padding: '0 16px' }}>+</button>
                  </div>
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px', margin: 0, fontSize: '14px', color: '#475569' }}>
                    {incluye.map((inc, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>
                        {inc}
                        <button type="button" onClick={() => eliminarIncluye(i)} style={{ background: 'none', border: 'none', color: '#ef4444', marginLeft: '8px', cursor: 'pointer' }}>×</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </div>

          <div className="doc-modal-footer">
            {paso > 1 ? (
              <button type="button" className="doc-btn-secundario" onClick={retrocederPaso}>Atrás</button>
            ) : (
              <button type="button" className="doc-btn-secundario" onClick={onClose} style={{ color: '#ef4444' }}>Cancelar</button>
            )}
            
            {paso < 3 ? (
              <button type="button" className="doc-btn-primario" onClick={avanzarPaso}>Siguiente</button>
            ) : (
              <button type="button" className="doc-btn-primario" onClick={manejarSubmit} disabled={cargando}>
                {cargando ? 'Guardando...' : (cursoAEditar ? 'Actualizar Curso' : 'Guardar Curso')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
