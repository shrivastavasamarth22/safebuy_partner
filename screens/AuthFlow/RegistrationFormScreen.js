import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    BackHandler,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert
} from "react-native";
import * as Location from "expo-location";
import {useDispatch} from "react-redux";

import * as shopActions from "../../store/actions/shop";
import {GradientButton, HeaderBar} from "../../components";
import {COLORS} from "../../constants";
import {LinearGradient} from "expo-linear-gradient";
import {FontAwesome, AntDesign, MaterialIcons} from "@expo/vector-icons";

const RegistrationFormScreen = ({navigation}) => {
    const [name, setName] = useState("Gupta Vegetable Shop");
    const [ownerName, setOwnerName] = useState("Narayan Gupta");
    const [address1, setAddress1] = useState("Shop No 22, Sevoy Market");
    const [address2, setAddress2] = useState("Gulmohar Colony");
    const [landmark, setLandmark] = useState("Sevoy Complex");
    const [pinCode, setPinCode] = useState("462026");

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Location permission not granted, tap to grant");
            }
        })();

        BackHandler.addEventListener('hardwareBackPress', () => true);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => false)

    }, []);

    const onNameChange = (name) => {
        setName(name);
    };

    const onOwnerNameChange = (ownerName) => {
        setOwnerName(ownerName);
    };

    const onAddress1Change = (address1) => {
        setAddress1(address1);
    };

    const onAddress2Change = (address2) => {
        setAddress2(address2);
    };

    const onLandmarkChange = (landmark) => {
        setLandmark(landmark);
    };

    const onPinCodeChange = (pinCode) => {
        setPinCode(pinCode);
    };

    const onLocationPress = async () => {
        try {
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        } catch (e) {
            setErrorMsg(e.message);
            console.log(e.message)
        }
    };

    const askPermission = async () => {
        let {status} = await Location.requestPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("Location permission not granted, tap to grant");
        } else {
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        }
    }

    const onSubmitPress = () => {
        if (name, ownerName, address1, address2, landmark, pinCode, location) {
            dispatch(shopActions.changeShopName(1, name));
            dispatch(shopActions.changeOwnerName(1, ownerName));
            dispatch(
                shopActions.changeShopAddress(
                    1,
                    address1,
                    address2,
                    landmark,
                    pinCode,
                    location.coords.latitude,
                    location.coords.longitude
                )
            );
            navigation.navigate("ShopDetailFormScreen")
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

    };

    const renderButton = () => {
        if (!location && !errorMsg) {
            return (
                <TouchableOpacity
                    style={styles.locationButtonIdle}
                    onPress={onLocationPress}
                >
                    <Text style={styles.idleButtonText}>
                        Tap to access location
                    </Text>
                    <FontAwesome name="map-marker" size={24} color="white"/>
                </TouchableOpacity>
            );
        }

        if (location && !errorMsg) {
            return (
                <LinearGradient
                    colors={[
                        COLORS.fromPrimaryGradientColor,
                        COLORS.toPrimaryGradientColor,
                    ]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.locationButtonIdle}
                >
                    <Text style={styles.idleButtonText}>Location Recorded</Text>
                    <AntDesign name="check" size={24} color="white"/>
                </LinearGradient>
            );
        }

        if (location && errorMsg) {
            return (
                <LinearGradient
                    colors={[
                        COLORS.fromPrimaryGradientColor,
                        COLORS.toPrimaryGradientColor,
                    ]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.locationButtonIdle}
                >
                    <Text style={styles.idleButtonText}>Location Recorded</Text>
                    <AntDesign name="check" size={24} color="white"/>
                </LinearGradient>
            );
        }

        if (!location && errorMsg) {
            return (
                <TouchableOpacity onPress={askPermission}>
                    <LinearGradient
                        colors={["#fd3f63", "#fc3158"]}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        style={styles.errorButton}
                    >
                        <Text style={[styles.idleButtonText, {width: "90%"}]}>
                            {errorMsg}
                        </Text>
                        <MaterialIcons
                            name="error-outline"
                            size={24}
                            color="white"
                        />
                    </LinearGradient>
                </TouchableOpacity>
            );
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.green}
                barStyle={"light-content"}
            />
            <HeaderBar
                headerText={"Register"}
                style={{
                    height: 70,
                }}
            />
            <ScrollView style={styles.formContainer}>
                <TextInput
                    value={name}
                    onChangeText={onNameChange}
                    style={styles.input}
                    placeholder={"Shop Name"}
                />
                <TextInput
                    value={ownerName}
                    onChangeText={onOwnerNameChange}
                    style={styles.input}
                    placeholder={"Shop Owner Name"}
                />
                <TextInput
                    value={address1}
                    onChangeText={onAddress1Change}
                    style={styles.input}
                    placeholder={"Shop Address Line 1"}
                />
                <TextInput
                    value={address2}
                    onChangeText={onAddress2Change}
                    style={styles.input}
                    placeholder={"Shop Address Line 2"}
                />
                <TextInput
                    value={landmark}
                    onChangeText={onLandmarkChange}
                    style={styles.input}
                    placeholder={"Landmark"}
                />
                <TextInput
                    value={pinCode}
                    onChangeText={onPinCodeChange}
                    style={styles.input}
                    placeholder={"Pin Code"}
                    keyboardType={"number-pad"}
                />
                <View style={styles.inputView}>
                    <Text style={styles.inputText}>Bhopal</Text>
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.inputText}>Madhya Pradesh</Text>
                </View>
                {renderButton()}
                <GradientButton
                    text={"Continue"}
                    onPress={onSubmitPress}
                    style={{
                        marginTop: "15%",
                    }}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    formContainer: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 24,
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
        fontFamily: "uber_move_medium",
        fontSize: 16,
        marginBottom: 5,
    },
    inputView: {
        width: "100%",
        height: 50,
        borderRadius: 5,
        backgroundColor: "white",
        borderColor: "#CCC",
        borderWidth: 0.6,
        marginTop: 10,
        paddingLeft: 12,
        marginBottom: 10,
        justifyContent: "center",
    },
    inputText: {
        fontFamily: "uber_move_medium",
        fontSize: 16,
    },
    locationButtonIdle: {
        width: "100%",
        height: 50,
        borderRadius: 5,
        backgroundColor: "#CCC",
        marginTop: 10,
        paddingHorizontal: 12,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    idleButtonText: {
        fontFamily: "Roboto_500Medium",
        color: "white",
        fontSize: 16,
    },
    errorButton: {
        width: "100%",
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10,
        paddingHorizontal: 12,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    buttonContainer: {
        width: "100%",
        alignItems: 'center',
        paddingHorizontal: 24
    }
});

export default RegistrationFormScreen;
