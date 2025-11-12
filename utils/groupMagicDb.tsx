import { spellDatabase } from '../assets/_database/useSpellDatabase';

export function groupSortSpells(magias: spellDatabase[]) {
  // Usamos Map para performance melhor que objeto puro
  const groups = new Map<string, spellDatabase[]>();

  for (const magia of magias) {
    const circulo = magia.level.toString();
    if (!groups.has(circulo)) groups.set(circulo, []);
    groups.get(circulo)!.push(magia);
  }

  // Ordena magias por nome dentro de cada círculo
  for (const [key, arr] of groups.entries()) {
    arr.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Função para ordenar círculos (truques primeiro, depois 1º, 2º, etc.)
  function getOrderCircle(c: string): number {
    if (c.toLowerCase().includes("truque")) return 0;
    const match = c.match(/\d+/);
    return match ? parseInt(match[0], 10) : Infinity;
  }

  // Transforma em formato SectionList
  return Array.from(groups.entries())
    .sort(([a], [b]) => getOrderCircle(a) - getOrderCircle(b))
    .map(([title, data]) => ({ title, data }));
}
