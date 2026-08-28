import { readFile } from "node:fs/promises";
import { fetchAllCharactersConcurrent } from "./api.js";

let cache = null;

/**
 * Devuelve el arreglo crudo de personajes (formato tal cual lo entrega la API).
 * Usa fetchAllCharactersConcurrent (Parte C). Si aún no está implementada,
 * cae de vuelta a data/sample-characters.json para no bloquear al resto del equipo.
 * El resultado se cachea en memoria durante la vida del proceso.
 */
export async function getRawCharacters() {
  if (cache) return cache;

  try {
    cache = await fetchAllCharactersConcurrent();
  } catch (error) {
    console.warn(
      `⚠️  api.js aún no implementado (${error.message}). Usando datos de ejemplo en data/sample-characters.json.`
    );
    const raw = await readFile(
      new URL("../data/sample-characters.json", import.meta.url),
      "utf-8"
    );
    cache = JSON.parse(raw);
  }

  return cache;
}
