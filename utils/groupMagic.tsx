

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

export function groupSortSpells(magias: Spell[]): Record<string, Spell[]>{
    const grupos: Record<string, Spell[]> = {};
    // Agrupar magias por círculo
    magias.forEach(magia => {
        const circulo = magia.circulo;
        if (!grupos[circulo]) {
        grupos[circulo] = [];
        }
        grupos[circulo].push(magia);
    });

    // Ordenar cada grupo por nome
    Object.keys(grupos).forEach(circulo => {
        grupos[circulo].sort((a, b) => a.nome.localeCompare(b.nome));
    });

    // Função para ordenar corretamente "Truque", "1º", "2º", etc.
    function obterOrdemCirculo(c: string): number {
        if (c.toLowerCase().includes('truque')) return 0;
        const match = c.match(/\d+/);
        return match ? parseInt(match[0], 10) : Infinity;
    }

    const circulosOrdenados = Object.keys(grupos).sort(
        (a, b) => obterOrdemCirculo(a) - obterOrdemCirculo(b)
    );

    // Retorna os grupos já na ordem correta
    const resultado: Record<string, Spell[]> = {};
        circulosOrdenados.forEach(circulo => {
        resultado[circulo] = grupos[circulo];
    });

  return resultado;
}

