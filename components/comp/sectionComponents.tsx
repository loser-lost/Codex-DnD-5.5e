
import React from "react";
import { ListItem, Text, useTheme, Layout, Button} from "@ui-kitten/components";
import { router } from "expo-router";

import { TitleText } from "@/components/StyledText";
import {  StyleSheet } from 'react-native';
import { spellDatabase } from "../../assets/_database/useSpellDatabase";
import { AddSpellIcon } from "@/utils/useIcons";



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
    


    const rotaSpells = () => {
        router.push(`/SpellDetails?magia_id=${item.id}`);
    }
    return (
        <ListItem
        title={() => (
            <TitleText type='h4' onPress={rotaSpells}>
            {item.name}
            </TitleText>
        )}
        description={() => (
            <>
            <Text style={{ fontSize: 13, color: textColor }} >Duração: {item.duration}</Text>
            <Text style={{ fontSize: 11, color: textColor }}>Tempo de Conjuracao: {item.castingTime}</Text>
            </>
        )}
        //accessoryLeft={props => <Button onPress={rotaSpells} size='tiny' />}
        accessoryRight={props => <Button style={styles.boton} onPress={buttonKnow} size='tiny' accessoryLeft={AddSpellIcon} />}
        
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


    }, 
    boton:{
      width: 30,
      height: 30,
      borderRadius: 28,
    }
});

