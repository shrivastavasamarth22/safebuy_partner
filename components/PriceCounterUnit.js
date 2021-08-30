import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { icons, COLORS } from "../constants";

/**
 * @param {number} price The purchase price of the item
 * @param {string} unit The unit of the item
 * @param {func} onAdd The callback to call when we're increasing the quantity
 * @param {func} onRemove The callback to call when we're decreasing the quantity
 * @param {func} onPricePressOut The callback to call when we're long pressing the quantity
 * @returns
 */
export default function PriceCounterUnit({ price, unit, onAdd, onRemove, onPricePressOut }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPressIn={onRemove} onPressOut={onPricePressOut}>
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
                    {`₹ ${price} / ${unit}`}
                </Text>
            </View>
            <TouchableOpacity onPressIn={onAdd} onPressOut={onPricePressOut}>
                <View style={styles.counterBoxRight}>
                    <Image
                        source={icons.add}
                        resizeMode="contain"
                        style={styles.addIconStyle}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
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
