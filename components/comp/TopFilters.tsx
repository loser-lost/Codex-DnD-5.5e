import { Layout } from "@ui-kitten/components/ui";
import ShowButtons from "./showFilterBottons";
import {  StyleSheet } from 'react-native';
import { FilterIcon } from "@/utils/useIcons";

type FilListProps = {
    selectedClasses: string[];
    selectedCircle: string[];
    handleRemoveClass: (string: string) => void;
    handleRemoveCircle: (string: string) => void;
    handleOpenModalFilter:() => void;
};
const TopListFilters = ( { selectedClasses, selectedCircle, handleRemoveClass, handleRemoveCircle, handleOpenModalFilter} : FilListProps)=>{
        return(
            <Layout style={styles.header}>
                <Layout style={styles.heade1}>
                    <ShowButtons
                        selectedClasses={selectedClasses}
                        selectedCircle={selectedCircle}
                        onRemoveClass={handleRemoveClass}
                        onRemoveCircle={handleRemoveCircle}
                    />
                </Layout>
                <Layout style={styles.heade2}>
                    <FilterIcon filterIcon={handleOpenModalFilter} />
                </Layout>
            </Layout>
        )
    };
    export default TopListFilters;
        const styles = StyleSheet.create({
            heade1: {
            marginLeft:5
        },
        heade2: {
            marginRight: 5,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },     
    });