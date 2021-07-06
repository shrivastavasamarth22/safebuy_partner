import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants";

/**
 * @param {string} text The text displayed inside the button
 * @param {func} onPress The callback to call when the button is pressed
 * @param {styleMedia} style External styling of the button
 * */

const GradientButton = ({ text, onPress, style }) => {
    return (
        <TouchableOpacity
            style={[styles.buttonContainer, style]}
            onPress={onPress}
        >
            <LinearGradient
                colors={[COLORS.fromPrimaryGradientColor, COLORS.toPrimaryGradientColor]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.buttonGradientStyle}
            >
                <Text style={styles.buttonTextStyle}>
                    {text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: "100%",
        marginBottom: 15
    },
    buttonGradientStyle: {
        width: "100%",
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTextStyle: {
        fontSize: 18,
        fontFamily: "Roboto_500Medium",
        color: "white",
    },
})

export default GradientButton