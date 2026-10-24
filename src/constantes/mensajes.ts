// ============================================================
// CONSTANTES: textos dinámicos de la interfaz
// ------------------------------------------------------------
// Buena práctica aplicada: los textos que cambian según el
// estado de la app (saludo según la hora, mensaje según el
// progreso, mensajes de lista vacía según el filtro) viven en
// UN solo lugar, con nombre, y los componentes solo los PIDEN.
// Así ningún texto importante queda "suelto" dentro de un
// componente y cambiar una frase es tocar solo este archivo.
//
// ICONOS PROFESIONALES, NO EMOTICONES (decisión del usuario):
// la interfaz usa iconos vectoriales de Ionicons
// (@expo/vector-icons), con nombre desde aquí cuando el icono
// depende del estado (saludo, vacío). El icono ACOMPAÑA al
// texto: la palabra siempre comunica la acción o el estado,
// así la interfaz se mantiene clara y accesible.
// ============================================================

import { FiltroTareas } from '../modelos/tarea';

/** Saludo + nombre de icono Ionicons según la hora del día. */
export interface Saludo {
  texto: string;
  /** Nombre del icono Ionicons que acompaña al saludo. */
  icono: 'sunny-outline' | 'partly-sunny-outline' | 'moon-outline';
}

/**
 * Devuelve el saludo que corresponde a la hora actual:
 * mañana (sol), tarde (sol entre nubes) o noche (luna).
 * Se calcula con `new Date()` cada vez que el encabezado
 * se dibuja.
 */
export function saludoSegunHora(hora: number = new Date().getHours()): Saludo {
  if (hora < 12) return { texto: 'Buenos días', icono: 'sunny-outline' };
  if (hora < 20) return { texto: 'Buenas tardes', icono: 'partly-sunny-outline' };
  return { texto: 'Buenas noches', icono: 'moon-outline' };
}

/**
 * Mensaje motivacional según el porcentaje de avance:
 * - 0%: invitar a partir.
 * - entre 1% y 99%: animar.
 * - 100%: celebrar (la mascota y el icono de trofeo refuerzan).
 * Es una función PURA (mismo porcentaje → mismo mensaje):
 * se puede probar sola, sin pantalla.
 */
export function mensajeSegunProgreso(porcentaje: number): string {
  if (porcentaje >= 100) return '¡Todo listo! ¡Completaste todas tus tareas!';
  if (porcentaje > 0) return '¡Vas muy bien! Sigue así';
  return '¡Parte con tu primera tarea!';
}

/** Mensaje de la lista vacía según el filtro activo. */
export interface MensajeVacio {
  /** Nombre del icono Ionicons grande que acompaña al mensaje. */
  icono: 'leaf-outline' | 'trophy-outline' | 'time-outline';
  titulo: string;
  texto: string;
}

/**
 * La lista puede verse vacía por tres motivos distintos y cada
 * uno merece su propio mensaje (con su icono):
 * - 'todas': todavía no existe ninguna tarea.
 * - 'pendientes': no queda nada pendiente (¡todo completo!).
 * - 'completadas': aún no se completa ninguna.
 */
export const MENSAJES_VACIO: Record<FiltroTareas, MensajeVacio> = {
  todas: {
    icono: 'leaf-outline',
    titulo: 'No tienes tareas todavía',
    texto: 'Escribe tu primera tarea en el formulario de arriba y toca «Guardar tarea».',
  },
  pendientes: {
    icono: 'trophy-outline',
    titulo: '¡No te queda nada pendiente!',
    texto: 'Completaste todas tus tareas. ¡Buen trabajo! Revisa la pestaña de completadas.',
  },
  completadas: {
    icono: 'time-outline',
    titulo: 'Aún no completas ninguna tarea',
    texto: 'Toca el círculo de una tarea de la lista para marcarla como completada.',
  },
};
