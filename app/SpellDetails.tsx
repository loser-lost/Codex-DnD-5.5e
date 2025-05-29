'use client';
import React from "react";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { useTheme, Text, Layout, Icon } from "@ui-kitten/components";
import magias from '@/assets/json/magias.json'; 
import { ScrollView, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import {Spell} from '../utils/groupMagic'; 

const SpellDetails = () => {
    const router = useRouter();
    const theme = useTheme();
    const {magia_id} = useLocalSearchParams();

    const magiaId = Array.isArray(magia_id) ? magia_id[0] : magia_id;
    const item = magias.magias.find((m: Spell) => m.magia_id === magiaId);
    
 

    if (!item) {
    return (
      <Layout style={[styles.container, { backgroundColor: theme['color-basic-1000'] }]}>
        <Text>Item não encontrado.</Text>
      </Layout>
    );
    }
    return (
    <Layout style={[styles.container, { backgroundColor: theme['color-basic-1000'] }]}>
    <Stack.Screen options={{ headerShown: false }} />
        
        <Layout style={styles.header}>
            <AntDesign name="back" size={24} color={theme['color-basic-500']} onPress={() => router.back()} />
        </Layout>  
        <ScrollView >   
        <Layout style={styles.content}>
             
            <Text category="h4">
                {item.nome}
            </Text>
            <Text>Circulo de magia: </Text>
            <Text style={{ fontSize: 14, color: theme['color-basic-500'], marginTop: 2}}>
                {item.circulo}
            </Text>
            <Text>Classe Da magia </Text>
            <Text style={{ fontSize: 14, color: theme['color-basic-500'] }}>
                {item.classes}
            </Text>
            <Text>Escola da magia: </Text>
            <Text style={{ fontSize: 14, color: theme['color-basic-500'] }}>
                {item.escola}
            </Text>
            <Text>Duração da magia: </Text>
            <Text style={{ fontSize: 13, color: theme['color-basic-500'] }}>
                {item.duracao}
            </Text>
            <Text>Tempo de Conutração da magia </Text>
            <Text style={{ fontSize: 13, color: theme['color-basic-500'] }}>
                {item.tempo_de_conjuracao}
            </Text>
            <Text>Componentes da magia: </Text>
            <Text style={{ fontSize: 13, color: theme['color-basic-500'] }}>
                {item.componentes}
            </Text>
            <Text>Alcance da magia: </Text>
            <Text style={{ fontSize: 13, color: theme['color-basic-500'] }}>
                {item.alcance}
            </Text>
            <Text>Efeito: </Text>
            <Text style={{ fontSize: 14, color: theme['color-basic-500'], textAlign: 'justify' }}>
                
                {item.efeito}
            </Text>
            
        </Layout> 
        </ScrollView>
        
    </Layout>

    );
};

export default SpellDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  
  },
   header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
    display: 'flex',
  },
  content: {
    flex: 1,
    padding: 35,  
    width: '100%'
  },
});