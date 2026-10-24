// ============================================================
// COMPONENTE: Mascota (el personaje que reacciona a tu avance)
// ------------------------------------------------------------
// Mascota simpática y profesional dibujada con
// react-native-svg (vectorial, sin imágenes): un personaje
// redondo con su portapapeles con check, en tres ESTADOS según
// el progreso de la lista:
//
// - progreso 0% (o sin tareas): NEUTRA / DORMIDA. Ojos
//   cerrados, boca plana y un «Zzz»: aún no pasa nada, la
//   mascota espera a que partas.
// - progreso entre 1% y 99%: CONTENTA. Ojos abiertos con
//   brillo, sonrisa y mejillas: vas avanzando.
// - progreso 100% con al menos 1 tarea: CELEBRANDO. Brazos
//   ARRIBA, ojos de alegría (arcos), sonrisa grande abierta:
//   lo lograste.
//
// ANIMACIÓN solo con Animated de React Native (sin librerías
// extra):
// - FLOTACIÓN suave en loop (sube y baja 3 px, infinito).
// - SALTITO (spring en scale) cada vez que el % cambia.
// - CELEBRACIÓN al llegar a 100%: se inclina de lado a lado
//   (rotate ±8°) tres veces.
//
// La mascota REFUERZA el estado, nunca lo reemplaza: el
// porcentaje sigue escrito en la BarraProgreso y el resumen en
// el Encabezado, por eso va oculta para lectores de pantalla.
// ============================================================

import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect, Text as TextoSvg } from 'react-native-svg';
import { colores } from '../tema';

interface PropiedadesMascota {
  /** Porcentaje de avance 0–100 (lo calcula la BarraProgreso igual). */
  progreso: number;
  /** Total de tareas: con 0 tareas nunca se celebra. */
  totalTareas: number;
  /** Tamaño del dibujo en px (cuadrado). */
  tamano?: number;
}

type EstadoMascota = 'durmiendo' | 'contenta' | 'celebrando';

