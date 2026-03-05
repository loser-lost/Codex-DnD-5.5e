import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { type SQLiteDatabase } from "expo-sqlite";

// Arquivos JSON
import spellsJson from "../json/magias.json";
import Monsters5eIN from "../json/monsters5eIn.json";

// Configurações do Banco
const DB_NAME = "codexDnd.db";
const RESET_DATABASE_ON_START = true; // Lembre-se de mudar para 'false' quando for lançar o app!

// Dados extraídos dos JSONs
const spellsData = spellsJson.magias;
const monster5eINData = Monsters5eIN.Monsters5eIN;

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

  const db = await SQLite.openDatabaseAsync(dbPath); // openDatabaseAsync é a forma recomendada nas versões mais novas
  return db;
}

export async function initializeDatabase(database: SQLiteDatabase) {
  try {
    // 1. Criação de todas as tabelas
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS character ( 
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          race TEXT NOT NULL,
          classe TEXT NOT NULL,
          level INTEGER NOT NULL,
          playerName TEXT
      );

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

      CREATE TABLE IF NOT EXISTS character_spell (
          character_id INTEGER NOT NULL,
          spell_id INTEGER NOT NULL,
          PRIMARY KEY (character_id, spell_id),
          FOREIGN KEY (character_id) REFERENCES character(id) ON DELETE CASCADE,
          FOREIGN KEY (spell_id) REFERENCES spell(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS monsterSistem ( 
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          livro TEXT NOT NULL,
          linguagem TEXT NOT NULL
      );

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
          img_url TEXT
      );
    `);

    // 2. Seed de Magias (Otimizado com Transação)
    const resultSpells = await database.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM spell;');
    if (resultSpells && resultSpells.count === 0) {
      console.log("ℹ️ Tabela 'spell' vazia. Iniciando seed de magias...");
      
      await database.withTransactionAsync(async () => {
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
      });
      console.log("✅ Seed de magias concluído!");
    } else {
      console.log("ℹ️ Tabela 'spell' já contém dados, seed ignorado.");
    }

    // 3. Seed de Monstros (Otimizado com Transação)
    const resultMonsters = await database.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM monster5eIN;');
    if (resultMonsters && resultMonsters.count === 0) {
      console.log("ℹ️ Tabela 'monster5eIN' vazia. Iniciando seed de monstros...");
      
      await database.withTransactionAsync(async () => {
        for (const monster5eIN of monster5eINData) {
          await database.runAsync(
            `INSERT INTO monster5eIN (name, armorClass, hitPoints, STR, STR_mod, DEX, DEX_mod, CON, CON_mod, INT, INT_mod, WIS, WIS_mod, CHA, CHA_mod, savingThrows, Skills, Senses, Languages, Challenge, Traits, Actions, LegendaryActions, img_url) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [
              monster5eIN.name,
              monster5eIN.ArmorClass,
              monster5eIN.HitPoints,
              monster5eIN.STR,
              monster5eIN.STR_mod,
              monster5eIN.DEX,
              monster5eIN.DEX_mod,
              monster5eIN.CON,
              monster5eIN.CON_mod,
              monster5eIN.INT,
              monster5eIN.INT_mod,
              monster5eIN.WIS,
              monster5eIN.WIS_mod,
              monster5eIN.CHA,
              monster5eIN.CHA_mod,
              monster5eIN.SavingThrows ?? null,
              monster5eIN.Skills ?? null,
              monster5eIN.Senses ?? null,
              monster5eIN.Languages ?? null,
              monster5eIN.Challenge,
              monster5eIN.Traits ?? null,
              monster5eIN.Actions ?? null,
              monster5eIN.LegendaryActions ?? null,
              monster5eIN.img_url ?? null,
            ]
          );
        }
      });
      console.log("✅ Seed de monstros concluído!");
    } else {
      console.log("ℹ️ Tabela 'monster5eIN' já contém dados, seed ignorado.");
    }

  } catch (error) {
    console.error("❌ Erro ao inicializar o banco de dados:", error);
  }
}