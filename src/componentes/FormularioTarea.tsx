// ============================================================
// COMPONENTE: FormularioTarea
// ------------------------------------------------------------
// Es el formulario de la app: campos de texto (TextInput)
// y botones (Pressable) para crear o editar una tarea.
//
// Patrones aplicados:
// 1) COMPONENTE CONTROLADO: el valor de cada TextInput vive
//    en el estado de React (value + onChangeText). React es
//    la fuente única de verdad de lo que el usuario escribe.
// 2) UN SOLO FORMULARIO, DOS MODOS: si recibe `tareaEnEdicion`
//    trabaja en modo EDITAR (carga los datos y el botón dice
//    "Actualizar tarea" + aparece "Cancelar"); si no, crea.
// 3) VALIDACIÓN SIMPLE Y VISIBLE: el título es obligatorio.
//    Sin título, el botón se ve deshabilitado y al tocarlo se
//    muestra el mensaje de error bajo el campo. La REGLA y su
//    mensaje viven en el servicio de validación
//    (src/servicios/validacionTarea.ts): este componente solo
//    la USA, no la inventa (separación de responsabilidades).
// 4) LÍMITES CON NOMBRE: cada campo acepta como máximo los
//    caracteres de src/constantes/limites.ts (maxLength), sin
//    números mágicos escritos en el componente.
// Al guardar con éxito, el formulario se LIMPIA solo, como
// del proyecto.
// ============================================================

import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { LARGO_MAX_DESCRIPCION, LARGO_MAX_TITULO } from '../constantes/limites';
import { DatosTarea, Tarea } from '../modelos/tarea';
import { esTituloValido, validarTitulo } from '../servicios/validacionTarea';
import { colores, espaciados, radios, tipografia } from '../tema';

interface PropiedadesFormulario {
  /** Tarea que se está editando, o null si se está creando una nueva. */
  tareaEnEdicion: Tarea | null;
  /** Se llama al guardar (sirve tanto para crear como para actualizar). */
  onGuardar: (datos: DatosTarea) => void;
  /** Se llama al cancelar la edición y volver a modo crear. */
  onCancelarEdicion: () => void;
}

