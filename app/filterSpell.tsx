import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, CheckBox, Layout, Text, useTheme } from '@ui-kitten/components';
import { useRouter } from 'expo-router';


const SCHOOLS = ['Abjuração', 'Evocação', 'Ilusão', 'Transmutação', 'Conjuração', 'Necromancia', 'Encantamento', 'Adivinhação'];
const CLASS = ['Mago', 'Feiticeiro', 'Clérigo', 'Guardião', 'Bardo', 'Druida', 'Bruxo'];

export default function FilterSpell() {
    const router = useRouter();
    const theme = useTheme();

    const [escolasSelecionadas, setEscolasSelecionadas] = useState<string[]>([]);
    const [classesSelecionadas, setClassesSelecionadas] = useState<string[]>([]);

    // Verifica se o item já está na lista
    // Se estiver, remove-o; se não estiver, adiciona-o
    const toggleItem = (item: string, list: string[], setList: (val: string[]) => void) => {
      if (list.includes(item)) {
        setList(list.filter(i => i !== item));
    } else {
        setList([...list, item]);
    }
    };

    // Função para aplicar os filtros
    // e redirecionar para a página inicial
    const applyFilter = () => {
        if (escolasSelecionadas.length === 0 && classesSelecionadas.length === 0) {
            alert('Selecione pelo menos uma escola ou classe para filtrar.');
        }else {
            router.push({
                pathname: '/',
                params: {
                escolas: JSON.stringify(escolasSelecionadas),
                classes: JSON.stringify(classesSelecionadas)
                }
                                
            });

        }
    };

    return (
    <Layout style={{ flex: 1, backgroundColor: theme['color-basic-1000'] }}>
        <ScrollView contentContainerStyle={styles.container}>
            <Text category="h5">Filtrar por Escola</Text>
            {SCHOOLS.map((e, index) => (
                <CheckBox key={index} checked={escolasSelecionadas?.includes(e)} onChange={() => toggleItem(e, escolasSelecionadas, setEscolasSelecionadas)}>
                {e}
                </CheckBox>
            ))}
            <Text category="h5" style={{ marginTop: 20 }}>Filtrar por Classe</Text>
            {CLASS.map((c, index) => (
                <CheckBox key={index} checked={classesSelecionadas?.includes(c)} onChange={() => toggleItem(c, classesSelecionadas, setClassesSelecionadas)}>
                {c}
                </CheckBox>
            ))}
            <Layout style={{  
                backgroundColor: theme['color-basic-1000'],  
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                width: '50%',
                alignSelf: 'center'
                }}>
            <Button onPress={applyFilter}>Aplicar</Button>
            <Button onPress={() => router.push('/')} >Voltar</Button>
            </Layout>
        </ScrollView>
    </Layout>
    );
    }
    const styles = StyleSheet.create({
    
    container: {
        padding: 20,
        gap: 10
    }
    });
