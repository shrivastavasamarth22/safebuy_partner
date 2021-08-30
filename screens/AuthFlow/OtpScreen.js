import React, {useState, useRef} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import BottomSheet from "reanimated-bottom-sheet";
import '@expo/match-media';
import { useMediaQuery } from "react-responsive";

import {images} from '../../constants'
import {GradientButton} from '../../components'
import { changePhoneNumber } from "../../store/actions/shop";

const OtpScreen = ({ navigation }) => {
    const stored_phone = useSelector(state => state.shop.shop.phone)

    const otpRef = useRef(null);
    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const inputRef3 = useRef(null)
    const inputRef4 = useRef(null)


    const [phone, setPhone] = useState("")
    const [input1, setInput1] = useState("")
    const [input2, setInput2] = useState("")
    const [input3, setInput3] = useState("")
    const [input4, setInput4] = useState("")

    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();

    const isSmallDevice = useMediaQuery({
        maxDeviceWidth: 360
    })

    const onPhoneChange = (query) => {
        setPhone(query)
    }

    const onInputChange1 = (query) => {
        setInput1(query)
        if (inputRef2.current) {
            inputRef2.current.focus()
        }
    }
    const onInputChange2 = (query) => {
        setInput2(query)
        if (inputRef3.current) {
            inputRef3.current.focus()
        }
    }
    const onInputChange3 = (query) => {
        setInput3(query)
        if (inputRef4.current) {
            inputRef4.current.focus()
        }
    }
    const onInputChange4 = (query) => {
        setInput4(query)
        if (inputRef1.current) {
            inputRef1.current.focus()
        }
    }

    const clearInputs = () => {
        setPhone("");
        setInput1("");
        setInput2("");
        setInput3("");
        setInput4("");
    }

    const onOpenOtpSheet = () => {
        if (otpRef.current) {
            otpRef.current.snapTo(1)
            setVisible(true)
        }
    }

    const onCloseOtpSheet = () => {
        if (otpRef.current) {
            otpRef.current.snapTo(0)
            setVisible(false)
        }
    }

    const mainButtonPress = () => {
        if (phone && phone.length === 10) {
            Keyboard.dismiss()
            onOpenOtpSheet()
        } else {
            Alert.alert(
                "Mobile number incorrect",
                "Please enter a valid mobile number",
                [
                    {
                        text: "Ok",
                        onPress: () => {
                        },
                        style: 'cancel'
                    }
                ]
            )
        }

    }

    const onSubmitButtonPress = () => {
        const otp = input1 + input2 + input3 + input4;
        if (otp.length === 4) {
            if (phone === stored_phone) {
                clearInputs();
                navigation.navigate("BottomTab")
            } else {
                dispatch(changePhoneNumber(1, phone))
                clearInputs();
                navigation.navigate("ShopCategoryScreen")
            }
        } else {
            clearInputs();
            Alert.alert(
                "Incorrect code entered",
                "The OTP you entered was incorrect",
                [
                    {
                        text: "Resend OTP",
                        onPress: () => {
                        }
                    },
                    {
                        text: "Try Again",
                        onPress: () => {
                        }
                    }
                ]
            )
        }
    }

    const OtpField = () => {
        return (
            <View style={styles.mediumContainer}>
                <StatusBar
                    backgroundColor={'#6d0fbc'}
                    barStyle={'light-content'}
                />
                <View style={styles.sheetContentContainer}>
                    <Text style={styles.headerTextRegular}>
                        We have sent an OTP to your number
                    </Text>
                    <Text style={styles.headerTextMedium}>
                        Please fill it here :
                    </Text>
                    <View style={styles.barContainer}>
                        <TextInput
                            ref={inputRef1}
                            style={styles.barStyle}
                            value={input1}
                            onChange={({nativeEvent}) => onInputChange1(nativeEvent.text)}
                            maxLength={1}
                            keyboardType={'number-pad'}
                        />
                        <TextInput
                            ref={inputRef2}
                            style={styles.barStyle}
                            value={input2}
                            onChange={({nativeEvent}) => onInputChange2(nativeEvent.text)}
                            maxLength={1}
                            keyboardType={'number-pad'}
                        />
                        <TextInput
                            ref={inputRef3}
                            style={styles.barStyle}
                            value={input3}
                            onChange={({nativeEvent}) => onInputChange3(nativeEvent.text)}
                            maxLength={1}
                            keyboardType={'number-pad'}
                        />
                        <TextInput
                            ref={inputRef4}
                            style={styles.barStyle}
                            onChange={({nativeEvent}) => onInputChange4(nativeEvent.text)}
                            value={input4}
                            maxLength={1}
                            keyboardType={'number-pad'}
                        />
                    </View>
                    <Text style={[styles.headerTextMedium, {marginBottom: 20}]}>
                        Resend OTP?
                    </Text>
                    <View style={styles.sheetButtonContainer}>
                        <GradientButton
                            text={"Continue"}
                            colors={["#8c24e3", "#510a8c"]}
                            onPress={onSubmitButtonPress}
                        />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <>
            <View style={styles.container}>
                <Image
                    source={images.login_background}
                    style={isSmallDevice ? smallStyles.background : styles.background}
                />
                <Image
                    source={images.white_logo}
                    style={styles.logo}
                />
                <View style={!isSmallDevice ? styles.inputContainer : smallStyles.inputContainer}>
                    <View style={styles.codeContainer}>
                        <Text style={styles.countryCode}>
                            + 91
                        </Text>
                    </View>
                    <TextInput
                        style={[styles.phoneInput, {marginBottom: 20}]}
                        value={phone}
                        onChangeText={(t) => onPhoneChange(t)}
                        placeholder={"Mobile Number"}
                        keyboardType={'number-pad'}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <GradientButton
                        colors={["#8c24e3", "#510a8c"]}
                        text={"Log In"}
                        onPress={mainButtonPress}
                    />
                </View>
            </View>
            {visible ? (
                <TouchableWithoutFeedback
                    onPress={() => {
                        onCloseOtpSheet()
                        Keyboard.dismiss();
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            backgroundColor: "black",
                            opacity: 0.6,
                        }}
                    />
                </TouchableWithoutFeedback>
            ) : null}
            <BottomSheet
                ref={otpRef}
                snapPoints={[0, 300]}
                initialSnap={0}
                enabledContentGestureInteraction={false}
                enabledContentTapInteraction={false}
                renderContent={OtpField}
            />
        </>
    )
}

const smallStyles = StyleSheet.create({
    background: {
        left: "-20%",
        top: "-30%",
        width: "140%",
        height: "90%",
        position: 'absolute',
        resizeMode: "contain"
    },
    inputContainer: {
        flexDirection: 'row',
        width: "100%",
        paddingHorizontal: 24,
        marginTop: 10
    },
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    background: {
        left: "-10%",
        top: "-25%",
        width: "120%",
        height: "75%",
        position: 'absolute',
        resizeMode: "contain"
    },
    logo: {
        width: "80%",
        height: "40%",
        resizeMode: 'contain',
        marginTop: "4%",
        alignSelf: 'center',
        marginBottom: "20%"
    },
    inputContainer: {
        flexDirection: 'row',
        width: "100%",
        paddingHorizontal: 24
    },
    phoneInput: {
        width: "85%",
        height: 50,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: "white",
        borderColor: "#CCC",
        borderTopWidth: 0.6,
        borderRightWidth: 0.6,
        borderBottomWidth: 0.6,
        paddingHorizontal: 12,
        fontFamily: 'uber_move_medium',
        fontSize: 16,
        color: '#111'
    },
    codeContainer: {
        height: 50,
        width: "15%",
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8c24e3'
    },
    countryCode: {
        fontFamily: 'uber_move_medium',
        fontSize: 16,
        color: "white"
    },
    buttonContainer: {
        flex: 1,
        paddingHorizontal: 24
    },
    mediumContainer: {
        height: 300,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
        paddingTop: 20
    },
    sheetContentContainer: {
        width: "100%",
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    headerTextRegular: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        color: '#1d1d1d'
    },
    headerTextMedium: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        color: '#1d1d1d',
        marginBottom: 40
    },
    barContainer: {
        flexDirection: 'row',
        width: "100%",
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    barStyle: {
        width: "21.25%",
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#555',
        paddingLeft: "8%",
        paddingBottom: 2,
        fontSize: 32
    },
    sheetButtonContainer: {
        width: "100%",
        flex: 1,
        justifyContent: 'flex-end'
    }
})

export default OtpScreen;