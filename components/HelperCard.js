import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, AntDesign} from '@expo/vector-icons';
import {images, COLORS} from "../constants";

/**
 * @param {object} helper The helper object to be passed
 * @param {bool} controlStatus The control status of the helper
 * @param {func} onRemovePress The callback to call when the remove button is pressed
 * @param {func} onControlPress The callback to call when the control button is pressed
 * */

const HelperCard = ({ helper, controlStatus, onControlPress, onRemovePress }) => {

    const [control, setControl] = useState(controlStatus)

    return (
        <View
            style={styles.container}
        >
            <View style={styles.infoContainer}>
                <Image
                    source={images.user}
                    style={styles.helperImage}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.nameStyle}>
                        {helper.name}
                    </Text>
                    <Text style={styles.addressStyle}>
                        {helper.address1}
                    </Text>
                    <Text style={styles.addressStyle}>
                        {helper.address2}
                    </Text>
                    <Text style={styles.addressStyle}>
                        {helper.landmark}
                    </Text>
                    <Text style={styles.addressStyle}>
                        {helper.pinCode}
                    </Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.removeButtonStyle}
                    onPress={onRemovePress}
                >
                    <FontAwesome name="trash-o" size={22} color="white" />
                    <Text style={styles.buttonText}>
                        Remove
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={controlStatus ? [styles.controlButtonStyle, { backgroundColor: COLORS.primary }] : styles.controlButtonStyle }
                    onPress={onControlPress}
                >
                    {
                        controlStatus ? <AntDesign name="unlock" size={22} color="white" /> : <AntDesign name="lock" size={22} color="white" />
                    }
                    <Text style={styles.buttonText}>
                        Give Control
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: "#CCC"
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    helperImage: {
        width: "30%",
        height: 120,
        borderRadius: 8,
        resizeMode: 'cover'
    },
    textContainer: {
        width: "65%",
        height: "100%",
    },
    nameStyle: {
        fontFamily: 'uber_move_medium',
        fontSize: 16,
        color: '#555',
    },
    addressStyle: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 14,
        color: '#555'
    },
    buttonContainer: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    removeButtonStyle: {
        backgroundColor: '#EB6D6D',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: "35%",
        height: 30,
        borderRadius: 2
    },
    buttonText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        color: 'white',
        marginLeft: 5
    },
    controlButtonStyle: {
        backgroundColor: COLORS.orange,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: "60%",
        height: 30,
        borderRadius: 2
    }
})

export default HelperCard