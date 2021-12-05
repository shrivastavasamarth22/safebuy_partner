import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import GradientButton from "./GradientButton";
import {COLORS} from "../constants";

/**
 * @param {number} totalItems The data array to be passed into the card
 * @param {number} transportationCost The transportationCost of the stock
 * @param {number} totalAmount The total purchase cost
 * */

const SummaryCard2 = ({totalItems, transportationCost, totalAmount}) => {

    return (
        <View style={{
            backgroundColor: "white",
        }}>
            <View style={styles.barContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.summaryTextStyle}>
                        Total Items:
                    </Text>
                    <Text style={styles.summaryTextStyle}>
                        {totalItems}
                    </Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.summaryTextStyle}>
                        Total Purchase Cost:
                    </Text>
                    <Text style={styles.summaryTextStyle}>
                        ₹ {totalAmount - transportationCost}
                    </Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.summaryTextStyle}>
                        Transport Cost
                    </Text>
                    <Text style={styles.summaryTextStyle}>
                        ₹ {transportationCost}
                    </Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.summaryTextStyle}>
                        Gross Total
                    </Text>
                    <Text style={styles.summaryTextStyle}>
                        ₹ {totalAmount}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    barContainer: {
        justifyContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    contentContainer: {
        flexDirection: 'row',
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    summaryTextStyle: {
        fontSize: 16,
        fontFamily: "Roboto_700Bold",
        color: COLORS.darkGrey,
    },
})

export default SummaryCard2