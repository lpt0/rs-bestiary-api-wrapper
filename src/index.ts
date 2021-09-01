import https from "https";
import { Beast, MonsterLookup, Area, SlayerCategories, Weaknesses } from "./interfaces";

/** Base path for the entire API. */
export const BASE_URL = "https://secure.runescape.com/m=itemdb_rs/bestiary";
// TODO: Gracefully handle redirect from services.* to secure.*

/**
 * Perform an API call.
 * @param route The route to GET.
 * @returns The API data once retrieved.
 */
function _get(route: string): Promise<Object> {
  return new Promise<Object>((resolve, reject) => {
    https.get(route, res => {
      let data = "";
      // Response data will be a string.
      res.on("data", (buf: Buffer) => data += buf.toString("utf-8"));
      res.on("end", () => {
        if (data === undefined || (!data.startsWith("{") && !data.startsWith("["))) {
          reject("Invalid JSON data");
        } else {
          // The API response is JSON - resolve with the parsed object.
          resolve(JSON.parse(data));
        }
      });
    }).on("error", reject);
  });
}

/**
 * Get information for a specific monster.
 * @param beastId The internal ID of the monster.
 * @returns The monster's data.
 * @see https://runescape.wiki/w/RuneScape_Bestiary#beastData
 */
async function beastData(beastId: Number): Promise<Beast> {
  if (typeof beastId !== "number") {
    throw new Error("beastId must be a number!");
  }

  const data = await _get(`${BASE_URL}/beastData.json?beastid=${beastId}`);
  return data as Beast;
}

/**
 * Search for a specific monster, or monsters.
 * To search for multiple monsters, separate the search term with the '+'
 * character.
 * @param term The search term to use.
 * @returns A list of monsters with name and ID matching the search term.
 * @see https://runescape.wiki/w/RuneScape_Bestiary#beastSearch
 */
async function beastSearch(term: string): Promise<MonsterLookup[]> {
  const data = await _get(`${BASE_URL}/beastSearch.json?beastid=${term}`);
  return data as MonsterLookup[];
}

/**
 * Look up monsters whose name starts with a certain letter.
 * @param letter Any letter in the alphabet.
 * @returns Monsters starting with the provided letter.
 * @see https://runescape.wiki/w/RuneScape_Bestiary#bestiaryNames
 */
async function beastiaryNames(letter: string): Promise<MonsterLookup[]> {
  if (letter.length !== 1) {
    throw new Error("letter must be 1 character!");
  }
  const data = await _get(`${BASE_URL}/bestiaryNames.json?beastid=${letter}`);
  return data as MonsterLookup[];
}

/**
 * Get a list of all area names present in the bestiary.
 * @returns All area names.
 * @see https://runescape.wiki/w/RuneScape_Bestiary#areaNames
 */
async function areaNames(): Promise<Area[]> {
  const data = await _get(`${BASE_URL}/areaNames.json`);
  return data as Area[];
}

/**
 * Search for monsters belonging to a certain area.
 * To search for multiple areas, separate the search term with the '+'
 * character.
 * @param identifier The area name (or names), from the `areaNames` query.
 * @returns Monsters belonging to the provided area.
 * @see https://runescape.wiki/w/RuneScape_Bestiary#areaBeasts
 */
async function areaBeasts(identifier: Area): Promise<MonsterLookup[]> {
  const data = await _get(`${BASE_URL}/areaBeasts.json?identifier=${identifier}`);
  return data as MonsterLookup[];
}

/**
 * Get a dictionary of all Slayer category names and their IDs.
 * @returns All Slayer categories.
 * @see https://runescape.wiki/w/RuneScape_Bestiary#slayerCatNames
 */
async function slayerCatNames(): Promise<SlayerCategories> {
  const data = await _get(`${BASE_URL}/slayerCatNames.json`);
  return data as SlayerCategories;
}

/**
 * Search for monsters belonging to a certain slayer category.
 * @param identifier The ID of the slayer category, found with `slayerCatNames`.
 * @returns Monsters belonging to the provided slayer category.
 * @see https://runescape.wiki/w/RuneScape_Bestiary#slayerBeasts
 */
async function slayerBeasts(identifier: Number): Promise<MonsterLookup[]> {
  if (typeof identifier !== "number") {
    throw new Error("identifier must be a number!");
  }

  const data = await _get(`${BASE_URL}/slayerBeasts.json?identifier=${identifier}`);
  return data as MonsterLookup[];
}

/**
 * Get a dictionary of all weaknesses and their associated ID.
 * @returns All weaknesses.
 * @see https://runescape.wiki/w/RuneScape_Bestiary#weaknessNames
 */
async function weaknessNames(): Promise<Weaknesses> {
  const data = await _get(`${BASE_URL}/weaknessNames.json`);
  return data as Weaknesses;
}

/**
 * Get all monsters with a specific weakness.
 * @param identifier The ID of the weakness.
 * @returns All monsters with the provided weakness.
 * @see https://runescape.wiki/w/RuneScape_Bestiary#weaknessBeasts
 */
async function weaknessBeasts(identifier: Number): Promise<MonsterLookup[]> {
  if (typeof identifier !== "number") {
    throw new Error("identifier must be a number!");
  }

  const data = await _get(`${BASE_URL}/weaknessBeasts.json?identifier=${identifier}`);
  return data as MonsterLookup[];
}

/**
 * Get monsters with a combat level in a specific range, inclusive.
 * @param identifierLow The lower bound for the monster level.
 * @param identifierHigh The upper bound for the monster level.
 * @returns Monsters with a combat level between the two given levels.
 * @see https://runescape.wiki/w/RuneScape_Bestiary#levelGroup
 */
async function levelGroup(identifierLow: Number, identifierHigh: Number): Promise<MonsterLookup[]> {
  if (!(identifierLow instanceof Number)) {
    throw new Error("identifierLow must be a number!");
  }

  if (!(identifierHigh instanceof Number)) {
    throw new Error("identifierHigh must be a number!");
  }

  const data = await _get(`${BASE_URL}/levelGroup.json?identifier=${identifierLow}-${identifierHigh}`);
  return data as MonsterLookup[];
}

/** API functions. */
export const api = {
  beastData, beastSearch, beastiaryNames, 
  areaNames, areaBeasts,
  slayerCatNames, slayerBeasts,
  weaknessNames, weaknessBeasts,
  levelGroup
};
