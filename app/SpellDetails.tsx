'use client';
import React, { Fragment, useMemo } from "react";

import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { useTheme, Text, Layout } from "@ui-kitten/components";
import magias from '@/assets/json/magias.json';
import { StyleSheet, ScrollView } from 'react-native';

import { Spell } from '../utils/groupMagic';
import { NotFound } from '../utils/notFound';
import { BackIcon, StarIcon, AddIcon, AlterFont } from '../utils/useIcons';
import Description from '../utils/description';


const SpellDetails = () => {
    const router = useRouter();
    const theme = useTheme();
    const { magia_id } = useLocalSearchParams();

    const magiaId = Array.isArray(magia_id) ? magia_id[0] : magia_id;
    const item = magias.magias.find((m: Spell) => m.magia_id === magiaId);
    const [fontSize, setFontSize] = React.useState(16);

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
    //headerIconsLeft
    const fontModify = () => {
        setFontSize(prev => (prev < 18 ? prev + 2 : 14)); // loop entre 14 e 24
    }

    if (!item) {
        return (
            <NotFound />
        );
    }
    return (
        <Fragment>
            <Layout style={[styles.container, { backgroundColor: theme['color-basic-1000'] }]}>
                <Stack.Screen options={{ headerShown: false }} />

                <Layout style={styles.header}>
                    <Layout style={styles.headerIcons}>
                        <BackIcon onBackPress={BackFunction} />
                        <StarIcon />
                        <AlterFont fontModify={fontModify} />

                    </Layout>
                </Layout>

                <Layout style={styles.content}>
                    <ScrollView>
                        <Description item={item} fontSize={fontSize} />
                    </ScrollView>
                </Layout>
            </Layout>
            <Layout style={styles.headerIcons}>
                <Text>{item.magia_id}</Text>
                <AddIcon addOnCharacter={addOnCharacter} />
            </Layout>
        </Fragment>
    );
};

export default SpellDetails;
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
        borderRadius: 10
    },
    content: {
        flex: 1,
         padding: 8,
        width: '100%',
        marginTop: 5,
        borderRadius: 10
    },
    headerIcons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 5
    },
    headerIconsLeft: {
        width: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',

    }
});