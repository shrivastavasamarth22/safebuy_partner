import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from "react-native";
import * as Location from 'expo-location';
import {useSelector} from "react-redux";
import MapView, {PROVIDER_GOOGLE, Marker, Polyline, Circle} from "react-native-maps";
import {COLORS} from "../../constants";
import {TopBar} from '../../components'

const ShopBeatScreen = ({navigation}) => {
    const shop = useSelector(state => state.shop.shop)

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setLocation(null)
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    if (errorMsg) {
        console.log(errorMsg)
    }

    const initRegion = {
        latitude: shop.lat,
        longitude: shop.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    }

    // let points = [];
    // for (let i = 0; i < 20; i++) {
    //     if (i % 2 === 0) {
    //         points.push({
    //             latitude:  initRegion.latitude + i * 0.001,
    //             longitude: initRegion.longitude + i * 0.001
    //         })
    //     } else {
    //         points.push({
    //             latitude:  initRegion.latitude - i * 0.002,
    //             longitude: initRegion.longitude - i * 0.001
    //         })
    //     }
    //
    // }


    if (location) {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={COLORS.green}
                    barStyle={"light-content"}
                />
                <TopBar
                    headerText={"My Shop Beat"}
                    onBackButtonPress={() => console.log('The back button was pressed')}
                />
                <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={initRegion}
                    style={styles.mapStyle}
                >
                    <Circle
                        center={{latitude: initRegion.latitude, longitude: initRegion.longitude}}
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
                        pinColor={COLORS.mainLavender}
                    />
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude
                        }}
                        title={"My location"}
                        pinColor={COLORS.mainLavender}
                    />
                </MapView>
            </View>
        )
    } else {
        return (<Text>{errorMsg}</Text>)
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