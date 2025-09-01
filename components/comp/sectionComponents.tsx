
import React from "react";
import { ListItem, Text, useTheme, Layout, Button} from "@ui-kitten/components";
import { router } from "expo-router";

import { TitleText } from "@/components/StyledText";
import {  StyleSheet } from 'react-native';
import { spellDatabase } from "../../assets/_database/useSpellDatabase";



export interface Section {
  title: string;
  data: spellDatabase[];
}
 
export interface RenderSpellProps {
  item: spellDatabase;
  buttonKnow: () => void;
  
}
    const RenderSpell = React.memo(({ item, buttonKnow }: RenderSpellProps) => {
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
        accessoryRight={props => <Button onPress={buttonKnow}>Adicionar</Button>}
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

