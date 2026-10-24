// ============================================================
// MODELO DE DATOS: Tarea
// ------------------------------------------------------------
// Patrón aplicado: SEPARACIÓN DE RESPONSABILIDADES.
// El "modelo" solo describe CÓMO ES una tarea (su forma/tipos).
// No contiene lógica ni pantallas: eso vive en el hook
// (useTareas) y en los componentes. Así cada archivo tiene
// una única responsabilidad y es fácil de explicar y mantener.
// ============================================================

export interface Tarea {
  /** Identificador único de la tarea (se genera al crearla). */
  id: string;
  /** Título obligatorio: es lo que el usuario escribe primero. */
  titulo: string;
  /** Descripción opcional con el detalle de la tarea. */
  descripcion: string;
  /** true = tarea completada (se muestra tachada); false = pendiente. */
  completada: boolean;
  /** Fecha de creación en milisegundos (Date.now()), para ordenar y mostrar. */
  fechaCreacion: number;
}

/**
 * Datos que entrega el formulario al crear o editar.
 * Es el mismo contenido que edita el usuario, sin id ni estado:
 * por eso se separa de la interfaz Tarea completa.
 */
export interface DatosTarea {
  titulo: string;
  descripcion: string;
}

/**
 * Filtro de la lista: qué grupo de tareas se está mirando.
 * Es un TIPO del modelo porque describe un estado posible de
 * los datos (no un dibujo): lo usan la pantalla, el servicio de
 * filtrado (src/servicios/filtradoTareas.ts) y los chips de
 * filtro (src/componentes/FiltrosTareas.tsx).
 */
export type FiltroTareas = 'todas' | 'pendientes' | 'completadas';
