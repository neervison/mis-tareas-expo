// ============================================================
// CONSTANTES: límites de la aplicación
// ------------------------------------------------------------
// Buena práctica aplicada: NADA DE "NÚMEROS MÁGICOS". Los
// valores que podrían cambiar (cuánto texto acepta cada campo)
// se definen UNA vez, con nombre, y el resto del código los
// importa. Si mañana el título aceptara más letras, se cambia
// solo aquí.
//
// Estos límites se APLICAN de verdad: el formulario los usa
// como maxLength de cada TextInput, para que ningún campo
// reciba un texto desmedido que rompa el diseño de la lista.
// ============================================================

/** Máximo de caracteres del título de una tarea. */
export const LARGO_MAX_TITULO = 80;

/** Máximo de caracteres de la descripción de una tarea. */
export const LARGO_MAX_DESCRIPCION = 240;
