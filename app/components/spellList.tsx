import { Button, Divider, Input, Layout, List, ListItem, useTheme } from '@ui-kitten/components';
import { Text, TitleText } from '@/components/StyledText';
import { useRouter } from 'expo-router';
import React, { Fragment, useEffect, useMemo, useState } from 'react';

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
/*
const spellList = ({ item }: { item: Spell }) => {
    const router = useRouter();
    const theme = useTheme();
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
}; export default spellList;*/