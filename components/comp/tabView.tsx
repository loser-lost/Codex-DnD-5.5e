import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Tab, TabView,Text } from "@ui-kitten/components";

export const TabViewComponent: React.FC = () => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <>
        <TabView
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}
            >
            <Tab title='Magias Conhecidas'>
                <Layout style={styles.tabContainer}>
                    <Text>Conteúdo de Magias Conhecidas</Text>
                </Layout>
            </Tab>
            <Tab title='Todas as Magias'>
                <Layout style={styles.tabContainer}>
                    <Text>Todas as Magias</Text>
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