import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar, Image, ToastAndroid, Alert, TouchableOpacity} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {COLORS, images} from "../../constants";
import {GradientButton, HeaderBar} from "../../components";

const AddHelperScreen = ({navigation}) => {
    const [counter, setCounter] = useState(1)

    const onDecreaseCounter = () => {
        if (counter === 1) {
            Alert.alert(
                "Cannot decrease further",
                "Would you like to skip this step instead",
                [
                    {
                        text: "No",
                        onPress: () => {
                        }
                    },
                    {
                        text: "Yes",
                        onPress: () => navigation.reset({
                            index: 0,
                            routes: [{name: "BottomTab"}]
                        })
                    }
                ]
            )
        } else {
            setCounter(counter => counter - 1)
        }
    }

    const onIncreaseCounter = () => {
        if (counter === 3) {
            ToastAndroid.showWithGravity(
                "Cannot increase further",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        } else {
            setCounter(counter => counter + 1)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.green}
                barStyle={"light-content"}
            />
            <Image
                source={images.circular_background}
                style={styles.bg}
            />
            <HeaderBar
                headerText={"Add Helpers"}
            />
            <View style={styles.mainContentContainer}>
                <View style={{marginBottom: 20}}>
                    <Text style={styles.header}>
                        How many helpers are working ?
                    </Text>
                    <Text style={styles.note}>
                        Can register maximum 3
                    </Text>
                </View>
                <View style={styles.counterContainer}>
                    <TouchableOpacity onPress={onDecreaseCounter}>
                        <FontAwesome name="minus" size={30} color="#EB6D6D"/>
                    </TouchableOpacity>
                    <View style={styles.counter}>
                        <Text style={styles.counterText}>
                            {counter}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={onIncreaseCounter}>
                        <FontAwesome name="plus" size={30} color={COLORS.primary}/>
                    </TouchableOpacity>
                </View>
                <Image
                    source={images.rider}
                    style={styles.rider}
                />
            </View>
            <GradientButton
                text={"Continue"}
                style={{
                    width: "93%",
                    alignSelf: 'center'
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    bg: {
        position: 'absolute',
        width: '120%',
        height: '70%',
        left: '-10%',
        top: '-25%',
        opacity: .1
    },
    mainContentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: "25%"
    },
    header: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 20,
        textAlign: 'center'
    },
    note: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
        textAlign: 'center',
        color: '#555'
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '30%'
    },
    counter: {
        width: 90,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e2e2e2',
        borderRadius: 8,
        marginHorizontal: 20,
    },
    counterText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 24,
        textAlign: 'center'
    },
    rider: {
        width: "95%",
        height: "50%",
        opacity: .5
    },
})

export default AddHelperScreen;