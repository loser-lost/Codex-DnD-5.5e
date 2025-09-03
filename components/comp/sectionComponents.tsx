
import React from "react";
import { ListItem, Text, useTheme, Layout, Button} from "@ui-kitten/components";
import { router } from "expo-router";

import { TitleText } from "@/components/StyledText";
import {  StyleSheet } from 'react-native';
import { spellDatabase } from "../../assets/_database/useSpellDatabase";
import { AddSpellIcon, AdedSpellIcon, DeleteIconX, DeleteIconXNoProps } from "@/utils/useIcons";



export interface Section {
  title: string;
  data: spellDatabase[];
}
 
export interface RenderSpellProps {
  item: spellDatabase;
  buttonKnow: () => void;
  isKnow: boolean

}
export interface RenderSpelsKnow{
  item: spellDatabase;
  removeSpell: () => void; 
  
}

const RenderSpell = React.memo(({ item, buttonKnow, isKnow }: RenderSpellProps) => {
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
        accessoryRight={props => 
            <Button 
                style={styles.boton}
                onPress={buttonKnow} 
                size='tiny' 
                appearance='ghost'
                disabled={isKnow} // Desabilita o botão se a magia já for conhecida
                accessoryRight={isKnow ? AdedSpellIcon : AddSpellIcon}
            >
                {isKnow ? "Conhecida" : "Adicionar"}
            </Button>
        }
        
        />
    );
});
export { RenderSpell};

    const RenderKnowSpell = React.memo(({ item, removeSpell }: RenderSpelsKnow) => {
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
            <Text style={{ fontSize: 13, color: textColor }}>Duração: {item.duration}</Text>
            <Text style={{ fontSize: 11, color: textColor }}>Tempo de Conjuracao: {item.castingTime}</Text>
            </>
        )}
        //accessoryLeft={props => <Button onPress={rotaSpells} size='tiny' />}
        accessoryRight={props => 
            <Button 
                style={styles.boton}
                onPress={removeSpell} 
                size='tiny' 
                appearance='ghost'
                accessoryLeft={DeleteIconXNoProps} 
                />
            }
        
        />
    );
});
export { RenderKnowSpell};
    
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
      
    }
});

