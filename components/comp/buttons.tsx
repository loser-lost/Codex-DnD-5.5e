import { Button } from "@ui-kitten/components";
import { useRouter } from "expo-router";

import React from "react";


interface applyFilterButtonProps {
    applyFilter: () => void;
    totalFiltros: number;
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

export function AppliFilterButton({ applyFilter, totalFiltros }: applyFilterButtonProps) {
    return (
        <>
        <Button onPress={applyFilter}>
            {totalFiltros > 0 ? `Aplicar: ${totalFiltros}` : 'Sem filtros'}
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