import { useSQLiteContext } from 'expo-sqlite';
import { spellDatabase } from './useSpellDatabase';

export type CharacterSpell = {
    character_id: number;
    spell_id: number;
};

export function useCharacterSpellDatabase() {
    // ✅ 1. Obtenha o contexto do DB UMA VEZ, no topo do Hook.
    const db = useSQLiteContext();

    async function createSC(date: CharacterSpell) {
        const statement = await db.prepareAsync(
            "INSERT INTO character_spell(character_id, spell_id) VALUES ($character_id, $spell_id)"
        );
        try {
            const result = await statement.executeAsync({
                $character_id: date.character_id,
                $spell_id: date.spell_id,
            });
            return { insertedRowId: result.lastInsertRowId };
        } catch (error) {
            console.error('Erro ao adicionar a magia ao personagem:', error);
            return { insertedRowId: null };
        } finally {
            await statement.finalizeAsync();
        }
    }
    
    // ✅ 2. A função de busca agora usa a instância 'db' do escopo do Hook.
    // Sem 'try/finally' para fechar o banco e sem chamar o Hook novamente.
    async function searchSpellsByCharacterid(id: number) {
        const query = 'SELECT t1.character_id, t1.spell_id, t2.* FROM character_spell AS t1 INNER JOIN spell AS t2 ON t1.spell_id = t2.id WHERE t1.character_id = ?;';
        try {
            const response = await db.getAllAsync<spellDatabase>(query, [id]);
            return response;
        } catch (error) {
            console.error('Erro ao buscar magia do personagem por id:', error);
            return [];
        }
    }

    async function checkIfExists(characterId: number, spellId: number): Promise<boolean> {
        try {
            const query = 'SELECT 1 FROM character_spell WHERE character_id = ? AND spell_id = ? LIMIT 1';
            const response = await db.getFirstAsync(query, [characterId, spellId]);
            return response !== null;
        } catch (error) {
            console.error('Erro ao verificar existência da magia:', error);
            return false;
        }
    }

    async function remove(id: number) {
        try {
            await db.runAsync("DELETE FROM character_spell WHERE spell_id = ?", [id]);
        } catch (error) {
            console.error('Erro ao deletar magia:', error);
        }
    }

    // ✅ 3. Remova a função duplicada e a função read() se não estiver sendo usada.

    return {
        createSC,
        remove,
        checkIfExists,
        searchSpellsByCharacterid,
    };
}