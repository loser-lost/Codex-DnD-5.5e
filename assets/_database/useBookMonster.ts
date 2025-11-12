import { useSQLiteContext } from 'expo-sqlite';

export type BookMonster ={
    id: number;
    name: string;
    livro: string;
    linguagem: string;
}

export function useSpellDatabase() {
    const db = useSQLiteContext();

    async function create(date: Omit<BookMonster, "id">){
        const statement = await db.prepareAsync(
            "INSERT INTO monsterSistem(name, livro, linguagem) VALUES ($name, $livro, $linguagem)"
        );
        try{
            const result = await statement.executeAsync({
                $name: date.name,
                $livro: date.livro,
                $linguagem: date.linguagem
            })
            return { insertedRowId: result.lastInsertRowId };
        }
        catch (error) {
            console.error('Erro ao adcionar livro.', error);
        }

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