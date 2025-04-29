import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Divider, Layout, List, ListItem} from '@ui-kitten/components';
import { Text, TextCategory1, TextCategory2, TextCategory3 } from '@/components/StyledText';


import magias from '@/assets/json/magias.json';
import React, { useEffect, useMemo, useRef, useState } from 'react';

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

function agruparEOrdenarMagias(magias: Item[]): Record<string, Item[]> {
  const grupos: Record<string, Item[]> = {};


  // Agrupamento
  magias.forEach(magia => {
    const circulo = magia.circulo;
    if (!grupos[circulo]) {
      grupos[circulo] = [];
    }
    grupos[circulo].push(magia);
  });

  // Ordenar cada grupo por nome
  Object.keys(grupos).forEach(circulo => {
    grupos[circulo].sort((a, b) => a.nome.localeCompare(b.nome));
  });

  // Função para ordenar corretamente "Truque", "1º", "2º", etc.
  function obterOrdemCirculo(c: string): number {
    if (c.toLowerCase().includes('truque')) return 0;
    const match = c.match(/\d+/);
    return match ? parseInt(match[0], 10) : Infinity;
  }

  const circulosOrdenados = Object.keys(grupos).sort(
    (a, b) => obterOrdemCirculo(a) - obterOrdemCirculo(b)
  );

  // Retorna os grupos já na ordem correta
  const resultado: Record<string, Item[]> = {};
  circulosOrdenados.forEach(circulo => {
    resultado[circulo] = grupos[circulo];
  });

  return resultado;
}


export default function TabOneScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  //Organizando os dados
  const [data, setData] = useState<Item[]>([]);
  
  //Organizando os dados
  useEffect(() => { 
    setData(magias.magias);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = data.filter(item => item.nome.toLowerCase().includes(query.toLowerCase()));
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Mostra todos os dados quando a pesquisa está vazia
    }
  };
  const handleFilter = () => {
    alert('filtro');
  };


  const magiasAgrupadas = useMemo(() => {
    const base = searchQuery ? filteredData : data;
    return agruparEOrdenarMagias(base);
  }, [searchQuery, filteredData, data]);
  
  const MyListHeader = () => (
    <View style={styles.nivelBar}>
      <Text>Nível 1</Text>
      <Text>Magias: {data.length}</Text>
    </View>
  );

 
  
  const renderItem = ({ item }: { item: Item }) => (
    <ListItem 
      title={() => (
        <Text category='h1'>
          {item.nome}
        </Text>
      )}
      description={() => (
        <>
          <TextCategory1>
            {item.duracao}
          </TextCategory1>
          <TextCategory2>
            {item.tempo_de_conjuracao}
          </TextCategory2>
        </>
      )}
      accessoryRight={() => (
        <TextCategory3>
          {item.circulo}º Círculo
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
              placeholder="Search..."
              value={searchQuery}
              onChangeText={handleSearch}

            />
            <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
              <Text style={{ color: 'white' }} category='alternative'>Filtro</Text>
            </TouchableOpacity>
          </Layout>

          <ScrollView style={{ flex: 1, width: 410 }}>
            {Object.entries(magiasAgrupadas).map(([circulo, magias]) => (

              <Layout  key={circulo}>
                <Layout style={styles.nivelBar}>
                  <Text>Nivel: {circulo}</Text>
                  <Text>Total: {magias.length}</Text>
                </Layout>
                <List
                style={styles.listSpells}
                  data={magias}
                  renderItem={renderItem}
                  ItemSeparatorComponent={Divider}
                />
              </Layout>
            ))}
          </ScrollView>



        
       </Layout>
      </Layout>
      
  );
  
}
/*   <List
          style={styles.listSpells}
          ListHeaderComponent={MyListHeader}
          data={searchQuery ? filteredData : data}
          rnderItem={renderItem}e
          ItemSeparatorComponent={Divider}
          />*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',  
    width: "100%"
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
    width: "100%"
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
    width: '100%',
    height: 40,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "black"
  
  },
  listSpells: {
    flex: 1,
    width: '100%'
  },
  title: {
    fontSize: 32, //DB7610
    fontFamily: 'AveriaSerifLibreBold',
  }
});
