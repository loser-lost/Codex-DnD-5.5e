import {  StyleSheet } from 'react-native';
import { Button, Divider, Input, Layout, List, ListItem, useTheme } from '@ui-kitten/components';
import { Text, TitleText } from '@/components/StyledText';
import { SectionList } from 'react-native';


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
  // Agrupar magias por círculo
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
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Spell[]>([]);
  const [spells, setSpells] = useState<Spell[]>(magias);
  const params = useLocalSearchParams();
  const router = useRouter();

  const debounce = (func: (...args: string[]) => void, wait: number) => {
    let timeout: number;
    return (...args: string[]) => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => func(...args), wait);
    };
  };

const handleSearchDebounced = useMemo(() => debounce((query: string) => {
  const filtered = spells.filter(item => item.nome.toLowerCase().includes(query.toLowerCase()));
  setFilteredData(filtered);
}, 500), [spells]);

const parsedParams = useMemo(() => {
  return {
    escolas: params?.escolas ? JSON.parse(params.escolas as string) : [],
    classes: params?.classes ? JSON.parse(params.classes as string) : [],
    range: params?.range ? JSON.parse(params.range as string) : [],
    tempo: params?.tempo ? JSON.parse(params.tempo as string) : [],
    circle: params?.circle ? JSON.parse(params.circle as string) : []
  };
}, [params?.escolas, params?.classes, params?.range, params?.tempo, params?.circle]);

useEffect(() => {
  let base = magias;

  const { escolas, classes, range, tempo, circle } = parsedParams;

  if (escolas.length || classes.length || range.length || tempo.length || circle.length) {
    base = magias.filter(magia =>
      (escolas.length === 0 || escolas.includes(magia.escola)) &&
      (classes.length === 0 || magia.classes.some(classe => classes.includes(classe))) &&
      (range.length === 0 || range.includes(magia.alcance)) &&
      (tempo.length === 0 || tempo.includes(magia.tempo_de_conjuracao)) &&
      (circle.length === 0 || circle.includes(magia.circulo))
    );
  }

  setSpells(base);
}, [parsedParams]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      handleSearchDebounced(searchQuery);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const magiasAgrupadas = useMemo(() => {
    const base = searchQuery ? filteredData : spells;
    return agruparEOrdenarMagias(base);
  }, [searchQuery, filteredData, spells]);


  // teste
    const magiasEmSecoes = Object.entries(magiasAgrupadas).map(([circulo, data]) => ({
      title: circulo,
      data,
    }));
  const renderItem = ({ item }: { item: Spell }) => (
    <>
        <ListItem
        onPress={() => router.push(`/SpellDetails?magia_id=${item.magia_id}`)}
        title={() => (
          
            <TitleText type='h4'>{item.nome}</TitleText>
          
        )
        }
        description={() => (
          <Fragment>
            <Text style={{ fontSize: 13, color: theme['color-basic-500'] }}>Duração: {item.duracao}</Text>
            <Text style={{ fontSize: 11, color: theme['color-basic-500'] }}>Tempo de Conjuracao: {item.tempo_de_conjuracao}</Text>
            
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
    </>
    
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

      <SectionList
        sections={magiasEmSecoes}
        keyExtractor={(item) => item.magia_id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title, data } }) => (
          <Layout style={styles.nivelBar}>
            <Text>Nível: {title}</Text>
            <Text>Total: {data.length}</Text>
          </Layout>
        )}
        ItemSeparatorComponent={Divider}
      />
          
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
/*
      {Object.entries(magiasAgrupadas).map(([circulo, magias]) => (

        <Layout key={circulo}>
          <Layout style={styles.nivelBar}>
            <Text>Nivel: {circulo}</Text>
            <Text>Total: {magias.length}</Text>
          </Layout>
          <List
            style={styles.listSpells}
            data={magias}
            keyExtractor={(item) => item.magia_id}
            renderItem={renderItem}
            ItemSeparatorComponent={Divider}
          />
        </Layout>
      ))}*/