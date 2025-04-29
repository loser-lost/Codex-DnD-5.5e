import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { Text, TitleText } from '@/components/StyledText';


export default function TabOneScreen() {

  return (
    <Layout style={styles.container}>
      <TitleText type='h2'>Magias</TitleText>
      <Text>Exemplo de texto Médio</Text>
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
