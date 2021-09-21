import React, {useState, useRef} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    StatusBar,
    Alert,
    TouchableWithoutFeedback, Keyboard, TextInput
} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import * as inventoryActions from '../../store/actions/inventory'
import * as stockActions from '../../store/actions/stockList'
import BottomSheet from "reanimated-bottom-sheet";

import {COLORS, images} from "../../constants";
import {TableComponent, TopBar, SummaryCard, GradientButton} from "../../components";
import { parseDate } from "../../Functions";

const StockBoughtSummaryScreen = ({navigation}) => {
    const cartItems = useSelector(state => state.inventoryCart.inventoryCart)

    const [transportCost, setTransportCost] = useState("");
    const [visible, setVisible] = useState(false);

    const sheetRef = useRef(null);

    const dispatch = useDispatch();

    const addAmount = () => {
        let totalAmount = 0;
        cartItems.forEach(item => {
            totalAmount += item.purchasePrice
        })
        return totalAmount
    }

    const onSubmitPress = () => {
        if (transportCost === "") {
            Alert.alert(
                "Please enter transport cost",
                "Enter 0 if there is none",
                [
                    {
                        text: "OK",
                        onPress: () => {
                        }
                    }
                ]
            )
        } else {
            dispatch(inventoryActions.addInventory(cartItems, Number(transportCost), addAmount()))
            dispatch(stockActions.addItemsToStock(cartItems))
            navigation.navigate("InventoryScreen");
        }
    }

    const onOpenSheet = () => {
        if (sheetRef.current) {
            sheetRef.current.snapTo(1)
            setVisible(true)
        }
    }

    const onCloseSheet = () => {
        if (sheetRef.current) {
            sheetRef.current.snapTo(0)
            setVisible(false)
        }
    }

    const sheetContent = () => {
        return (
            <View style={styles.mediumContainer}>
                <Text style={styles.sheetHeaderText}>
                    Transportation Cost :
                </Text>
                <View style={styles.inputFieldContainer}>
                    <View style={styles.symbolContainer}>
                        <Text style={styles.whiteText}>
                            ₹
                        </Text>
                    </View>
                    <TextInput
                        value={transportCost}
                        onChangeText={(t) => setTransportCost(t)}
                        keyboardType={'number-pad'}
                        style={styles.inputStyle}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <GradientButton
                        text={"Submit"}
                        onPress={onSubmitPress}
                    />
                </View>
            </View>
        )
    }

    return (
        <>
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
                    totalAmount={addAmount()}
                    onSubmitPress={onOpenSheet}
                />
            </ImageBackground>
            {visible ? (
                <TouchableWithoutFeedback
                    onPress={() => {
                        onCloseSheet()
                        Keyboard.dismiss();
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            backgroundColor: "black",
                            opacity: 0.6,
                        }}
                    />
                </TouchableWithoutFeedback>
            ) : null}
            <BottomSheet
                ref={sheetRef}
                snapPoints={[0, 250]}
                initialSnap={0}
                enabledContentGestureInteraction={false}
                enabledContentTapInteraction={false}
                renderContent={sheetContent}
            />
        </>
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

export default StockBoughtSummaryScreen;