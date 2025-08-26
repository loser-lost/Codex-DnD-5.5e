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

    async function read(){
        try {
            const query = 'SELECT * FROM spell'
            const response = await db.getAllAsync<spellDatabase>(query);
            return response;
            
        } catch (error) {
            console.error('Erro ao listar magias:', error);
            throw error;
        }

    }
    
    async function update() {
        
    }

    async function remove() {
        
    }
    return{
        create,
        read,
        update,
        remove
    }
}