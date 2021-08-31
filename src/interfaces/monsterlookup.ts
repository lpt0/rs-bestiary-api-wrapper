/**
 * A monster's value and name. 
 * Used for looking up:
 *  - [beast search](https://runescape.wiki/w/RuneScape_Bestiary#beastSearch)
 *  - [beastiary names](https://runescape.wiki/w/RuneScape_Bestiary#bestiaryNames)
 *  - [area beasts](https://runescape.wiki/w/RuneScape_Bestiary#areaBeasts)
 *  - [slayer beasts](https://runescape.wiki/w/RuneScape_Bestiary#slayerBeasts)
 *  - [beast weaknesses](https://runescape.wiki/w/RuneScape_Bestiary#weaknessBeasts)
 *  - [level group lookups](https://runescape.wiki/w/RuneScape_Bestiary#levelGroup)
 */
export default interface MonsterLookup {
  /** The monster's ID. */
  value: Number

  /** The monster's name. */
  label: String
}