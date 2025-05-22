import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, CheckBox, Layout, useTheme, Text } from '@ui-kitten/components';
import { Stack, useRouter } from 'expo-router';
import { Drawer, DrawerGroup, DrawerItem, IconElement } from '@ui-kitten/components';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageProps } from 'react-native';

const SCHOOLS = ['Abjuração', 'Evocação', 'Ilusão', 'Transmutação', 'Conjuração', 'Necromancia', 'Encantamento', 'Adivinhação'];
const CLASS = ['Mago', 'Feiticeiro', 'Clérigo', 'Guardião', 'Bardo', 'Druida', 'Bruxo'];
const RANGE = ['Pessoal', 'Toque', '3 metros', '4,5 metros', '9 metros', '18 metros', '27 metros', '36 metros', '45 metros', '90 metros', "1,5 km", "800 quilômetros", "Ilimitado", "Especial"];
const TEMPO = ['Ação', 'Ação ou Ritual', 'Ação Bônus', '1 minuto ou Ritual', '10 minutos', '1 minuto', '1 hora', '8 horas', '24 horas', 'Ação Bônus, que você realiza imediatamente após acertar um alvo com uma arma Corpo a Corpo ou um Ataque Desarmado', 'Ação Bônus, que você realiza imediatamente após atingir uma criatura com uma arma'];
const CIRCLES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const FILTER_STORAGE_KEY = 'spellFilterSelections';

