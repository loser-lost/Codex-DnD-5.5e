import { Text, TitleText } from "@/components/StyledText";
import { Layout } from "@ui-kitten/components";
import { StyleSheet } from "react-native";


export default function MonsterScreen() {

  return (
    <Layout style={styles.container}>
      <TitleText category='h1'>Configurações</TitleText>
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