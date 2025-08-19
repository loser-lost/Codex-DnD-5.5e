import { Layout , Text} from "@ui-kitten/components";
import { useTheme } from "@ui-kitten/components/theme";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {useCharacterDatabase, CharacterDatabase} from '../assets/_database/useCharacterDatabase'

import {  StyleSheet } from 'react-native';
import { useEffect, useState,  } from "react";
import React from "react";
import { StarIcon } from "@/utils/useIcons";
import { TabViewComponent } from "@/components/comp/tabView";



const CharacterDetails = () => {
    const router = useRouter();
    const teme = useTheme();
    const {character_id} = useLocalSearchParams();
    const characterDb = useCharacterDatabase();
    const [character, setCharacter] = useState<CharacterDatabase[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    useEffect(() => {
        characterSearch();
    }, []);

    async function characterSearch(){
        try {
            const response = await characterDb.seachById(character_id as string);
            console.log(response);
            setCharacter(response);
    
        } catch (error) {
            console.error('Erro ao buscar personagem:', error);
            throw error; 
        }
    }

    return (
        <Layout style={[styles.container, { backgroundColor: teme['background-basic-color-1'] }]}>
            <Stack.Screen options={{ headerShown: false }} />
            <Layout style={styles.headerIcons}>
                <StarIcon />
            </Layout>
            <Layout style={styles.header}>

            {character.length > 0 ? (
                character.map((Char) => (
                    <Layout key={Char.id} style={{ marginBottom: 16 }}>
                        <Text category="h5">{Char.name}</Text>
                        <Text category="s1">{`Raça: ${Char.race}`}</Text>
                        <Text category="s1">{`Classe: ${Char.classe}`}</Text>
                        <Text category="s1">{`Nível: ${Char.level}`}</Text>
                    </Layout>
                ))
            ) : (
                <Text category="s1">Nenhum personagem encontrado.</Text>
            )}
            <Text>Nivel de magia</Text>
            </Layout>

            <TabViewComponent />
            
        </Layout>
    )
} 
export default CharacterDetails;
const styles = StyleSheet.create({
container: {
        flex: 1,
        padding: 20,
  },
headerIcons: { 
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15 
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});