
import { Button, Input, Layout, Select, SelectItem,IndexPath, useTheme } from "@ui-kitten/components";
import React, { useMemo } from "react";
import { Alert, StyleSheet } from "react-native";
import {useCharacterDatabase} from '../assets/_database/useCharacterDatabase'
import { Stack, useRouter } from "expo-router";
import { races, classees, levels } from "../components/comp/arrays";

const CreateCharacterScreen = () => {
    const router = useRouter();
    const theme = useTheme();

    const [name, setname] = React.useState('');
    const [playerName, setPlayer] = React.useState('');
    const [selectedRaceIndex, setSelectedRaceIndex] = React.useState<IndexPath | undefined>(undefined);
    const [selectedClassIndex, setSelectedClassIndex] = React.useState<IndexPath | undefined>(undefined);
    const [selectedLevelIndex, setSelectedLevelIndex] = React.useState<IndexPath | undefined>(undefined);


    const  characterDatabase  = useCharacterDatabase();
    const BackFunction = () => {router.back();}
    
    const displayValueRaça = selectedRaceIndex
    ? races[selectedRaceIndex.row]
    : '';
    const displayValueClasse = selectedClassIndex
    ? classees[selectedClassIndex.row]
    : '';
    const displayValueLevel = selectedLevelIndex
    ? levels[selectedLevelIndex.row] 
    : 0; 
    
    async function saveCharacter(){
      const race = selectedRaceIndex !== undefined ? races[selectedRaceIndex.row] : '';
      const classe = selectedClassIndex !== undefined ? classees[selectedClassIndex.row] : '';
      const level = displayValueLevel;
      try {
        if(isNaN(Number(level)) || !name || !classe ) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        } 
        const response = await characterDatabase.create({name, race, classe, level: Number(level), playerName})
        if (response && response.insertedRowId) {
            router.push('/characters');
        } else {
            return Alert.alert("Erro ao salvar personagem.");
        }
      }catch (error) {
        console.error('Erro ao salvar personagem:', error);
        alert('Erro ao salvar personagem. Tente novamente.');
      }
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
                      <Button style={styles.botton} onPress={saveCharacter}>Salvar</Button>
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