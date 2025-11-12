import { spellDatabase } from "@/assets/_database/useSpellDatabase";
import { Spell } from "./groupMagic";

export interface SpellFilters{
    selectedCircle: string[];
    schoolsSelected: string[];
    selectedClasses: string[];
    selectedRange: string[];
    selectedTempo: string[];
}

export function filterSpels(magias: Spell[], filters: SpellFilters): Spell[] {
    const {
        selectedCircle ,
        schoolsSelected,
        selectedClasses,
        selectedRange,
        selectedTempo
    } = filters;
    

    return magias.filter((magia) =>{
        const matchCircle = selectedCircle.length === 0 || selectedCircle.includes(magia.circulo);
        const matchSchool = schoolsSelected.length === 0 || schoolsSelected.includes(magia.escola);
        const matchClass = selectedClasses.length === 0 || magia.classes.some(classe => selectedClasses.includes(classe));
        const matchRange = selectedRange.length === 0 || selectedRange.includes(magia.alcance);
        const matchTempo = selectedTempo.length === 0 || selectedTempo.includes(magia.tempo_de_conjuracao);
        return matchCircle && matchSchool && matchClass && matchRange && matchTempo;
    });  
}

export const toggleItem = (
    item: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
};
  

export interface SpellFiltersData{
    selectedCircle: string[];
    schoolsSelected: string[];
    selectedClasses: string[];
    selectedRange: string[];
    selectedTempo: string[];
}

export function filterSpelsData(spells: spellDatabase[], filters: SpellFilters): spellDatabase[] {
    const {
        selectedCircle ,
        schoolsSelected,
        selectedClasses,
        selectedRange,
        selectedTempo
    } = filters;
    

    return spells.filter((spells) =>{
        const matchCircle = selectedCircle.length === 0 || selectedCircle.includes(spells.level.toString());
        const matchSchool = schoolsSelected.length === 0 || schoolsSelected.includes(spells.school);
        const matchClass = selectedClasses.length === 0 || spells.classe.some(classe => selectedClasses.includes(classe));
        // A propriedade spells.classe é uma string, não um array.
        //const matchClass = selectedClasses.length === 0 || selectedClasses.includes(spells.classe);
        const matchRange = selectedRange.length === 0 || selectedRange.includes(spells.range);
        const matchTempo = selectedTempo.length === 0 || selectedTempo.includes(spells.castingTime);
        return matchCircle && matchSchool && matchClass && matchRange && matchTempo;
    });  
}