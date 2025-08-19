import { type SQLiteDatabase } from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

const DB_NAME = "codexDnd.db";

// Se true, apaga o banco local no início (apenas dev)
const RESET_DATABASE_ON_START = false;

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
 * Cria as tabelas necessárias no banco
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
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS spell (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        level INTEGER NOT NULL CHECK (level >= 0 AND level <= 9),
        school TEXT NOT NULL,
        casting_time TEXT NOT NULL,
        range TEXT NOT NULL,
        components TEXT NOT NULL,
        material TEXT,
        duration TEXT NOT NULL,
        description TEXT NOT NULL,
        id_caracter INTEGER NOT NULL,
        FOREIGN KEY (id_caracter) REFERENCES caracter(id) ON DELETE CASCADE
      );
    `);

    console.log("✅ Banco de dados inicializado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao inicializar o banco de dados:", error);
  }
}
