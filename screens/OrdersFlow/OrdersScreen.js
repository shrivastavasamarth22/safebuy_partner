import React from 'react';
import {View, Text, StyleSheet, ImageBackground, StatusBar, Image} from 'react-native';
import {useSelector} from "react-redux";
import {HeaderBar} from '../../components'
import {images, COLORS} from '../../constants'

const OrdersScreen = () => {
    const shopName = useSelector(state => state.shop.shop.name)

    return (
        <ImageBackground
            source={images.background}
            style={styles.backgroundImage}
        >
            <StatusBar barStyle="light-content" backgroundColor={COLORS.green}/>
            <HeaderBar
                headerText={shopName}
            />
            <View pointerEvents={"none"} style={{width: "100%", height: "60%"}}>
                <Image
                    source={images.empty_order}
                    style={styles.illustrationStyle}
                />
            </View>
            <View style={{marginTop: -40}}>
                <Text style={styles.headerMediumTextStyle}>
                    Looks like you do not have any orders now...
                </Text>
                <Text style={styles.headerBoldTextStyle}>
                    THIS IS WHERE YOU'LL FIND THEM
                </Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        backgroundColor: 'white'
    },
    illustrationStyle: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        marginTop: -50
    },
    headerMediumTextStyle: {
        fontFamily: "Roboto_400Regular",
        fontSize: 18,
        marginTop: -20,
        marginBottom: 10,
        textAlign: "center",
        color: COLORS.green,
    },
    headerBoldTextStyle: {
        fontFamily: "Roboto_700Bold",
        fontSize: 22,
        textAlign: "center",
        color: COLORS.green,
    },
})

export default OrdersScreen;