import { type SQLiteDatabase } from "expo-sqlite";
import * as FileSystem from "expo-file-system";

const DB_NAME = "codexDnd.db";

// Se true, apaga o banco local no início (apenas dev)
const RESET_DATABASE_ON_START = false;

export async function initializeDatabase(database: SQLiteDatabase) {
  try {
  if (RESET_DATABASE_ON_START) {
    const dbPath = `${FileSystem.documentDirectory}SQLite/${DB_NAME}`;
    const fileInfo = await FileSystem.getInfoAsync(dbPath);
    if (fileInfo.exists) {
      console.log("🗑 Apagando banco local para recriação...");
      await FileSystem.deleteAsync(dbPath, { idempotent: true });
    }
  }

  // Criar tabela caracter se não existir
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS caracter ( 
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      race TEXT NOT NULL,
      class TEXT NOT NULL,
      level INTEGER NOT NULL,
      player_name TEXT,
      color TEXT
    );
  `);

  // Verificar colunas existentes
  const caracterInfo = await database.getAllAsync<{ name: string }>(
    `PRAGMA table_info(caracter)`
  );

  // Renomear 'class' -> 'classe'
  if (caracterInfo.some(col => col.name === "class")) {
    await database.execAsync(`ALTER TABLE caracter RENAME COLUMN class TO classe;`);
  }

  // Renomear 'player_name' -> 'playerName'
  if (caracterInfo.some(col => col.name === "player_name")) {
    await database.execAsync(`ALTER TABLE caracter RENAME COLUMN player_name TO playerName;`);
  }

  // Criar tabela spell se não existir
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
      id_caracter INTEGER,
      FOREIGN KEY (id_caracter) REFERENCES caracter(id)
    );
  `);

    console.log("✅ Banco de dados inicializado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao inicializar o banco de dados:", error);
    
  }
}
