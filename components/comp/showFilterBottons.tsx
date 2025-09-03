import { IconX } from "@/utils/useIcons";
import { Button, Layout } from "@ui-kitten/components";
import {  StyleSheet } from 'react-native';

type SetProps = {
    selectedClasses: string[];
    selectedCircle: string[];
    onRemoveClass: (className: string) => void;
    onRemoveCircle: (circleName: string) => void;
};
   const ShowButtons = ({ selectedClasses, selectedCircle, onRemoveClass, onRemoveCircle }: SetProps) => {
        return(
                <Layout>
                    {(selectedClasses.length > 0 || selectedCircle.length > 0) && (
                        <Layout style={styles.header}>
                        {selectedClasses.map((className, index) => (
                            <Button
                            key={index} 
                            style={styles.filterButton}
                            accessoryRight={IconX}
                            onPress={() => onRemoveClass(className)}
                            size='tiny'
                            >
                            {className}
                            </Button>
                        ))}
                        
                        {selectedCircle.map((circleName, index) => (
                            <Button
                            key={index} 
                            style={styles.filterButton}
                            accessoryRight={IconX}
                            onPress={() => onRemoveCircle(circleName)}
                            size='tiny'
                            >
                            {circleName}
                            </Button>
                        ))}
                        </Layout>
                    )}
                </Layout>
            );
    };
    export default ShowButtons;
    const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    
    filterButton:{
       margin: 5,
       borderRadius: 10,
    },
 
});
        