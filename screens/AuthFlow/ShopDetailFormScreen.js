import React, {useEffect, useState, useRef} from "react";
import {
    View,
    Text,
    StyleSheet,
    BackHandler,
    StatusBar,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
    Image, ScrollView,
} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomSheet from "reanimated-bottom-sheet";
import {Entypo, Feather, AntDesign} from "@expo/vector-icons";
import '@expo/match-media'
import {useMediaQuery} from "react-responsive";
import {HeaderBar, TimePicker, DaySelector, GradientButton} from "../../components";
import {COLORS} from "../../constants";
import {days, prices} from "../../mock-data";
import * as shopActions from '../../store/actions/shop'
import {LinearGradient} from "expo-linear-gradient";
import {logIn, logOut} from "../../store/actions/auth";

const ShopDetailFormScreen = ({navigation}) => {

    const shopDetails = useSelector(state => state.shop.shop);
    const shopImage = shopDetails.imageUri
    const ownerImage = shopDetails.ownerImageUri
    const qrImage = shopDetails.qrImageUri

    const [date, setDate] = useState(new Date())
    const [visible, setVisible] = useState(false)
    const [showPrice, setShowPrice] = useState(shopDetails.homeDeliveryCapable);
    const [selectedPrice, setSelectedPrice] = useState(shopDetails.homeDeliveryMinOrderAmount)

    const isSmallDevice = useMediaQuery({
        maxDeviceWidth: 360
    })

    const [openTime, setOpenTime] = useState({
        hours: "09",
        minutes: "00"
    });
    const [closeTime, setCloseTime] = useState({
        hours: "20",
        minutes: "00"
    });
    const [weeklyHolidays, setWeeklyHolidays] = useState([]);

    const holidaySheetRef = useRef(null);
    const helperSheetRef = useRef(null)

    const [openTimeShow, setOpenTimeShow] = useState(false)
    const [closeTimeShow, setCloseTimeShow] = useState(false)

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => false)
    }, [])

    const dispatch = useDispatch();

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

    const onOpenBottomSheet = (ref) => {
        if (ref.current) {
            ref.current.snapTo(1)
            setVisible(true)
        }
    }

    const onCloseBottomSheet = (ref) => {
        if (ref.current) {
            ref.current.snapTo(0);
            setVisible(false)
        }
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

    const onPricePress = (price) => {
        setSelectedPrice(price)
    }

    const onSubmitPress = (argument) => {
        dispatch(shopActions.changeOpenTime(1, openTime.hours, openTime.minutes))
        dispatch(shopActions.changeCloseTime(1, closeTime.hours, closeTime.minutes))
        dispatch(shopActions.changeHolidays(1, weeklyHolidays))
        dispatch(shopActions.changeHomeDeliveryCapable(1, showPrice))
        if (showPrice) {
            dispatch(shopActions.changeHomeDeliveryMinOrderAmount(1, selectedPrice))
        }

        if (argument === 'yes') {
            navigation.navigate("AddHelperScreen")
        } else {
            dispatch(logIn())
            navigation.navigate("RegistrationSuccessScreen")
        }
    }

    const toggleSwitch = () => setShowPrice(prevState => !prevState)

    const HolidaysChangeField = () => {
        return (
            <View style={styles.xLargeContainer}>
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

    const HelperSheet = () => {
        return (
            <View style={styles.smallContainer}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>
                        Do you want to add Helpers ?
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.cancelButtonContainer}
                        onPress={() => onSubmitPress("no")}
                    >
                        <Text style={styles.cancelButtonText}>
                            No
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.yesButtonContainer}
                        onPress={() => onSubmitPress("yes")}
                    >
                        <LinearGradient
                            colors={[COLORS.fromPrimaryGradientColor, COLORS.toPrimaryGradientColor]}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={styles.yesButton}
                        >
                            <Text style={styles.yesButtonText}>
                                Yes
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

                <HeaderBar
                    headerText={"Shop Details"}
                    style={isSmallDevice ? {
                        height: 50,
                    } : {
                        height: 70
                    }}
                />

                <ScrollView style={styles.formContainer}>
                    <TimePicker
                        heading={"Enter Opening Time: "}
                        style={{
                            marginTop: 15
                        }}
                        hours={openTime.hours}
                        minutes={openTime.minutes}
                        icon={<Feather name={"sun"} size={24} color={"#000"}/>}
                        onPress={() => setOpenTimeShow(true)}
                    />

                    <TimePicker
                        heading={"Enter Closing Time: "}
                        style={{
                            marginTop: 15
                        }}
                        hours={closeTime.hours}
                        minutes={closeTime.minutes}
                        icon={<Feather name={"moon"} size={24} color={"#000"}/>}
                        onPress={() => setCloseTimeShow(true)}
                    />

                    <TouchableOpacity
                        style={styles.holidayButtonContainer}
                        onPress={() => onOpenBottomSheet(holidaySheetRef)}
                    >
                        <Text style={styles.holidayButtonText}>
                            Holidays :
                        </Text>
                        <Entypo name="chevron-right" size={24} color="#555"/>
                    </TouchableOpacity>
                    <View
                        style={styles.divider}
                    />

                    <TouchableOpacity
                        style={styles.holidayButtonContainer}
                        onPress={() => navigation.navigate("CameraScreen", {
                            purpose: 'shop'
                        })}
                    >
                        <Text style={styles.holidayButtonText}>
                            Shop Photo
                        </Text>
                        <AntDesign name="camera" size={28} color="#CCC"/>
                    </TouchableOpacity>
                    {
                        shopImage !== ""
                            ? <Image source={{uri: shopImage}} style={styles.previewImage}/>
                            : null
                    }
                    <View
                        style={styles.divider}
                    />

                    <TouchableOpacity
                        style={styles.holidayButtonContainer}
                        onPress={() => navigation.navigate("CameraScreen", {
                            purpose: 'user'
                        })}
                    >
                        <Text style={styles.holidayButtonText}>
                            Owner Photo
                        </Text>
                        <AntDesign name="user" size={28} color="#CCC"/>
                    </TouchableOpacity>
                    {
                        ownerImage !== ""
                            ? <Image source={{uri: ownerImage}} style={styles.previewImage}/>
                            : null
                    }
                    <View
                        style={styles.divider}
                    />

                    <TouchableOpacity
                        style={styles.holidayButtonContainer}
                        onPress={() => navigation.navigate("CameraScreen3")}
                    >
                        <Text style={styles.holidayButtonText}>
                            Shop QR photo
                        </Text>
                        <AntDesign name="qrcode" size={28} color="#CCC"/>
                    </TouchableOpacity>
                    {
                        qrImage !== ""
                            ? <Image source={{uri: qrImage}} style={styles.previewImage}/>
                            : null
                    }
                    <View
                        style={styles.divider}
                    />

                    <TouchableOpacity
                        style={styles.holidayButtonContainer}
                        onPress={toggleSwitch}
                    >
                        <Text style={styles.holidayButtonText}>
                            Home Delivery:
                        </Text>
                        <View style={showPrice ?
                            [styles.switchButtonContainer, {backgroundColor: COLORS.primary, alignItems: 'flex-end'}]
                            : [styles.switchButtonContainer, {backgroundColor: "#c4c4c4"}]}>
                            <View style={!showPrice ? [styles.switchButton, {
                                borderWidth: 1,
                                borderColor: "#CCC"
                            }] : [styles.switchButton, {borderWidth: 1, borderColor: COLORS.primary}]}/>
                        </View>
                    </TouchableOpacity>
                    {
                        showPrice ?
                            <View style={styles.priceOptionContainer}>
                                <FlatList
                                    data={prices}
                                    horizontal
                                    contentContainerStyle={{
                                        width: "100%",
                                        justifyContent: 'space-between'
                                    }}
                                    keyExtractor={item => item.toString()}
                                    renderItem={({item}) => {
                                        if (selectedPrice === item) {
                                            return (
                                                <TouchableOpacity
                                                    style={styles.selectedPriceContainer}
                                                    onPress={() => onPricePress(item)}
                                                >
                                                    <Text style={styles.selectedPriceText}>
                                                        {`₹ ${item}`}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        } else {
                                            return (
                                                <TouchableOpacity
                                                    style={styles.regularPriceContainer}
                                                    onPress={() => onPricePress(item)}
                                                >
                                                    <Text style={styles.regularPriceText}>
                                                        {`₹ ${item}`}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        }

                                    }}
                                />
                            </View> : null
                    }
                    {
                        showPrice ?
                            <Text style={styles.noticeText}>
                                *Minimum order amount
                            </Text>
                            : null
                    }
                    <View
                        style={styles.divider}
                    />
                </ScrollView>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    paddingHorizontal: 24,
                }}>
                    <GradientButton
                        text={"Continue"}
                        onPress={() => onOpenBottomSheet(helperSheetRef)}
                    />
                </View>
            </View>

            {visible ? (
                <TouchableWithoutFeedback
                    onPress={() => {
                        onCloseBottomSheet(holidaySheetRef);
                        onCloseBottomSheet(helperSheetRef)
                        setVisible(false)
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
                ref={holidaySheetRef}
                snapPoints={[0, 600]}
                initialSnap={0}
                enabledContentTapInteraction={false}
                enabledContentGestureInteraction={false}
                renderContent={HolidaysChangeField}
            />

            <BottomSheet
                ref={helperSheetRef}
                snapPoints={[0, 200]}
                initialSnap={0}
                enabledContentTapInteraction={false}
                enabledContentGestureInteraction={false}
                renderContent={HelperSheet}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: 'white'
    },
    holidayButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 15,
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
    xLargeContainer: {
        height: 600,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
        paddingTop: 15
    },
    smallContainer: {
        height: 200,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
        paddingTop: 15
    },
    headingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        width: "100%",
        height: "70%",
        marginBottom: "5%"
    },
    buttonContainer: {
        flex: 1,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cancelButtonContainer: {
        height: 60,
        width: "45%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 0.7,
        borderColor: COLORS.primary
    },
    yesButtonContainer: {
        height: 60,
        width: "45%",
    },
    yesButton: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    cancelButtonText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 20,
        color: COLORS.primary
    },
    yesButtonText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 20,
        color: "white"
    },
    headingText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 24,
        textAlign: 'center'
    },
    previewImage: {
        width: 50,
        height: 50,
        borderRadius: 2,
        marginLeft: 24,
        marginBottom: 15,
        resizeMode: 'cover'
    },
    switchButtonContainer: {
        width: 60,
        height: 30,
        borderRadius: 25,
        justifyContent: 'center'
    },
    switchButton: {
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: 'white',
    },
    priceOptionContainer: {
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 24,
    },
    selectedPriceContainer: {
        width: 60,
        height: 40,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    regularPriceContainer: {
        width: 60,
        height: 40,
        borderRadius: 5,
        backgroundColor: 'white',
        borderWidth: 0.6,
        borderColor: '#c4c4c4',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedPriceText: {
        fontFamily: "Roboto_500Medium",
        fontSize: 16,
        color: 'white'
    },
    regularPriceText: {
        fontFamily: "Roboto_500Medium",
        fontSize: 16,
        color: "#555"
    },
    noticeText: {
        fontFamily: "Roboto_400Regular",
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 14,
        color: '#EB6D6D',
        marginBottom: 15
    }
})

export default ShopDetailFormScreen;