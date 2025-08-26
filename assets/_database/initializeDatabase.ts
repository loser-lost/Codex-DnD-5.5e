import { type SQLiteDatabase } from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

// nome da database
const DB_NAME = "codexDnd.db";
// Modo dev?
const RESET_DATABASE_ON_START = true;

// entrada do seed para spells
const spellsData = [
    {
        "magia_id": "1",
        "nome": "Acalmar Emoções",
        "circulo": "2",
        "escola": "Encantamento",
        "classes": ["Bardo", "Clérigo"],
        "tempo_de_conjuracao": "Ação",
        "alcance": "18 metros",
        "componentes": ["V", "S"],
        "duracao": "Concentração, até 1 minuto",
        "efeito": "Cada Humanoide em uma Esfera de 6 metros de raio centrada em um ponto à sua escolha no alcance da magia deve ser bem-sucedido em uma salvaguarda de Carisma ou é afetado por um dos seguintes efeitos (escolha um para cada criatura): A criatura tem Imunidade às condições Amedrontado e Enfeitiçado até que a magia termine. Se a criatura já estiver Amedrontada ou Enfeitiçada, essas condições são suprimidas pela duração da magia. A criatura se torna Indiferente às criaturas à sua escolha em relação às quais é Hostil. Essa indiferença encerra se o alvo sofrer dano ou testemunhar os aliados dela sofrendo dano. Quando a magia termina, a atitude da criatura volta ao normal."
    },
    {
        "magia_id": "2",
        "nome": "Acudir os Moribundos",
        "circulo": "0",
        "escola": "Necromancia",
        "classes": ["Clérigo", "Druida"],
        "tempo_de_conjuracao": "Ação",
        "alcance": "4,5 metros",
        "componentes": ["V", "S"],
        "duracao": "Instantânea",
        "efeito": "Escolha uma criatura no alcance da magia que tenha 0 Pontos de Vida e não esteja morta. A criatura fica Estável. Aprimoramento de Truque: O alcance da magia dobra quando você atinge os níveis 5 (9 metros), 11 (18 metros) e 17 (36 metros)."
    }
];


export async function getDatabase(): Promise<SQLiteDatabase> {
  const sqliteDir = `${FileSystem.documentDirectory}SQLite`;
  await FileSystem.makeDirectoryAsync(sqliteDir, { intermediates: true });

  const dbPath = `${sqliteDir}/${DB_NAME}`;

  if (RESET_DATABASE_ON_START) {
    try {
      const fileInfo = await FileSystem.getInfoAsync(dbPath);
      if (fileInfo.exists) {
        console.log("🗑 Apagando banco local para recriação...");
        await FileSystem.deleteAsync(dbPath, { idempotent: true });
      }
    } catch (error) {
      console.warn("⚠️ Não foi possível apagar o banco:", error);
    }
  }

  // garante que estamos abrindo o mesmo caminho que apagamos
  const db = SQLite.openDatabaseSync(dbPath);
  return db;
}

export async function initializeDatabase(database: SQLiteDatabase) {
    try {
        // tabela personagens
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

        // tabela spells
        await database.execAsync(`
        CREATE TABLE IF NOT EXISTS spell (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            level INTEGER NOT NULL CHECK (level >= 0 AND level <= 9),
            school TEXT NOT NULL,
            classe TEXT NOT NULL,
            castingTime TEXT NOT NULL,
            range TEXT NOT NULL,
            components TEXT NOT NULL,
            duration TEXT NOT NULL,
            description TEXT NOT NULL
        );        
        `);

        await database.execAsync(`
        CREATE TABLE IF NOT EXISTS character_spell (
            character_id INTEGER NOT NULL,
            spell_id INTEGER NOT NULL,
            PRIMARY KEY (character_id, spell_id),
            FOREIGN KEY (character_id) REFERENCES caracter(id) ON DELETE CASCADE,
            FOREIGN KEY (spell_id) REFERENCES spell(id) ON DELETE CASCADE
        );
        `);

        // verifica se spells está vazia
        const result = await database.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM spell;');
        if (result && result.count === 0) {
            console.log("ℹ️ Tabela 'spell' vazia. Iniciando seed de magias...");

            for (const spell of spellsData) {
               await database.execAsync(
                    `INSERT INTO spell (name, level, school, classe, castingTime, range, components, duration, description) 
                     VALUES ('${spell.nome}', ${Number(spell.circulo)}, '${spell.escola}', '${spell.classes.join(",")}', '${spell.tempo_de_conjuracao}', '${spell.alcance}', '${spell.componentes.join(",")}', '${spell.duracao}', '${spell.efeito}');`
                );
            }
            console.log("✅ Seed de magias concluído!");
        } else {
            console.log("ℹ️ Tabela 'spell' já contém dados, seed ignorado.");
        }

    } catch (error) {
        console.error("❌ Erro ao inicializar o banco de dados:", error);
    }
}
