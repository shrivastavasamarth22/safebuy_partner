import React, {useEffect} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from "react-native-maps";
import '../../_mockLocation';
import useLocation from "../../hooks/useLocation";
import * as locationActions from '../../store/actions/location';
import {COLORS, icons} from "../../constants";
import {TopBar} from '../../components'

const ShopBeatScreen = ({navigation}) => {
    const shop = useSelector(state => state.shop.shop)
    const currentLocation = useSelector(state => state.location.currentLocation)

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const [err] = useLocation(isFocused, (location) => dispatch(locationActions.addGeopoint(location)))


    const shopRegion = {
        latitude: shop.lat,
        longitude: shop.lng,
    }


    if (currentLocation) {
        const initRegion = {
            ...currentLocation.coords,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }
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
                <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={initRegion}
                    region={initRegion}
                    style={styles.mapStyle}
                >
                    <Circle
                        center={{latitude: shopRegion.latitude, longitude: shopRegion.longitude}}
                        radius={2000}
                        strokeWidth={3}
                        strokeColor={COLORS.mainLavender}
                        fillColor={"rgba(81, 10, 140, 0.12)"}
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
                </MapView>
            </View>
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
        backgroundColor: 'white'
    },
    mapStyle: {
        width: "100%",
        height: "50%"
    }
})

export default ShopBeatScreen