import React, {useState, useRef} from "react";
import {
    View,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
    ToastAndroid, TouchableNativeFeedback, ScrollView, FlatList
} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker'
import {
    AntDesign,
    Entypo,
    MaterialIcons,
    FontAwesome,
    Feather,
} from "@expo/vector-icons";
import BottomSheet from "reanimated-bottom-sheet";
import * as shopActions from "../../store/actions/shop";

import {TopBar, GradientButton, TimePicker, DaySelector} from "../../components";
import {COLORS, images} from "../../constants";
import { days } from "../../mock-data";

const ShopSettingsScreen = ({navigation}) => {
    const shopDetails = useSelector((state) => state.shop.shop);
    const dispatch = useDispatch();

    const nameSheetRef = useRef(null);
    const phoneSheetRef = useRef(null);
    const addressSheetRef = useRef(null);
    const timingsSheetRef = useRef(null);
    const holidaySheetRef = useRef(null)
    const leaveSheetRef = useRef(null);

    const [visible, setVisible] = useState(false);
    const [date, setDate] = useState(new Date())
    const [openShow, setOpenShow] = useState(false)
    const [closeShow, setCloseShow] = useState(false)

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [landmark, setLandmark] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [openTime, setOpenTime] = useState(shopDetails.openTime);
    const [closeTime, setCloseTime] = useState(shopDetails.closeTime);
    const [weeklyHolidays, setWeeklyHolidays] = useState(
        shopDetails.weeklyHolidays
    );
    const [onLeaveStatus, setOnLeaveStatus] = useState(
        shopDetails.onLeaveStatus
    );

    const onOpenDateTimeChange = (event, selectedDate) => {
        if (selectedDate) {
            const hours = selectedDate.getHours().toString()
            const minutes = selectedDate.getMinutes().toString()
            const hourLength = hours.length;
            const minuteLength = minutes.length;

            if (hourLength === 1 && minuteLength === 1) {
                setOpenTime({
                    hours: `0${hours}`,
                    minutes: `0${minutes}`
                })
            } else if(hourLength === 1 && minuteLength !== 1) {
                setOpenTime({
                    hours: `0${hours}`,
                    minutes
                })
            } else if (hourLength !== 1 && minuteLength === 1) {
                setOpenTime({
                    hours,
                    minutes: `0${minutes}`
                })
            } else {
                setOpenTime({
                    hours,
                    minutes
                })
            }
        }
        setOpenShow(false)
    }

    const onCloseDateTimeChange = (event, selectedDate) => {
        if (selectedDate) {
            const hours = selectedDate.getHours().toString()
            const minutes = selectedDate.getMinutes().toString()
            const hourLength = hours.length;
            const minuteLength = minutes.length;

            if (hourLength === 1 && minuteLength === 1) {
                setCloseTime({
                    hours: `0${hours}`,
                    minutes: `0${minutes}`
                })
            } else if(hourLength === 1 && minuteLength !== 1) {
                setCloseTime({
                    hours: `0${hours}`,
                    minutes
                })
            } else if (hourLength !== 1 && minuteLength === 1) {
                setCloseTime({
                    hours,
                    minutes: `0${minutes}`
                })
            } else {
                setCloseTime({
                    hours,
                    minutes
                })
            }
        }
        setCloseShow(false)
    }

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

    const onOpenBottomSheet = (ref) => {
        if (ref.current) {
            ref.current.snapTo(1);
        }
        setVisible(true);
    };

    const onCloseBottomSheet = (ref) => {
        if (ref === holidaySheetRef) {
            if (ref.current) {
                ref.current.snapTo(0);
            }
        } else {
            if (ref.current) {
                ref.current.snapTo(0);
            }
            setVisible(false)
        }

    };

    const onSaveNamePress = () => {
        dispatch(shopActions.changeShopName(1, name))
        Keyboard.dismiss();
        onCloseBottomSheet(nameSheetRef)
        ToastAndroid.showWithGravity(
            "Name saved successfully",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        )
    }

    const onSavePhonePress = () => {
        dispatch(shopActions.changePhoneNumber(1, phone))
        Keyboard.dismiss();
        onCloseBottomSheet(phoneSheetRef)
        ToastAndroid.showWithGravity(
            "Number saved successfully",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        )
    }

    const onSaveAddressPress = () => {
        dispatch(shopActions.changeShopAddress(1, address1, address2, landmark, pinCode, 0, 0))
        Keyboard.dismiss();
        onCloseBottomSheet(addressSheetRef)
        ToastAndroid.showWithGravity(
            "Address saved successfully",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        )
    }

    const onToggleHoliday = (id) => {
        const found = weeklyHolidays.find(day => day === id)
        if (!found) {
            setWeeklyHolidays(oldArray => [...oldArray, id])
        } else {
            const newWeeklyHolidays = weeklyHolidays.filter(day => day !== id);
            setWeeklyHolidays(newWeeklyHolidays)
        }
    }

    const onSaveTimingsPress = () => {
        dispatch(shopActions.changeOpenTime(1, openTime.hours, openTime.minutes))
        dispatch(shopActions.changeCloseTime(1, closeTime.hours, closeTime.minutes))
        dispatch(shopActions.changeHolidays(1, weeklyHolidays))
        onCloseBottomSheet(timingsSheetRef)
        ToastAndroid.showWithGravity(
            "Timings saved successfully",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        )
    }

    const NameChangeField = () => {
        return (
            <View style={sheetStyles.smallContainer}>
                <Text style={sheetStyles.headerStyle}>
                    Change Shop Name :
                </Text>
                <TextInput
                    style={[sheetStyles.input, {marginBottom: 20}]}
                    value={name}
                    onChangeText={(t) => onNameChange(t)}
                    placeholder={"New Name"}
                />
                <GradientButton
                    text={"Save"}
                    onPress={onSaveNamePress}
                />
            </View>
        )
    }

    const PhoneChangeField = () => {
        return (
            <View style={sheetStyles.smallContainer}>
                <Text style={sheetStyles.headerStyle}>
                    Change Phone Number :
                </Text>
                <View style={sheetStyles.inputContainer}>
                    <View style={sheetStyles.codeContainer}>
                        <Text style={sheetStyles.countryCode}>
                            +91
                        </Text>
                    </View>
                    <TextInput
                        style={[sheetStyles.phoneInput, {marginBottom: 20}]}
                        value={phone}
                        onChangeText={(t) => onPhoneChange(t)}
                        placeholder={"New Number"}
                    />
                </View>
                <GradientButton
                    text={"Save"}
                    onPress={onSavePhonePress}
                />
            </View>
        )
    }

    const AddressChangeField = () => {
        return (
            <View style={[sheetStyles.largeContainer, {paddingTop: 30}]}>
                <Text style={sheetStyles.headerStyle}>
                    Change Address :
                </Text>
                <TextInput
                    style={sheetStyles.input}
                    onChangeText={(t) => onAddress1Change(t)}
                    value={address1}
                    placeholder={"Address Line 1"}
                />
                <TextInput
                    style={sheetStyles.input}
                    onChangeText={(t) => onAddress2Change(t)}
                    value={address2}
                    placeholder={"Address Line 2"}
                />
                <TextInput
                    style={sheetStyles.input}
                    onChangeText={(t) => onLandmarkChange(t)}
                    value={landmark}
                    placeholder={"Nearby Landmark"}
                />
                <TextInput
                    style={[sheetStyles.input, {marginBottom: 20}]}
                    onChangeText={(t) => onPinCodeChange(t)}
                    value={pinCode}
                    placeholder={"Pin Code"}
                />
                <GradientButton
                    text={"Save"}
                    onPress={onSaveAddressPress}
                />
            </View>
        )
    }

    const TimingsChangeField = () => {
        return (
            <View style={sheetStyles.mediumContainer}>
                <TimePicker
                    heading={"Enter Opening Time :"}
                    icon={<Feather name={"sun"} size={24} color={"#000"} />}
                    hours={openTime.hours}
                    minutes={openTime.minutes}
                    onPress={() => setOpenShow(true)}
                />
                <TimePicker
                    heading={"Enter Closing Time :"}
                    style={{
                        marginTop: 15
                    }}
                    icon={<Feather name={"moon"} size={24} color={"#000"} />}
                    hours={closeTime.hours}
                    minutes={closeTime.minutes}
                    onPress={() => setCloseShow(true)}
                />
                <View style={sheetStyles.mainHolidayButtonContainer}>
                    <TouchableOpacity
                        style={sheetStyles.holidayButtonContainer}
                        onPress={() => onOpenBottomSheet(holidaySheetRef)}
                    >
                        <Text style={sheetStyles.holidayButtonText}>
                            Holidays :
                        </Text>
                        <Entypo name="chevron-right" size={24} color="#555" />
                    </TouchableOpacity>
                    <View
                        style={sheetStyles.divider}
                    />
                    <GradientButton
                        text={"Save"}
                        style={{
                            marginTop: 45,
                            width: "95%",
                            alignSelf: 'center'
                        }}
                        onPress={onSaveTimingsPress}
                    />
                </View>
            </View>
        )
    }

    const HolidaysChangeField = () => {
        return (
            <View style={sheetStyles.xLargeContainer}>
                <FlatList
                    data={days}
                    keyExtractor={item => item.english}
                    renderItem={({ item }) => {
                        const foundDay = weeklyHolidays.find(id => id === item.id)
                        const isFound = !!foundDay
                        return(
                            <DaySelector
                                englishText={item.english}
                                hindiText={item.hindi}
                                onPress={() => onToggleHoliday(item.id)}
                                selected={isFound}
                            />
                        )
                    }}
                />
                <GradientButton
                    text={"Save"}
                    style={{
                        marginTop: 15,
                        width: "95%",
                        alignSelf: 'center'
                    }}
                    onPress={() => onCloseBottomSheet(holidaySheetRef)}
                />
            </View>
        )
    }

    return (
        <>
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={COLORS.green}
                    barStyle={"light-content"}
                />

                {/* Top Bar */}
                <TopBar
                    headerText={"Shop Settings"}
                    onBackButtonPress={navigation.goBack}
                />

                {/* Shop Picture Banner */}
                <TouchableOpacity
                    style={styles.cameraButtonContainer}
                    onPress={() => {
                        console.log("Camera Button Pressed");
                    }}
                >
                    <AntDesign name="camera" size={26} color="white"/>
                </TouchableOpacity>
                <Image source={images.shop} style={styles.bannerStyle}/>
                <Image source={images.user} style={styles.profilePicStyle}/>

                {/*  Shop Setting Cards  */}
                <ScrollView style={styles.settingCardContainer}>
                    <View style={styles.settingCard}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Entypo name="shop" size={24} color="#555"/>
                            <View
                                style={{
                                    marginLeft: 40,
                                }}
                            >
                                <Text style={styles.valueTextStyle}>
                                    {shopDetails.name}
                                </Text>
                                <Text style={styles.subTextStyle}>
                                    Shop Name
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.editButtonStyle}
                            onPress={() => onOpenBottomSheet(nameSheetRef)}
                        >
                            <MaterialIcons name="edit" size={24} color="#555"/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.settingCard}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <FontAwesome name="phone" size={24} color="#555"/>
                            <View
                                style={{
                                    marginLeft: 40,
                                }}
                            >
                                <Text style={styles.valueTextStyle}>
                                    {shopDetails.phone}
                                </Text>
                                <Text style={styles.subTextStyle}>
                                    Phone Number
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.editButtonStyle}
                            onPress={() => onOpenBottomSheet(phoneSheetRef)}
                        >
                            <MaterialIcons name="edit" size={24} color="#555"/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.settingCard}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                flex: 1
                            }}
                        >
                            <Entypo
                                name="location-pin"
                                size={24}
                                color="#555"
                            />
                            <View
                                style={{
                                    marginLeft: 40,
                                }}
                            >
                                <Text style={styles.addressTextStyle}>
                                    {shopDetails.address1}
                                </Text>
                                <Text style={styles.addressTextStyle}>
                                    {shopDetails.address2}
                                </Text>
                                <Text style={styles.addressTextStyle}>
                                    {shopDetails.city +
                                    ", " +
                                    shopDetails.state}
                                </Text>
                                <Text style={styles.addressTextStyle}>
                                    {shopDetails.pinCode}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.editButtonStyle}
                            onPress={() => onOpenBottomSheet(addressSheetRef)}
                        >
                            <MaterialIcons name="edit" size={24} color="#555"/>
                        </TouchableOpacity>
                    </View>

                    <TouchableNativeFeedback
                        onPress={() => onOpenBottomSheet(timingsSheetRef)}
                    >
                        <View style={[styles.settingCard, {paddingVertical: 20}]}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Feather name="clock" size={24} color="#555"/>
                                <View
                                    style={{
                                        marginLeft: 40,
                                    }}
                                >
                                    <Text style={styles.valueTextStyle}>
                                        Shop Timings & Weekly Off
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback>
                        <View style={[styles.settingCard, {paddingVertical: 20}]}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Entypo name="calendar" size={24} color="#555"/>
                                <View
                                    style={{
                                        marginLeft: 40,
                                    }}
                                >
                                    <Text style={styles.valueTextStyle}>
                                        Take Leave
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </ScrollView>
            </View>
            {visible ? (
                <TouchableWithoutFeedback
                    onPress={() => {
                        onCloseBottomSheet(nameSheetRef);
                        onCloseBottomSheet(phoneSheetRef);
                        onCloseBottomSheet(addressSheetRef);
                        onCloseBottomSheet(timingsSheetRef);
                        onCloseBottomSheet(holidaySheetRef)
                        onCloseBottomSheet(leaveSheetRef);
                        setVisible(false)
                        setOpenShow(false)
                        setCloseShow(false)
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
            {
                openShow && (
                    <DateTimePicker
                        value={date}
                        mode={'time'}
                        is24Hour
                        display={"spinner"}
                        onChange={onOpenDateTimeChange}
                    />
                )
            }
            {
                closeShow && (
                    <DateTimePicker
                        value={date}
                        mode={'time'}
                        is24Hour
                        display={"spinner"}
                        onChange={onCloseDateTimeChange}
                    />
                )
            }
            <BottomSheet
                ref={nameSheetRef}
                snapPoints={[0, 200]}
                initialSnap={0}
                enabledContentTapInteraction={false}
                enabledContentGestureInteraction={false}
                renderContent={NameChangeField}
            />
            <BottomSheet
                ref={phoneSheetRef}
                snapPoints={[0, 200]}
                initialSnap={0}
                enabledContentTapInteraction={false}
                enabledContentGestureInteraction={false}
                renderContent={PhoneChangeField}
            />
            <BottomSheet
                ref={addressSheetRef}
                snapPoints={[0, 400]}
                initialSnap={0}
                enabledContentTapInteraction={false}
                enabledContentGestureInteraction={false}
                renderContent={AddressChangeField}
            />
            <BottomSheet
                ref={timingsSheetRef}
                snapPoints={[0, 300]}
                initialSnap={0}
                enabledContentTapInteraction={false}
                enabledContentGestureInteraction={false}
                renderContent={TimingsChangeField}
            />
            <BottomSheet
                ref={holidaySheetRef}
                snapPoints={[0, 600]}
                initialSnap={0}
                enabledContentTapInteraction={false}
                enabledContentGestureInteraction={false}
                renderContent={HolidaysChangeField}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    bannerStyle: {
        width: "100%",
        height: "32%",
        resizeMode: "cover",
        backgroundColor: "red",
    },
    profilePicStyle: {
        position: "absolute",
        height: 120,
        width: 120,
        borderRadius: 60,
        bottom: "56%",
        left: 12,
    },
    cameraButtonContainer: {
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.orange,
        elevation: 20,
        alignItems: "center",
        justifyContent: "center",
        top: "10%",
        right: 12,
    },
    settingCardContainer: {
        flex: 1,
        marginTop: 35,
        paddingHorizontal: 5,
        paddingBottom: 10
    },
    settingCard: {
        flexDirection: "row",
        width: "100%",
        paddingVertical: 12,
        backgroundColor: "white",
        elevation: 2,
        paddingHorizontal: 12,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 5
    },
    valueTextStyle: {
        fontFamily: "Roboto_500Medium",
        fontSize: 16,
        color: "#555",
    },
    subTextStyle: {
        fontFamily: "Roboto_400Regular",
        fontSize: 14,
        color: "#bbb",
    },
    addressTextStyle: {
        fontFamily: "Roboto_500Medium",
        fontSize: 13,
        color: "#555",
        width: "80%",
    },
    editButtonStyle: {
        padding: 5,
    },
});

const sheetStyles = StyleSheet.create({
    smallContainer: {
        height: 200,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
        paddingTop: 15,
        paddingHorizontal: 24,
    },
    mediumContainer: {
        height: 300,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
        paddingTop: 20,
    },
    largeContainer: {
        height: 400,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
        paddingTop: 15,
        paddingHorizontal: 24,
    },
    xLargeContainer: {
        height: 600,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingTop: 15
    },
    headerStyle: {
        fontFamily: 'uber_move_medium',
        fontSize: 16,
        color: "#1d1d1d",
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
        flex: 1,
        flexDirection: 'row',
    },
    phoneInput: {
        width: "85%",
        height: 50,
        marginTop: 10,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: "white",
        borderColor: "#CCC",
        borderTopWidth: 0.6,
        borderRightWidth: 0.6,
        borderBottomWidth: 0.6,
        paddingLeft: 12,
        fontFamily: 'uber_move_medium',
        fontSize: 16
    },
    codeContainer: {
        marginTop: 10,
        height: 50,
        width: "15%",
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E1e1e1'
    },
    countryCode: {
        fontFamily: 'uber_move_medium',
        fontSize: 16,
        color: "#888"
    },
    mainHolidayButtonContainer: {
        width: "100%",
        marginTop: 15
    },
    holidayButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingHorizontal: 24
    },
    holidayButtonText: {
        fontFamily: "Roboto_400Regular",
        fontSize: 18,
        color: 'black'
    },
    divider: {
        width: "100%",
        height: 0.6,
        backgroundColor: "#CCC"
    },
});

export default ShopSettingsScreen;
