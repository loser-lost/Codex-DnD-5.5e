import React, {  useCallback, useEffect, useMemo, useState } from 'react';


import { SectionList } from 'react-native';

import {  StyleSheet } from 'react-native';
import {  Divider, Layout,  useTheme } from '@ui-kitten/components';

import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

import { magias } from '@/assets/json/magias.json';
import SeachBar from '../components/SeachBar';
import { groupSortSpells } from '../../utils/groupMagic';
import { Spell } from '../../utils/groupMagic';
import RenderSpell from '../../utils/renderSpell';
import {RenderSectionHeader} from '../../utils/renderSpell';


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
      return groupSortSpells(base);
    }, [searchQuery, filteredData, spells]);

    // teste
    const magiasEmSecoes = Object.entries(magiasAgrupadas).map(([circulo, data]) => ({
      title: circulo,
      data,
    }));

    const renderItem = useCallback(({ item }: { item: Spell }) => (
      <RenderSpell item={item} />
    ), []);
   

    return (
      <Layout style={styles.container}>
        <SeachBar value={searchQuery} onChangeText={handleSearch}/>

        <SectionList
          sections={magiasEmSecoes}
          keyExtractor={(item) => String(item.magia_id)}
          renderItem={renderItem}
          renderSectionHeader={({ section }) => (<RenderSectionHeader title={section.title} data={section.data} />)}
          ItemSeparatorComponent={Divider}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
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