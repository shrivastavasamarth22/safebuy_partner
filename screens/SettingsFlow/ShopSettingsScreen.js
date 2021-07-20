import React from "react";
import {
    View,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    Text
} from "react-native";
import { useSelector } from "react-redux";
import "@expo/match-media";
import {AntDesign, Entypo, MaterialIcons, FontAwesome, Feather} from '@expo/vector-icons';
import {useMediaQuery} from "react-responsive";
import {TopBar} from "../../components";
import {COLORS, images} from "../../constants";

const ShopSettingsScreen = ({navigation}) => {

    const shopDetails = useSelector(state => state.shop.shop)

    return (
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
                    console.log("Camera Button Pressed")
                }}
            >
                <AntDesign name="camera" size={26} color="white"/>
            </TouchableOpacity>
            <Image
                source={images.shop}
                style={styles.bannerStyle}
            />
            <Image
                source={images.user}
                style={styles.profilePicStyle}
            />

            {/*  Shop Setting Cards  */}
            <View style={styles.settingCardContainer}>
                <View style={styles.settingCard}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Entypo name="shop" size={28} color="#555" />
                        <View style={{
                            marginLeft: 40
                        }}>
                            <Text style={styles.valueTextStyle}>
                                {shopDetails.name}
                            </Text>
                            <Text style={styles.subTextStyle}>
                                Shop Name
                            </Text>
                        </View>
                    </View>
                    <MaterialIcons name="edit" size={24} color="#555" />
                </View>
                <View style={styles.settingCard}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <FontAwesome name="user" size={28} color="#555" />
                        <View style={{
                            marginLeft: 40
                        }}>
                            <Text style={styles.valueTextStyle}>
                                {shopDetails.ownerName}
                            </Text>
                            <Text style={styles.subTextStyle}>
                                Owner Name
                            </Text>
                        </View>
                    </View>
                    <MaterialIcons name="edit" size={24} color="#555" />
                </View>
                <View style={styles.settingCard}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <FontAwesome name="phone" size={28} color="#555" />
                        <View style={{
                            marginLeft: 40
                        }}>
                            <Text style={styles.valueTextStyle}>
                                {shopDetails.phone}
                            </Text>
                        </View>
                    </View>
                    <MaterialIcons name="edit" size={24} color="#555" />
                </View>
                <View style={[styles.settingCard, { marginBottom: 5 }]}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Entypo name="location-pin" size={28} color="#555" />
                        <View style={{
                            marginLeft: 40
                        }}>
                            <Text style={styles.addressTextStyle}>
                                {shopDetails.address1}
                            </Text>
                            <Text style={styles.addressTextStyle}>
                                {shopDetails.address2}
                            </Text>
                            <Text style={styles.addressTextStyle}>
                                {shopDetails.city + ", " + shopDetails.state}
                            </Text>
                            <Text style={styles.addressTextStyle}>
                                {shopDetails.pinCode}
                            </Text>
                        </View>
                    </View>
                    <MaterialIcons name="edit" size={24} color="#555" />
                </View>
                <View style={[styles.settingCard, { marginBottom: 5 }]}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Feather name="clock" size={28} color="#555" />
                        <View style={{
                            marginLeft: 40
                        }}>
                            <Text style={styles.valueTextStyle}>
                                Shop Timings & Weekly Off
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.settingCard}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Entypo name="calendar" size={28} color="#555" />
                        <View style={{
                            marginLeft: 40
                        }}>
                            <Text style={styles.valueTextStyle}>
                                Take Leave
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    bannerStyle: {
        width: "100%",
        height: "32%",
        resizeMode: "cover",
        backgroundColor: 'red'
    },
    profilePicStyle: {
        position: 'absolute',
        height: 130,
        width: 130,
        borderRadius: 65,
        borderWidth: 5,
        borderColor: 'white',
        bottom: "56%",
        left: 12
    },
    cameraButtonContainer: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.orange,
        elevation: 20,
        alignItems: 'center',
        justifyContent: 'center',
        top: "10%",
        right: 12
    },
    settingCardContainer: {
        flex: 1,
        marginTop: 35,
        paddingHorizontal: 5
    },
    settingCard: {
        flexDirection: 'row',
        width: "100%",
        paddingVertical: 12,
        backgroundColor: 'white',
        elevation: 2,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
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
        width: "80%"
    }
});

export default ShopSettingsScreen;
