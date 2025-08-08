import { type SQLiteDatabase } from "expo-sqlite"
export async function initializeDatabase(database: SQLiteDatabase) {
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
        
    `)
}