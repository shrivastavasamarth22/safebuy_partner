import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    ImageBackground,
    ToastAndroid,
    Alert
} from 'react-native';
import {useSelector, useDispatch} from "react-redux";

import {TopBar, ItemCardPurchase, GradientButton} from '../../components'
import {COLORS, images} from "../../constants";
import * as inventoryCartActions from '../../store/actions/inventoryCart'

const AddPurchaseDetailsScreen = ({ navigation }) => {
    const cart = useSelector(state => state.inventoryCart.inventoryCart.inventoryItems);
    const [cartItems, setCartItems] = useState(cart);

    const dispatch = useDispatch();

    const qtyTimer = useRef(null);
    const priceTimer = useRef(null);

    const editQuantity = (id, action) => {
        const updatedCartItems = [...cartItems];
        const foundItem = updatedCartItems.find(item => item.itemId === id);
        const foundIndex = updatedCartItems.indexOf(item => item.itemId === id);
        if (action === "+") {
            foundItem.purchaseQty += foundItem.increment;
            updatedCartItems[foundIndex] = foundItem;
            setCartItems([...updatedCartItems])
        } else {
            if (foundItem.purchaseQty === 0) {
                ToastAndroid.showWithGravity(
                    "Cannot decrease further",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                )
            } else {
                foundItem.purchaseQty -= foundItem.increment;
                updatedCartItems[foundIndex] = foundItem;
                setCartItems([...updatedCartItems])
            }
        }

        qtyTimer.current = setTimeout(() => editQuantity(id, action), 75)
    }

    const editPrice = (id, action) => {
        const updatedCartItems = [...cartItems];
        const foundItem = updatedCartItems.find(item => item.itemId === id);
        const foundIndex = updatedCartItems.indexOf(item => item.itemId === id);
        if (action === "+") {
            foundItem.purchasePrice += 5;
            updatedCartItems[foundIndex] = foundItem;
            setCartItems([...updatedCartItems])
        } else {
            if (foundItem.purchasePrice === 0) {
                ToastAndroid.showWithGravity(
                    "Cannot decrease further",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                )
            } else {
                foundItem.purchasePrice -= 5;
                updatedCartItems[foundIndex] = foundItem;
                setCartItems([...updatedCartItems])
            }
        }

        priceTimer.current = setTimeout(() => editPrice(id, action), 100)
    }

    const stopQtyTimer = () => {
        clearTimeout(qtyTimer.current)
    }

    const stopPriceTimer = () => {
        clearTimeout(priceTimer.current)
    }

    const onSubmitPress = () => {
        const copiedItems = [...cartItems];

        let canPass = true;

        copiedItems.forEach(item => {
            if (item.purchaseQty === 0 || item.purchasePrice === 0) {
                canPass = false;
                Alert.alert(
                    "Please fill all values correctly",
                    "A value was found to be 0. Kindly double check and fill again",
                    [
                        {
                            text: "OK",
                            onPress: () => {}
                        }
                    ]
                )
            }
        })

        if (canPass) {
            const updatedItems = copiedItems.map(item => {
                item.totalPurchaseCostPerUnit = item.purchasePrice / item.purchaseQty;
                return item;
            })
            setCartItems([...updatedItems]);
            dispatch(inventoryCartActions.addItems(cartItems));
            navigation.navigate("AddSellingPriceScreen")
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
                headerText={"Add Purchase Details"}
                onBackButtonPress={navigation.goBack}
            />

            <View style={styles.contentContainer}>
                <Text style={styles.headerText}>
                    Your Purchased Items:
                </Text>
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.itemId.toString()}
                    contentContainerStyle={{
                        alignItems: 'center'
                    }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <ItemCardPurchase
                            item={item}
                            quantity={item.purchaseQty}
                            price={item.purchasePrice}
                            onQtyAdd={() => editQuantity(item.itemId, "+")}
                            onQtyRemove={() => editQuantity(item.itemId, "-")}
                            onPriceAdd={() => editPrice(item.itemId, "+")}
                            onPriceRemove={() => editPrice(item.itemId, "-")}
                            onQtyPressOut={stopQtyTimer}
                            onPricePressOut={stopPriceTimer}
                        />
                    )}
                />
            </View>
            <View style={styles.buttonContainer}>
                <GradientButton
                    text={"Continue"}
                    onPress={onSubmitPress}
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: 10
    },
    headerText: {
        fontFamily: 'uber_move_bold',
        fontSize: 20,
        color: "#555",
        marginBottom: 10,
        marginLeft: 17
    },
    buttonContainer: {
        width: "100%",
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: 10
    }
})

export default AddPurchaseDetailsScreen;