export default function Mascota({ progreso, totalTareas, tamano = 84 }: PropiedadesMascota) {
  // El estado se DERIVA del avance (no es un estado más que guardar).
  const estado: EstadoMascota =
    totalTareas > 0 && progreso >= 100 ? 'celebrando' : progreso > 0 ? 'contenta' : 'durmiendo';

  // Animaciones persistentes: flotación (Y), saltito (escala) e
  // inclinación. Se crean UNA vez con el inicializador de
  // useState (patrón recomendado para valores Animated).
  const [flotacion] = useState(() => new Animated.Value(0));
  const [escala] = useState(() => new Animated.Value(1));
  const [inclinacion] = useState(() => new Animated.Value(0));

  // FLOTACIÓN en loop: sube y baja suave para siempre.
  useEffect(() => {
    const bucle = Animated.loop(
      Animated.sequence([
        Animated.timing(flotacion, { toValue: -3, duration: 1400, useNativeDriver: true }),
        Animated.timing(flotacion, { toValue: 0, duration: 1400, useNativeDriver: true }),
      ]),
    );
    bucle.start();
    return () => bucle.stop();
  }, [flotacion]);

  // SALTITO + CELEBRACIÓN cuando cambia el porcentaje.
  const esPrimeraVez = useRef(true);
  useEffect(() => {
    if (esPrimeraVez.current) {
      esPrimeraVez.current = false;
      return;
    }
    Animated.spring(escala, { toValue: 1.12, friction: 4, useNativeDriver: true }).start(() => {
      Animated.spring(escala, { toValue: 1, friction: 4, useNativeDriver: true }).start();
    });
    if (estado === 'celebrando') {
      Animated.sequence([
        Animated.timing(inclinacion, { toValue: 1, duration: 130, useNativeDriver: true }),
        Animated.timing(inclinacion, { toValue: -1, duration: 200, useNativeDriver: true }),
        Animated.timing(inclinacion, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(inclinacion, { toValue: 0, duration: 160, useNativeDriver: true }),
      ]).start();
    }
  }, [escala, estado, inclinacion, progreso]);

  const rotacion = inclinacion.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-8deg', '8deg'],
  });

  return (
    <Animated.View
      style={[
        estilos.contenedor,
        { transform: [{ translateY: flotacion }, { scale: escala }, { rotate: rotacion }] },
      ]}
      accessibilityElementsHidden
      importantForAccessibility="no"
    >
      <Svg width={tamano} height={tamano} viewBox="0 0 100 100">
        {/* Brazos: arriba solo cuando celebra; si no, a los lados */}
        {estado === 'celebrando' ? (
          <>
            <Path
              d="M22 52 Q8 40 10 24"
              stroke={colores.primarioOscuro}
              strokeWidth={5}
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d="M78 52 Q92 40 90 24"
              stroke={colores.primarioOscuro}
              strokeWidth={5}
              fill="none"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <Path
              d="M22 56 Q12 64 16 74"
              stroke={colores.primarioOscuro}
              strokeWidth={5}
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d="M78 56 Q88 64 84 74"
              stroke={colores.primarioOscuro}
              strokeWidth={5}
              fill="none"
              strokeLinecap="round"
            />
          </>
        )}

        {/* Cuerpo redondo y su pancita clara */}
        <Circle cx={50} cy={56} r={32} fill={colores.primarioClaro} />
        <Ellipse cx={50} cy={68} rx={18} ry={13} fill={colores.pistaProgreso} opacity={0.55} />

        {/* Ojos según el estado */}
        {estado === 'durmiendo' && (
          <>
            <Path
              d="M34 50 Q39 54 44 50"
              stroke={colores.sobrePrimario}
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d="M56 50 Q61 54 66 50"
              stroke={colores.sobrePrimario}
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
            />
            <TextoSvg
              x={76}
              y={26}
              fontSize={13}
              fontWeight="bold"
              fill={colores.sobrePrimarioSuave}
            >
              Zzz
            </TextoSvg>
          </>
        )}
        {estado === 'contenta' && (
          <>
            <Circle cx={39} cy={50} r={4} fill={colores.sobrePrimario} />
            <Circle cx={61} cy={50} r={4} fill={colores.sobrePrimario} />
            <Circle cx={40.5} cy={48.5} r={1.4} fill={colores.primarioClaro} />
            <Circle cx={62.5} cy={48.5} r={1.4} fill={colores.primarioClaro} />
          </>
        )}
        {estado === 'celebrando' && (
          <>
            <Path
              d="M33 52 Q39 44 45 52"
              stroke={colores.sobrePrimario}
              strokeWidth={3.4}
              fill="none"
              strokeLinecap="round"
            />
            <Path
              d="M55 52 Q61 44 67 52"
              stroke={colores.sobrePrimario}
              strokeWidth={3.4}
              fill="none"
              strokeLinecap="round"
            />
          </>
        )}

        {/* Mejillas rosadas (solo despierta) */}
        {estado !== 'durmiendo' && (
          <>
            <Ellipse cx={32} cy={61} rx={5} ry={3.2} fill={colores.mejilla} opacity={0.85} />
            <Ellipse cx={68} cy={61} rx={5} ry={3.2} fill={colores.mejilla} opacity={0.85} />
          </>
        )}

        {/* Boca según el estado */}
        {estado === 'durmiendo' && (
          <Path
            d="M45 64 H55"
            stroke={colores.sobrePrimario}
            strokeWidth={3}
            strokeLinecap="round"
          />
        )}
        {estado === 'contenta' && (
          <Path
            d="M42 62 Q50 69 58 62"
            stroke={colores.sobrePrimario}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
          />
        )}
        {estado === 'celebrando' && (
          <Path
            d="M41 61 Q50 73 59 61 Q50 66 41 61 Z"
            fill={colores.sobrePrimario}
            stroke={colores.sobrePrimario}
            strokeWidth={2}
            strokeLinejoin="round"
          />
        )}

        {/* Accesorio: su portapapeles con check, abajo a la derecha */}
        <Rect x={64} y={74} width={22} height={18} rx={3} fill={colores.sobrePrimario} />
        <Rect x={71} y={71.5} width={8} height={5} rx={2} fill={colores.primarioOscuro} />
        <Path
          d="M69 83 L73.5 87 L81 79"
          stroke={colores.exito}
          strokeWidth={2.6}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Animated.View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    alignSelf: 'center',
  },
});
