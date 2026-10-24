// ============================================================
// COMPONENTE: FiltrosTareas (chips para filtrar la lista)
// ------------------------------------------------------------
// Tres "chips" (píldoras tocables) que dejan mirar la lista de
// tres formas: Todas / Pendientes / Completadas, cada uno con
// su icono Ionicons (lista, reloj, doble check) y su CONTEO. El chip activo se pinta con el
// color primario y el resto queda en blanco con borde: el
// usuario siempre sabe en qué vista está (jerarquía visual).
//
// Es PRESENTACIONAL: no filtra nada por su cuenta. Recibe el
// filtro activo y los conteos por props, y al tocar un chip
// avisa hacia arriba con onCambiarFiltro; el FILTRADO real lo
// hace el servicio src/servicios/filtradoTareas.ts y la
// pantalla decide (contenedor / presentacional).
//
// Accesibilidad: cada chip anuncia su acción completa y su
// conteo («Ver tareas pendientes, 2 tareas») y marca si está
// seleccionado; el emoticón acompaña, nunca reemplaza el texto.
// ============================================================

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FiltroTareas } from '../modelos/tarea';
import { colores, espaciados, radios, tipografia } from '../tema';

interface PropiedadesFiltrosTareas {
  filtroActivo: FiltroTareas;
  totalTodas: number;
  totalPendientes: number;
  totalCompletadas: number;
  onCambiarFiltro: (filtro: FiltroTareas) => void;
}

type NombreIconoChip = 'list-outline' | 'time-outline' | 'checkmark-done-outline';

/** Configuración visual de cada chip: clave, icono profesional y etiqueta. */
const CHIPS: { clave: FiltroTareas; icono: NombreIconoChip; etiqueta: string }[] = [
  { clave: 'todas', icono: 'list-outline', etiqueta: 'Todas' },
  { clave: 'pendientes', icono: 'time-outline', etiqueta: 'Pendientes' },
  { clave: 'completadas', icono: 'checkmark-done-outline', etiqueta: 'Completadas' },
];

export default function FiltrosTareas({
  filtroActivo,
  totalTodas,
  totalPendientes,
  totalCompletadas,
  onCambiarFiltro,
}: PropiedadesFiltrosTareas) {
  const conteos: Record<FiltroTareas, number> = {
    todas: totalTodas,
    pendientes: totalPendientes,
    completadas: totalCompletadas,
  };

  return (
    <View style={estilos.fila}>
      {CHIPS.map((chip) => {
        const activo = chip.clave === filtroActivo;
        const conteo = conteos[chip.clave];
        return (
          <Pressable
            key={chip.clave}
            style={({ pressed }) => [
              estilos.chip,
              activo ? estilos.chipActivo : estilos.chipInactivo,
              pressed && estilos.chipPresionado,
            ]}
            onPress={() => onCambiarFiltro(chip.clave)}
            accessibilityRole="button"
            accessibilityState={{ selected: activo }}
            accessibilityLabel={`Ver tareas ${chip.clave}, ${conteo} tareas`}
            hitSlop={4}
          >
            <Ionicons
              name={chip.icono}
              size={16}
              color={activo ? colores.sobrePrimario : colores.textoSecundario}
            />
            <Text style={[estilos.textoChip, activo && estilos.textoChipActivo]}>
              {chip.etiqueta} ({conteo})
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const estilos = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espaciados.sm,
    marginBottom: espaciados.md,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaciados.xs + 2,
    borderRadius: radios.lg,
    paddingHorizontal: espaciados.md,
    paddingVertical: espaciados.sm,
    borderWidth: 1,
  },
  chipActivo: {
    backgroundColor: colores.primario,
    borderColor: colores.primario,
  },
  chipInactivo: {
    backgroundColor: colores.superficie,
    borderColor: colores.borde,
  },
  chipPresionado: {
    opacity: 0.85,
  },
  textoChip: {
    color: colores.textoSecundario,
    fontSize: tipografia.pequena,
    fontWeight: '600',
  },
  textoChipActivo: {
    color: colores.sobrePrimario,
  },
});
