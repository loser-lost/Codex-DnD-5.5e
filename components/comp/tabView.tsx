import React, { useMemo } from "react";
import { SectionList, StyleSheet } from "react-native";
import { Layout, Tab, TabView,Text } from "@ui-kitten/components";
import { RenderSectionHeader } from "./renderSpell";

export const TabViewComponent: React.FC = () => {

    const [selectedIndexTab, setSelectedIndexTab] = React.useState(0);
     


    return (
        <>
        <TabView
            selectedIndex={selectedIndexTab}
            onSelect={index => setSelectedIndexTab(index)}
            >
            <Tab title='Magias Conhecidas'>
                <Layout style={styles.tabContainer}>
                    <Text>Conteúdo de Magias Conhecidas</Text>
                </Layout>
            </Tab>
            <Tab title='Todas as Magias'>
                <Layout style={styles.tabContainer}>
                    <Text>Conteúdo de Todas as Magias</Text>
                </Layout>
            </Tab>
        </TabView>
        </>
    )
};
const styles = StyleSheet.create({
  tabContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});