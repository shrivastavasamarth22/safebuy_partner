import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {Card} from "react-native-shadow-cards";
import {images} from "../constants";

/**
 * @param {object} helper The helper object to be passed
 * @param {bool} controlStatus The control status of the helper
 * @param {func} onRemovePress The callback to call when the remove button is pressed
 * @param {func} onControlPress The callback to call when the control button is pressed
 * */

const HelperCard = ({ helper, controlStatus, onControlPress, onRemovePress }) => {

    const [control, setControl] = useState(controlStatus)

    return (
        <Card style={styles.container}>
            <View style={styles.infoContainer}>
                <Image
                    source={images.user}
                    style={styles.helperImage}
                />
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        elevation: 6
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    helperImage: {
        width: "48%",
        height: "100%",
        resizeMode: 'contain'
    },
    textContainer: {
        width: "48%",
        height: "100%"
    }
})

export default HelperCard