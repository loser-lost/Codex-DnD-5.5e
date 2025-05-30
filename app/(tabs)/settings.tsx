import { Text, TitleText } from "@/components/StyledText";
import { StyleSheet } from "react-native";
import { Button, Layout } from '@ui-kitten/components';
import React from "react";



  


export default function MonsterScreen() {
  

  return (
    <Layout style={styles.container}>
      <TitleText type='h2'>Configurações</TitleText>
      <Text>Tela em desenvolvimento...</Text>
      
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: 'AveriaSerifLibreBold',
  }
});