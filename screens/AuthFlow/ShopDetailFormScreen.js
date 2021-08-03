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
    Image,
} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomSheet from "reanimated-bottom-sheet";
import {Entypo, Feather, AntDesign} from "@expo/vector-icons";
import {HeaderBar, TimePicker, DaySelector, GradientButton} from "../../components";
import {COLORS} from "../../constants";
import {days, prices} from "../../mock-data";
import * as shopActions from '../../store/actions/shop'

const ShopDetailFormScreen = ({navigation}) => {

    const shopDetails = useSelector(state => state.shop.shop);
    const shopImage = shopDetails.imageUri
    const ownerImage = shopDetails.ownerImageUri

    const [date, setDate] = useState(new Date())
    const [visible, setVisible] = useState(false)
    const [showPrice, setShowPrice] = useState(shopDetails.homeDeliveryCapable);
    const [selectedPrice, setSelectedPrice] = useState(shopDetails.homeDeliveryMinOrderAmount)

    const [openTime, setOpenTime] = useState({
        hours: "09",
        minutes: "00"
    });
    const [closeTime, setCloseTime] = useState({
        hours: "20",
        minutes: "00"
    });
    const [weeklyHolidays, setWeeklyHolidays] = useState([]);

    const sheetRef = useRef(null);

    const [openTimeShow, setOpenTimeShow] = useState(false)
    const [closeTimeShow, setCloseTimeShow] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => true);
        return () =>
            BackHandler.removeEventListener("hardwareBackPress", () => false);
    }, [])

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

    const onOpenBottomSheet = () => {
        if (sheetRef.current) {
            sheetRef.current.snapTo(1)
            setVisible(true)
        }
    }

    const onCloseBottomSheet = () => {
        if (sheetRef.current) {
            sheetRef.current.snapTo(0);
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

    const onSubmitPress = () => {
        dispatch(shopActions.changeOpenTime(1, openTime.hours, openTime.minutes))
        dispatch(shopActions.changeCloseTime(1, closeTime.hours, closeTime.minutes))
        dispatch(shopActions.changeHolidays(1, weeklyHolidays))
        dispatch(shopActions.changeHomeDeliveryCapable(1, showPrice))
        if (showPrice) {
            dispatch(shopActions.changeHomeDeliveryMinOrderAmount(1, selectedPrice))
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
                    onPress={onCloseBottomSheet}
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

                <HeaderBar
                    headerText={"Shop Details"}
                />

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
                    onPress={onOpenBottomSheet}
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
                    onPress={toggleSwitch}
                >
                    <Text style={styles. holidayButtonText}>
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
                                    return(
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
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    paddingHorizontal: 24
                }}>
                    <GradientButton
                        text={"Continue"}
                        onPress={onSubmitPress}
                    />
                </View>
            </View>

            {visible ? (
                <TouchableWithoutFeedback
                    onPress={() => {
                        onCloseBottomSheet();
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
                ref={sheetRef}
                snapPoints={[0, 600]}
                initialSnap={0}
                enabledContentTapInteraction={false}
                enabledContentGestureInteraction={false}
                renderContent={HolidaysChangeField}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    previewImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
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