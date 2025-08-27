import { spellDatabase } from '../assets/_database/useSpellDatabase';


export function groupSortSpells(magias: spellDatabase[]): Record<string, spellDatabase[]> {
  const groups: Record<string, spellDatabase[]> = {};

  // Order spells by circle
  magias.forEach(magia => {
    const circulo = magia.level;
    if (!groups[circulo]) groups[circulo] = [];
    groups[circulo].push(magia);
  });

  // Order spells by name
  Object.keys(groups).forEach(circulo => {
    groups[circulo].sort((a, b) => a.name.localeCompare(b.name));
  });

  // order circles by number
  function getOrderCircle(c: string): number {
    if (c.toLowerCase().includes('truque')) return 0;
    const match = c.match(/\d+/);
    return match ? parseInt(match[0], 10) : Infinity;
  }

  // order circles
  const orderedCircles = Object.keys(groups).sort(
    (a, b) => getOrderCircle(a) - getOrderCircle(b)
  );

  // Make the result
  const result: Record<string, spellDatabase[]> = {};
  orderedCircles.forEach(circulo => {
    result[circulo] = groups[circulo];
  });

  return result;
}

