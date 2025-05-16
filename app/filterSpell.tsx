import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, CheckBox, Layout, useTheme, Text } from '@ui-kitten/components';
import { Stack, useRouter } from 'expo-router';
import { Drawer, DrawerGroup, DrawerItem, IconElement } from '@ui-kitten/components';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ImageProps } from 'react-native';


const SCHOOLS = ['Abjuração', 'Evocação', 'Ilusão', 'Transmutação', 'Conjuração', 'Necromancia', 'Encantamento', 'Adivinhação'];
const CLASS = ['Mago', 'Feiticeiro', 'Clérigo', 'Guardião', 'Bardo', 'Druida', 'Bruxo'];
const RANGE = ['Pessoal', 'Toque', '3 metros','4,5 metros', '9 metros', '18 metros', '27 metros', '36 metros', '45 metros' , '90 metros', "1,5 km", "800 quilômetros", "Ilimitado", "Especial"];

const TEMPO = ['1 ação', '1 bônus de ação', '1 reação', '1 minuto', '10 minutos', '1 hora', '8 horas', '24 horas'];
const COMPONENTS = ['V', 'S', 'M', 'V, S', 'V, M', 'S, M', 'V, S, M'];
//const CIRCLES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default function FilterSpell() {
    const router = useRouter();
    const theme = useTheme();

    const [schoolsSelected, setSchoolsSelected] = useState<string[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [selectedRange, setSelectedRange] = useState<string[]>([]);
   // const [selectedCircles, setSelectedCircles] = useState<string[]>([]);

    // Verifica se o item já está na lista
    const toggleItem = (item: string, list: string[], setList: (val: string[]) => void) => {
      if (list.includes(item)) {
        setList(list.filter(i => i !== item));
    } else {
        setList([...list, item]);
    }
    };

    // Função para aplicar os filtros
    const applyFilter = () => {
        if (schoolsSelected.length === 0 && selectedClasses.length === 0 && selectedRange.length === 0/* && selectedCircles.length === 0*/) {
            router.push('/')
        }else {
            router.push({
                pathname: '/',
                params: {
                escolas: JSON.stringify(schoolsSelected),
                classes: JSON.stringify(selectedClasses),
                range: JSON.stringify(selectedRange),
                //circles: JSON.stringify(selectedCircles)
                }
                                
            });

        }
    };
   
    
    // Função para renderizar o ícone da Classe
    const ClassIcon = (props?: Partial<ImageProps>): React.ReactElement => (
    <FontAwesome5
        {...props}
        name='magic'
        size={18}
        color={theme['color-primary-500']}
    />
    );

    // Função para renderizar o ícone da escola
    const schoolIncon = (props?:  Partial<ImageProps>): IconElement => (
    <FontAwesome5
        {...props}
        name='school'
        size={18}
        color={theme['color-primary-500']}
    />
    );


    return (
    <Layout style={{ flex: 1, backgroundColor: theme['color-basic-1000'] }}>
        <Stack.Screen options={{ headerShown: false }} />
        <ScrollView contentContainerStyle={styles.container}>
            <Drawer>
                    
                    <DrawerGroup title='Classe'
                        accessoryLeft={ClassIcon}>
                        {CLASS.map((c, index) => (
                            <DrawerItem
                            key={index}
                            title={() => (
                                <CheckBox
                                checked={selectedClasses?.includes(c)}
                                onChange={() => toggleItem(c, selectedClasses, setSelectedClasses)}
                                >
                                {c}
                                </CheckBox>
                            )}
                            />
                        ))}
                    </DrawerGroup>
                    <DrawerGroup title='Escola'
                        accessoryLeft={schoolIncon}>
                        {SCHOOLS.map((e, index) => (
                            <DrawerItem
                            key={index}
                            title={() => (
                                <CheckBox
                                checked={schoolsSelected?.includes(e)}
                                onChange={() => toggleItem(e, schoolsSelected, setSchoolsSelected)}
                                >
                                {e}
                                </CheckBox>
                            )}
                            />
                        ))}
                    </DrawerGroup>
                    <DrawerGroup title='Alcance'
                        accessoryLeft={schoolIncon}>
                        {RANGE.map((e, index) => (
                            <DrawerItem
                            key={index}
                            title={() => (
                                <CheckBox
                                checked={selectedRange?.includes(e)}
                                onChange={() => toggleItem(e, selectedRange, setSelectedRange)}
                                >
                                {e}
                                </CheckBox>
                            )}
                            />
                        ))}
                    </DrawerGroup>
            </Drawer>
            <Layout style={{  
                backgroundColor: theme['color-basic-1000'],  
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
                width: '50%',
                alignSelf: 'center'
                }}>
            <Button onPress={applyFilter}>Aplicar</Button>
            <Button onPress={() => router.back()}>Voltar</Button>
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
