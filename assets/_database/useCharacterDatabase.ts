import { useSQLiteContext } from 'expo-sqlite';

export type CharacterDatabase = {
    id: number;
    name: string;
    race: string;
    classe: string;
    level: number;
    playerName: string;
    
}



export function useCharacterDatabase() {
    const db = useSQLiteContext();

    async function create(date: Omit<CharacterDatabase, "id">){
        const statement = await db.prepareAsync(
            "INSERT INTO caracter(name, race, classe, level, playerName) VALUES ($name, $race, $classe, $level, $playerName)"
        )
        try {
            const result = await statement.executeAsync({
                $name: date.name,
                $race: date.race,
                $classe: date.classe,
                $level: date.level,
                $playerName: date.playerName,
                
            })
            const insertedRowId = result.lastInsertRowId?.toString();
            return { insertedRowId };
        } catch (error) {
            console.error('Erro ao criar personagem:', error);
            return;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function seachById(id: string) {
    try {
        const query = 'SELECT * FROM caracter WHERE id = ?';
        const response = await db.getAllAsync<CharacterDatabase>(query, [id]);
        return response;
    } catch (error) {
        console.error('Erro ao buscar personagem por id:', error);
        throw error;  
    }
    
}

    async function read(){
        try {
            const query = 'SELECT * FROM caracter';
            const response = await db.getAllAsync<CharacterDatabase>(query);
            return response;
        } catch (error) {
            console.error('Erro ao listar personagens:', error);
            throw error;     
        }
    }
    
    async function update(date: CharacterDatabase) {
        const statement = await db.prepareAsync(
            "UPDATE caracter SET name = $name, race = $race, classe = $classe, level = $level, playerName = $playerName WHERE id = $id"
        )
        try {
            await statement.executeAsync({
                $id: date.id,
                $name: date.name,
                $race: date.race,
                $classe: date.classe,
                $level: date.level,
                $playerName: date.playerName,
            })
        } catch (error) {
            console.error('Erro ao criar personagem:', error);
            return;
        } finally {
            await statement.finalizeAsync();
        }
    }
    async function remove(id: Number) {
        try {
            //const query = "DELETE FROM caracter WHERE id = ";
            await db.execAsync("DELETE FROM caracter WHERE id = " + id);
            // Lógica para deletar os personagens do banco de dados
        } catch (error) {
            console.error('Erro ao listar personagens:', error);
            throw error;    
        }
    }
    return {
        
        create,
        seachById,
        read,
        update,
        remove
    }
}

