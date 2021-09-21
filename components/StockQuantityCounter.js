import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { icons, COLORS } from "../constants";

/**
 * @param {string} quantity A quantity string that also includes the unit
 * @param {string} unit The unit of the item
 * @param {func} onRemove The callback to call when we're decreasing the quantity
 * @param {func} onQtyPressOut The callback to call when pressed out
 * @returns
 */
export default function StockQuantityCounter({ quantity, unit, onRemove, onQtyPressOut }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPressIn={onRemove}
                onPressOut={onQtyPressOut}
            >
                <View style={styles.counterBoxLeft}>
                    <Image
                        source={icons.subtract}
                        resizeMode="contain"
                        style={styles.subtractIconStyle}
                    />
                </View>
            </TouchableOpacity>
            <View style={styles.boxStyle}>
                <Text style={styles.quantityTextStyle}>
                    {quantity + " " + unit}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
    },
    counterBoxLeft: {
        alignItems: "center",
        justifyContent: "center",
        height: 35,
        width: 35,
        backgroundColor: "#EB6D6D",
        borderRadius: 2,
        marginRight: 5,
    },
    subtractIconStyle: {
        height: 25,
        width: 25,
    },
    boxStyle: {
        width: 100,
        height: 35,
        borderColor: "rgba(232, 232, 235, 1)",
        borderWidth: 1,
        borderRadius: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    quantityTextStyle: {
        fontSize: 16,
        fontFamily: "Roboto_500Medium",
    },
    counterBoxRight: {
        alignItems: "center",
        justifyContent: "center",
        height: 35,
        width: 35,
        backgroundColor: COLORS.primary,
        borderRadius: 2,
        marginLeft: 5,
    },
    addIconStyle: {
        height: 40,
        width: 40,
    },
});
