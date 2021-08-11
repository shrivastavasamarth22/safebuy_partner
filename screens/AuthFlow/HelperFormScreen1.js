import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, BackHandler, StatusBar, TextInput, Alert, ScrollView} from 'react-native';
import { HeaderBar, GradientButton } from '../../components'
import {COLORS} from "../../constants";
import {useDispatch} from "react-redux";
import {addHelper} from "../../store/actions/helper";

const HelperFormScreen1 = ({ navigation, route }) => {
    const {count} = route.params;

    const [name, setName] = useState("Ram Mohan");
    const [phone, setPhone] = useState("9893614220");
    const [address1, setAddress1] = useState("Plot No 145, Trilanga Colony, Gulmohar");
    const [address2, setAddress2] = useState("Gulmohar Market");
    const [landmark, setLandmark] = useState("Shahpura Lake");
    const [pinCode, setPinCode] = useState("123456");
    const [salary, setSalary] = useState("2000");

    const dispatch = useDispatch();

    const onNameChange = (query) => {
        setName(query);
    };

    const onPhoneChange = (query) => {
        setPhone(query);
    };

    const onAddress1Change = (query) => {
        setAddress1(query);
    };

    const onAddress2Change = (query) => {
        setAddress2(query);
    };

    const onLandmarkChange = (query) => {
        setLandmark(query);
    };

    const onPinCodeChange = (query) => {
        setPinCode(query);
    };

    const onSalaryChange = (query) => {
        setSalary(query)
    }

    const onSubmitPress = () => {
        if (name, phone, address1, address2, landmark, pinCode, salary) {
            dispatch(addHelper(name, phone, address1, address2, landmark, pinCode, salary))
            if (count === 1) {
                navigation.navigate("RegistrationSuccessScreen")
            } else {
                navigation.navigate("HelperFormScreen2", {count})
            }
        } else {
            Alert.alert(
                "Form filled incorrectly",
                "All fields are necessary, please fill again",
                [
                    {
                        text: "Ok",
                        onPress: () => {
                        }
                    }
                ]
            )
        }
    }


    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => false)
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.green}
                barStyle={'light-content'}
            />
            <HeaderBar
                headerText={"Helper 1 Details"}
                style={{
                    height: 70,
                }}
            />
            <ScrollView style={styles.mainContainer}>
                <Text style={styles.headingText}>
                    Helper 1 Details:
                </Text>
                <TextInput
                    value={name}
                    style={[styles.input, {marginBottom: 10}]}
                    onChangeText={onNameChange}
                    placeholder={"Name"}
                />
                <View style={styles.inputContainer}>
                    <View style={styles.codeContainer}>
                        <Text style={styles.countryCode}>
                            + 91
                        </Text>
                    </View>
                    <TextInput
                        style={[styles.phoneInput, {marginBottom: 10}]}
                        value={phone}
                        onChangeText={onPhoneChange}
                        placeholder={"Mobile Number"}
                        keyboardType={'number-pad'}
                    />
                </View>
                <TextInput
                    value={address1}
                    style={[styles.input, {marginBottom: 10}]}
                    onChangeText={onAddress1Change}
                    placeholder={" Home Address Line 1"}
                />
                <TextInput
                    value={address2}
                    style={[styles.input, {marginBottom: 10}]}
                    onChangeText={onAddress2Change}
                    placeholder={"Home Address Line 2"}
                />
                <TextInput
                    value={landmark}
                    style={[styles.input, {marginBottom: 10}]}
                    onChangeText={onLandmarkChange}
                    placeholder={"Landmark"}
                />
                <TextInput
                    value={pinCode}
                    style={[styles.input, {marginBottom: 10}]}
                    onChangeText={onPinCodeChange}
                    placeholder={"Pin Code"}
                    keyboardType={'number-pad'}
                />
                <View style={styles.inputContainer}>
                    <View style={styles.codeContainer}>
                        <Text style={styles.countryCode}>
                            ₹
                        </Text>
                    </View>
                    <TextInput
                        style={styles.phoneInput}
                        value={salary}
                        onChangeText={onSalaryChange}
                        placeholder={"Monthly Salary"}
                        keyboardType={'number-pad'}
                    />
                </View>
                <GradientButton
                    text={count === 1 ? "Register" : "Fill Helper 2 Details"}
                    onPress={onSubmitPress}
                    style={{
                        marginBottom: 0,
                        marginTop: "35%",
                    }}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
        marginBottom: 5
    },
    headingText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        marginBottom: 10
    },
    input: {
        width: "100%",
        height: 50,
        borderRadius: 5,
        backgroundColor: "white",
        borderColor: "#CCC",
        borderWidth: 0.6,
        marginTop: 10,
        paddingLeft: 12,
        fontFamily: 'uber_move_medium',
        fontSize: 16
    },
    inputContainer: {
        flexDirection: 'row',
        width: "100%",
        marginVertical: 10,
        height: 50,
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
        backgroundColor: COLORS.primary
    },
    countryCode: {
        fontFamily: 'uber_move_medium',
        fontSize: 16,
        color: "white"
    },
    buttonStyles: {
        width: "95%",
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0
    }
})

export default HelperFormScreen1;