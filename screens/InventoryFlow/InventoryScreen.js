import React from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableNativeFeedback} from 'react-native';
import {COLORS} from "../../constants";
import {HeaderBar} from "../../components";
import {LinearGradient} from "expo-linear-gradient";
import {Entypo} from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

const InventoryScreen = ({ navigation }) => {

    const shopName = useSelector(state => state.shop.shop.name)
    const inventoryList = useSelector(state => state.inventory.inventory)

    const dispatch = useDispatch();

    if (inventoryList.length === 0) {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={COLORS.green}
                    barStyle={"light-content"}
                />
                <HeaderBar
                    headerText={shopName}
                />
                <View style={styles.buttonContainer}>
                    <Text style={styles.headingText}>
                        Today's Stock
                    </Text>
                    <TouchableNativeFeedback
                        useForeground={true}
                        onPress={() => navigation.navigate("AddToStockScreen")}
                    >
                        <LinearGradient
                            colors={[COLORS.fromPrimaryGradientColor, COLORS.toPrimaryGradientColor]}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={styles.gradientButtonStyle}
                        >
                            <Text style={styles.activeButtonTextStyle}>
                                You have no items today, tap to add
                            </Text>
                            <Entypo name="chevron-right" size={24} color="white"/>
                        </LinearGradient>
                    </TouchableNativeFeedback>
                    <View style={styles.inactiveButtonStyle}>
                        <Text style={styles.inactiveButtonTextStyle}>
                            Set Selling Price
                        </Text>
                    </View>
                    <View style={styles.inactiveButtonStyle}>
                        <Text style={styles.inactiveButtonTextStyle}>
                            View Inventory History
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    else {
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        width: "100%",
        marginTop: 30,
        paddingHorizontal: 12
    },
    headingText: {
        fontFamily: 'uber_move_medium',
        fontSize: 16,
        color: "#555",
        marginBottom: 10
    },
    gradientButtonStyle: {
        width: "100%",
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    activeButtonTextStyle: {
        fontFamily: "Roboto_500Medium",
        color: "white",
        fontSize: 16,
    },
    inactiveButtonStyle: {
        width: "100%",
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#CCC",
        marginBottom: 15,
        justifyContent: 'center'
    },
    inactiveButtonTextStyle: {
        fontFamily: "Roboto_500Medium",
        color: "#CCC",
        fontSize: 16,
    }
})

export default InventoryScreen;