import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ShopSettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>This is the ShopSettingsScreen Screen</Text>
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

export default ShopSettingsScreen;