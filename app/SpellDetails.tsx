'use client';
import React, {  useMemo } from "react";

import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { useTheme, Text, Layout } from "@ui-kitten/components";
import magias from '@/assets/json/magias.json'; 
import {  StyleSheet, ScrollView } from 'react-native';

import {Spell} from '../utils/groupMagic'; 
import {NotFound} from '../utils/notFound';
import {BackIcon, StarIcon, AddIcon, AlterFont } from '../utils/useIcons';
import DescriptionDescription from '../utils/description';


const SpellDetails = () => {
    const router = useRouter();
    const theme = useTheme();
    const {magia_id} = useLocalSearchParams();

    const magiaId = Array.isArray(magia_id) ? magia_id[0] : magia_id;
    const item = magias.magias.find((m: Spell) => m.magia_id === magiaId);
    

    const debounce = (func: (...args: string[]) => void, wait: number) => {
        let timeout: number;
        return (...args: string[]) => {
            clearTimeout(timeout);
            timeout = window.setTimeout(() => func(...args), wait);
        };
    };
    const BackFunction = useMemo(() => debounce(() => {
        router.back();
    }, 300), []);

    const addOnCharacter = () => {
        alert('Adicionar ao personagem');
    }
    
    const fontModify = () => {
        alert('Alterar fonte');
    }

    if (!item) {
    return (
        <NotFound />
    );
    }
    return (
        <>
    <Layout style={[styles.container, { backgroundColor: theme['color-basic-1000'] }]}>
    <Stack.Screen options={{ headerShown: false }} />
        
        <Layout style={styles.header}>
            <Layout style={styles.headerIcons}>
                <BackIcon onBackPress={BackFunction} />
                <StarIcon />
                <Layout style={styles.headerIconsLeft}>
                    <AlterFont fontModify={fontModify} />
                    <AddIcon addOnCharacter={addOnCharacter} />
                </Layout>
            </Layout>
        </Layout>  
         
        <Layout style={styles.content}>
            <ScrollView>
                <DescriptionDescription item={item} />
            </ScrollView>
        </Layout>         
    </Layout>
    <Layout style={styles.headerIcons}>
        <Text>{item.magia_id}</Text>
    </Layout>
    </>
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
    borderRadius: 10
},
  content: {
    flex: 1,
    padding: 35,  
    width: '100%',
    marginTop: 5,
    borderRadius: 10
  },
  headerIcons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  headerIconsLeft: {
    width: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});