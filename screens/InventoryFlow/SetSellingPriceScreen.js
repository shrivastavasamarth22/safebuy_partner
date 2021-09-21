import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, ImageBackground, StatusBar, FlatList, ToastAndroid, Alert} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import {TopBar, ItemCardSale, GradientButton} from '../../components'
import {COLORS, images} from "../../constants";
import * as inventoryActions from "../../store/actions/inventory";

const SetSellingPriceScreen = ({ navigation }) => {
    const inventory = useSelector(state => state.inventory.inventory);
    const latestInventory = inventory[inventory.length - 1]
    const [items, setItems] = useState(latestInventory.inventoryItems);

    const dispatch = useDispatch();

    const timer = useRef(null);

    const editPrice = (id, action) => {
        const updatedCartItems = [...items];
        const foundItem = updatedCartItems.find(item => item.itemId === id);
        const foundIndex = updatedCartItems.indexOf(item => item.itemId === id);
        if (action === "+") {
            foundItem.sellingPrice += 5;
            updatedCartItems[foundIndex] = foundItem;
            setItems([...updatedCartItems])
        } else {
            if (foundItem.sellingPrice === 0) {
                ToastAndroid.showWithGravity(
                    "Cannot decrease further",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                )
            } else {
                foundItem.sellingPrice -= 5;
                updatedCartItems[foundIndex] = foundItem;
                setItems([...updatedCartItems])
            }
        }

        timer.current = setTimeout(() => editPrice(id, action), 100)
    }

    const stopTimer = () => {
        clearTimeout(timer.current);
    }

    const onSubmitPress = () => {
        const copiedItems = [...items];
        let canPass = true;

        copiedItems.forEach(item => {
            if (item.sellingPrice === 0) {
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
            setItems([...copiedItems]);
            dispatch(inventoryActions.updateInventory(latestInventory.id, items));
            navigation.navigate("InventoryScreen")
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
                headerText={"Add Selling Price"}
                onBackButtonPress={navigation.goBack}
            />

            <View style={styles.contentContainer}>
                <Text style={styles.headerText}>
                    Add Selling Price
                </Text>

                <FlatList
                    data={items}
                    keyExtractor={item => item.itemId.toString()}
                    contentContainerStyle={{
                        alignItems: 'center'
                    }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <ItemCardSale
                            item={item}
                            price={item.sellingPrice}
                            onPriceAdd={() => editPrice(item.itemId, "+")}
                            onPriceRemove={() => editPrice(item.itemId, "-")}
                            onPricePressOut={stopTimer}
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

export default SetSellingPriceScreen;