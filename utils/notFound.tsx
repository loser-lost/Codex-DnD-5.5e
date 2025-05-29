import { Layout,Text, useTheme} from "@ui-kitten/components";
import {  StyleSheet } from 'react-native';

export function NotFound() {
    const theme = useTheme();
  return (
    <Layout style={[styles.container, { backgroundColor: theme['color-basic-1000'] }]}>
        <Text>Item não encontrado.</Text>
    </Layout>
  );
}
const styles = StyleSheet.create({
     container: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', // Light background color
  }
});