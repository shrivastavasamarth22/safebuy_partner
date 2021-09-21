import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Card } from "react-native-shadow-cards";
import { COLORS } from "../constants";
import StockQuantityCounter from "./StockQuantityCounter";

/**
 * @param {OrderItem|Item} item The actual item/product to render in the card
 * @param {number} qty The stock qty of the item
 * @param {func} onQtyRemove The callback to call when we're decreasing the qty
 * @param {func} onQtyPressOut The callback to call when we lift the button
 * @returns
 */
export default function ItemCardStock({ item, qty, onQtyRemove, onQtyPressOut }) {
    return (
        <Card style={styles.cardStyle}>
            <View style={styles.cardContainerStyle}>
                <Text style={styles.itemHindiNameTextStyle}>{item.hindiName}</Text>
                <Image
                    source={item.image}
                    resizeMode="center"
                    style={styles.imageStyle}
                />
                <Text style={styles.itemNameTextStyle}>{item.name}</Text>
            </View>
            <View style={styles.counterContainerStyle}>
                <Text style={styles.quantityTextStyle}>Quantity</Text>
                <StockQuantityCounter
                    quantity={qty}
                    unit={item.unit}
                    onRemove={onQtyRemove}
                    onQtyPressOut={onQtyPressOut}
                />
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    cardStyle: {
        flexDirection: "row",
        alignItems: "center",
        width: "99%",
        marginBottom: 15,
        elevation: 5,
        paddingVertical: 10
    },
    cardContainerStyle: {
        alignItems: "center",
        flex: 1.3,
        paddingTop: 10,
        borderTopRightRadius: 5,
    },
    itemHindiNameTextStyle: {
        fontSize: 22,
        fontFamily: 'yantramanav_medium',
        color: COLORS.primary
    },
    imageStyle: {
        width: 100,
        height: 90,
    },
    itemRateTextStyle: {
        fontSize: 16,
        fontFamily: "Roboto_500Medium",
        color: "white",
    },
    counterContainerStyle: {
        alignItems: "center",
        justifyContent: "center",
        flex: 2,
    },
    itemNameTextStyle: {
        fontSize: 18,
        fontFamily: "Roboto_400Regular",
        color: COLORS.grey,
        marginBottom: 15,
        textAlign: 'center',
        alignSelf: 'center',
    },
    quantityTextStyle: {
        fontSize: 14,
        fontFamily: "Roboto_500Medium",
        marginBottom: 10
    },
});