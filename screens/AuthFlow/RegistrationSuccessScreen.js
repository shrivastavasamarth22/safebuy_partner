import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {GradientButton} from '../../components'
import {images} from '../../constants'

const RegistrationSuccessScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>You're All Set !</Text>
            <Text style={styles.subText}>Welcome to SafeBuy Partner</Text>
            <Image
                source={images.success}
                style={styles.image}
            />
            <View style={styles.buttonContainer}>
                <GradientButton
                    text={"Continue"}
                    onPress={() => navigation.navigate("BottomTab")}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    mainText: {
        marginTop: 50,
        fontFamily: 'uber_move_medium',
        fontSize: 32
    },
    subText: {
        fontFamily: 'uber_move_medium',
        fontSize: 16,
        marginBottom: -40
    },
    image: {
        width: "100%",
        height: "80%",
        resizeMode: 'contain'
    },
    buttonContainer: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 24,
        justifyContent: 'flex-end'
    }
})

export default RegistrationSuccessScreen;