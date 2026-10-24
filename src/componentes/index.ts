// ============================================================
// COMPONENTES — punto único de importación (patrón "barrel")
// ------------------------------------------------------------
// Re-exporta todos los componentes de la carpeta para que la
// pantalla los importe en una sola línea desde '../componentes'
// y no con una ruta por cada archivo:
//
//   import { BarraProgreso, Encabezado, EstadoVacio, FiltrosTareas, FormularioTarea, TareaItem } from '../componentes';
// ============================================================

export { default as BarraProgreso } from './BarraProgreso';
export { default as Encabezado } from './Encabezado';
export { default as EstadoVacio } from './EstadoVacio';
export { default as FiltrosTareas } from './FiltrosTareas';
export { default as FormularioTarea } from './FormularioTarea';
export { default as Mascota } from './Mascota';
export { default as TareaItem } from './TareaItem';
