
export const toggleItem = (
    item: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
};



  