import { Button, FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Divider, Layout, List, ListItem} from '@ui-kitten/components';
import { Text, TitleText } from '@/components/StyledText';
import magias from '@/assets/json/magias.json';
import React, { useEffect, useMemo, useState } from 'react';

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
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [data, setData] = useState<Item[]>([]);
  

  const handleFilter = () => {
    alert('filtro');
  };

  useEffect(() => { 
    setData(magias.magias);
  }, []);
  
  const renderItem = ({ item }: { item: Item }) => (
   <Layout>
   <ListItem 
      title={item.nome}
      description={item.circulo}
      />
    </Layout>
  );

  return (
      <Layout style={styles.container}>
        <Layout>
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
            <Layout style={styles.nivelBar}>
              <Text category='alternative'>
                Nivel:
                </Text>
              <Text category='alternative'>
                Total:
                </Text>
            </Layout>
            <TitleText category='h1'>Magias</TitleText>
            <Text >exemplo de texto médio</Text>
          <List
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
  title: {
    fontSize: 32, //DB7610
    fontFamily: 'AveriaSerifLibreBold',
  }
});
