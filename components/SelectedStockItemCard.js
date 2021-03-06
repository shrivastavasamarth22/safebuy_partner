import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback, Image, Dimensions} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import '@expo/match-media';
import {useMediaQuery} from 'react-responsive';
import { Feather } from '@expo/vector-icons';
import {COLORS} from "../constants";

/**
 * @param {object} item The item object which will be passed into the component
 * @param {func} onPress The callback to call when the user presses on the card
 * */

const SelectedStockItemCard = ({ item, onPress }) => {
    const isSmallDevice = useMediaQuery({
        maxDeviceWidth: 360
    })

    return (
        <TouchableNativeFeedback
            useForeground
            onPress={onPress}
        >
            <View style={ isSmallDevice ? smallStyles.container : styles.container}>
                <LinearGradient
                    colors={[COLORS.fromPrimaryGradientColor, COLORS.toPrimaryGradientColor]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.gradient}
                >
                    <Text
                        style={styles.itemNameStyle}
                        numberOfLines={1}
                    >
                        {item.name}
                    </Text>
                </LinearGradient>
                <Image
                    source={item.image}
                    style={isSmallDevice ? smallStyles.imageStyle : styles.imageStyle}
                />
                <Text style={isSmallDevice ? smallStyles.hindiNameStyle : styles.hindiNameStyle}>
                    {item.hindiName}
                </Text>
                <View style={!isSmallDevice ? styles.checkMarkStyle : smallStyles.checkMarkStyle}>
                    <Feather name="check" size={!isSmallDevice ? 24 : 20} color="white" />
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

const smallStyles = StyleSheet.create({
    container: {
        height: 110,
        width: 110,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 10,
        paddingTop: 5,
        flexDirection: 'column-reverse'
    },
    hindiNameStyle: {
        fontFamily: 'yantramanav_regular',
        fontSize: 14,
        alignSelf: 'center'
    },
    imageStyle: {
        width: 90,
        height: 55,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 5
    },
    gradient: {
        width: "100%",
        height: 22,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkMarkStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0
    }
})

const styles = StyleSheet.create({
    container: {
        height: 130,
        width: 130,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 5,
        marginBottom: 10,
        paddingTop: 5,
        flexDirection: 'column-reverse'
    },
    hindiNameStyle: {
        fontFamily: 'yantramanav_regular',
        fontSize: 16,
        alignSelf: 'center'
    },
    imageStyle: {
        width: 100,
        height: 60,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 8,
    },
    gradient: {
        width: "100%",
        height: 25,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemNameStyle: {
        fontFamily: 'Roboto_500Medium',
        color: 'white',
        fontSize: 12
    },
    checkMarkStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0
    }
})

export default SelectedStockItemCard