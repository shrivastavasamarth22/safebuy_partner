import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    TouchableNativeFeedback
} from 'react-native';
import {useSelector} from "react-redux";
import {Entypo} from "@expo/vector-icons";
import {TopBar} from '../../components'
import {parseDate} from "../../Functions";
import {COLORS, images} from "../../constants";

const InventoryHistoryScreen = ({navigation}) => {

    const inventoryList = useSelector(state => state.inventory.inventory)

    return (
        <ImageBackground
            style={styles.container}
            source={images.background}
        >
            <StatusBar
                backgroundColor={COLORS.green}
                barStyle={"light-content"}
            />
            <TopBar
                headerText={"Inventory History"}
                onBackButtonPress={navigation.goBack}
            />

            <Text style={styles.headingText}>
                Select Date :
            </Text>

            <FlatList
                data={inventoryList}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return (
                        <>
                            <TouchableNativeFeedback
                                onPress={() => navigation.navigate("StockSummaryScreen", {
                                    id: item.id
                                })}
                            >
                                <View style={styles.buttonStyle}>
                                    <Text style={styles.buttonTextStyle}>
                                        {parseDate(item.date)}
                                    </Text>
                                    <Entypo name="chevron-right" size={28} color="#555"/>
                                </View>
                            </TouchableNativeFeedback>
                        </>
                    )
                }}
            />
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
        fontSize: 20,
        color: COLORS.primary,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 24
    },
    listContainer: {
        width: "100%",
        backgroundColor: '#f3f3f3',
        paddingHorizontal: 24,
        paddingBottom: 20
    },
    listContent: {
        width: "100%",
        marginTop: 20
    },
    listItem: {
        flexDirection: 'row',
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    listText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 18,
        color: '#555',
    },
    divider: {
        width: "100%",
        height: 0.5,
        backgroundColor: "#555"
    },
    buttonStyle: {
        width: "100%",
        height: 50,
        marginBottom: 10,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.lightGrey
    },
    buttonTextStyle: {
        fontFamily: 'Roboto_500Medium',
        color: COLORS.darkGrey,
        fontSize: 16
    },
})

export default InventoryHistoryScreen;