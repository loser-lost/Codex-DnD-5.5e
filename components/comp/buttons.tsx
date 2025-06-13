import { Button } from "@ui-kitten/components";
import { router, useRouter } from "expo-router";

import React from "react";


interface applyFilterButtonProps {
    applyFilter: () => void;
    allFilters: number;
}
interface backButtonProps {
    onBack: () => void;
}
interface clearFiltersButtonProps {
    clearFilters: () => void;
}


export default function BackButton({ onBack }: backButtonProps) {
    const router = useRouter();

    return(
        <>
        <Button onPress={onBack}>Voltar</Button>
        </>
    );
};
export const BackFunction = () => {
        router.back();
}

export function AppliFilterButton({ applyFilter, allFilters }: applyFilterButtonProps) {
    return (
        <>
        <Button onPress={applyFilter}>
            {allFilters > 0 ? `Aplicar: ${allFilters}` : 'Sem filtros'}
        </Button>
        </>
    );
};

export function ClearFiltersButton({ clearFilters }: clearFiltersButtonProps){
    return (
        <>
        <Button onPress={clearFilters}>
            Limpar
        </Button>
        </>
    )
}