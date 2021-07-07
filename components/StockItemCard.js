import React  from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback, Image} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import '@expo/match-media';
import {useMediaQuery} from 'react-responsive';
import {COLORS} from "../constants";

/**
 * @param {object} item The item object which will be passed into the component
 * @param {func} onPress The callback to call when the user presses on the card
 * */

const StockItemCard = ({item, onPress}) => {

    const isSmallDevice = useMediaQuery({
        maxDeviceWidth: 360
    })

    return (
        <TouchableNativeFeedback
            useForeground
            onPress={onPress}
        >
            <View style={isSmallDevice ? smallStyles.container : styles.container}>
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
            </View>
        </TouchableNativeFeedback>
    )
}

const smallStyles = StyleSheet.create({
    container: {
        height: 110,
        width: 110,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 5,
        elevation: 5,
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
})

const styles = StyleSheet.create({
    container: {
        height: 130,
        width: 130,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 5,
        elevation: 5,
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
})

export default StockItemCard

