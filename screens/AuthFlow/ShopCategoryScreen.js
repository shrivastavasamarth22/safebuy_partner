import React, { useEffect }  from 'react';
import {View, Text, StyleSheet, BackHandler, StatusBar, Image, TouchableOpacity} from 'react-native';
import {HeaderBar} from "../../components";
import { icons } from '../../constants'

const ShopCategoryScreen = ({ navigation }) => {
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => false)
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={'#6d0fbc'}
                barStyle={'light-content'}
            />
            <HeaderBar
                headerText={"Shop Category"}
                isLavender={true}
            />
            <TouchableOpacity
                style={styles.mainListButtonContainer}
                onPress={() => navigation.navigate("RegistrationFormScreen")}
            >
                <View style={styles.listContentContainer}>
                    <Image
                        source={icons.vegetables}
                        style={styles.vegetableIconStyle}
                    />
                    <Text style={styles.buttonTextStyle}>
                        Vegetable & Fruits Shop
                    </Text>
                </View>
                <View
                    style={styles.divider}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    mainListButtonContainer: {
        width: "100%",
        paddingTop: 20
    },
    listContentContainer: {
        width: "100%",
        flexDirection: 'row',
        paddingHorizontal: 12,
        alignItems: 'center',
    },
    vegetableIconStyle: {
        height: 35,
        width: 35,
        resizeMode: 'contain'
    },
    buttonTextStyle: {
        marginLeft: 20,
        fontSize: 18,
        fontFamily: 'Roboto_500Medium'
    },
    divider: {
        width: "100%",
        height: 0.6,
        backgroundColor: "#CCC",
        marginTop: 20
    },
})

export default ShopCategoryScreen;