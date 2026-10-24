// ============================================================
// COMPONENTE: BarraProgreso (el avance del usuario, animado)
// ------------------------------------------------------------
// Muestra qué porcentaje de la lista ya está completado, con:
// - Una BARRA que se RELLENA CON ANIMACIÓN (Animated) cada vez
//   que el porcentaje cambia: completar una tarea se "siente".
// - El texto exacto: «X de Y tareas listas (Z%)».
// - Un MENSAJE MOTIVACIONAL dinámico según el avance, que vive
//   en src/constantes/mensajes.ts (mensajeSegunProgreso).
//
// La animación usa SOLO la API Animated de React Native (sin
// librerías nuevas): como el ancho animado es un estilo, se
// desactiva useNativeDriver (esa opción solo sirve para
// transformaciones y opacidad, no para anchos).
// Es PRESENTACIONAL: recibe los totales por props y dibuja.
// ============================================================

import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { mensajeSegunProgreso } from '../constantes/mensajes';
import { colores, espaciados, radios, tipografia } from '../tema';

interface PropiedadesBarraProgreso {
  totalTareas: number;
  totalCompletadas: number;
}

export default function BarraProgreso({ totalTareas, totalCompletadas }: PropiedadesBarraProgreso) {
  // Porcentaje redondeado; con 0 tareas el avance es 0%.
  const porcentaje = totalTareas === 0 ? 0 : Math.round((totalCompletadas / totalTareas) * 100);

  // Valor animado persistente: guarda el porcentaje "dibujado".
  // Se crea UNA vez con el inicializador de useState (patrón
  // recomendado para valores Animated: estable entre renders).
  const [avanceAnimado] = useState(() => new Animated.Value(0));

  // Cada vez que cambia el porcentaje real, la barra se mueve
  // suavemente hasta el nuevo valor (600 ms, ease por defecto).
  useEffect(() => {
    Animated.timing(avanceAnimado, {
      toValue: porcentaje,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [avanceAnimado, porcentaje]);

  // El ancho de la barra se interpola: 0 → '0%', 100 → '100%'.
  const anchoBarra = avanceAnimado.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={estilos.tarjeta}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={`Progreso: ${porcentaje} por ciento, ${totalCompletadas} de ${totalTareas} tareas listas`}
    >
      <View style={estilos.filaTitulo}>
        <View style={estilos.filaIconoTitulo}>
          <Ionicons name="trending-up-outline" size={20} color={colores.primario} />
          <Text style={estilos.titulo}>Tu progreso</Text>
        </View>
        <Text style={estilos.porcentaje}>{porcentaje}%</Text>
      </View>

      {/* Pista + relleno animado de la barra */}
      <View style={estilos.pista}>
        <Animated.View style={[estilos.relleno, { width: anchoBarra }]} />
      </View>

      <Text style={estilos.detalle}>
        {totalCompletadas} de {totalTareas} tareas listas ({porcentaje}%)
      </Text>
      <View style={estilos.filaMensaje}>
        <Ionicons
          name={
            porcentaje >= 100
              ? 'trophy-outline'
              : porcentaje > 0
                ? 'happy-outline'
                : 'rocket-outline'
          }
          size={16}
          color={colores.textoSecundario}
        />
        <Text style={estilos.mensaje}>{mensajeSegunProgreso(porcentaje)}</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.superficie,
    borderRadius: radios.lg,
    padding: espaciados.md,
    marginBottom: espaciados.md,
    shadowColor: colores.sombra,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  filaTitulo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: espaciados.sm,
  },
  titulo: {
    color: colores.primarioOscuro,
    fontSize: tipografia.base,
    fontWeight: 'bold',
  },
  porcentaje: {
    color: colores.primario,
    fontSize: tipografia.subtitulo,
    fontWeight: 'bold',
  },
  pista: {
    height: 12,
    borderRadius: radios.md,
    backgroundColor: colores.pistaProgreso,
    overflow: 'hidden',
  },
  relleno: {
    height: '100%',
    borderRadius: radios.md,
    backgroundColor: colores.exito,
  },
  detalle: {
    color: colores.texto,
    fontSize: tipografia.pequena,
    fontWeight: '600',
    marginTop: espaciados.sm,
  },
  filaIconoTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaciados.xs + 2,
  },
  filaMensaje: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaciados.xs + 2,
    marginTop: espaciados.xs,
  },
  mensaje: {
    color: colores.textoSecundario,
    fontSize: tipografia.pequena,
  },
});
