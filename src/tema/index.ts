// ============================================================
// TEMA — punto único de importación (patrón "barrel")
// ------------------------------------------------------------
// Este archivo solo RE-EXPORTA los tokens del tema. Así los
// componentes importan todo desde '../tema' en una sola línea
// y no necesitan saber en qué archivo vive cada token:
//
//   import { colores, espaciados, radios, tipografia } from '../tema';
// ============================================================

export { colores } from './colores';
export { espaciados, radios } from './espaciado';
export { tipografia } from './tipografia';
