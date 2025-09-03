import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Button  } from '@ui-kitten/components';


type Props = {
  handleOpenFilter?: () => void;
  allFilters: number;
};
   
 export default function FilterButton({handleOpenFilter, allFilters }: Props) {

    return (
        <Layout style={styles.header}>
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

