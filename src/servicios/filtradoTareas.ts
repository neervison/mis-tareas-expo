// ============================================================
// SERVICIO: filtrado de la lista de tareas
// ------------------------------------------------------------
// Buena práctica aplicada: SEPARACIÓN DE RESPONSABILIDADES.
// Decidir QUÉ tareas se muestran según el filtro elegido
// (todas / pendientes / completadas) es una REGLA de la app,
// no un dibujo: por eso vive aquí como FUNCIÓN PURA y la
// pantalla solo la usa con useMemo.
//
// Al ser pura (mismas tareas + mismo filtro → mismo resultado,
// sin tocar el arreglo original) se puede probar sola con un
// script, igual que el servicio de validación.
// ============================================================

import { FiltroTareas, Tarea } from '../modelos/tarea';

/**
 * Devuelve un arreglo NUEVO con las tareas que corresponden al
 * filtro: 'todas' devuelve una copia completa, 'pendientes'
 * solo las no completadas y 'completadas' solo las terminadas.
 * El arreglo original nunca se modifica (estado inmutable).
 */
export function filtrarTareas(tareas: Tarea[], filtro: FiltroTareas): Tarea[] {
  if (filtro === 'pendientes') return tareas.filter((tarea) => !tarea.completada);
  if (filtro === 'completadas') return tareas.filter((tarea) => tarea.completada);
  return [...tareas];
}
