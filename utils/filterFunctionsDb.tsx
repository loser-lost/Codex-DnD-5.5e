import { spellDatabase } from "@/assets/_database/useSpellDatabase";

export const toggleItem = (
    item: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
};
  

export interface SpellFiltersData{
   selectedCircle: string[];
    selectedClasses: string[];
}

export function filterSpelsData(spells: spellDatabase[], filters: SpellFiltersData): spellDatabase[] {
    const { selectedCircle, selectedClasses } = filters;
    

    return spells.filter((spells) =>{
        const matchCircle = selectedCircle.length === 0 || selectedCircle.includes(spells.level.toString());
        const matchClass = selectedClasses.length === 0 || spells.classe.some(classe => selectedClasses.includes(classe));
   
        return matchCircle  && matchClass ;
    });  
}