# Proyecto Flores

Mini web romántica mobile-first hecha con `HTML`, `CSS` y `JavaScript` puro. Incluye portada interactiva, tarjeta de amor, árbol con corazón de flores amarillas y contador de tiempo configurable.

## Cómo abrirlo

1. Entra a la carpeta `proyecto-flores`.
2. Abre `index.html` directamente en tu navegador.
3. Toca o haz click en la portada para mostrar la experiencia principal.

No necesita instalación ni servidor: funciona localmente abriendo el archivo.

## Cómo cambiar el mensaje

Edita el archivo `js/app.js` y busca el objeto `APP_COPY`:

```js
const APP_COPY = {
  coverTitle: "🌻 Flores Para Ti",
  coverHint: "Toca para abrir la carta",
  cardTitle: "Flores Amarillas para el amor de mi vida:",
  messageLines: [
    "Si pudiera elegir un lugar seguro, sería a tu lado.",
    "Cuanto más tiempo estoy contigo, más te amo."
  ],
  counterLabel: "Mi amor por ti comenzó hace..."
};
```

Puedes cambiar:

- `coverTitle`: texto principal de la portada
- `coverHint`: texto pequeño de ayuda
- `cardTitle`: título dentro de la tarjeta
- `messageLines`: líneas del mensaje romántico
- `counterLabel`: texto encima del contador

## Cómo cambiar la fecha del contador

En `js/app.js`, cambia este bloque al inicio:

```js
const CONFIG = {
  startDate: "2025-03-21T00:00:00"
};
```

Ejemplo:

```js
const CONFIG = {
  startDate: "2024-07-14T20:30:00"
};
```

El contador se actualiza automáticamente cada segundo.
Si quieres poner la fecha exacta en la que empezaron a salir, cambia `startDate` por ese momento.

## Cómo personalizar colores

Los colores principales están al inicio de `css/style.css`, dentro de `:root`.

```css
:root {
  --bg-top: #c21f63;
  --bg-bottom: #6f0d3e;
  --card-bg: rgba(255, 247, 235, 0.92);
  --text-main: #6b2340;
  --accent: #f4c94f;
}
```

Los más importantes:

- `--bg-top` y `--bg-bottom`: fondo general
- `--card-bg`: fondo de la tarjeta
- `--text-main` y `--text-soft`: colores del texto
- `--accent` y `--accent-deep`: tonos amarillos de flores y detalles
- `--trunk`: color del tronco del árbol

## Cómo cambiar el texto “Flores Para Ti”

En `js/app.js`, cambia:

```js
coverTitle: "🌻 Flores Para Ti",
```

También puedes quitar el emoji o reemplazarlo por otro.

## Notas de personalización

- El árbol/corazón está como `SVG inline` dentro de `index.html`, así que puedes editar flores, forma o posiciones manualmente.
- Los pétalos flotantes se generan desde `js/app.js`.
- Las animaciones respetan `prefers-reduced-motion` para una experiencia más accesible.
