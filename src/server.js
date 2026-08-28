import express from "express";
import { getRawCharacters } from "./characterService.js";
import { normalizeCharacters } from "./normalize.js";
import * as queries from "./queries.js";
import * as stats from "./stats.js";
import {
  fetchAllCharactersConcurrent,
  fetchAllCharactersSequential,
} from "./api.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Envuelve un handler async: si la función pendiente todavía lanza el
// error "TODO", responde 501 en vez de tumbar el servidor.
function asyncHandler(fn) {
  return async (req, res) => {
    try {
      res.json(await fn(req, res));
    } catch (error) {
      res.status(501).json({ pendiente: true, error: error.message });
    }
  };
}

async function getPersonajes() {
  const raw = await getRawCharacters();
  return normalizeCharacters(raw);
}

app.get("/health", (req, res) => res.json({ status: "ok" }));

// Parte C
app.get(
  "/api/characters",
  asyncHandler(() => getRawCharacters())
);

// Parte A
app.get(
  "/api/characters/normalized",
  asyncHandler(() => getPersonajes())
);

// Parte B (1-5)
app.get(
  "/api/queries/vivos-humanos",
  asyncHandler(async () => queries.vivosHumanos(await getPersonajes()))
);
app.get(
  "/api/queries/veteranos",
  asyncHandler(async () => queries.veteranos(await getPersonajes()))
);
app.get(
  "/api/queries/primera-alien-mujer",
  asyncHandler(async () => queries.primeraAlienMujer(await getPersonajes()))
);
app.get(
  "/api/queries/alguno-con-tipo",
  asyncHandler(async () => ({
    resultado: queries.algunoConTipo(await getPersonajes()),
  }))
);
app.get(
  "/api/queries/todos-validos",
  asyncHandler(async () => ({
    resultado: queries.todosValidos(await getPersonajes()),
  }))
);

// Parte B (6-7, reduce)
app.get(
  "/api/stats/por-especie",
  asyncHandler(async () => stats.porEspecie(await getPersonajes()))
);
app.get(
  "/api/stats/por-rango-episodios",
  asyncHandler(async () => stats.porRangoEpisodios(await getPersonajes()))
);

// Parte C: comparación de tiempos entre estrategias
app.get(
  "/api/benchmark",
  asyncHandler(async () => {
    const inicioSecuencial = Date.now();
    await fetchAllCharactersSequential();
    const secuencialMs = Date.now() - inicioSecuencial;

    const inicioConcurrente = Date.now();
    await fetchAllCharactersConcurrent();
    const concurrenteMs = Date.now() - inicioConcurrente;

    return { secuencialMs, concurrenteMs };
  })
);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
