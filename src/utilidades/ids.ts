// ============================================================
// UTILIDAD: generación de identificadores únicos
// ------------------------------------------------------------
// Buena práctica aplicada: RESPONSABILIDAD ÚNICA. Crear ids es
// una tarea pequeña y reutilizable, por eso vive en su propio
// archivo de utilidades y NO dentro del hook de tareas: el
// hook la usa, pero no es su responsabilidad inventarla.
// ============================================================

/**
 * Genera un id único simple, sin librerías externas.
 * Combina la marca de tiempo con un tramo aleatorio en base 36:
 * alcanza de sobra para una lista local de tareas.
 */
export function generarId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
