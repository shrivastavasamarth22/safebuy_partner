import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import '@expo/match-media'
import {useMediaQuery} from 'react-responsive';

import { COLORS } from "../constants";

const HeaderBar = ({ headerText, onPress }) => {

    const isSmallDevice = useMediaQuery({
        maxDeviceWidth: 360
    })
    if (!isSmallDevice) {
        return (
            <View style={styles.container}>
                <Text style={styles.headerTextStyle}>
                    {headerText}
                </Text>
            </View>
        )
    } else {
        return (
            <View style={[styles.container, { height: "9%" }]}>
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
        height: "8%",
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