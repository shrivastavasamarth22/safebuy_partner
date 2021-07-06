import React, {useState, useMemo} from 'react';
import {View, StyleSheet, StatusBar, FlatList, ImageBackground} from 'react-native';
import '@expo/match-media'
import { useMediaQuery } from 'react-responsive';
import {
    TopBar,
    SearchBar,
    ActiveFruitPicker,
    ActiveVegetablePicker,
    StockItemCard,
    SelectedStockItemCard,
    GradientButton
} from '../../components'
import {COLORS, images} from "../../constants";
import {items} from '../../mock-data/items';

const AddToStockScreen = ({navigation}) => {
    const [barVisible, setBarVisible] = useState(false)
    const [search, setSearch] = useState("");
    const [active, setActive] = useState("vegetable");
    const [selected, setSelected] = useState([])

    const toggleSelected = (itemId) => {
        const found = selected.find(id => id === itemId);
        let newList
        if (found) {
            newList = selected.filter(id => id !== itemId)
            setSelected(newList)
        } else {
            newList = selected.concat(itemId);
            setSelected(newList)
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
                    const found = selected.find(id => id === item.itemId)

                    if (item.empty === true) {
                        return (
                            <View style={isSmallDevice ? smallStyles.itemInvisible : styles.itemInvisible } />
                        )
                    }
                    if (!found) {
                        return (
                            <StockItemCard
                                item={item}
                                onPress={() => toggleSelected(item.itemId)}
                            />
                        )
                    } else {
                        return (
                            <SelectedStockItemCard
                                item={item}
                                onPress={() => toggleSelected(item.itemId)}
                            />
                        )
                    }
                }}
            />
            <GradientButton
                text={"Continue"}
                style={{
                    width: "97%",
                    alignSelf: 'center'
                }}
            />
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
        backgroundColor: 'white',
    },
    itemInvisible: {
        backgroundColor: 'transparent',
        width: 130,
        height: 130,
        marginBottom: 10
    }
})

export default AddToStockScreen;