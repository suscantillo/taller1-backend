# Taller 1 – Rick and Morty API (Express)

API en Express que consume la API pública de Rick and Morty (`fetch`, `async/await`,
`Promise.all()`) y expone la normalización y las consultas del taller (`map`, `filter`,
`find`, `some`, `every`, `reduce`) como endpoints. Enunciado completo: [documento.md](documento.md).

## Requisitos

- Node.js 22+
- pnpm (`corepack enable` si no lo tienes)

## Instalación

```bash
pnpm install
```

## Ejecución

```bash
pnpm start      # levanta el servidor en http://localhost:3000
pnpm run dev    # igual, con --watch para desarrollo
pnpm run check  # valida la sintaxis de todos los archivos en src/
```

Mientras `src/api.js` no esté implementado, el servidor sirve los datos de ejemplo en
[data/sample-characters.json](data/sample-characters.json), para que el resto del equipo
pueda desarrollar y probar sus endpoints sin depender de esa rama. Cualquier endpoint que
dependa de una función aún no implementada responde `501` con un mensaje indicando qué falta,
en vez de tumbar el servidor.

## Endpoints

| Método | Ruta | Parte del taller |
| --- | --- | --- |
| GET | `/health` | — |
| GET | `/api/characters` | C — todos los personajes (crudo) |
| GET | `/api/characters/normalized` | A — normalización (`map`) |
| GET | `/api/queries/vivos-humanos` | B.1 — `filter` |
| GET | `/api/queries/veteranos` | B.2 — `filter` (20+ episodios) |
| GET | `/api/queries/primera-alien-mujer` | B.3 — `find` |
| GET | `/api/queries/alguno-con-tipo` | B.4 — `some` |
| GET | `/api/queries/todos-validos` | B.5 — `every` |
| GET | `/api/stats/por-especie` | B.6 — `reduce` |
| GET | `/api/stats/por-rango-episodios` | B.7 — `reduce` |
| GET | `/api/benchmark` | C — tiempos secuencial vs. concurrente |

## Estructura del proyecto

```
src/
  server.js           # App Express: define las rutas de arriba
  characterService.js # Cachea/obtiene los personajes (o usa el fixture si falta api.js)
  api.js               # Parte C: fetch de todas las páginas (secuencial y concurrente)
  normalize.js         # Parte A: normalización con map
  queries.js           # Parte B (1-5): filter, find, some, every
  stats.js             # Parte B (6-7): reduce
data/
  sample-characters.json  # Datos de ejemplo (forma cruda de la API) para desarrollar sin bloquear
ANALISIS.md            # Documento de análisis a completar (entregable final)
```

## Flujo de trabajo

Este proyecto sigue GitHub Flow. Ver [CONTRIBUTING.md](CONTRIBUTING.md) para el detalle de
ramas, commits y Pull Requests.

División sugerida de trabajo (3 integrantes):

| Rama | Contenido |
| --- | --- |
| `feature/normalizacion` | `src/normalize.js` (Parte A) |
| `feature/consultas` | `src/queries.js` (Parte B, puntos 1-5) |
| `feature/estadisticas` | `src/api.js` (Parte C) + `src/stats.js` (Parte B, puntos 6-7) + análisis de tiempos |

## Entregables

- [ ] Código fuente completo y funcional en `main`.
- [ ] Enlace al repositorio de GitHub.
- [ ] [ANALISIS.md](ANALISIS.md) completo (máx. 1 página).
