
import { Button, Input, Layout, Select, SelectItem,IndexPath, useTheme } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import {  StyleSheet } from "react-native";
import {CharacterDatabase, useCharacterDatabase} from '../assets/_database/useCharacterDatabase'
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { races, classees, levels } from "../components/comp/arrays";

const CreateCharacterScreen = () => {
    const router = useRouter();
    const theme = useTheme();
    const characterDb = useCharacterDatabase();
    const {character_id} = useLocalSearchParams();
    const [character, setCharacter] = useState<CharacterDatabase[]>([]);
    const [name, setname] = React.useState('');
    const [playerName, setPlayer] = React.useState('');
    const [selectedRaceIndex, setSelectedRaceIndex] = React.useState<IndexPath | undefined>(undefined);
    const [selectedClassIndex, setSelectedClassIndex] = React.useState<IndexPath | undefined>(undefined);
    const [selectedLevelIndex, setSelectedLevelIndex] = React.useState<IndexPath | undefined>(undefined);

    useEffect(() => {
            if (character_id) {
                characterSearch(); 
            }
    }, [character_id]);

      useEffect(() => {
        if (character.length > 0) {
            setStatesOfCharacter();
        }
    },[character])

    const BackFunction = () => {
        router.back();
      }

    async function characterSearch(){
        try {
            const response = await characterDb.seachById(character_id as string);
            setCharacter(response);
        } catch (error) {
            console.error('Erro ao buscar personagem:', error);
        }
    }

    function setStatesOfCharacter(){
        setname(character[0].name);
        setPlayer(character[0].playerName);
        setSelectedRaceIndex(new IndexPath(races.indexOf(character[0].race)));
        setSelectedClassIndex(new IndexPath(classees.indexOf(character[0].classe)));
        setSelectedLevelIndex(new IndexPath(levels.indexOf(character[0].level)));
    }

    // 🔹 Inicializa selects com valores do personagem
      const displayValueRaça = selectedRaceIndex
        ? races[selectedRaceIndex.row]
        : '';
      const displayValueClasse = selectedClassIndex
        ? classees[selectedClassIndex.row]
        : '';
      const displayValueLevel = selectedLevelIndex
        ? levels[selectedLevelIndex.row] 
        : 0; 

     async function updateCharacter(updated: CharacterDatabase) {
        try {
            await characterDb.update(updated);
            characterSearch(); // recarrega
            BackFunction();
        } catch (error) {
            console.error("Erro ao editar personagem:", error);
        }
      }

      function calEditCharacter(){
        console.log(character[0]);
        const updated = character[0];
        updated.name = name;
        updated.playerName = playerName;
        updated.race = races[selectedRaceIndex!.row];
        updated.classe = classees[selectedClassIndex!.row];
        updated.level = levels[selectedLevelIndex!.row];
        updateCharacter(updated);
      }

    return(
        <Layout style={[ { backgroundColor: theme['background-basic-color-1'] }]} level="1">

              <Layout style={styles.container}>
                    <Input
                      style={styles.input}
                      value={name}
                      placeholder='Nome*'
                      onChangeText={setname}
                    />

                    <Select
                      style={styles.input}
                      value={displayValueRaça}
                      selectedIndex={selectedRaceIndex}
                      onSelect={index => setSelectedRaceIndex(index as IndexPath)}
                      placeholder={'Raça'}
                    >
                     {races.map(r => <SelectItem key={r} title={r} />)}
                    </Select>
                    <Select
                      style={styles.input}
                      value={displayValueClasse}
                      selectedIndex={selectedClassIndex}
                      onSelect={index => setSelectedClassIndex(index as IndexPath)}
                      placeholder={'Classe'}
                    >
                     {classees.map(r => <SelectItem key={r} title={r} />)}
                    </Select>
                    <Select
                      style={styles.input}
                      value={displayValueLevel}
                      selectedIndex={selectedLevelIndex}
                      onSelect={index => setSelectedLevelIndex(index as IndexPath)}
                      placeholder={'Nivel'}
                    >
                     {levels.map(r => <SelectItem key={r} title={r} />)}
                    </Select>

                    <Input
                      style={styles.input}
                      value={playerName}
                      placeholder='Nome do player'
                      onChangeText={setPlayer}
                    />

                    <Layout style={styles.containerbottom}>
                      <Button style={styles.botton} onPress={calEditCharacter}>Salvar</Button>
                      <Button style={styles.botton} onPress={BackFunction}>Cancelar</Button>
                    </Layout>
                </Layout>
            </Layout>
    )
};
export default CreateCharacterScreen;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 15,
    height: '100%',
  },
   input: {
    margin: 4,
  },
  containerbottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  botton:{
    flex: 1,
    margin: 5,
  }
});