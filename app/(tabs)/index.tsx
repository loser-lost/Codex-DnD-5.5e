import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Divider, Layout, List, ListItem} from '@ui-kitten/components';
import { Text, TextCategory1, TextCategory2, TextCategory3, TitleText } from '@/components/StyledText';

import magias from '@/assets/json/magias.json';
import React, { useEffect, useState } from 'react';

//Typing JSON
interface Item {
  magia_id: string;
  nome: string;
  circulo: string;
  escola: string;
  classes: string[];
  tempo_de_conjuracao: string;
  alcance: string;
  componentes: string[];
  duracao: string;
  efeito: string;
}


export default function TabOneScreen() {
  //const [filteredData, setFilteredData] = useState<Item[]>([]);
  //Organizando os dados
  const [data, setData] = useState<Item[]>([]);
  
  //Organizando os dados
  useEffect(() => { 
    setData(magias.magias);
  }, []);

  const handleFilter = () => {
    alert('filtro');
  };



  const renderNivel = (): React.ReactElement => (
    <Layout style={styles.nivelBar}>
    <Text>
      Nivel:
      </Text>
    <Text>
      Total:
      </Text>
  </Layout>
  );
  
  const renderItem = ({ item }: { item: Item }) => (
  
   <ListItem 
      //title={item.nome}
      title={() => (
        <Text category='h1'>
          {item.nome}
        </Text>
      )}
       description={() => (
        <><TextCategory1>
           {item.duracao}
         </TextCategory1><TextCategory2>
             {item.tempo_de_conjuracao}
           </TextCategory2></>
      )}
      //accessoryLeft={renderIcon}
      accessoryRight={() => (
        <TextCategory3 >
          {item.circulo}
        </TextCategory3>
      )}
      />
   
  );

  return (
      <Layout style={styles.container}>
        <Layout style={styles.border} >
          <Layout style={styles.seachContainer}>
            <TextInput
            style={styles.input}
              placeholder="Search..."/*
              onChangeText={setSearchQuery}*/
            />
            <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
              <Text style={{ color: 'white' }} category='alternative'>Filtro</Text>
            </TouchableOpacity>
          </Layout>
          {renderNivel()}

          <List
          style={{ flex: 1 }}
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
          />
       </Layout>
      </Layout>
      
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',   
    
  },
  text: {
    margin: 2,
  },
  border: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
  },
  seachContainer:{
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    width: 250,
    height: 35,
    borderColor: 'gray',
    color: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10, // <- espaço entre o campo e o botão
    borderRadius: 8,
  },
  filterButton: {
    width: 70,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#DB7610',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  nivelBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor : 'black',
    width: '100%',
    borderRadius: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
   
  },
  title: {
    fontSize: 32, //DB7610
    fontFamily: 'AveriaSerifLibreBold',
  }
});