export default function FormularioTarea({
  tareaEnEdicion,
  onGuardar,
  onCancelarEdicion,
}: PropiedadesFormulario) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  // Al entrar en modo edición, el formulario se llena con los
  // datos de la tarea elegida; al salir, queda vacío.
  useEffect(() => {
    if (tareaEnEdicion) {
      setTitulo(tareaEnEdicion.titulo);
      setDescripcion(tareaEnEdicion.descripcion);
    } else {
      setTitulo('');
      setDescripcion('');
    }
    setError('');
  }, [tareaEnEdicion]);

  // La regla de validación es del SERVICIO, no de este componente.
  const tituloValido = esTituloValido(titulo);

  const manejarGuardar = () => {
    if (!tituloValido) {
      // El mensaje también viene del servicio: un solo lugar lo define.
      setError(validarTitulo(titulo));
      return;
    }
    onGuardar({ titulo, descripcion });
    // El formulario se limpia después de agregar (así queda listo para la siguiente tarea).
    setTitulo('');
    setDescripcion('');
    setError('');
  };

  const enEdicion = tareaEnEdicion !== null;

  return (
    <View style={estilos.tarjeta}>
      <View style={estilos.filaTitulo}>
        <Ionicons
          name={enEdicion ? 'create-outline' : 'add-circle-outline'}
          size={20}
          color={colores.primario}
        />
        <Text style={estilos.tituloTarjeta}>{enEdicion ? 'Editar tarea' : 'Nueva tarea'}</Text>
      </View>

      <View style={estilos.filaEtiqueta}>
        <Ionicons name="text-outline" size={15} color={colores.texto} />
        <Text style={estilos.etiqueta}>Título *</Text>
      </View>
      <TextInput
        style={estilos.input}
        placeholder="Ej.: Estudiar para la prueba"
        placeholderTextColor={colores.textoSecundario}
        value={titulo}
        maxLength={LARGO_MAX_TITULO}
        onChangeText={(texto) => {
          setTitulo(texto);
          if (error) setError('');
        }}
        accessibilityLabel="Título de la tarea"
        returnKeyType="next"
      />
      {error ? <Text style={estilos.error}>{error}</Text> : null}

      <View style={estilos.filaEtiqueta}>
        <Ionicons name="document-text-outline" size={15} color={colores.texto} />
        <Text style={estilos.etiqueta}>Descripción</Text>
      </View>
      <TextInput
        style={[estilos.input, estilos.inputDescripcion]}
        placeholder="Detalle opcional de la tarea"
        placeholderTextColor={colores.textoSecundario}
        value={descripcion}
        maxLength={LARGO_MAX_DESCRIPCION}
        onChangeText={setDescripcion}
        accessibilityLabel="Descripción de la tarea"
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />

      <Pressable
        style={({ pressed }) => [
          estilos.botonGuardar,
          !tituloValido && estilos.botonDeshabilitado,
          pressed && tituloValido && estilos.botonPresionado,
        ]}
        onPress={manejarGuardar}
        accessibilityRole="button"
        accessibilityLabel={enEdicion ? 'Actualizar tarea' : 'Guardar tarea'}
        accessibilityState={{ disabled: !tituloValido }}
      >
        <Ionicons
          name={enEdicion ? 'checkmark-done-outline' : 'save-outline'}
          size={19}
          color={colores.sobrePrimario}
        />
        <Text style={estilos.textoBotonGuardar}>
          {enEdicion ? 'Actualizar tarea' : 'Guardar tarea'}
        </Text>
      </Pressable>

      {enEdicion ? (
        <Pressable
          style={estilos.botonCancelar}
          onPress={onCancelarEdicion}
          accessibilityRole="button"
          accessibilityLabel="Cancelar edición"
        >
          <Ionicons name="close-outline" size={18} color={colores.peligro} />
          <Text style={estilos.textoBotonCancelar}>Cancelar</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.superficie,
    borderRadius: radios.lg,
    padding: espaciados.md,
    marginBottom: espaciados.md,
    // Sombra suave: diferencia el formulario del fondo (jerarquía).
    shadowColor: colores.sombra,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  filaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaciados.xs + 2,
    marginBottom: espaciados.sm,
  },
  tituloTarjeta: {
    color: colores.primarioOscuro,
    fontSize: tipografia.subtitulo,
    fontWeight: 'bold',
  },
  filaEtiqueta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaciados.xs + 2,
    marginTop: espaciados.sm,
    marginBottom: espaciados.xs,
  },
  etiqueta: {
    color: colores.texto,
    fontSize: tipografia.pequena,
    fontWeight: '600',
  },
  input: {
    backgroundColor: colores.fondoInput,
    borderColor: colores.borde,
    borderWidth: 1,
    borderRadius: radios.md,
    paddingHorizontal: espaciados.md,
    paddingVertical: espaciados.sm + 4,
    fontSize: tipografia.base,
    color: colores.texto,
  },
  inputDescripcion: {
    minHeight: 72,
  },
  error: {
    color: colores.peligro,
    fontSize: tipografia.mini,
    marginTop: espaciados.xs,
  },
  botonGuardar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: espaciados.xs + 2,
    backgroundColor: colores.primario,
    borderRadius: radios.md,
    paddingVertical: espaciados.md - 2,
    alignItems: 'center',
    marginTop: espaciados.md,
  },
  botonDeshabilitado: {
    opacity: 0.45,
  },
  botonPresionado: {
    opacity: 0.85,
  },
  textoBotonGuardar: {
    color: colores.sobrePrimario,
    fontSize: tipografia.base,
    fontWeight: 'bold',
  },
  botonCancelar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: espaciados.xs + 2,
    paddingVertical: espaciados.sm + 2,
    alignItems: 'center',
    marginTop: espaciados.xs,
  },
  textoBotonCancelar: {
    color: colores.peligro,
    fontSize: tipografia.mediana,
    fontWeight: '600',
  },
});
