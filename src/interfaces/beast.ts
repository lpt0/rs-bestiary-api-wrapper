/**
 * Beast information. 
 * Documentation comes directly from the RuneScape wiki.
 * @see https://runescape.wiki/w/RuneScape_Bestiary#beastData
 */
export default interface Beast {
  /** The monster's name. */
  name: String;

  /** The monster's ID. */
  id: Number;

  /** Whether or not the monster is a member's only monster. */
  members: Boolean;

  /** The monster's [weakness](https://runescape.wiki/w/Weakness). */
  weakness: String;

  /** The monster's combat level. */
  level: Number;

  /** The amount of lifepoints the monster has. */
  lifepoints: Number;

  /** The monster's Defence level. */
  defence: Number;

  /** The monster's Attack level. */
  attack: Number;

  /** The monster's Magic level. */
  magic: Number;

  /** The monster's Ranged level. */
  ranged: Number;

  /** The experience received for killing the monster. */
  xp: String;

  /** If the monster requires a Slayer level to damage, the level required. */
  slayerlevel: Number;

  /** The Slayer category to which the monster belongs. */
  slayercat: String;

  /** The size of the monster. */
  size: Number;

  /** Whether or not the monster can be attacked. */
  attackable: Boolean;

  /** Whether or not the monster is [aggressive](https://runescape.wiki/w/Aggressive). */
  aggressive: Boolean;

  /** Whether or not the monster can inflict poison. */
  poisonous: Boolean;

  /** The monster's [examine](https://runescape.wiki/w/Examine) text. */
  description: String;

  /** Areas where the monster may be found. */
  area: String[];

  /** Animations used by the official bestiary when viewing. */
  animations: { [key: string]: Number };
}