import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import GradientButton from "./GradientButton";

/**
 * @param {array} data The data array to be passed into the card
 * @param {string} cost The transport cost of the entire stock
 * @param {func} onChange The callback to call when we change text
 * @param {func} onSubmitPress The callback to call when we press the cta
 * @param {number} totalAmount The total purchase cost
 * @param {func} onSubmitPress The callback to call when the cta is pressed
 * */

const SummaryCard = ({data, cost, onChange, totalAmount, onSubmitPress}) => {



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
                        {data.length}
                    </Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.summaryTextStyle}>
                        Total Purchase Cost:
                    </Text>
                    <Text style={styles.summaryTextStyle}>
                        ₹ {totalAmount}
                    </Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.summaryTextStyle}>
                        Gross Total :
                    </Text>
                    <Text style={styles.summaryTextStyle}>
                        ₹ {totalAmount + Number(cost)}
                    </Text>
                </View>
                <GradientButton
                    text={"Submit"}
                    onPress={onSubmitPress}
                />
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
        fontFamily: "Roboto_500Medium",
        color: "#262626",
    },
    inputStyle: {
        backgroundColor: 'white',
        height: 40,
        width: 80,
        borderRadius: 5,
        borderWidth: 0.6,
        borderColor: '#CCC',
        marginLeft: 10,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: "Roboto_500Medium",
        color: "#262626",
    }
})

export default SummaryCard