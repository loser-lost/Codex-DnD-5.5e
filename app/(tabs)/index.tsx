import { Button, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Text, TitleText } from '@/components/StyledText';
import React from 'react';


export default function TabOneScreen() {
  const handleFilter = () => {
    alert('filtro');
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <View>
        <View style={styles.seachContainer}>
          <TextInput
          style={styles.input}
            placeholder="Search..."/*
            onChangeText={setSearchQuery}*/
          />
          <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
            <Text style={{ color: 'white' }}>Filtro</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.nivelBar}>
          <Text style={styles.nivelText}>
            Nivel:
            </Text>
          <View>
            Total:
            </View>
        </View>

        </View>
        <TitleText category='h1'>Magias</TitleText>
        <Text >exemplo de texto médio</Text>
      </Layout>
    </SafeAreaView>
    
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
  },
  seachContainer:{
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    width: 250,
    height: 35,
    borderColor: 'gray',
    color: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10, // <- espaço entre o campo e o botão
    borderRadius: 8,
  },
  filterButton: {
    width: 70,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#DB7610',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  nivelBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    color: '#02060D',
    //backgroundColor: '#DB7610',
    width: '100%',
    borderRadius: 8,

    backgroundColor: '#d1d5db',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  nivelText: {
    color: '#02060D',
    marginRight: '60%',
  },
  totalText: { 
   // color: '#F2F5F7',
    
  },
  title: {
    fontSize: 32, //DB7610
    fontFamily: 'AveriaSerifLibreBold',
  }
});
