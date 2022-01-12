import React, {useCallback} from 'react';
import {ActivityIndicator, ImageBackground, StatusBar, StyleSheet, View} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import MapView, {Circle, Marker, PROVIDER_GOOGLE, Polyline, Polygon} from "react-native-maps";
// import '../../_mockLocation';
import useLocation from "../../hooks/useLocation";
import * as locationActions from '../../store/actions/location';
import {COLORS, icons, images} from "../../constants";
import {TopBar, GradientButton} from '../../components';
import {convexHull} from "../../Functions";

const ShopBeatScreen = ({navigation}) => {
    const shop = useSelector(state => state.shop.shop)
    const currentLocation = useSelector(state => state.location.currentLocation)
    const recording = useSelector(state => state.location.recording)
    const points = useSelector(state => state.location.points);

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const callback = useCallback(location => dispatch(locationActions.addGeopoint(location, recording)), [recording])

    const [err] = useLocation(isFocused || recording, callback)

    const customMapStyle = [
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ]

    const shopRegion = {
        latitude: shop.lat,
        longitude: shop.lng,
    }


    if (currentLocation) {
        const initRegion = {
            ...currentLocation.coords,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
        }

        const onPress = () => {
            if (recording) {
                dispatch(locationActions.stopRecording())
            } else {
                dispatch(locationActions.startRecording())
            }
        }


        return (
            <ImageBackground
                style={styles.container}
                source={images.background}
            >
                <StatusBar
                    backgroundColor={COLORS.green}
                    barStyle={"light-content"}
                />
                <TopBar
                    headerText={"My Shop Beat"}
                    onBackButtonPress={navigation.goBack}
                />
                <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={initRegion}
                    style={styles.mapStyle}
                    customMapStyle={customMapStyle}
                >
                    <Circle
                        center={{latitude: shopRegion.latitude, longitude: shopRegion.longitude}}
                        radius={1500}
                        strokeWidth={3}
                        strokeColor={COLORS.yellow}
                        fillColor={"rgba(255, 157, 0, 0.1)"}
                    />
                    <Marker
                        coordinate={{
                            latitude: shop.lat,
                            longitude: shop.lng
                        }}
                        title={shop.name}
                        image={icons.map_shop_icon}
                    />
                    <Marker
                        coordinate={currentLocation.coords}
                        title={"My Location"}
                        image={icons.map_user_icon}
                    />

                    {recording ?
                        <Polyline
                        coordinates={points.map(point => point.coords)}
                        strokeWidth={3}
                        strokeColor={COLORS.mainLavender}
                        />

                        : null
                    }
                    {/*{!recording && points.length > 0 ?*/}
                    {/*    <Polygon*/}
                    {/*        coordinates={convexHull(points)}*/}
                    {/*        strokeWidth={3}*/}
                    {/*        strokeColor={COLORS.mainLavender}*/}
                    {/*        fillColor={'rgba(129, 10, 140, 0.3)'}*/}
                    {/*    />*/}
                    {/*    : null*/}
                    {/*}*/}
                </MapView>


                <View style={styles.buttonContainer}>
                    <GradientButton
                        text={recording ? "Stop" : "Start Recording"}
                        onPress={onPress}
                    />
                    {
                        !recording && points.length
                            ?
                            <GradientButton
                                text={"Save"}
                            />
                            : null
                    }
                </View>
            </ImageBackground>
        )
    } else {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={COLORS.green}
                    barStyle={"light-content"}
                />
                <TopBar
                    headerText={"My Shop Beat"}
                    onBackButtonPress={navigation.goBack}
                />
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator
                        size={"large"}
                    />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mapStyle: {
        width: "100%",
        height: "50%"
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 12
    }
})

export default ShopBeatScreen