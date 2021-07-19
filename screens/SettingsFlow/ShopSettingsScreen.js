import React from 'react';
import {View, StyleSheet, StatusBar, FlatList, ImageBackground, Text} from 'react-native';
import '@expo/match-media'
import {useMediaQuery} from 'react-responsive';
import {TopBar} from '../../components'
import {COLORS, images} from "../../constants";

const ShopSettingsScreen = ({navigation}) => {
    return (
        <ImageBackground
            source={images.background}
            style={styles.container}
        >
            <StatusBar
                backgroundColor={COLORS.green}
                barStyle={"light-content"}
            />

            {/* Top Bar */}
            <TopBar
                headerText={"Shop Settings"}
                onBackButtonPress={navigation.goBack}
            />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
})

export default ShopSettingsScreen;