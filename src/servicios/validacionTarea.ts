// ============================================================
// SERVICIO: validación de los datos de una tarea
// ------------------------------------------------------------
// Buena práctica aplicada: SEPARACIÓN DE RESPONSABILIDADES.
// Antes, la regla "el título es obligatorio" vivía dentro del
// componente del formulario. Ahora vive aquí, como FUNCIONES
// PURAS (no dependen de React ni de la pantalla): reciben un
// texto y devuelven un resultado. Ventajas:
// - El formulario solo dibuja; la REGLA es del servicio.
// - La misma regla se puede probar sola, sin pantalla, y
//   reutilizar en cualquier otra pantalla que cree tareas.
//
// El servicio también NORMALIZA el texto (quita los espacios
// de los extremos, "trim") y lo usa el hook useTareas al
// guardar, para que nunca queden títulos como "  Comprar  ".
// ============================================================

/** Mensaje que se muestra cuando se intenta guardar sin título. */
export const MENSAJE_TITULO_OBLIGATORIO = 'El título es obligatorio: escribe qué tienes que hacer.';

/**
 * Quita los espacios del principio y del final de un texto.
 * Es la normalización que se aplica a título y descripción
 * antes de guardar la tarea.
 */
export function normalizarTexto(texto: string): string {
  return texto.trim();
}

/**
 * Verdadero si el título sirve para crear una tarea:
 * debe tener al menos un carácter que no sea espacio.
 */
export function esTituloValido(titulo: string): boolean {
  return normalizarTexto(titulo).length > 0;
}

/**
 * Devuelve el mensaje de error del título, o '' (vacío) si el
 * título es válido. El formulario muestra este mensaje tal cual
 * bajo el campo, así la regla y su texto viven en un solo lugar.
 */
export function validarTitulo(titulo: string): string {
  return esTituloValido(titulo) ? '' : MENSAJE_TITULO_OBLIGATORIO;
}
