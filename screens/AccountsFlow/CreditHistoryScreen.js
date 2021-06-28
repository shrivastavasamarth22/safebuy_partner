import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreditHistoryScreen = () => {
    return (
        <View style={styles.container}>
            <Text>This is the Credit History Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CreditHistoryScreen;