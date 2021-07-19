import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import {Entypo} from "@expo/vector-icons";

/**
 * @param {string} buttonText The text displayed on the list button
 * @param {object} style An external style object to be applied
 * @param {func} onPress The callback to call when a user presses on the button
 * */

const ListButton = ({ buttonText, style, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.listButton, style]}
        >
            <View style={styles.listButtonContainer}>
                <Text style={styles.listButtonTextStyle}>
                    {buttonText}
                </Text>
                <Entypo name="chevron-right" size={24} color="#d1d1d6" />
            </View>
            <View
                style={styles.listDivider}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listButton: {
        width: "100%",
        height: 60,
        justifyContent: "center"
    },
    listButtonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    listButtonTextStyle: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 18,
        color: "#1d1d1d",
    },
    listDivider: {
        width: "100%",
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }
})

export default ListButton;