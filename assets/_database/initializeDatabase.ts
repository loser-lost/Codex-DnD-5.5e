import { type SQLiteDatabase } from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import spellsJson  from "../json/magias.json";

// nome da database
const DB_NAME = "codexDnd.db";
// Modo dev?
const RESET_DATABASE_ON_START = true;

// entrada do seed para spells
const spellsData = spellsJson.magias;


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

         await database.execAsync(`
        CREATE TABLE IF NOT EXISTS monsterSistem ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            livro TEXT NOT NULL,
            linguagem TEXT NOT NULL
        );
        `);
        await database.execAsync(`
        CREATE TABLE IF NOT EXISTS monster5eIN ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            armorClass TEXT NOT NULL,
            hitPoints TEXT NOT NULL,
            STR INTEGER NOT NULL,
            STR_mod TEXT NOT NULL,
            DEX INTEGER NOT NULL,
            DEX_mod TEXT NOT NULL,
            CON INTEGER NOT NULL,
            CON_mod TEXT NOT NULL,
            INT INTEGER NOT NULL,
            INT_mod TEXT NOT NULL,
            WIS INTEGER NOT NULL,
            WIS_mod TEXT NOT NULL,
            CHA INTEGER NOT NULL,
            CHA_mod TEXT NOT NULL,
            savingThrows TEXT,
            Skills TEXT,
            Senses TEXT,
            Languages TEXT,
            Challenge TEXT,
            Traits TEXT,
            Actions TEXT,
            LegendaryActions TEXT,
            img_url TEXT,
        );
        `);

        // verifica se spells está vazia
        const result = await database.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM spell;');
        if (result && result.count === 0) {
            console.log("ℹ️ Tabela 'spell' vazia. Iniciando seed de magias...");

            for (const spell of spellsData) {
              await database.runAsync(
                `INSERT INTO spell (name, level, school, classe, castingTime, range, components, duration, description) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [
                  spell.nome,
                  Number(spell.circulo),
                  spell.escola,
                  spell.classes.join(","),
                  spell.tempo_de_conjuracao,
                  spell.alcance,
                  spell.componentes.join(","),
                  spell.duracao,
                  spell.efeito,
                ]
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
