import { AlterFont, BackIcon, StarIcon } from "@/utils/useIcons";
import { Layout,Text, useTheme} from "@ui-kitten/components";
import {  StyleSheet } from 'react-native';
import { router, Stack } from "expo-router";

    const BackFunction = () => {
        router.back();
    }

export function NotFound() {
    const theme = useTheme();
  return (
    <Layout style={[styles.container, { backgroundColor: theme['color-basic-1000'] }]}>
        
            <Layout style={styles.headerIcons} >
                <BackIcon onBackPress={BackFunction} />
                <StarIcon />
            </Layout>
                  <Layout style={[styles.content, { backgroundColor: theme['color-basic-1000'] }]}>                  
                        <Text>Verifique se o ID está correto ou se o item existe.</Text>
                        <Text>Você pode voltar para a tela anterior.</Text>
                  </Layout>
     
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
  },
  content: {
    flex: 1,
    padding: 35,  
    width: '100%',
    borderRadius: 10
  },
  headerIcons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 8
  },
  headerIconsLeft: {
    width: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
        
  }
});

