import React, {useEffect, useRef, useState} from "react";
import {
    Alert,
    FlatList,
    Image,
    Keyboard,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker'
import {AntDesign, Entypo, Feather, FontAwesome, MaterialIcons,} from "@expo/vector-icons";
import BottomSheet from "reanimated-bottom-sheet";
import CalendarPicker from 'react-native-calendar-picker'
import * as shopActions from "../../store/actions/shop";

import {DaySelector, GradientButton, TimePicker, TopBar} from "../../components";
import {COLORS, images} from "../../constants";
import {days} from "../../mock-data";
import {LinearGradient} from "expo-linear-gradient";

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
    const [openTimeShow, setOpenTimeShow] = useState(false)
    const [closeTimeShow, setCloseTimeShow] = useState(false)

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

    const [fromDate, setFromDate] = useState(shopDetails.fromLeaveDate)
    const [toDate, setToDate] = useState(shopDetails.toLeaveDate)


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
            } else if (hourLength === 1 && minuteLength !== 1) {
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
        setOpenTimeShow(false)
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
            } else if (hourLength === 1 && minuteLength !== 1) {
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
        setCloseTimeShow(false)
    }

    const onDateChange = (selectedDate, type) => {
        if (selectedDate) {
            if (type === 'START_DATE') {
                setFromDate(selectedDate.toDate())
            } else {
                setToDate(selectedDate.toDate())
            }
        }
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

    const parseDate = (date) => {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let year = date.getUTCFullYear();
        let month = date.getUTCMonth();
        let dt = date.getUTCDate();
        let day = date.getUTCDay();

        if (dt < 10) {
            dt = '0' + dt;
        }

        return `${dayNames[day]}, ${dt} ${monthNames[month]} ${year}`
    }

    const parseDays = () => {
        if (fromDate !== null && toDate !== null) {
            const oneDay = 24 * 60 * 60 * 1000;
            const from_ms = fromDate.getTime();
            const to_ms = toDate.getTime()
            let diff = Math.round((Math.abs((from_ms - to_ms)) / oneDay) + 1).toString();
            if (diff.length === 1) {
                return `0${diff}`
            } else {
                return diff;
            }

        } else {
            return "N/A"
        }
    }

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

    const onSaveLeaveDates = () => {
        dispatch(shopActions.changeOnLeaveStatusToTrue(1, fromDate, toDate))
        setOnLeaveStatus(true)
        onCloseBottomSheet(leaveSheetRef)
        ToastAndroid.showWithGravity(
            "Dates saved successfully",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        )
    }

    const onUnlockShop = () => {
        dispatch(shopActions.changeOnLeaveStatusToFalse(1))
        setOnLeaveStatus(false)
        setFromDate(null);
        setToDate(null);
        Alert.alert(
            'Shop Unlocked',
            "It is great to have you back! 😊",
            [
                {
                    text: "OK",
                    onPress: () => {
                    }
                }
            ]
        )
    }

    const NameChangeField = () => {
        return (
            <View style={sheetStyles.smallContainer}>
                <View style={sheetStyles.contentContainer}>
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
            </View>
        )
    }

    const PhoneChangeField = () => {
        return (
            <View style={sheetStyles.smallContainer}>
                <View style={sheetStyles.contentContainer}>
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
                    icon={<Feather name={"sun"} size={24} color={"#000"}/>}
                    hours={openTime.hours}
                    minutes={openTime.minutes}
                    onPress={() => setOpenTimeShow(true)}
                />
                <TimePicker
                    heading={"Enter Closing Time :"}
                    style={{
                        marginTop: 15
                    }}
                    icon={<Feather name={"moon"} size={24} color={"#000"}/>}
                    hours={closeTime.hours}
                    minutes={closeTime.minutes}
                    onPress={() => setCloseTimeShow(true)}
                />
                <View style={sheetStyles.mainHolidayButtonContainer}>
                    <TouchableOpacity
                        style={sheetStyles.holidayButtonContainer}
                        onPress={() => onOpenBottomSheet(holidaySheetRef)}
                    >
                        <Text style={sheetStyles.holidayButtonText}>
                            Holidays :
                        </Text>
                        <Entypo name="chevron-right" size={24} color="#555"/>
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
                    renderItem={({item}) => {
                        const foundDay = weeklyHolidays.find(id => id === item.id)
                        const isFound = !!foundDay
                        return (
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

    const LeaveChangeField = () => {
        return (
            <View style={sheetStyles.xXLargeContainer}>
                <View style={sheetStyles.calendarContainer}>
                    <CalendarPicker
                        startFromMonday={false}
                        showDayStragglers={false}
                        allowRangeSelection={true}
                        minDate={date}
                        todayBackgroundColor={COLORS.blue}
                        selectedDayTextColor={'white'}
                        restrictMonthNavigation={true}
                        selectedRangeStartStyle={{
                            backgroundColor: COLORS.green,
                        }}
                        selectedRangeEndStyle={{
                            backgroundColor: COLORS.green
                        }}
                        selectedRangeStyle={{
                            backgroundColor: 'rgba(108, 194, 75, 0.8)',
                        }}
                        onDateChange={onDateChange}
                        customDayHeaderStyles={() => (
                            {
                                textStyle: [sheetStyles.headerStyle, {marginBottom: 0}]
                            }
                        )}
                        previousTitleStyle={[sheetStyles.headerStyle, {marginBottom: 0}]}
                        nextTitleStyle={[sheetStyles.headerStyle, {marginBottom: 0}]}
                        monthTitleStyle={[sheetStyles.headerStyle, {marginBottom: 0, fontSize: 24}]}
                        yearTitleStyle={[sheetStyles.headerStyle, {marginBottom: 0, fontSize: 24}]}
                    />
                </View>

                <View style={sheetStyles.calendarTextContainer}>
                    <View>
                        <Text style={sheetStyles.calendarTextSmall}>
                            Today :
                        </Text>
                        <Text style={sheetStyles.calendarTextLarge}>
                            {parseDate(date)}
                        </Text>
                    </View>
                    <View style={{
                        alignItems: 'flex-end'
                    }}>
                        <Text style={sheetStyles.calendarTextSmall}>
                            No. of Close Days :
                        </Text>
                        <Text style={sheetStyles.calendarTextLarge}>
                            {parseDays()}
                        </Text>
                    </View>
                </View>

                <View style={sheetStyles.calendarDateContainer}>

                    <View style={sheetStyles.calendarDateIndicator}>
                        <Text style={[sheetStyles.calendarTextSmall, {marginBottom: 5, fontSize: 14}]}>
                            From Date :
                        </Text>
                        <Text style={[sheetStyles.calendarTextLarge, {fontSize: 18}]}>
                            {
                                fromDate === null ? "Not Selected" : parseDate(fromDate)
                            }
                        </Text>
                    </View>

                    <View style={sheetStyles.calendarDateIndicator}>
                        <Text style={[sheetStyles.calendarTextSmall, {marginBottom: 5, fontSize: 14}]}>
                            To Date :
                        </Text>
                        <Text style={[sheetStyles.calendarTextLarge, {fontSize: 18}]}>
                            {
                                toDate === null ? "Not Selected" : parseDate(toDate)
                            }
                        </Text>
                    </View>

                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    paddingHorizontal: 12
                }}>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={onSaveLeaveDates}
                    >
                        <LinearGradient
                            colors={[COLORS.fromPrimaryGradientColor, COLORS.toPrimaryGradientColor]}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={styles.buttonGradientStyle}
                        >
                            <Text style={styles.buttonTextStyle}>
                                Save
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
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
                    onBackButtonPress={() => navigation.navigate("SettingsScreen")}
                />

                {/* Shop Picture Banner */}

                {
                    shopDetails.imageUri !== ""
                        ? <Image source={{uri: shopDetails.imageUri}} style={styles.bannerStyle}/>
                        : <Image source={images.shop} style={styles.bannerStyle}/>
                }

                <TouchableOpacity
                    style={{
                        position: "absolute",
                        bottom: "56%",
                        left: 12,
                    }}
                    onPress={() => navigation.navigate("CameraScreen2", {
                        purpose: "user"
                    })}
                >
                    {
                        shopDetails.ownerImageUri !== ""
                            ? <Image source={{uri: shopDetails.ownerImageUri}} style={styles.profilePicStyle}/>
                            : <Image source={images.user} style={styles.profilePicStyle}/>
                    }
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.cameraButtonContainer}
                    onPress={() => navigation.navigate("CameraScreen2", {
                        purpose: 'shop'
                    })}
                >
                    <AntDesign name="camera" size={26} color="white"/>
                </TouchableOpacity>

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
                        onPress={() => navigation.navigate("CameraScreen4")}
                    >
                        <View style={styles.settingCard}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    flex: 1
                                }}
                            >
                                <AntDesign name={'qrcode'} size={24} color={'#555'} />
                                <View
                                    style={{
                                        marginLeft: 40,
                                    }}
                                >
                                    <Text style={styles.valueTextStyle}>
                                        Change QR Code Image
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableNativeFeedback>

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
                                        Daily Shop Timings & Weekly Off
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableNativeFeedback>

                    {
                        !onLeaveStatus
                            ? <TouchableNativeFeedback
                                onPress={() => onOpenBottomSheet(leaveSheetRef)}
                            >
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
                                                Select Dates
                                            </Text>
                                            <Text style={styles.subTextStyle}>
                                                Shop closed long days
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>

                            : <TouchableNativeFeedback
                                onPress={onUnlockShop}
                            >
                                <View style={[styles.settingCard, {paddingVertical: 20}]}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Entypo name="calendar" size={24} color="#555"/>
                                        <View style={{
                                            marginLeft: 40
                                        }}>
                                            <Text style={[styles.valueTextStyle, {width: "70%"}]}>
                                                {`You are on leave from ${parseDate(fromDate)} to ${parseDate(toDate)}`}
                                            </Text>
                                            <Text style={styles.subTextStyle}>
                                                Tap to unlock
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                    }

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
                        setOpenTimeShow(false)
                        setCloseTimeShow(false)
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
                openTimeShow && (
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
                closeTimeShow && (
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
            <BottomSheet
                ref={leaveSheetRef}
                snapPoints={[0, 700]}
                initialSnap={0}
                enabledContentTapInteraction={false}
                enabledContentGestureInteraction={false}
                renderContent={LeaveChangeField}
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
    },
    profilePicStyle: {
        height: 120,
        width: 120,
        borderRadius: 60,
    },
    cameraButtonContainer: {
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.orange,
        alignItems: "center",
        justifyContent: "center",
        top: "10%",
        right: 12,
        elevation: 20
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
    buttonContainer: {
        marginBottom: 10,
    },
    buttonGradientStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: 50,
        borderRadius: 5
    },
    buttonTextStyle: {
        fontSize: 18,
        fontFamily: "Roboto_500Medium",
        color: "white",
    },
});

const sheetStyles = StyleSheet.create({
    smallContainer: {
        height: 200,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
        paddingTop: 15
    },
    contentContainer: {
        width: "100%",
        paddingHorizontal: 24,
        flex: 1
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
        paddingTop: 15
    },
    xXLargeContainer: {
        height: 700,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
        paddingTop: 15
    },
    headerStyle: {
        fontFamily: 'uber_move_medium',
        fontSize: 16,
        color: "#1d1d1d",
        marginBottom: 10
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginBottom: 15
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
    fieldText: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 18,
        color: 'black',
    },
    buttonText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 18,
        color: COLORS.blue
    },
    calendarContainer: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        borderBottomColor: '#CCC',
        borderBottomWidth: 0.6
    },
    calendarTextContainer: {
        marginTop: 20,
        paddingVertical: 5,
        width: "100%",
        marginBottom: 10,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    calendarTextSmall: {
        fontFamily: 'uber_move_medium',
        fontSize: 16,
        color: '#000',
        marginBottom: 5,
    },
    calendarTextLarge: {
        fontFamily: 'uber_move_medium',
        fontSize: 18,
        color: '#000'
    },
    calendarDateContainer: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        justifyContent: 'space-between',
    },
    calendarDateIndicator: {
        paddingHorizontal: 12,
        justifyContent: 'center',
        height: 120,
        elevation: 5,
        width: "48%",
        backgroundColor: 'white',
        borderRadius: 8
    }
});

export default ShopSettingsScreen;
