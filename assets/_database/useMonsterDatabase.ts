import { useSQLiteContext } from 'expo-sqlite';

export type spellDatabase ={
 //added livro and linguagem
  
}

export function useSpellDatabase() {
    const db = useSQLiteContext();


    async function create(date: Omit<spellDatabase, "id">){

    }

    async function read() {
    try {
       
    } catch (error) {
        console.error('', error);
        throw error;
    }
    }
    
    async function update() {
        
    }

    async function remove() {
        try {
            
        } catch (error) {
            console.error('', error); 
        }  
    }
    return{
        create,
        read,
        update,
        remove
    }
}