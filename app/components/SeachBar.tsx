import { Text, TitleText } from '@/components/StyledText';
import React, { Fragment, useEffect, useMemo, useState } from 'react';

import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Layout, Input, Button, useTheme } from '@ui-kitten/components';

type Props = {
    value: string;
    onChangeText: (text: string) => void;
};

export default  function SeachBar({ value, onChangeText}: Props) {
    const router = useRouter();
    const theme = useTheme();

return (
    <Layout style={styles.header}>
        <Input
            style={styles.input}
            placeholder="Procurar..."
            value={value}
            onChangeText={onChangeText}
            size="medium"
        />
        <Button onPress={() => router.push('./filterSpell')} size="small" style={{ marginHorizontal: 4 }}>
            Filtrar
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