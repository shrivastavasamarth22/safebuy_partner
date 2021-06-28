import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OfflineOrderSummaryScreen = () => {
    return (
        <View style={styles.container}>
            <Text>This is the Offline Order Summary Screen</Text>
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

export default OfflineOrderSummaryScreen;