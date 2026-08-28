import { readFile } from "node:fs/promises";
import { fetchAllCharactersConcurrent } from "./api.js";

let cache = null;

export async function getRawCharacters() {
  if (cache) return cache;

  try {
    cache = await fetchAllCharactersConcurrent();
  } catch (error) {
    console.warn(
      `Usando datos de ejemplo en data/sample-characters.json.`
    );
    const raw = await readFile(
      new URL("../data/sample-characters.json", import.meta.url),
      "utf-8"
    );
    cache = JSON.parse(raw);
  }

  return cache;
}
