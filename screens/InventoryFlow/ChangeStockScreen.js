import React, {useState, useRef} from "react";
import {View, Text, StyleSheet, StatusBar, FlatList, ImageBackground} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {TopBar, ItemCardStock, GradientButton} from '../../components'
import {COLORS, images} from "../../constants";
import {updateStock} from "../../store/actions/stockList";

const ChangeStockScreen = ({navigation}) => {
    const stockList = useSelector(state => state.stockList.stockList)
    const [stock, setStock] = useState(stockList);

    const dispatch = useDispatch();

    const qtyTimer = useRef(null)

    const removeQuantity = (id) => {
        const updatedStockList = [...stock];
        const foundItem = updatedStockList.find(item => item.itemId === id);
        const foundIndex = updatedStockList.findIndex(item => item.itemId === id)

        if (foundItem.qty === foundItem.increment) {
            const newUpdate = updatedStockList.filter(item => item.itemId !== id)
            setStock([...newUpdate])
        } else {
            foundItem.qty -= foundItem.increment;
            updatedStockList[foundIndex] = foundItem;
            setStock([...updatedStockList])
        }
        qtyTimer.current = setTimeout(() => removeQuantity(id), 75)
    }

    const stopQtyTimer = () => {
        clearTimeout(qtyTimer.current)
    }

    const onSubmitPress = () => {
        dispatch(updateStock(stock));
        navigation.navigate("InventoryScreen")
    }


    return (
        stock.length !== 0
            ?
            <ImageBackground
                style={styles.container}
                source={images.background}
            >
                <StatusBar
                    barStyle={'light-content'}
                    backgroundColor={COLORS.green}
                />
                <TopBar
                    headerText={"Change Stock"}
                    onBackButtonPress={navigation.goBack}
                />
                <Text style={styles.headingText}>
                    My Remaining Stock :
                </Text>
                <FlatList
                    data={stock}
                    keyExtractor={item => item.itemId.toString()}
                    contentContainerStyle={{
                        width: "100%",
                        paddingHorizontal: 5,
                        alignItems: 'center'
                    }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <ItemCardStock
                            item={item}
                            qty={item.qty}
                            onQtyRemove={() => removeQuantity(item.itemId)}
                            onQtyPressOut={stopQtyTimer}
                        />
                    )}
                />
                <View style={styles.buttonContainer}>
                    <GradientButton
                        text={"Submit"}
                        onPress={onSubmitPress}
                    />
                </View>
            </ImageBackground>
            :
            <ImageBackground
                style={styles.container}
                source={images.background}
            >
                <StatusBar
                    barStyle={'light-content'}
                    backgroundColor={COLORS.green}
                />
                <TopBar
                    headerText={"Change Stock"}
                    onBackButtonPress={navigation.goBack}
                />
                <View style={styles.contentContainer}>
                    <Text style={styles.messageText}>
                        You have no items in stock now...
                    </Text>
                    <Text style={styles.subText}>
                        Press confirm to exit
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <GradientButton
                        text={"Confirm"}
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
    headingText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 18,
        color: '#555',
        marginVertical: 10,
        marginLeft: 24
    },
    buttonContainer: {
        width: "100%",
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: 10
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageText: {
        fontFamily: 'uber_move_bold',
        color: COLORS.primary,
        fontSize: 22,
        marginBottom: 5
    },
    subText: {
        fontFamily: 'uber_move_bold',
        color: COLORS.primary,
        fontSize: 20,
    }
})

export default ChangeStockScreen;