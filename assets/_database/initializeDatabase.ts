import { type SQLiteDatabase } from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

const DB_NAME = "codexDnd.db";

// *** PASSO CRÍTICO: DEIXE TRUE APENAS NESTA PRIMEIRA EXECUÇÃO PARA RESETAR O DB ***
// *** Isso irá APAGAR SEU BANCO DE DADOS LOCAL E TODOS OS DADOS ATUAIS. ***
const RESET_DATABASE_ON_START = true; 

// --- Dados de Magias (Exemplo, importe seu JSON completo aqui) ---
const spellsData = [
  {
    "magia_id": "39",
    "nome": "Bola de Fogo Adiável",
    "circulo": "7",
    "escola": "Evocação",
    "tempo_de_conjuracao": "Ação",
    "alcance": "45 metros",
    "componentes": ["V", "S", "M","(uma bola de guano de morcego e enxofre)"],
    "classes": ["Feiticeiro", "Mago"],
    "duracao": "Concentração, até 1 minuto",
    "efeito": "Um feixe de luz amarela dispara de você, depois se condensa em um ponto escolhido no alcance da magia. Se uma criatura tocar o grânulo brilhante antes da magia terminar, ela realiza uma salvaguarda de Destreza. Se falhar, a magia se encerra, fazendo com que o grânulo exploda. Em caso de sucesso, a criatura pode arremessar o grânulo até 12 metros. Se o arremesso atingir o espaço de uma criatura ou colidir com um objeto sólido, a magia se encerra e o grânulo explode. Quando o grânulo explode, objetos inflamáveis na explosão que não estão sendo usados ou carregados entram em combustão. Usando um Espaço de Magia de Círculo Superior. O dano base aumenta em 1d6 pontos para cada círculo de espaço de magia acima de 7."
  },
  {
    "magia_id": "40",
    "nome": "Bolha Ácida",
    "circulo": "0",
    "escola": "Evocação",
    "tempo_de_conjuracao": "Ação",
    "alcance": "18 metros",
    "componentes": ["V", "S"],
    "classes": ["Feiticeiro", "Mago"],
    "duracao": "Instantânea",
    "efeito": "Você cria uma bolha ácida em um ponto no alcance da magia, onde ela explode em uma Esfera de 1,5 metro de raio. Cada criatura nessa Esfera deve ser bem-sucedida em uma salvaguarda de Destreza ou sofre 1d6 pontos de dano Ácido. Aprimoramento de Truque. O dano aumenta em 1d6 quando você atinge os níveis 5 (2d6), 11 (3d6) e 17 (4d6)."
  },
  // ADICIONE SEU JSON COMPLETO DE MAGIAS AQUI!
];
// --- Fim dos Dados de Magias ---

/**
 * Abre (e opcionalmente recria) o banco de dados
 */
export async function getDatabase(): Promise<SQLiteDatabase> {
  const sqliteDir = `${FileSystem.documentDirectory}SQLite`;
  await FileSystem.makeDirectoryAsync(sqliteDir, { intermediates: true });

  const dbPath = `${sqliteDir}/${DB_NAME}`;
  if (RESET_DATABASE_ON_START) {
    const fileInfo = await FileSystem.getInfoAsync(dbPath);
    if (fileInfo.exists) {
      console.log("🗑 Apagando banco local para recriação...");
      await FileSystem.deleteAsync(dbPath, { idempotent: true });
    }
  }

  // Agora sim, abre a conexão
  const db = SQLite.openDatabaseSync(DB_NAME);
  return db;
}

/**
 * Cria as tabelas necessárias no banco e realiza a seed de magias
 */
export async function initializeDatabase(database: SQLiteDatabase) {
  try {
    // Criar tabela de personagens
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS caracter ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        race TEXT NOT NULL,
        classe TEXT NOT NULL,
        level INTEGER NOT NULL,
        playerName TEXT
      );
    `);

    // Criar tabela de magias
    // A COLUNA 'id_caracter' E A FOREIGN KEY FORAM REMOVIDAS AQUI.
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS spell (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        level INTEGER NOT NULL CHECK (level >= 0 AND level <= 9),
        school TEXT NOT NULL,
        casting_time TEXT NOT NULL,
        range TEXT NOT NULL,
        components TEXT NOT NULL, -- Para V, S, M (array stringificado)
        classes TEXT,            -- Para o componente material entre parênteses
        duration TEXT NOT NULL,
        description TEXT NOT NULL
      );
    `);

    // --- Lógica de Seed para Magias ---
    const result = await database.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM spell;');
    
    // Verifica se a tabela 'spell' está vazia
    if (result && result.count === 0) {
      console.log("ℹ️ Tabela 'spell' vazia. Iniciando seed de magias...");
      
      for (const spell of spellsData) {
        let verbalSomaticComponents = [];
        let materialComponent = null;

        // Processa os componentes para separar o material
        if (spell.componentes) {
          for (const comp of spell.componentes) {
            if (comp.startsWith('(') && comp.endsWith(')')) {
              materialComponent = comp;
            } else {
              verbalSomaticComponents.push(comp);
            }
          }
        }

        // Insere a magia no banco de dados
        await database.runAsync(
          `INSERT INTO spell (name, level, school, casting_time, range, components, material, classes, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            spell.nome,
            Number(spell.circulo), // Converte o círculo para número (nível da magia)
            spell.escola,
            spell.tempo_de_conjuracao,
            spell.alcance,
            JSON.stringify(verbalSomaticComponents), // Armazena como string JSON
            materialComponent,
            spell.duracao,
            spell.efeito
          ]
        );
      }
      console.log("✅ Seed de magias concluído!");
    } else {
      console.log("ℹ️ Tabela 'spell' já contém dados, seed ignorado.");
    }
    // --- Fim da Lógica de Seed ---

    console.log("✅ Banco de dados inicializado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao inicializar o banco de dados:", error);
  }
}
