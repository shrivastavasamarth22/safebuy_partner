import React, {useState, useMemo} from 'react';
import {View, StyleSheet, StatusBar, FlatList, ImageBackground} from 'react-native';
import '@expo/match-media'
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from "react-redux";
import {
    TopBar,
    SearchBar,
    ActiveFruitPicker,
    ActiveVegetablePicker,
    StockItemCard,
    SelectedStockItemCard,
} from '../../components'
import * as inventoryCartActions from '../../store/actions/inventoryCart'
import {COLORS, images} from "../../constants";
import {InventoryItem} from "../../models";
import {items} from '../../mock-data';

const AddToStockScreen = ({navigation}) => {
    const inventoryCartItems = useSelector(state => state.inventoryCart.inventoryCart.inventoryItems)

    const [barVisible, setBarVisible] = useState(false)
    const [search, setSearch] = useState("");
    const [active, setActive] = useState("vegetable");
    const [cartItems, setCartItems] = useState(inventoryCartItems)

    const checkForSelected = (itemId) => {
        const found = cartItems.find(item => item.itemId === itemId);
        return !!found
    }

    const toggleSelected = (item) => {
        if (checkForSelected(item.itemId)) {
            const newList = [...cartItems];
            const updatedList = newList.filter(i => i.itemId !== item.itemId);
            setCartItems([...updatedList]);

        } else {
            const newItem = new InventoryItem({
                ...item,
                purchasePrice: 0,
                purchaseQty: 0,
                sellingPrice: 0
            })
            setCartItems(prevArray => [...prevArray, newItem])
        }
    }

    const isSmallDevice = useMediaQuery({
        maxDeviceWidth: 360
    })

    const {vegetables, fruits} = useMemo(() => {
        const vegetables = [];
        const fruits = [];

        const searchRegex = new RegExp(search, "gi");

        if (items && items.length) {
            const isSearchable = search && search.length > 1;
            items.forEach((i) => {
                const nameMatches = searchRegex.test(i.name);
                const hindiNameMatches = searchRegex.test(i.hindiName);
                if (isSearchable && !(nameMatches || hindiNameMatches)) return;
                if (i.category === "vegetable") vegetables.push(i);
                if (i.category === "fruit") fruits.push(i);
            })
        }
        return {vegetables, fruits}
    }, [items, search])


    const updateSearch = (query) => {
        setSearch(query);
    };

    const formatData = (data) => {
        const numberOfFullRows = Math.floor(data.length / 3);

        let numberOfElementsLastRow = data.length - (numberOfFullRows * 3);

        while(numberOfElementsLastRow !== 3 && numberOfElementsLastRow !== 0) {
            data.push({ itemId : `blank-${numberOfElementsLastRow}`, empty: true });
            numberOfElementsLastRow += 1;
        }

        return data;
    }



    return (
        <ImageBackground
            source={images.background}
            style={styles.container}
        >
            <StatusBar
                backgroundColor={COLORS.green}
                barStyle={"light-content"}
            />

            {/* Top Bar */}
            <TopBar
                headerText={"Add Items to Stock"}
                onBackButtonPress={navigation.goBack}
                searchEnabled
                onSearchButtonPress={() => setBarVisible(!barVisible)}
            />

            {/* Search Bar */}
            {
                barVisible
                    ? <SearchBar
                        search={search}
                        onChangeText={updateSearch}
                        placeholder={"Search items here"}
                    />
                    : null
            }

            {/* Vegetable or Fruit Picker */}
            {active === "vegetable" ? (
                <ActiveVegetablePicker onPress={() => setActive("fruit")}/>
            ) : (
                <ActiveFruitPicker onPress={() => setActive("vegetable")}/>
            )}

            <FlatList
                data={active === "vegetable" ? formatData(vegetables) : formatData(fruits)}
                keyExtractor={(item) => item.itemId.toString()}
                contentContainerStyle={{
                    paddingTop: 5,
                }}
                columnWrapperStyle={{
                    justifyContent: 'space-evenly'
                }}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                renderItem={({ item }) => {
                    if (item.empty === true) {
                        return (
                            <View style={isSmallDevice ? smallStyles.itemInvisible : styles.itemInvisible } />
                        )
                    }
                    if (!checkForSelected(item.itemId)) {
                        return (
                            <StockItemCard
                                item={item}
                                onPress={() => toggleSelected(item)}
                            />
                        )
                    } else {
                        return (
                            <SelectedStockItemCard
                                item={item}
                                onPress={() => toggleSelected(item)}
                            />
                        )
                    }
                }}
            />

            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}>

            </View>
        </ImageBackground>
    )
}

const smallStyles = StyleSheet.create({
    itemInvisible: {
        backgroundColor: 'transparent',
        width: 110,
        height: 110,
        marginBottom: 10
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    itemInvisible: {
        backgroundColor: 'transparent',
        width: 130,
        height: 130,
        marginBottom: 10
    },
    buttonStyle: {
        width: "95%",
        flexDirection: 'row',
        alignSelf: 'center',
        paddingVertical: 5,
        alignItems: 'center',
        borderRadius: 8
    },
    buttonDetailTextStyle: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        color: 'white'
    },
    buttonTextStyle: {
        fontFamily: 'Roboto_500Medium',
        color: 'white',
        fontSize: 20,
    }
})

export default AddToStockScreen;