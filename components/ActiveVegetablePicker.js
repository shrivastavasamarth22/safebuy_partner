import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import { icons, COLORS, } from '../constants'; 
const { SCREEN_WIDTH } = Dimensions.get("window");

const ActiveVegetablePicker = ({ onPress }) => {

    return(
        <View style={styles.mainContainer}>
            <TouchableOpacity
                style={styles.leftButton}
            >
                <Image 
                    source={icons.vegetables}
                    resizeMode="contain"
                    style={styles.vegetableIconStyle}
                />
                <Text style={styles.activeTextStyle}>
                    Vegetables
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.rightButton}
                onPress={onPress}
            >
                <Image 
                    source={icons.fruit}
                    resizeMode="contain"
                    style={styles.fruitIconStyle}
                />
                <Text style={styles.disabledTextStyle}>
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
        backgroundColor: COLORS.green,
        paddingHorizontal: 10,
        width: "45%",
        height: 35,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        elevation: 10
    },
    vegetableIconStyle: {
        height: 25,
        width: 25,
        marginRight: 15
    },
    activeTextStyle: {
        fontSize: 14,
        fontFamily: "Roboto_500Medium",
        color: "white",
        marginLeft: -5
    },
    rightButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e8e8eb",
        paddingHorizontal: 10,
        width: "45%",
        height: 30,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        elevation: 5
    },
    fruitIconStyle: {
        height: 50,
        width: 50,
        marginLeft: -20,
        opacity: 0.2
    },
    disabledTextStyle: {
        fontSize: 14,
        fontFamily: "Roboto_500Medium",
        color: "#aaa",
        marginLeft: -5
    }

})

export default ActiveVegetablePicker