//Typing JSON
export interface Spell {
  magia_id: string;
  nome: string;
  circulo: string;
  escola: string;
  classes: string[];
  tempo_de_conjuracao: string;
  alcance: string;
  componentes: string[];
  duracao: string;
  efeito: string;
}


export function groupSortSpells(magias: Spell[]): Record<string, Spell[]> {
  const groups: Record<string, Spell[]> = {};

  // Order spells by circle
  magias.forEach(magia => {
    const circulo = magia.circulo;
    if (!groups[circulo]) groups[circulo] = [];
    groups[circulo].push(magia);
  });

  // Order spells by name
  Object.keys(groups).forEach(circulo => {
    groups[circulo].sort((a, b) => a.nome.localeCompare(b.nome));
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
  const result: Record<string, Spell[]> = {};
  orderedCircles.forEach(circulo => {
    result[circulo] = groups[circulo];
  });

  return result;
}
