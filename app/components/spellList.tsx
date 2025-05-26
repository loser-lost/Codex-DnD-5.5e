import { Button, Divider, Input, Layout, List, ListItem, useTheme } from '@ui-kitten/components';
import { Text, TitleText } from '@/components/StyledText';
import { SectionList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { magias } from '@/assets/json/magias.json';

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

export default function renderSpells() {
    const router = useRouter();
    const theme = useTheme();
    
 const renderItem = ({ item }: { item: Spell }) => {
  return (
    <ListItem
        onPress={() => router.push(`/SpellDetails?magia_id=${item.magia_id}`)}
        title={() => (
            <TitleText type={'h4'}>{item.nome}</TitleText>
        )}
        description={() => (
            <>
                <Text style={{ fontSize: 13, color: theme['color-basic-500'] }}>Duração: {item.duracao}</Text>
                <Text style={{ fontSize: 13, color: theme['color-basic-500'] }}>Circulo: {item.circulo}</Text>
            </>
        )}
        accessoryRight={() => (
            <Text style={{ fontSize: 14}}>
                {item.circulo === '0' ? 'Truque': item.circulo}
            </Text>
    )}  
    />
  );
}

  return (
  <>
    <SectionList
      sections={}
      keyExtractor={(item) => item.magia_id}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title, data}}) => (
        <Layout style={styles.nivelBar}>
          <Text>Nível: {title}</Text>
          <Text>Total: {data.length}</Text>
        </Layout>

      )}
  
      />
  </> 
  );
}
const styles = StyleSheet.create({
 nivelBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "black"
  }
});