import { ListItem, Text, useTheme, Layout } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import { Fragment, useCallback } from "react";
import { TitleText } from "@/components/StyledText";
import {  StyleSheet } from 'react-native';


import React from "react";

interface RenderSpellProps {
  item: Spell;
}

interface Spell {
    magia_id: string;
    nome: string;
    circulo: string;
    duracao: string;
    tempo_de_conjuracao: string;
}


const RenderSpell = React.memo(({ item }: RenderSpellProps) => {
    const theme = useTheme();
    const router = useRouter();
    return (
        <ListItem
        onPress={() => router.push(`/SpellDetails?magia_id=${item.magia_id}`)}
        title={() => (
        <TitleText type='h4'>
          {item.nome}
        </TitleText>
        )}
        description={() => (
          <Fragment>
            <Text style={{ fontSize: 13, color: theme['color-basic-500'] }}>Duração: {item.duracao}</Text>
            <Text style={{ fontSize: 11, color: theme['color-basic-500'] }}>Tempo de Conjuracao: {item.tempo_de_conjuracao}</Text>
          </Fragment>
        )}
        accessoryRight={() => (
          <Text style={{ fontSize: 14 }}>
            {item.circulo === '0' ? 'Truque' : item.circulo + "º Círculo"}
          </Text>
         )}
        />
      )
});
export default RenderSpell;


interface Section {
  title: string;
  data: Spell[];
}


const RenderSectionHeader = (( {title,data}: Section) => {
    const theme = useTheme();
    return (
        <Layout style={styles.nivelBar}>
                     <Text>Nível: {title}</Text>
                     <Text>Total: {data.length}</Text>
        </Layout>
    );
});
export { RenderSectionHeader };
const styles =  StyleSheet.create({
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
});