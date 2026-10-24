// ============================================================
// TOKENS DE DISEÑO: tipografía (tamaños de fuente con nombre)
// ------------------------------------------------------------
// Buena práctica aplicada: TOKENS DE DISEÑO. En vez de repetir
// números de fuente sueltos (14, 16, 18…) en cada componente,
// se define UNA escala tipográfica con nombres según su rol.
// Eso mantiene la JERARQUÍA VISUAL: el título de la app es lo
// más grande, luego los subtítulos y después el texto común.
// ============================================================

/** Escala tipográfica de la app (tamaños en puntos). */
export const tipografia = {
  /** 13 pt: textos de ayuda chicos (mensajes de error). */
  mini: 13,
  /** 14 pt: etiquetas, descripciones y acciones de las tarjetas. */
  pequena: 14,
  /** 15 pt: textos intermedios (resumen del encabezado, check). */
  mediana: 15,
  /** 16 pt: texto principal (inputs, título de cada tarea). */
  base: 16,
  /** 18 pt: subtítulos de sección («Nueva tarea», «Lista de tareas»). */
  subtitulo: 18,
  /** 28 pt: título principal de la app («Mis tareas»). */
  titulo: 28,
  /** 44 pt: icono grande del estado vacío (Ionicons). */
  iconoGrande: 44,
};
