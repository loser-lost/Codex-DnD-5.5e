/*import React, { useCallback, useMemo } from "react";
import { SectionList } from "react-native";
import { Layout, TabView, Tab } from "@ui-kitten/components";
import { RenderSectionHeaderDb, RenderSpell, RenderKnowSpell } from "../comp/sectionComponents";
import { spellDatabase } from "@/assets/_database/useSpellDatabase";
import { groupSortSpells } from "@/utils/groupMagicDb";

interface spellTabsProps {
    spels: spellDatabase[];
    spelsKnow: spellDatabase[]; 
    addSpell: (id: number) => void;
    removeSpell: (id: number) => void;
}

const SpellTabs: React.FC<spellTabsProps> = ({ spels, spelsKnow, addSpell, removeSpell }) => {
    const [selectedIndexTab, setSelectedIndexTab] = React.useState(0);

    //agrupar as magias
    const spellInSectionsSelected = useMemo(() => groupSortSpells(spelsKnow), [spelsKnow]);
    const spellInSections = useMemo(() => groupSortSpells(spels), [spels]);

    const renderItemSpels = useCallback(({item}:{item: spellDatabase}) => {
        const handleKnowSpell = () => addSpell(item.id);
        const isKnow = spelsKnow.some(spell => spell.id === item.id);
        return(
            <RenderSpell item={item} buttonKnow={handleKnowSpell} isKnow={isKnow} />
        );
    }, [spelsKnow, addSpell]);

     const renderItemSpelsKnow = useCallback(
        ({ item }: { item: spellDatabase }) => (
            <RenderKnowSpell item={item} removeSpell={() => removeSpell(item.id)} />
        ),
        [removeSpell]
    );
       
    return(
        <TabView 
            selectedIndex={selectedIndexTab}
            onSelect={index => setSelectedIndexTab(index)}
            >
                <Tab title='Magias Conhecidas'>
                    <Layout style={{ flex: 1}}>
                        <SectionList
                            sections={spellInSectionsSelected}
                            keyExtractor={item => String(item.id)}
                            renderSectionHeader={({ section }) => (
                                <RenderSectionHeaderDb title={section.title} data={section.data} />
                            )}
                            renderItem={renderItemSpelsKnow}
                            initialNumToRender={5}
                            maxToRenderPerBatch={5}
                            windowSize={5}
                            removeClippedSubviews
                        />
                    </Layout>
                </Tab>
                <Tab title="Todas as Magias">
                    <Layout style={{ flex: 1 }}>
                    <SectionList
                        sections={spellInSections}
                        keyExtractor={item => String(item.id)}
                        renderSectionHeader={({ section }) => (
                        <RenderSectionHeaderDb title={section.title} data={section.data} />
                        )}
                        renderItem={renderItemSpels}
                        initialNumToRender={5}
                        maxToRenderPerBatch={5}
                        windowSize={5}
                        removeClippedSubviews
                    />
                    </Layout>
                </Tab>

        </TabView>
    );

}
export default React.memo(SpellTabs);*/