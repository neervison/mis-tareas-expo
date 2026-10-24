// ============================================================
// COMPONENTE: Encabezado
// ------------------------------------------------------------
// Es el encabezado de la pantalla.
// Muestra el título de la app (máxima jerarquía visual: texto
// grande y en negrita) y un RESUMEN con el contador de tareas
// pendientes y completadas, para que el usuario sepa de un
// vistazo cómo va su lista.
// Es un componente PRESENTACIONAL: solo recibe datos por props
// y los dibuja; no guarda estado ni conoce la lógica.
//
// Interfaz DINÁMICA e iconos PROFESIONALES (decisión del
// usuario: iconos vectoriales, no emoticones):
// - ICONOS Ionicons (@expo/vector-icons, estilo outline): el
//   saludo lleva sol / sol entre nubes / luna según la hora y
//   el título un portapapeles (clipboard-outline). El icono
//   acompaña al texto, nunca lo reemplaza.
// - SALUDO SEGÚN LA HORA calculado con Date al dibujar
//   (la regla vive en src/constantes/mensajes.ts).
// - LA MASCOTA (src/componentes/Mascota.tsx) a la derecha: su
//   expresión reacciona al % de avance que aquí se calcula
//   desde los mismos totales del resumen.
// - DEGRADADO simulado sin librerías: dos círculos decorativos
//   en capas (colores primarioClaro y sobrePrimario con
//   opacidad) sobre la tarjeta primaria; solo decoran, por eso
//   van ocultos para lectores de pantalla.
// ============================================================

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { saludoSegunHora } from '../constantes/mensajes';
import { colores, espaciados, radios, tipografia } from '../tema';
import Mascota from './Mascota';

interface PropiedadesEncabezado {
  totalPendientes: number;
  totalCompletadas: number;
}

export default function Encabezado({ totalPendientes, totalCompletadas }: PropiedadesEncabezado) {
  // El saludo se calcula al dibujar: cambia solo según la hora.
  const saludo = saludoSegunHora();

  // El avance (0–100) que mira la mascota sale de estos totales.
  const totalTareas = totalPendientes + totalCompletadas;
  const progreso = totalTareas === 0 ? 0 : Math.round((totalCompletadas / totalTareas) * 100);

  return (
    <View style={estilos.contenedor}>
      {/* Capas decorativas del degradado (sin librerías): dos
          círculos semitransparentes recortados por la tarjeta. */}
      <View style={estilos.capaClara} accessibilityElementsHidden importantForAccessibility="no" />
      <View style={estilos.capaSuave} accessibilityElementsHidden importantForAccessibility="no" />

      <View style={estilos.fila}>
        <View style={estilos.columnaTextos}>
          <View style={estilos.filaSaludo}>
            <Ionicons name={saludo.icono} size={16} color={colores.sobrePrimarioSuave} />
            <Text style={estilos.saludo}>{saludo.texto}</Text>
          </View>

          <View style={estilos.filaTitulo}>
            <Ionicons name="clipboard-outline" size={30} color={colores.sobrePrimario} />
            <Text style={estilos.titulo} accessibilityRole="header">
              Mis tareas
            </Text>
          </View>

          <Text style={estilos.subtitulo}>
            {totalPendientes === 1
              ? 'Tienes 1 tarea pendiente'
              : `Tienes ${totalPendientes} tareas pendientes`}
            {totalCompletadas > 0 ? ` · ${totalCompletadas} completada(s)` : ''}
          </Text>
        </View>

        {/* La mascota reacciona al avance sin ocupar el texto */}
        <Mascota progreso={progreso} totalTareas={totalTareas} />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    backgroundColor: colores.primario,
    borderRadius: radios.lg,
    padding: espaciados.lg,
    marginBottom: espaciados.md,
    // Recorta las capas decorativas con la forma de la tarjeta.
    overflow: 'hidden',
    position: 'relative',
  },
  capaClara: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colores.primarioClaro,
    opacity: 0.65,
    top: -60,
    right: -30,
  },
  capaSuave: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colores.sobrePrimario,
    opacity: 0.12,
    bottom: -50,
    right: 70,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaciados.md,
  },
  columnaTextos: {
    flex: 1,
  },
  filaSaludo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaciados.xs + 2,
    marginBottom: espaciados.xs,
  },
  saludo: {
    color: colores.sobrePrimarioSuave,
    fontSize: tipografia.pequena,
    fontWeight: '600',
  },
  filaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaciados.sm,
  },
  titulo: {
    color: colores.sobrePrimario,
    fontSize: tipografia.titulo,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: colores.sobrePrimarioSuave,
    fontSize: tipografia.mediana,
    marginTop: espaciados.xs,
  },
});
