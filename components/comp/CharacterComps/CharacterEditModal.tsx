import React from "react";
import { StyleSheet } from 'react-native';
import { Modal, Card, Layout } from "@ui-kitten/components";
import { CharacterDatabase } from "@/assets/_database/useCharacterDatabase";

import { CharacterForm } from "./CharacterForm";

interface Props{
    visible: boolean;
    onClose: () => void;
    character: CharacterDatabase | null;
    onSave: (updated: CharacterDatabase) => void;
    onBackDrop: () => void;

}

export function CharacterEditModal({visible, onClose, character, onSave, onBackDrop}: Props){
    if (!character){
        return null;
    }

    return(
        <Modal 
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={onBackDrop}
        >
            <Card disabled={true} style={styles.filterList}>
                <Layout style={{ gap: 12 }}>
                    <CharacterForm character={character} onClose={onClose} onSave={onSave} />                 
                </Layout>
            </Card>

        </Modal>
    )

};
const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    filterList: {
        maxHeight: '90%',
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
    },
})
     

