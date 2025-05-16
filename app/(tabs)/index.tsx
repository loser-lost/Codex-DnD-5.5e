import { ScrollView, StyleSheet } from 'react-native';
import { Button, Divider, Input, Layout, List, ListItem, useTheme } from '@ui-kitten/components';
import { Text, TitleText } from '@/components/StyledText';


import { magias } from '@/assets/json/magias.json';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';

import { useLocalSearchParams } from 'expo-router';


//Typing JSON
interface Spell {
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

function agruparEOrdenarMagias(magias: Spell[]): Record<string, Spell[]> {
  const grupos: Record<string, Spell[]> = {};


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
  const resultado: Record<string, Spell[]> = {};
  circulosOrdenados.forEach(circulo => {
    resultado[circulo] = grupos[circulo];
  });

  return resultado;
}


export default function SpellsScreen() {
  //Importando o tema
  const theme = useTheme();
  //Importando o JSON
  const [searchQuery, setSearchQuery] = useState<string>('');
  //Estado para armazenar os dados filtrados
  const [filteredData, setFilteredData] = useState<Spell[]>([]);
  //Organizando os dados
  const [spells, setSpells] = useState<Spell[]>(magias);
  //Pegando os parâmetros da URL
  const params = useLocalSearchParams();
  //Importando o roteador 
  const router = useRouter();

  //Função debounce para otimizar a busca
  //A função debounce é usada para limitar a taxa de execução de uma função.
  const debounce = (func: (...args: string[]) => void, wait: number) => {
    let timeout: number;
    return (...args: string[]) => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => func(...args), wait);
    };
  };

  //Função que filtra os dados de acordo com a busca
  const handleSearchDebounced = debounce((query: string) => {
    const filtered = spells.filter(item => item.nome.toLowerCase().includes(query.toLowerCase()));
    setFilteredData(filtered);
  }, 500);


  //Na primeira vez que a tela é carregada, ela vai pegar os dados do JSON e filtrar de acordo com as escolas e classes
  useEffect(() => {
    let base = magias;

    if (params?.escolas || params?.classes /*|| params?.circles*/|| params?.range) {
      const escolas = params?.escolas ? JSON.parse(params.escolas as string) : [];
      const classes = params?.classes ? JSON.parse(params.classes as string) : [];
      const range = params?.range ? JSON.parse(params.range as string) : [];
      
      //const circles = params?.circles ? JSON.parse(params.circles as string) : [];
      
      base = magias.filter(magia =>
        (escolas.length === 0 || escolas.includes(magia.escola)) &&
        (classes.length === 0 || magia.classes.some(classe => classes.includes(classe)))&& 
        (range.length === 0 || range.includes(magia.alcance))

        //(circles.length === 0 || magia.circulo === '0' || magia.circulo === '1' || magia.circulo === '2' || magia.circulo === '3' || magia.circulo === '4' || magia.circulo === '5' || magia.circulo === '6' || magia.circulo === '7' || magia.circulo === '8' || magia.circulo === '9')
      );

    }

    setSpells(base);
  }, [params]);

  //Quando o usuário digitar algo na barra de busca, a função handleSearchDebounced vai ser chamada 
  //e vai filtrar os dados de acordo com a busca
  //Se a barra de busca estiver vazia, os dados vão ser os dados do JSON
  //Se não, os dados vão ser os dados filtrados
  useEffect(() => {
    if (searchQuery.length > 0) {
      handleSearchDebounced(searchQuery);
    }
  }, [searchQuery]);

  //Função que vai ser chamada quando o usuário digitar algo na barra de busca
  //Ela vai atualizar o estado da barra de busca
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  // Agrupando e ordenando as magias
  //A função agruparEOrdenarMagias é chamada para agrupar e ordenar as magias de acordo com o círculo e o nome.
  const magiasAgrupadas = useMemo(() => {
    const base = searchQuery ? filteredData : spells;
    return agruparEOrdenarMagias(base);
  }, [searchQuery, filteredData, spells]);

  //Renderizando os itens da lista
  //A função renderItem é responsável por renderizar cada item da lista de magias.
  const renderItem = ({ item }: { item: Spell }) => (
    <ListItem
      title={() => (
        <TitleText type='h4'>
          {item.nome}
        </TitleText>

      )
      }
      description={() => (
        <Fragment>
          <Text style={{ fontSize: 13, color: theme['color-basic-500'] }}>Duração: {item.duracao}</Text>
          <Text style={{ fontSize: 11, color: theme['color-basic-500'] }}>{item.tempo_de_conjuracao}</Text>
        </Fragment>
      )
      }
      accessoryRight={() => (
        <Text style={{ fontSize: 14 }}>
          {item.circulo === '0' ? 'Truque' : item.circulo + "º Círculo"}
        </Text>
      )
      }
    />
  );


 
  return (

    <Layout style={styles.container}>
      <Layout style={styles.header}>
        <Input
          style={styles.input}
          placeholder="Procurar..."
          value={searchQuery}
          onChangeText={handleSearch}
          size='medium'
        />
        <Button onPress={() =>  router.push('./filterSpell')} size='small' style={{ marginHorizontal: 4 }}>
          FILTRO
        </Button>
      </Layout>
      <ScrollView style={{ flex: 1 }}>
        {Object.entries(magiasAgrupadas).map(([circulo, magias]) => (

          <Layout key={circulo}>
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

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
    display: 'flex',
  },
  input: {
    flex: 1,
    marginHorizontal: 4
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
