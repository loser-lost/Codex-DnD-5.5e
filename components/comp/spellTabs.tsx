import React, { useCallback, useMemo } from "react";
import { SectionList, StyleSheet, ViewStyle } from "react-native";
import { Layout, TabView, Tab, Input } from "@ui-kitten/components";
import { RenderSectionHeaderDb, RenderSpell, RenderKnowSpell } from "../comp/sectionComponents";
import { spellDatabase } from "@/assets/_database/useSpellDatabase";
import { groupSortSpells } from "@/utils/groupMagicDb";

// Padronização: Interfaces começam com Letra Maiúscula
interface SpellTabsProps {
    spels: spellDatabase[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    spelsKnow: spellDatabase[]; 
    addSpell: (id: number) => void;
    removeSpell: (id: number) => void;
}

const SpellTabs: React.FC<SpellTabsProps> = ({ 
    spels, 
    spelsKnow, 
    searchQuery, 
    setSearchQuery, 
    addSpell, 
    removeSpell 
}) => {
    const [selectedIndexTab, setSelectedIndexTab] = React.useState(0);

    // Agrupar as magias (Memoizado)
    const spellInSectionsSelected = useMemo(() => groupSortSpells(spelsKnow), [spelsKnow]);
    const spellInSections = useMemo(() => groupSortSpells(spels), [spels]);

    // Funções de Renderização (Memoizadas)
    const renderItemSpels = useCallback(({item}: {item: spellDatabase}) => {
        // Verifica se já conhece para desabilitar botão ou mudar ícone
        const isKnow = spelsKnow.some(spell => spell.id === item.id);
        return(
            <RenderSpell 
                item={item} 
                buttonKnow={() => addSpell(item.id)} 
                isKnow={isKnow} 
            />
        );
    }, [spelsKnow, addSpell]);

    const renderItemSpelsKnow = useCallback(({ item }: { item: spellDatabase }) => (
        <RenderKnowSpell 
            item={item} 
            removeSpell={() => removeSpell(item.id)} 
        />
    ), [removeSpell]);

    // Extraído para evitar recriação da função a cada render
    const renderSectionHeader = useCallback(({ section }: any) => (
        <RenderSectionHeaderDb title={section.title} data={section.data} />
    ), []);

    return(
        <Layout style={styles.container}>
            <TabView 
                style={styles.tabView}
                selectedIndex={selectedIndexTab}
                onSelect={index => setSelectedIndexTab(index)}
            >
                <Tab title='Magias Conhecidas'>
                    <Layout style={styles.tabContent}>
                        <SectionList
                            sections={spellInSectionsSelected}
                            keyExtractor={(item, index) => `${item.id}-${index}`}
                            renderSectionHeader={renderSectionHeader}
                            renderItem={renderItemSpelsKnow}
                            contentContainerStyle={styles.listContent}
                            // Otimizações
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            windowSize={10}
                            removeClippedSubviews={true}
                        />
                    </Layout>
                </Tab>
                
                <Tab title="Todas as Magias">
                    <Layout style={styles.tabContent}>
                        <Input
                            placeholder="Buscar magia..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            style={styles.searchInput}
                        />
                        <SectionList
                            sections={spellInSections}
                            keyExtractor={(item, index) => `${item.id}-${index}`}
                            renderSectionHeader={renderSectionHeader}
                            renderItem={renderItemSpels}
                            contentContainerStyle={styles.listContent}
                            // Otimizações
                            initialNumToRender={15}
                            maxToRenderPerBatch={10}
                            windowSize={15}
                            removeClippedSubviews={true}
                        />
                    </Layout>
                </Tab>
            </TabView>
        </Layout>
    );
}

export default React.memo(SpellTabs);

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa todo o espaço do pai
    },
    tabView: {
        flex: 1, 
    },
    tabContent: {
        flex: 1, // Garante que o conteúdo da aba ocupe o espaço vertical total
        paddingHorizontal: 10, // Um pouco de respiro nas laterais
    },
    searchInput: {
        marginVertical: 10,
    },
    listContent: {
        paddingBottom: 20, // Espaço no final da lista para não cortar o último item
    }
});