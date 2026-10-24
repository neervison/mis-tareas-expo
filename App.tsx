// ============================================================
// App.tsx — RAÍZ DE COMPOSICIÓN de la aplicación
// ------------------------------------------------------------
// Buena práctica aplicada en este archivo: App.tsx es SOLO el
// punto de entrada. No contiene lógica, ni listas, ni estilos
// de pantalla: únicamente IMPORTA y MUESTRA la pantalla
// principal (PantallaTareas, en src/pantallas/).
//
// Así, cada pieza tiene su lugar profesional:
// - La pantalla completa vive en src/pantallas/.
// - Los componentes reutilizables, en src/componentes/.
// - La lógica, en src/hooks/ y src/servicios/.
// - El modelo de datos, en src/modelos/.
//
// index.ts registra este componente con registerRootComponent
// para que Expo lo abra en Expo Go, en la web o en un emulador.
// ============================================================

import React from 'react';
import PantallaTareas from './src/pantallas/PantallaTareas';

export default function App() {
  return <PantallaTareas />;
}
