# Misión Cosmos

Misión Cosmos es un cuestionario interactivo en español para poner a prueba conocimientos sobre el espacio. Incluye preguntas de opción múltiple, puntuación, una pantalla de resultados y una ronda para practicar las respuestas falladas.

El proyecto es estático y sus archivos se mantienen separados: `index.html` contiene el marcado, `styles.css` los estilos y `script.js` las preguntas y la lógica del cuestionario.

## Ejecutar en local

No requiere dependencias ni un paso de compilación. Abre `index.html` directamente en un navegador. También puedes servir la carpeta desde la raíz del proyecto con:

```powershell
python -m http.server 8000
```

Después, visita <http://localhost:8000>.

## Publicación

El sitio se publica en GitHub Pages mediante GitHub Actions cuando hay cambios en `main`. El workflow empaqueta `index.html`, `styles.css` y `script.js` como artefacto y lo despliega; no se necesita una etapa de build.
