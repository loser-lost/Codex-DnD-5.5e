import { useSQLiteContext } from 'expo-sqlite';

export type spellDatabase ={
    id: number;
    name: string;
    level: number;
    school: string;
    classe: string[];
    castingTime: string;
    range: string;
    components: string[];
    duration: string;
    description: string;
}

export function useSpellDatabase() {
    const db = useSQLiteContext();

    async function create(date: Omit<spellDatabase, "id">){

    }

    async function read() {
    try {
        const query = 'SELECT * FROM spell';
        const response = await db.getAllAsync<Omit<spellDatabase, 'classe'> & { classe: string }>(query);

        // Converte a string de classes para um array de strings
        const spellsWithArrayClasses = response.map(spell => ({
        ...spell,
        classe: spell.classe.split(',') // Assume que as classes são separadas por vírgula
        }));

        //console.log('Magias retornadas do banco de dados:', spellsWithArrayClasses);
        return spellsWithArrayClasses;
    } catch (error) {
        console.error('Erro ao listar magias:', error);
        throw error;
    }
    }
    
    async function update() {
        
    }

    async function remove() {
        try {
            //await db.runAsync("DELETE FROM ")
            
        } catch (error) {
            console.error('Erro ao deletar magia:', error); 
        }
        
    }
    return{
        create,
        read,
        update,
        remove
    }
}