import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Card } from "react-native-shadow-cards";
import { COLORS } from "../constants";
import QuantityCounter from "./QuantityCounter";
import PriceCounter from "./PriceCounter";

/**
 * @param {OrderItem|Item} item The actual item/product to render in the card
 * @param {number} quantity The quantity of the item in the bag
 * @param {number} price The price of the item
 * @param {func} onQtyAdd The callback to call when we're increasing the quantity
 * @param {func} onQtyRemove The callback to call when we're decreasing the quantity
 * @param {func} onPriceAdd The callback to call when we're increasing the price
 * @param {func} onPriceRemove The callback to call when we're decreasing the price
 * @param {func} onQtyPressOut
 * @param {func} onPricePressOut
 * @returns
 */
export default function ItemCardPurchase({ item, quantity, price, onQtyAdd, onQtyRemove, onPriceAdd, onPriceRemove, onQtyPressOut,onPricePressOut }) {
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
                <QuantityCounter
                    quantity={`${quantity} ${item.unit}`}
                    onAdd={onQtyAdd}
                    onRemove={onQtyRemove}
                    onQtyPressOut={onQtyPressOut}
                />
                <Text style={styles.quantityTextStyle}>Price</Text>
                <PriceCounter
                    price={`₹ ${price}`}
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
        fontSize: 16,
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