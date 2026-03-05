import { useSQLiteContext } from 'expo-sqlite';

export type monster5eINDatabase ={
    name: string,
    ArmorClass: string,
    HitPoints: string,
    STR: string,
    STR_mod: string,
    DEX: string,
    DEX_mod: string,
    CON: string,
    CON_mod: string,
    INT: string,
    INT_mod: string,
    WIS: string,
    WIS_mod: string,
    CHA: string,
    CHA_mod: string,
    SavingThrows: string,
    Skills: string,
    Senses: string,
    Languages: string,
    Challenge: string,
    Traits: string,
    Actions: string,
    LegendaryActions: string,
    img_url: string,
  
}

export function monster5eINData() {
    const db = useSQLiteContext();

    async function read() {
    try {
        const query = 'SELECT * FROM monster5eIN';
        const response = await db.getAllAsync<monster5eINDatabase>(query);
        return response;
    } catch (error) {
        console.error('Erro ao buscar monstros:', error);
        return [];
    }
    }
    return{
        read
    }
}