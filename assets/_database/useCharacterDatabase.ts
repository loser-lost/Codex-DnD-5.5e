import { useSQLiteContext } from 'expo-sqlite';

export type CharacterDatabase = {
    id: number;
    name: string;
    race: string;
    classe: string;
    level: number;
    playerName: string;
    color: string;
}



export function useCharacterDatabase() {
    const db = useSQLiteContext();

    async function create(date: Omit<CharacterDatabase, "id">){
        const statement = await db.prepareAsync(
            "INSERT INTO caracter(name, race, classe, level, playerName, color) VALUES ($name, $race, $classe, $level, $playerName, $color)"
        )
        try {
            const result = await statement.executeAsync({
                $name: date.name,
                $race: date.race,
                $classe: date.classe,
                $level: date.level,
                $playerName: date.playerName,
                $color: date.color
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

    async function seachByName(name: string) {
    try {
        const query = 'SELECT * FROM caracter WHERE name LIKE ?';

        const response = await db.getAllAsync<CharacterDatabase>(query, '%${name}%')

        return response;
    } catch (error) {
        console.error('Erro ao buscar personagem por nome:', error);
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
    
    async function update(){
        // Lógica para atualizar os personagens do banco de dados
    }
    async function remove(){
        // Lógica para deletar os personagens do banco de dados
    }
    return {
        
        create,
        seachByName,
        read,
        update,
        remove
    }
}

