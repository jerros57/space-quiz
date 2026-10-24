# Misión Cosmos

Misión Cosmos es un cuestionario interactivo en español para poner a prueba conocimientos sobre el espacio. Incluye preguntas de opción múltiple, puntuación y una pantalla de resultados.

## Ejecutar en local

No requiere dependencias ni un paso de compilación. Abre `index.html` directamente en un navegador. También puedes servir la carpeta desde la raíz del proyecto con:

```powershell
python -m http.server 8000
```

Después, visita <http://localhost:8000>.

## Publicación

El sitio se publica en GitHub Pages mediante GitHub Actions cuando hay cambios en `main`. El workflow prepara el archivo estático `index.html` como artefacto y lo despliega; no se necesita una etapa de build.
