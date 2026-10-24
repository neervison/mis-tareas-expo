// ============================================================
// PANTALLA: PantallaTareas (la pantalla completa de la app)
// ------------------------------------------------------------
// Buena práctica aplicada: las PANTALLAS viven en su propia
// carpeta (src/pantallas/) y App.tsx queda solo como raíz de
// composición. Esta pantalla es el "contenedor":
//
// Patrones aplicados en este archivo:
// 1) CONTENEDOR / PRESENTACIONAL: la pantalla usa el hook
//    useTareas (la lógica) y reparte datos y funciones a los
//    componentes "presentacionales" (Encabezado, BarraProgreso,
//    FiltrosTareas, FormularioTarea, TareaItem, EstadoVacio),
//    que solo dibujan.
// 2) LISTA VIRTUALIZADA con FlatList: solo dibuja en pantalla
//    las tareas visibles, así la lista rinde bien aunque crezca.
// 3) COMPOSICIÓN: la pantalla se arma juntando componentes
//    pequeños y reutilizables, cada uno en su propio archivo
//    dentro de src/componentes/.
//
// Interfaz DINÁMICA (pedido del usuario):
// - FILTRO de la lista (todas / pendientes / completadas) con
//   chips: el estado del filtro vive en esta pantalla y el
//   filtrado real lo hace el servicio filtrarTareas con
//   useMemo (solo se recalcula si cambian las tareas o el
//   filtro). El estado vacío cambia según el filtro activo.
// - ANIMACIONES con LayoutAnimation: al agregar, eliminar,
//   completar o cambiar de filtro, la lista se reordena con
//   una transición suave en vez de un salto brusco. En
//   Android hay que habilitarlo una vez con UIManager (abajo).
// - Sobre la lista van, en orden: Encabezado (saludo según la
//   hora), BarraProgreso (avance animado + mensaje dinámico),
//   el formulario y los chips de filtro.
//
// La estructura de la pantalla, de arriba hacia abajo:
//   encabezado  -> <Encabezado />
//   contenido   -> <SafeAreaView> + <KeyboardAvoidingView>
//   lista       -> <FlatList />
//   cada tarea  -> <TareaItem />
// ============================================================

import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BarraProgreso,
  Encabezado,
  EstadoVacio,
  FiltrosTareas,
  FormularioTarea,
  TareaItem,
} from '../componentes';
import { useTareas } from '../hooks/useTareas';
import { DatosTarea, FiltroTareas, Tarea } from '../modelos/tarea';
import { filtrarTareas } from '../servicios/filtradoTareas';
import { colores, espaciados, tipografia } from '../tema';

// En Android, LayoutAnimation viene desactivado de fábrica:
// se habilita UNA vez al cargar este módulo, si la API existe.
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Pide la animación de transición para el PRÓXIMO cambio de la
 * lista (agregar, eliminar, completar, filtrar). Sin este
 * llamado, los cambios de estado se dibujan de golpe.
 */
function animarSiguienteCambio() {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}

export default function PantallaTareas() {
  // Toda la lógica de tareas vive en el hook (separación de responsabilidades).
  const {
    tareas,
    totalPendientes,
    totalCompletadas,
    agregarTarea,
    actualizarTarea,
    eliminarTarea,
    alternarCompletada,
  } = useTareas();

  // Qué tarea se está editando ahora (null = se está creando una nueva).
  const [tareaEnEdicion, setTareaEnEdicion] = useState<Tarea | null>(null);

  // Filtro activo de la lista: parte mostrando todas las tareas.
  const [filtro, setFiltro] = useState<FiltroTareas>('todas');

  // La lista visible se calcula con el SERVICIO de filtrado y
  // useMemo: solo se recalcula si cambian las tareas o el filtro.
  const tareasVisibles = useMemo(() => filtrarTareas(tareas, filtro), [tareas, filtro]);

  /** Cambia el filtro con su animación de transición. */
  const manejarCambiarFiltro = (nuevoFiltro: FiltroTareas) => {
    animarSiguienteCambio();
    setFiltro(nuevoFiltro);
  };

  /** El formulario llama aquí al guardar: crea o actualiza según el modo. */
  const manejarGuardar = (datos: DatosTarea) => {
    animarSiguienteCambio();
    if (tareaEnEdicion) {
      actualizarTarea(tareaEnEdicion.id, datos);
      setTareaEnEdicion(null);
    } else {
      agregarTarea(datos);
    }
  };

  /** Completar o descompletar una tarea, con animación. */
  const manejarAlternar = (id: string) => {
    animarSiguienteCambio();
    alternarCompletada(id);
  };

  /** Eliminar pide confirmación simple con Alert (evita borrados por error). */
  const manejarEliminar = (tarea: Tarea) => {
    Alert.alert('Eliminar tarea', `¿Seguro que quieres eliminar "${tarea.titulo}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          animarSiguienteCambio();
          eliminarTarea(tarea.id);
          // Si se estaba editando esa misma tarea, se sale del modo edición.
          if (tareaEnEdicion?.id === tarea.id) setTareaEnEdicion(null);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={estilos.pantalla}>
      <StatusBar style="dark" />
      {/* El formulario sube sobre el teclado en vez de quedar tapado por él */}
      <KeyboardAvoidingView
        style={estilos.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          style={estilos.flex}
          contentContainerStyle={estilos.contenidoLista}
          data={tareasVisibles}
          keyExtractor={(tarea) => tarea.id}
          renderItem={({ item }) => (
            <TareaItem
              tarea={item}
              onAlternar={manejarAlternar}
              onEditar={setTareaEnEdicion}
              onEliminar={manejarEliminar}
            />
          )}
          // Todo lo que va SOBRE la lista: encabezado + progreso + formulario + filtros.
          ListHeaderComponent={
            <>
              <Encabezado totalPendientes={totalPendientes} totalCompletadas={totalCompletadas} />
              <BarraProgreso totalTareas={tareas.length} totalCompletadas={totalCompletadas} />
              <FormularioTarea
                tareaEnEdicion={tareaEnEdicion}
                onGuardar={manejarGuardar}
                onCancelarEdicion={() => setTareaEnEdicion(null)}
              />
              <View style={estilos.filaTituloLista}>
                <Ionicons name="list-outline" size={20} color={colores.texto} />
                <Text style={estilos.tituloLista} accessibilityRole="header">
                  Lista de tareas
                </Text>
              </View>
              <FiltrosTareas
                filtroActivo={filtro}
                totalTodas={tareas.length}
                totalPendientes={totalPendientes}
                totalCompletadas={totalCompletadas}
                onCambiarFiltro={manejarCambiarFiltro}
              />
            </>
          }
          // ESTADO VACÍO: componente propio; su mensaje depende del filtro activo.
          ListEmptyComponent={<EstadoVacio filtro={filtro} />}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  flex: {
    flex: 1,
  },
  contenidoLista: {
    padding: espaciados.md,
    paddingBottom: espaciados.xl,
  },
  filaTituloLista: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaciados.xs + 2,
    marginBottom: espaciados.sm,
  },
  tituloLista: {
    color: colores.texto,
    fontSize: tipografia.subtitulo,
    fontWeight: 'bold',
  },
});
