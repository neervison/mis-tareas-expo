// ============================================================
// TOKENS DE DISEÑO: espaciados y radios
// ------------------------------------------------------------
// Buena práctica aplicada: TOKENS DE DISEÑO. Las medidas de la
// interfaz no se escriben "sueltas" en cada componente: viven
// aquí, con nombre, y todos los componentes las consumen.
// Así el ritmo visual es consistente y un cambio de medida se
// hace en UN solo lugar.
//
// RITMO: los espaciados son múltiplos de 8 (con un paso chico
// de 4 para ajustes finos), como recomiendan las guías de
// diseño móvil (Material Design usa la misma retícula de 8).
// ============================================================

/** Escala de espaciados con ritmo constante (márgenes y rellenos). */
export const espaciados = {
  /** 4 px: ajustes finos (ej.: separación pequeña entre textos). */
  xs: 4,
  /** 8 px: separación básica entre elementos cercanos. */
  sm: 8,
  /** 16 px: relleno estándar de tarjetas y de la pantalla. */
  md: 16,
  /** 24 px: relleno amplio (encabezado) y separaciones de sección. */
  lg: 24,
  /** 32 px: separación grande (ej.: aire bajo la lista). */
  xl: 32,
};

/** Radios de borde reutilizables (qué tan redondeadas son las esquinas). */
export const radios = {
  /** 12 px: inputs y botones. */
  md: 12,
  /** 16 px: tarjetas y encabezado. */
  lg: 16,
};
