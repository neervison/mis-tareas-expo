// Configuración de ESLint (formato "flat config") usando la
// configuración oficial recomendada por Expo para el SDK 58.
// Se ejecuta con: npm run lint  (equivale a `npx expo lint`)
// Documentación: https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      // Desactivada con intención: en FormularioTarea el useEffect sincroniza
      // el formulario cuando cambia la prop `tareaEnEdicion` (al entrar o
      // salir del modo edición). Es un caso legítimo de sincronización con
      // una prop, no un efecto para buscar datos.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]);
