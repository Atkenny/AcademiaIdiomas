import React, { useState } from 'react';
import Login from './vistas/Login';
import TableroEstudiante from './vistas/TableroEstudiante';
import TableroDocente from './vistas/TableroDocente';

function App() {
  // Estado de la sesión actual: null o { email, rol }
  const [sesion, setSesion] = useState(null);

  // Renderizado condicional en base a la sesión activa (Tema Claro Único)
  if (!sesion) {
    return (
      <Login 
        alIniciarSesion={setSesion} 
      />
    );
  }

  if (sesion.rol === 'estudiante') {
    return (
      <TableroEstudiante 
        usuario={sesion} 
        alCerrarSesion={() => setSesion(null)} 
      />
    );
  }

  if (sesion.rol === 'docente') {
    return (
      <TableroDocente 
        usuario={sesion} 
        alCerrarSesion={() => setSesion(null)} 
      />
    );
  }

  return null;
}

export default App;
