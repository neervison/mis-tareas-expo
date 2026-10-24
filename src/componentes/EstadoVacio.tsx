// ============================================================
// COMPONENTE: EstadoVacio
// ------------------------------------------------------------
// Es el mensaje que muestra la lista cuando NO hay tareas que
// mostrar (el ListEmptyComponent de FlatList en la pantalla).
// Vive como componente propio —y no como un bloque suelto
// dentro de la pantalla— por la buena práctica de
// RESPONSABILIDAD ÚNICA: la pantalla compone piezas; cada
// pieza, incluida esta, tiene su archivo y su explicación.
//
// DINÁMICO SEGÚN EL FILTRO: con los filtros nuevos, la lista
// puede verse vacía por tres motivos y cada uno muestra su
// propio mensaje con un ICONO Ionicons grande (hoja sin
// tareas, trofeo sin pendientes, reloj sin completadas). Los
// textos e iconos viven en src/constantes/mensajes.ts
// (MENSAJES_VACIO): este componente recibe el filtro activo
// por props y solo elige y dibuja.
// ============================================================

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MENSAJES_VACIO } from '../constantes/mensajes';
import { FiltroTareas } from '../modelos/tarea';
import { colores, espaciados, tipografia } from '../tema';

interface PropiedadesEstadoVacio {
  /** Filtro activo de la lista: decide qué mensaje se muestra. */
  filtro: FiltroTareas;
}

export default function EstadoVacio({ filtro }: PropiedadesEstadoVacio) {
  const mensaje = MENSAJES_VACIO[filtro];

  return (
    <View style={estilos.vacio}>
      <Ionicons
        name={mensaje.icono}
        size={tipografia.iconoGrande}
        color={colores.primario}
        style={estilos.icono}
      />
      <Text style={estilos.vacioTitulo}>{mensaje.titulo}</Text>
      <Text style={estilos.vacioTexto}>{mensaje.texto}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  vacio: {
    alignItems: 'center',
    paddingVertical: espaciados.xl,
    paddingHorizontal: espaciados.md,
  },
  icono: {
    marginBottom: espaciados.sm,
  },
  vacioTitulo: {
    color: colores.texto,
    fontSize: tipografia.base,
    fontWeight: '600',
    marginBottom: espaciados.xs,
    textAlign: 'center',
  },
  vacioTexto: {
    color: colores.textoSecundario,
    fontSize: tipografia.pequena,
    textAlign: 'center',
  },
});
