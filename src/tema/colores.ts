// ============================================================
// TEMA VISUAL DE LA APP: paleta de colores
// ------------------------------------------------------------
// Patrón aplicado: FUENTE ÚNICA DE VERDAD para el diseño.
// Todos los componentes importan estos valores en vez de
// repetir colores sueltos. Si quieres cambiar el color
// principal de la app, lo cambias SOLO aquí.
//
// Este archivo es parte del TEMA (carpeta src/tema/):
// - colores.ts    → la paleta (este archivo)
// - espaciado.ts  → tokens de espaciados y radios
// - tipografia.ts → tokens de tamaños de fuente
// - index.ts      → re-exporta todo para importar desde '../tema'
//
// Principios de diseño UI aplicados:
// - CONTRASTE: textos oscuros sobre fondos claros (nivel AA).
// - El rojo se reserva para acciones destructivas (eliminar) y
//   el verde para el estado completado: color con significado.
// ============================================================

export const colores = {
  /** Fondo general de la pantalla. */
  fondo: '#F4F6FB',
  /** Fondo de tarjetas y del formulario. */
  superficie: '#FFFFFF',
  /** Color principal: encabezado, botón guardar y acentos. */
  primario: '#1D4ED8',
  /** Variante oscura del primario (títulos sobre fondo claro). */
  primarioOscuro: '#1E3A8A',
  /**
   * Variante clara del primario: segunda capa del degradado del
   * encabezado y detalles decorativos sobre el color principal.
   */
  primarioClaro: '#2563EB',
  /** Pista (fondo) de la barra de progreso sobre tarjetas claras. */
  pistaProgreso: '#DBEAFE',
  /** Mejillas de la mascota (src/componentes/Mascota.tsx). */
  mejilla: '#FDA4AF',
  /** Texto principal (contraste alto sobre blanco). */
  texto: '#111827',
  /** Texto secundario: descripciones, contadores, ayudas. */
  textoSecundario: '#4B5563',
  /** Bordes suaves de tarjetas e inputs. */
  borde: '#D1D5DB',
  /** Fondo del input mientras se escribe. */
  fondoInput: '#F9FAFB',
  /** Acciones destructivas: botón eliminar. */
  peligro: '#B91C1C',
  /** Estado completado: check y acentos de éxito. */
  exito: '#15803D',
  /** Blanco puro: textos sobre el color primario. */
  sobrePrimario: '#FFFFFF',
  /** Blanco azulado: subtítulo sobre el encabezado primario. */
  sobrePrimarioSuave: '#DBEAFE',
  /** Color de las sombras suaves de las tarjetas. */
  sombra: '#000000',
};
