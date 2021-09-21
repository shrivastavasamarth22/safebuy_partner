import React from 'react';
import {
    Text,
    StyleSheet,
    ImageBackground,
    StatusBar,
} from 'react-native';
import {useSelector} from "react-redux";

import {COLORS, images} from "../../constants";
import {TableComponent, TopBar, StockSummaryCard} from "../../components";
import { parseDate } from "../../Functions";

const StockSummaryScreen = ({navigation, route}) => {
    const {id} = route.params;

    const inventoryList = useSelector(state => state.inventory.inventory);
    const inventory = inventoryList.find(i => i.id === id)
    const items = inventory.inventoryItems;



    const addAmount = () => {
        let totalAmount = 0;
        items.forEach(item => {
            totalAmount += item.purchasePrice
        })
        return totalAmount
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
                Stock Bought on {parseDate(inventory.date)}
            </Text>

            <TableComponent
                data={items}
            />

            <StockSummaryCard
                totalItems={items.length}
                totalAmount={addAmount()}
                transportationCost={inventory.transportationCost}
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
    mediumContainer: {
        height: 250,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
        paddingTop: 20,
        paddingHorizontal: 24
    },
    sheetHeaderText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 18,
        color: '#555',
        marginBottom: 30
    },
    inputFieldContainer: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
    },
    symbolContainer: {
        width: "15%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    whiteText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 20,
        color: 'white'
    },
    inputStyle: {
        width: "85%",
        height: 50,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: "white",
        borderColor: "#CCC",
        borderTopWidth: 0.6,
        borderRightWidth: 0.6,
        borderBottomWidth: 0.6,
        paddingHorizontal: 12,
        fontFamily: 'uber_move_medium',
        fontSize: 16,
        color: '#111'
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})

export default StockSummaryScreen;