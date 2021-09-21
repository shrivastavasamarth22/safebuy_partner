import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import '@expo/match-media'
import {useMediaQuery} from 'react-responsive';

import { COLORS } from "../constants";

/**
 * @param {string} headerText The text shown in the bar
 * @param {bool} isLavender Whether the background color is lavender or not
 * @param {object} style Any additional styles provided to the component
 * */

const HeaderBar = ({ headerText, isLavender, style }) => {

    const isSmallDevice = useMediaQuery({
        maxDeviceWidth: 360
    })
    if (!isSmallDevice) {
        return (
            <View style={isLavender ? [styles.container, { backgroundColor: "#8c24e3" }, style] : [styles.container, style]}>
                <Text style={styles.headerTextStyle}>
                    {headerText}
                </Text>
            </View>
        )
    } else {
        return (
            <View style={isLavender ? [styles.container, { height: "9%", backgroundColor: '#8c24e3' }, style] : [styles.container, { height: "9%" }, style]}>
                <Text style={styles.headerTextStyle}>
                    {headerText}
                </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "9%",
        backgroundColor: COLORS.primary,
        elevation: 5,
        paddingHorizontal: 24,
        justifyContent: 'center'
    },
    headerTextStyle: {
        fontSize: 20,
        color: "white",
        fontFamily: "Roboto_500Medium"
    },
    buttonStyle: {
        padding: 5
    }
})

export default HeaderBar