# Explicacion del proyecto `mi-mvp`

Este proyecto es una aplicacion React inicial creada con **Create React App (CRA)**.
Actualmente muestra la pantalla por defecto de React (logo girando y enlace "Learn React").

En otras palabras: es una base lista para empezar a construir tu MVP, pero todavia no tiene logica de negocio propia.

## Que hace ahora mismo

- Arranca en desarrollo con `npm start` en `http://localhost:3000`.
- Renderiza el componente principal `App`.
- Muestra estilos basicos y recursos estaticos del template de CRA.
- Incluye una prueba automatica sencilla con Testing Library.

## Estructura de carpetas (resumen)

### `src/` (la mas importante)

Aqui vive el codigo de React que escribiras dia a dia.

- `index.js`: punto de entrada de la app. Crea la raiz React y monta `<App />` dentro del `div#root` del HTML.
- `App.js`: componente principal que actualmente muestra contenido de ejemplo.
- `App.css`: estilos del componente `App`.
- `index.css`: estilos globales de la app.
- `App.test.js`: prueba basica que verifica que aparece el texto "learn react".
- `setupTests.js`: configuracion de pruebas (habilita matchers de `jest-dom`).
- `reportWebVitals.js`: util opcional para medir rendimiento (CLS, FCP, LCP, etc.).
- `logo.svg`: imagen usada en `App.js`.

### `public/` (archivos estaticos)

Contiene archivos que se copian tal cual al build final.

- `index.html`: plantilla HTML base. Incluye `<div id="root"></div>`, donde React pinta toda la app.
- `favicon.ico`: icono de la pestana.
- `logo192.png` y `logo512.png`: iconos para instalacion/PWA.
- `manifest.json`: metadatos de aplicacion instalable (nombre, iconos, colores).
- `robots.txt`: reglas para bots/rastreadores.

### `node_modules/`

Dependencias instaladas por npm (React, react-scripts, testing-library, etc.).
No se edita manualmente.

### `.git/`

Historial y metadatos de Git del repositorio.
No se edita manualmente.

## Archivos de configuracion en la raiz

- `package.json`: define scripts (`start`, `build`, `test`) y dependencias.
- `package-lock.json`: fija versiones exactas instaladas para reproducibilidad.
- `.gitignore`: indica que archivos/carpetas no deben subirse al repo.
- `README.md`: documentacion base generada por CRA.

## Flujo de ejecucion (simple)

1. Ejecutas `npm start`.
2. `react-scripts` levanta el servidor de desarrollo.
3. Se abre `public/index.html`.
4. `src/index.js` monta React en `#root`.
5. React renderiza `src/App.js`.

## Que deberias modificar primero para tu MVP

1. `src/App.js` para cambiar la interfaz principal.
2. Crear nuevos componentes dentro de `src/` (por ejemplo `src/components/`).
3. Reemplazar estilos de ejemplo en `App.css` e `index.css`.
4. Ajustar `App.test.js` segun tu nueva interfaz.

## Comandos utiles

- `npm start`: modo desarrollo.
- `npm test`: ejecutar tests.
- `npm run build`: generar version produccion en `build/`.

---

Si quieres, el siguiente paso te lo puedo dejar hecho: organizar `src/` con estructura de MVP (`components`, `pages`, `services`) y un `App.js` inicial limpio para empezar tu producto.
