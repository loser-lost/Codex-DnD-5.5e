
import { Button, Input, Layout, Select, SelectItem,IndexPath, useTheme } from "@ui-kitten/components";
import React, { useMemo } from "react";
import { Alert, StyleSheet } from "react-native";
import {useCharacterDatabase} from '../assets/_database/useCharacterDatabase'
import { Stack, useRouter } from "expo-router";

const CreateCharacterScreen = () => {
    const router = useRouter();
    const theme = useTheme();
    const [id, setId] = React.useState('');
    const [name, setname] = React.useState('');
    const [race, setrace] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0));
    const [classe, setClasse] = React.useState('');
    const [level, setLevel] = React.useState('');
    const [playerName, setPlayer] = React.useState('');
    const [color, setcolor] = React.useState('');
    const [personagem, setPersonagem] = React.useState([]);
    const [selectedRaceIndex, setSelectedRaceIndex] = React.useState<IndexPath | undefined>(undefined);


    const races = useMemo(() => ['Humano', 'Elfo', 'Anão', 'Orc'], []);


    const  characterDatabase  = useCharacterDatabase();


    const BackFunction = () => {router.back();}
    
    const displayValue = selectedRaceIndex
    ? races[selectedRaceIndex.row]
    : '';
    
    async function saveCharacter(){
      try {
        if(isNaN(Number(level)) || !name || !classe || !color) {
          alert('Por favor, preencha todos os campos obrigatórios.');
          return;
        } 
        const race = selectedRaceIndex !== undefined ? races[selectedRaceIndex.row] : '';
        const response = await characterDatabase.create({name, race, classe, level: Number(level), playerName, color})
        if (response && response.insertedRowId) {
          
          return Alert.alert("Personagem salvo! ID: " + response.insertedRowId);
          
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
              <Stack.Screen options={{ headerShown: false }} />
              <Layout style={styles.container}>
                    <Input
                      style={styles.input}
                      value={name}
                      placeholder='Nome*'
                      onChangeText={setname}
                    />
                    
                    <Select
                      value={displayValue}
                      selectedIndex={selectedRaceIndex}
                      onSelect={index => setSelectedRaceIndex(index as IndexPath)}
                      placeholder={'Raça*'}
                    >
                     {races.map(r => <SelectItem key={r} title={r} />)}
                    </Select>
                    <Input
                      style={styles.input}
                      value={classe}
                      placeholder='Classe*'
                      onChangeText={setClasse}
                    />
                    <Input
                      style={styles.input}
                      value={level}
                      placeholder='Nivel*'
                      onChangeText={setLevel}
                    />
                
                    <Input
                      style={styles.input}
                      value={playerName}
                      placeholder='Nome do player'
                      onChangeText={setPlayer}
                    />
                    <Input
                      style={styles.input}
                      value={color}
                      placeholder='Cor*'
                      onChangeText={setcolor}
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
    flexDirection: 'column',
    marginTop: 50,
    padding: 15,
    height: '100%',
    
  },
   input: {
    margin: 2,
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