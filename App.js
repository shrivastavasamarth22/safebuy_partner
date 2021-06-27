import React, { useState } from 'react';
import {View, Text, StyleSheet} from "react-native";
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";

const fetchFonts = () => {
    return Font.loadAsync({
        'uber_move_medium': require('./assets/fonts/UberMoveMedium.otf'),
        'uber_move_bold': require('./assets/fonts/UberMoveBold.otf'),
        'Roboto_400Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto_500Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto_700Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'yantramanav_regular': require('./assets/fonts/Yantramanav-Regular.ttf'),
        'yantramanav_medium': require('./assets/fonts/Yantramanav-Medium.ttf'),
        'yantramanav_bold': require('./assets/fonts/Yantramanav-Bold.ttf')
    })
}

export default function App() {

    const [fontsLoaded, setFontsLoaded] = useState(false)

    if (!fontsLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => {
                    setFontsLoaded(true)
                }}
                onError={(err) => console.error(err)}
            />
        )
    }

    return (
        <View style={styles.container}>
            <Text>Hello World</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})