import { useSQLiteContext } from 'expo-sqlite';
import { spellDatabase } from './useSpellDatabase';

export type CharacterSpell ={
    character_id: number;
    spell_id: number;

}

export function useCharacterSpellDatabase() {
    const db = useSQLiteContext();

    async function createSC(date: CharacterSpell) {
        const statement = await db.prepareAsync(
            "INSERT INTO character_spell(character_id, spell_id) VALUES ($character_id, $spell_id)"
        )
        try {
           
            const result = await statement.executeAsync({
                $character_id: date.character_id,
                $spell_id: date.spell_id,
            })
            const insertedRowId = result.lastInsertRowId?.toString();
            return { insertedRowId };
        }catch (error) {
            console.error('Erro ao adicionar a magia ao personagem:', error);
            return { insertedRowId: null }; 
        } finally{
            await statement.finalizeAsync();
        }
    }

    async function read(character_id: number) {
        try {
            const query = 'SELECT * FROM character_spell WHERE character_id = ?';
            const response = await db.getAllAsync<CharacterSpell>(query, [character_id]);
            console.log('Magias retornadas do banco de dados:', response);
            return response;
        } catch (error) {
            console.error('Erro ao listar magias:', error);   
            return []; 
        }
    }
    async function searchById(id: number | number[]) {
        try {
            const idArray = Array.isArray(id) ? id : [id];
            const placeholders = idArray.map(() => '?').join(', ');

            const query = `SELECT * FROM spell WHERE id IN (${placeholders})`;
            const response = await db.getAllAsync<spellDatabase>(query, idArray)
            return response;
        } catch (error) {
            console.error('Erro ao buscar magia do personagem por id:', error);
            return [];
        }
    }

    async function searchSpellsByCharacterid(id: number){
        const query = 'SELECT t1.character_id,  t1.spell_id,  t2.*  FROM character_spell AS t1 INNER JOIN spell AS t2 ON t1.spell_id = t2.id  WHERE t1.character_id = ?;'
        try {
            const response = await db.getAllAsync<spellDatabase>(query, [id]);
            return response;
        } catch (error) {
            console.error('Erro ao buscar magia do personagem por id:', error);
            return [];
        }
    }
    async function update() {
        
    }


    async function checkIfExists(characterId: number, spellId: number): Promise<boolean> {
    try {
        const query = 'SELECT 1 FROM character_spell WHERE character_id = ? AND spell_id = ?';
        const response = await db.getFirstAsync(query, [characterId, spellId]);
        return response !== null; // Retorna true se encontrar um registro, false caso contrário
    } catch (error) {
        console.error('Erro ao verificar existência da magia:', error);
        return false;
    }
}
    async function remove() {
        
    }
    return{
        createSC,
        read,
        update,
        remove,
        searchById,
        checkIfExists,
        searchSpellsByCharacterid
    }
}