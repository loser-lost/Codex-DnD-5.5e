import { Button, Layout } from "@ui-kitten/components";
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
        <Layout>
        <Button onPress={onBack}>Voltar</Button>
        </Layout>
    );
};
export const BackFunction = () => {
        router.back();
}

export function AppliFilterButton({ applyFilter, allFilters }: applyFilterButtonProps) {
    return (
        <Layout>
        <Button onPress={applyFilter}>
            {allFilters > 0 ? `Aplicar: ${allFilters}` : 'Sem filtros'}
        </Button>
        </Layout>
    );
};

export function ClearFiltersButton({ clearFilters }: clearFiltersButtonProps){
    return (
        <Layout>
        <Button onPress={clearFilters}>
            Limpar
        </Button>
        </Layout>
    )
}