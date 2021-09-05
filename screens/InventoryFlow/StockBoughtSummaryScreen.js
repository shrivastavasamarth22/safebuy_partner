import React, { useState } from 'react';
import {View, Text, StyleSheet, ImageBackground, StatusBar, Alert} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import * as inventoryActions from '../../store/actions/inventory'
import * as stockActions from '../../store/actions/stockList'

import {COLORS, images} from "../../constants";
import {TableComponent, TopBar, SummaryCard} from "../../components";

const StockBoughtSummaryScreen = ({ navigation }) => {
    const cartItems = useSelector(state => state.inventoryCart.inventoryCart)

    const [transportCost, setTransportCost] = useState("");

    const dispatch = useDispatch();

    const addAmount = () => {
        let totalAmount = 0;
        cartItems.forEach(item => {
            totalAmount += item.purchasePrice
        })
        return totalAmount
    }

    const parseDate = (date) => {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let year = date.getUTCFullYear();
        let month = date.getUTCMonth();
        let dt = date.getUTCDate();
        let day = date.getUTCDay();

        if (dt < 10) {
            dt = '0' + dt;
        }

        return `${dayNames[day]}, ${dt} ${monthNames[month]} ${year}`
    }

    const onSubmitPress = () => {
        if (transportCost === "") {
            Alert.alert(
                "Please enter transport cost",
                "Enter 0 if there is no transport cost",
                [
                    {
                        text: "OK",
                        onPress: () => {}
                    }
                ]
            )
        } else {
            dispatch(inventoryActions.addInventory(cartItems, Number(transportCost), addAmount()))
            dispatch(stockActions.addItemsToStock(cartItems))
            navigation.navigate("InventoryScreen");
        }
    }

    return (
        <ImageBackground
            style={styles.container}
            source={images.background}
        >
            <StatusBar
                backgroundColor={COLORS.green}
                barStyle={"light-content"}
            />

            {/* Top Bar */}
            <TopBar
                headerText={"Purchase Summary"}
                onBackButtonPress={navigation.goBack}
            />

            <Text style={styles.headerText}>
                Stock Bought on {parseDate(new Date())}
            </Text>

            <TableComponent
                data={cartItems}
            />

            <SummaryCard
                data={cartItems}
                cost={transportCost}
                onChange={t => setTransportCost(t)}
                totalAmount={addAmount()}
                onSubmitPress={onSubmitPress}
            />

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerText: {
        fontFamily: 'uber_move_medium',
        fontSize: 18,
        color: COLORS.primary,
        marginLeft: 17,
        marginVertical: 10
    },
    barContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    summaryTextStyle: {
        fontSize: 16,
        marginBottom: 10,
        fontFamily: "Roboto_500Medium",
        color: "#262626",
    },
})

export default StockBoughtSummaryScreen;