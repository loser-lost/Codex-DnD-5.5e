import { ListItem, Text, useTheme, Layout, IndexPath } from "@ui-kitten/components";
import { router, useRouter } from "expo-router";
import { Fragment, useMemo } from "react";
import { TitleText } from "@/components/StyledText";
import {  StyleSheet } from 'react-native';
import { spellDatabase } from "../../assets/_database/useSpellDatabase";
import React from "react";

export interface Section {
  title: string;
  data: spellDatabase[];
}

export interface RenderSpellProps {
  item: spellDatabase;
}

    const races = useMemo(() => ['Humano', 'Elfo', 'Anão', 'Orc', 'Assimar', 'Gnomo', 'Halfling', 'Golias', 'Tiferino', 'Draconato'], []);
    const classees = useMemo(() => ['Mago', 'Feiticeiro', 'Clérigo', 'Ladino', 'Guardião', 'Bardo', 'Druida', 'Bruxo','Paladino'], []);
    const levels = useMemo(() => [1, 2, 3, 4 ,5 , 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], []);
    export{ races, classees, levels };
        

    const RenderSpell = React.memo(({ item }: RenderSpellProps) => {
    const theme = useTheme();
    const textColor = theme['color-basic-500'];
    const itemCirculo = item.level === 0 ? 'Truque' : `${item.level}º Círculo`;
     const rotaSpells = () => {
        router.push(`/SpellDetails?magia_id=${item.id}`);
    }
    return (
        <ListItem
        onPress={rotaSpells}
        title={() => (
            <TitleText type='h4'>
            {item.name}
            </TitleText>
        )}
        description={() => (
            <>
            <Text style={{ fontSize: 13, color: textColor }}>Duração: {item.duration}</Text>
            <Text style={{ fontSize: 11, color: textColor }}>Tempo de Conjuracao: {item.castingTime}</Text>
            </>
        )}
        accessoryRight={() => (
            <Text style={{ fontSize: 14 }}>
            {itemCirculo}
            </Text>
        )}
        />
    );
    });
    export { RenderSpell};
    
const RenderSectionHeaderDb = (( {title,data}: Section) => {
    return (
        <Layout style={styles.nivelBar}>
          <Text>Nível: {title}</Text>
          <Text>Total: {data.length}</Text>
        </Layout>
    );
});
export { RenderSectionHeaderDb };
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
    text:{


    }
});

