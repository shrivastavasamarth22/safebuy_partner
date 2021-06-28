import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HelperSettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>This is the Helper Settings Screen</Text>
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

export default HelperSettingsScreen;