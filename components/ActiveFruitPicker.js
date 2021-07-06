import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import { icons, COLORS, } from '../constants';

const { SCREEN_WIDTH } = Dimensions.get("window");

const ActiveFruitPicker = ({ onPress }) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                style={styles.leftButton}
                onPress={onPress}
            >
                <Image 
                    source={icons.vegetables}
                    resizeMode="contain"
                    style={styles.vegetableIconStyle}
                />
                <Text style={styles.disabledTextStyle}>
                    Vegetables
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.rightButton}
            >
                <Image 
                    source={icons.fruit}
                    resizeMode="contain"
                    style={styles.fruitIconStyle}
                />
                <Text style={styles.activeTextStyle}>
                    Fruits
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH,
        paddingHorizontal: 10,
        marginVertical: 10
    },
    leftButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e8e8eb",
        paddingHorizontal: 10,
        width: "45%",
        height: 30,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        elevation: 5
    },
    vegetableIconStyle: {
        height: 25,
        width: 25,
        marginRight: 15,
        opacity: 0.2
    },
    disabledTextStyle: {
        fontSize: 14,
        fontFamily: "Roboto_500Medium",
        color: "#AAA",
        marginLeft: -5
    },
    rightButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.green,
        paddingHorizontal: 10,
        width: "45%",
        height: 35,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        elevation: 10,
    },
    fruitIconStyle: {
        height: 50,
        width: 50,
        marginLeft: -20,
    },
    activeTextStyle: {
        fontSize: 14,
        fontFamily: "Roboto_500Medium",
        color: "white",
        marginLeft: -5
    }
})

export default ActiveFruitPicker