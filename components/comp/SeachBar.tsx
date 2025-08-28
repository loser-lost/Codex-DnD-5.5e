import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Input, Button  } from '@ui-kitten/components';
import { DeleteIcon } from '@/utils/useIcons';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  handleOpenFilter?: () => void;
  allFilters: number;
};
   
 export default function SearchBar({ value, onChangeText, handleOpenFilter, allFilters }: Props) {

  const handleClear = () => {
    onChangeText('');
  };

    return (
        <Layout style={styles.header}>
            <Input
                style={styles.input}
                placeholder="Procurar..."
                value={value}
                onChangeText={onChangeText}
                size="medium"
                accessoryRight={() => value.length > 0 ? <DeleteIcon deleteIcon={handleClear} /> : <></>}
            />
            <Button onPress={handleOpenFilter} size="small" style={{ marginHorizontal: 4 }}>
                {allFilters > 0 ? `Filtros: ${allFilters}` : 'Filtrar'}
            </Button>
        </Layout>
        );
        
    }
    const styles = StyleSheet.create({
    header: {
        
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 8,
        display: 'flex',
    },
    input: {
        flex: 1,
        marginHorizontal: 4
    },
    })

