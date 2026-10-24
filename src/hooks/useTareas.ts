// ============================================================
// HOOK useTareas: TODA la lógica de las tareas vive aquí
// ------------------------------------------------------------
// Patrones aplicados en este archivo:
// 1) SEPARACIÓN DE RESPONSABILIDADES: las pantallas y
//    componentes solo dibujan (presentación); este hook
//    concentra el estado y las operaciones (lógica).
// 2) ESTADO INMUTABLE: nunca se modifica el arreglo original;
//    cada cambio crea uno nuevo ([...tareas, nueva],
//    tareas.map(...), tareas.filter(...)). React detecta el
//    cambio por la nueva referencia y vuelve a dibujar.
// 3) PATRÓN OBSERVADOR (versión React): los componentes que
//    usan este hook quedan "suscritos" al estado; cuando el
//    estado cambia, React los re-renderiza automáticamente.
// 4) ENCAPSULAMIENTO: el estado solo se cambia a través de
//    las funciones que este hook expone (agregar, actualizar,
//    eliminar, alternarCompletada).
// ============================================================

import { useCallback, useMemo, useState } from 'react';
import { DatosTarea, Tarea } from '../modelos/tarea';
import { normalizarTexto } from '../servicios/validacionTarea';
import { generarId } from '../utilidades/ids';

/** Tareas de ejemplo para que la app nunca parta vacía al evaluarla. */
const TAREAS_INICIALES: Tarea[] = [
  {
    id: 'ejemplo-1',
    titulo: 'Estudiar para la evaluación',
    descripcion: 'Repasar componentes de React Native y los patrones de diseño.',
    completada: false,
    fechaCreacion: Date.now() - 1000 * 60 * 60 * 5,
  },
  {
    id: 'ejemplo-2',
    titulo: 'Comprar materiales del proyecto',
    descripcion: 'Cotizar y dejar la lista lista en el teléfono.',
    completada: false,
    fechaCreacion: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    id: 'ejemplo-3',
    titulo: 'Crear el proyecto con Expo',
    descripcion: 'Proyecto generado con create-expo-app (plantilla blank-typescript).',
    completada: true,
    fechaCreacion: Date.now() - 1000 * 60 * 60 * 26,
  },
];

// El id único lo crea la utilidad generarId (src/utilidades/ids.ts):
// crear ids NO es responsabilidad de este hook, por eso vive aparte.

export function useTareas() {
  // Estado principal: la lista completa de tareas.
  const [tareas, setTareas] = useState<Tarea[]>(TAREAS_INICIALES);

  /** Agrega una tarea nueva al FINAL de la lista (estado inmutable). */
  const agregarTarea = useCallback((datos: DatosTarea) => {
    const nueva: Tarea = {
      id: generarId(),
      // El texto se normaliza con el servicio de validación (trim centralizado).
      titulo: normalizarTexto(datos.titulo),
      descripcion: normalizarTexto(datos.descripcion),
      completada: false,
      fechaCreacion: Date.now(),
    };
    setTareas((previas) => [...previas, nueva]);
  }, []);

  /** Reemplaza título y descripción de la tarea con ese id. */
  const actualizarTarea = useCallback((id: string, datos: DatosTarea) => {
    setTareas((previas) =>
      previas.map((tarea) =>
        tarea.id === id
          ? {
              ...tarea,
              titulo: normalizarTexto(datos.titulo),
              descripcion: normalizarTexto(datos.descripcion),
            }
          : tarea,
      ),
    );
  }, []);

  /** Elimina la tarea con ese id (filter crea un arreglo sin ella). */
  const eliminarTarea = useCallback((id: string) => {
    setTareas((previas) => previas.filter((tarea) => tarea.id !== id));
  }, []);

  /** Marca o desmarca una tarea como completada. */
  const alternarCompletada = useCallback((id: string) => {
    setTareas((previas) =>
      previas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea,
      ),
    );
  }, []);

  // Contadores derivados: se recalculan solo si cambia la lista.
  const totalPendientes = useMemo(
    () => tareas.filter((tarea) => !tarea.completada).length,
    [tareas],
  );
  const totalCompletadas = tareas.length - totalPendientes;

  return {
    tareas,
    totalPendientes,
    totalCompletadas,
    agregarTarea,
    actualizarTarea,
    eliminarTarea,
    alternarCompletada,
  };
}
