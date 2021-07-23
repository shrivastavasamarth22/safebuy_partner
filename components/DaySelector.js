import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { Feather } from '@expo/vector-icons';
import {COLORS} from "../constants";

/**
 * @param {string} englishText The english text to be displayed
 * @param {string} hindiText The hindi text to be displayed
 * @param {bool} selected Whether the day is selected or not
 * @param {func} onPress The callback to call when the user presses the button
 * */

const DaySelector = ({englishText, hindiText, selected, onPress}) => {
    return (
        <View
            style={styles.mainContainer}
        >
            <TouchableOpacity
                style={styles.fieldContainer}
                onPress={onPress}
            >
                <View>
                    <Text style={styles.hindiText}>
                        {hindiText}
                    </Text>
                    <Text style={styles.englishText}>
                        {englishText}
                    </Text>
                </View>
                {
                    selected ?
                        <View style={styles.selectedContainer}>
                            <Feather name="check" size={24} color="white" />
                        </View>
                        : <View style={styles.unselectedContainer} />
                }
            </TouchableOpacity>
            <View
                style={styles.divider}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        marginTop: 10
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        flex: 1,
        marginBottom: 10
    },
    hindiText: {
        fontFamily: 'yantramanav_bold',
        fontSize: 18,
        color: '#555'
    },
    englishText: {
        fontFamily: 'uber_move_bold',
        fontSize: 18,
        color: '#555',
        marginBottom: 5
    },
    divider: {
        width: "100%",
        height: 0.6,
        backgroundColor: "#CCC"
    },
    selectedContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary
    },
    unselectedContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.primary
    }
})

export default DaySelector