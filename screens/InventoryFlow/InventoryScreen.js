import React, {useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableNativeFeedback,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import {COLORS, images} from "../../constants";
import {HeaderBar} from "../../components";
import {LinearGradient} from "expo-linear-gradient";
import {Entypo} from "@expo/vector-icons";
import {useSelector} from "react-redux";

const InventoryScreen = ({navigation}) => {

    const shopName = useSelector(state => state.shop.shop.name)
    const stockItems = useSelector(state => state.stockList.stockList)
    const inventoryList = useSelector(state => state.inventory.inventory)


    if (stockItems.length === 0) {
        return (
            <ImageBackground
                style={styles.container}
                source={images.background}
            >
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
                </View>
            </ImageBackground>
        )
    } else {
        return (
            <View
                style={styles.container}
            >
                <StatusBar
                    backgroundColor={COLORS.green}
                    barStyle={"light-content"}
                />
                <HeaderBar
                    headerText={shopName}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.outlineButtonStyle}
                        onPress={() => navigation.navigate("StockSummaryScreen", {
                            id: inventoryList[inventoryList.length - 1].id
                        })}
                    >
                        <Text style={styles.outlineButtonText}>
                            View Today's Stock
                        </Text>
                        <Entypo name="chevron-right" size={24} color={COLORS.primary}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.outlineButtonStyle}
                        onPress={() => navigation.navigate("SetSellingPriceScreen")}
                    >
                        <Text style={styles.outlineButtonText}>
                            Set Selling Price
                        </Text>
                        <Entypo name="chevron-right" size={24} color={COLORS.primary}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.outlineButtonStyle}
                        onPress={() => navigation.navigate("InventoryHistoryScreen")}
                    >
                        <Text style={styles.outlineButtonText}>
                            View Inventory History
                        </Text>
                        <Entypo name="chevron-right" size={24} color={COLORS.primary}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.outlineButtonStyle}
                        onPress={() => navigation.navigate("AddToStockScreen")}
                    >
                        <Text style={styles.outlineButtonText}>
                            Purchase Stock
                        </Text>
                        <Entypo name="chevron-right" size={24} color={COLORS.primary}/>
                    </TouchableOpacity>=

                    <TouchableOpacity
                        style={styles.outlineButtonStyle}
                        onPress={() => navigation.navigate("ChangeStockScreen")}
                    >
                        <Text style={styles.outlineButtonText}>
                            Change Stock Values
                        </Text>
                        <Entypo name="chevron-right" size={24} color={COLORS.primary}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    buttonContainer: {
        flex: 1,
        width: "100%",
        marginTop: 30,
        paddingHorizontal: 12
    },
    headingText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        color: '#555',
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
    outlineButtonStyle: {
        width: "100%",
        height: 50,
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    outlineButtonText: {
        fontFamily: "Roboto_500Medium",
        color: COLORS.primary,
        fontSize: 16,
    }
})

export default InventoryScreen;