import React, { createContext, useContext, useState } from 'react';
import { traducciones } from '../utilidades/traducciones';

const IdiomaContext = createContext();

export function IdiomaProvider({ children }) {
  // Inicializar idioma desde localStorage o usar 'en' por defecto
  const [idioma, setIdioma] = useState(() => {
    return localStorage.getItem('pwa_idioma') || 'en';
  });

  // Cambiar idioma y guardarlo en localStorage
  const cambiarIdioma = (nuevoIdioma) => {
    setIdioma(nuevoIdioma);
    localStorage.setItem('pwa_idioma', nuevoIdioma);
  };

  // Función de traducción
  const t = (clave) => {
    return traducciones[idioma]?.[clave] || clave;
  };

  return (
    <IdiomaContext.Provider value={{ idioma, cambiarIdioma, t }}>
      {children}
    </IdiomaContext.Provider>
  );
}

export const useIdioma = () => useContext(IdiomaContext);