export default function FilterSpell() {
    const router = useRouter();
    const theme = useTheme();

    const [selectCircle, setSelectCircle] = useState<string[]>([]);
    const [schoolsSelected, setSchoolsSelected] = useState<string[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
    const [selectedRange, setSelectedRange] = useState<string[]>([]);
    const [selectedTempo, setSelectedTempo] = useState<string[]>([]);

    const saveFiltersToStorage = useCallback(async () => {
        const data = {
            selectCircle,
            schoolsSelected,
            selectedClasses,
            selectedRange,
            selectedTempo,
        };
        try {
            await AsyncStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error('Erro ao salvar filtros:', error);
        }
    }, [selectCircle, schoolsSelected, selectedClasses, selectedRange, selectedTempo]);

    const loadFiltersFromStorage = async () => {
        try {
            const data = await AsyncStorage.getItem(FILTER_STORAGE_KEY);
            if (data) {
                const parsed = JSON.parse(data);
                setSelectCircle(Array.isArray(parsed.selectCircle) ? parsed.selectCircle : []);
                setSchoolsSelected(Array.isArray(parsed.schoolsSelected) ? parsed.schoolsSelected : []);
                setSelectedClasses(Array.isArray(parsed.selectedClasses) ? parsed.selectedClasses : []);
                setSelectedRange(Array.isArray(parsed.selectedRange) ? parsed.selectedRange : []);
                setSelectedTempo(Array.isArray(parsed.selectedTempo) ? parsed.selectedTempo : []);
            }
        } catch (error) {
            console.error('Erro ao carregar filtros:', error);
        }
    };

    useEffect(() => {
        loadFiltersFromStorage();
    }, []); // Certifique-se de que o array de dependências está vazio

    const toggleItem = useCallback((item: string, list: string[], setList: (val: string[]) => void) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    }, []);

    const applyFilter = async () => {
        await saveFiltersToStorage();

        if (
            schoolsSelected.length === 0 &&
            selectedClasses.length === 0 &&
            selectedRange.length === 0 &&
            selectedTempo.length === 0 &&
            selectCircle.length === 0
        ) {
            router.push('/');
        } else {
            router.push({
                pathname: '/',
                params: {
                    escolas: JSON.stringify(schoolsSelected),
                    classes: JSON.stringify(selectedClasses),
                    range: JSON.stringify(selectedRange),
                    tempo: JSON.stringify(selectedTempo),
                    circle: JSON.stringify(selectCircle),
                }
            });
        }
    };

    const totalFiltros = [
        selectCircle.length,
        schoolsSelected.length,
        selectedClasses.length,
        selectedRange.length,
        selectedTempo.length,
    ].reduce((a, b) => a + b, 0);

    const clearFilters = async () => {
        try {
            setSelectCircle([]);
            setSchoolsSelected([]);
            setSelectedClasses([]);
            setSelectedRange([]);
            setSelectedTempo([]);
            await AsyncStorage.removeItem(FILTER_STORAGE_KEY);
            router.push('/');
        } catch (error) {
            console.error('Erro ao limpar filtros:', error);
        }
    };

    const ClassIcon = (props?: Partial<ImageProps>): React.ReactElement => (
        <FontAwesome5
            {...props}
            name='magic'
            size={18}
            color={theme['color-primary-500']}
        />
    );

    const schoolIcon = (props?: Partial<ImageProps>): IconElement => (
        <FontAwesome5
            {...props}
            name='school'
            size={18}
            color={theme['color-primary-500']}
        />
    );

    const rangeIcon = (props?: Partial<ImageProps>): IconElement => (
        <FontAwesome5
            {...props}
            name="ruler"
            size={18}
            color={theme['color-primary-500']}
        />
    );

    const tempoIcon = (props?: Partial<ImageProps>): IconElement => (
        <FontAwesome5
            {...props}
            name="clock"
            size={18}
            color={theme['color-primary-500']}
        />
    );

    const circuloIcon = (props?: Partial<ImageProps>): IconElement => (
        <FontAwesome5
            {...props}
            name="sith"
            size={18}
            color={theme['color-primary-500']}
        />
    );

    return (
        <Layout style={{ flex: 1, backgroundColor: theme['color-basic-1000'] }}>
            <Stack.Screen options={{ headerShown: false }} />
            <Layout style={styles.container}>
                <Drawer>
                    <DrawerGroup 
                    title={`Círculo (${selectCircle.length})`}
                    accessoryLeft={circuloIcon}
                    >
                        {CIRCLES.map((e, index) => (
                            <DrawerItem
                                key={index}
                                title={() => (
                                    <CheckBox
                                        checked={selectCircle.includes(e)}
                                        onChange={() => toggleItem(e, selectCircle, setSelectCircle)}
                                    >
                                        {e}
                                    </CheckBox>
                                )}
                            />
                        ))}
                    </DrawerGroup>

                    <DrawerGroup 
                    title={`Classe (${selectedClasses.length})`}
                    accessoryLeft={ClassIcon}
                    >
                        {CLASS.map((c, index) => (
                            <DrawerItem
                                key={index}
                                title={() => (
                                    <CheckBox
                                        checked={selectedClasses.includes(c)}
                                        onChange={() => toggleItem(c, selectedClasses, setSelectedClasses)}
                                    >
                                        {c}
                                    </CheckBox>
                                )}
                            />
                        ))}
                    </DrawerGroup>

                    <DrawerGroup 
                    title={`Escola (${schoolsSelected.length})`}
                    accessoryLeft={schoolIcon}
                    >
                        {SCHOOLS.map((e, index) => (
                            <DrawerItem
                                key={index}
                                title={() => (
                                    <CheckBox
                                        checked={schoolsSelected.includes(e)}
                                        onChange={() => toggleItem(e, schoolsSelected, setSchoolsSelected)}
                                    >
                                        {e}
                                    </CheckBox>
                                )}
                            />
                        ))}
                    </DrawerGroup>

                    <DrawerGroup 
                    title={`Alcance (${selectedRange.length})`}
                    accessoryLeft={rangeIcon}
                    >
                        {RANGE.map((e, index) => (
                            <DrawerItem
                                key={index}
                                title={() => (
                                    <CheckBox
                                        checked={selectedRange.includes(e)}
                                        onChange={() => toggleItem(e, selectedRange, setSelectedRange)}
                                    >
                                        {e}
                                    </CheckBox>
                                )}
                            />
                        ))}
                    </DrawerGroup>

                    <DrawerGroup 
                    title={`Tempo de Conjuração (${selectedTempo.length})`}
                    accessoryLeft={tempoIcon}
                    >
                        {TEMPO.map((e, index) => (
                            <DrawerItem
                                key={index}
                                title={() => (
                                    <CheckBox
                                        checked={selectedTempo.includes(e)}
                                        onChange={() => toggleItem(e, selectedTempo, setSelectedTempo)}
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
                    <Button onPress={applyFilter}>
                        {totalFiltros > 0 ? `Aplicar (${totalFiltros})` : 'Sem filtros'}
                    </Button>
                    <Button onPress={() => router.back()}>Voltar</Button>
                    <Button onPress={clearFilters} status='danger'>Limpar</Button>
                </Layout>
            </Layout>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 10
    }
});




/*
    const toggleItem = (item: string, list: string[], setList: (val: string[]) => void) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };
    */