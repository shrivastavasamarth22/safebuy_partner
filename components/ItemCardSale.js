import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Card } from "react-native-shadow-cards";
import { COLORS } from "../constants";
import PriceCounterUnit from "./PriceCounterUnit";

/**
 * @param {OrderItem|Item} item The actual item/product to render in the card
 * @param {number} price The price of the item
 * @param {func} onPriceAdd The callback to call when we're increasing the price
 * @param {func} onPriceRemove The callback to call when we're decreasing the price
 * @param {func} onPricePressOut
 * @returns
 */
export default function ItemCardSale({ item, price, onPriceAdd, onPriceRemove, onPricePressOut }) {
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
                <Text style={styles.quantityTextStyle}>Price</Text>
                <PriceCounterUnit
                    price={price}
                    unit={item.unit}
                    onAdd={onPriceAdd}
                    onRemove={onPriceRemove}
                    onPricePressOut={onPricePressOut}
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