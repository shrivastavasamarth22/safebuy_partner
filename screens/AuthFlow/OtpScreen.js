import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OtpScreen = () => {
    return (
        <View style={styles.container}>
            <Text>This is the OTP Screen</Text>
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

export default OtpScreen;