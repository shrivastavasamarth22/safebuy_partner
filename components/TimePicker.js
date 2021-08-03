import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Feather} from "@expo/vector-icons";
import {COLORS} from "../constants";

/**
 * @param {string} heading The heading text of the section
 * @param {object} style Any extra styles
 * @param {node} icon Icon component to be rendered alongside the heading
 * @param {string} hours The hours to be shown in the button
 * @param {string} minutes The minutes to be shown in the button
 * @param {func} onPress The callback to call when we press the button
 * */

const TimePicker = ({
                        heading,
                        style,
                        icon,
                        hours,
                        minutes,
                        onPress
                    }) => {
    return (
        <View style={[styles.timeContainer, style]}>
            <TouchableOpacity style={styles.timeFieldContainer} onPress={onPress}>
                <View style={styles.timeHeaderContainer}>
                    {icon}
                    <Text style={styles.timeHeader}>
                        {heading}
                    </Text>
                </View>
                <View style={styles.timeHeaderContainer}>
                    <Feather name="clock" size={24} color="#2699FB"/>
                    <Text style={styles.timeButton}>
                        {hours + ":" + minutes}
                    </Text>
                </View>
            </TouchableOpacity>
            <View
                style={styles.divider}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    timeContainer: {
        width: "100%",
    },
    timeFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingHorizontal: 24
    },
    timeHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    timeHeader: {
        fontFamily: "Roboto_400Regular",
        fontSize: 18,
        color: 'black',
        marginLeft: 10
    },
    timeButton: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 20,
        color: COLORS.blue,
        marginLeft: 10
    },
    divider: {
        width: "100%",
        height: 0.6,
        backgroundColor: "#CCC"
    }
})

export default TimePicker;