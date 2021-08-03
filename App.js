import React, {useState, useEffect} from 'react';
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createStore, combineReducers} from "redux";
import {Provider} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";


import {changeShopImage, changeOwnerImage} from "./store/actions/shop";

import inventoryReducer from './store/reducers/inventory'
import shopReducer from './store/reducers/shop'
import inventoryCartReducer from './store/reducers/inventory-cart';
import AuthReducer from './store/reducers/auth' ;
import MainBottomTabNavigator from "./navigation/MainBottomTabNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import {logIn, logOut} from "./store/actions/auth";
import {BackHandler} from "react-native";

const rootReducer = combineReducers({
    inventory: inventoryReducer,
    inventoryCart: inventoryCartReducer,
    shop: shopReducer,
    auth: AuthReducer
})

const store = createStore(rootReducer);

const setupProfilePics = async () => {

    const shop_result = await AsyncStorage.getItem('@shop_img')
    const user_result = await AsyncStorage.getItem('@user_img')
    const id = store.getState().shop.id;

    if (!shop_result && !user_result) return

    if (shop_result) {
        store.dispatch(changeShopImage(id, shop_result))
    }

    if (user_result) {
        store.dispatch(changeOwnerImage(id, user_result))
    }

}


const setupFonts = () => Font.loadAsync({
    'uber_move_medium': require('./assets/fonts/UberMoveMedium.otf'),
    'uber_move_bold': require('./assets/fonts/UberMoveBold.otf'),
    'Roboto_400Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto_500Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto_700Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'yantramanav_regular': require('./assets/fonts/Yantramanav-Regular.ttf'),
    'yantramanav_medium': require('./assets/fonts/Yantramanav-Medium.ttf'),
    'yantramanav_bold': require('./assets/fonts/Yantramanav-Bold.ttf')
})

const setup = async () => {
    try {
        console.log("---- Starting Setup ----")
        await setupFonts();
        console.log("---- Setup Finished ----")
    } catch (e) {
        console.log("---- Setup Failed ----")
        console.log(e.message)
    }
}

const Stack = createStackNavigator();

export default function App() {
    const [isSignedIn, setIsSignedIn] = useState(store.getState().auth.isSignedIn)

    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => false)
    }, [])

    if (!isReady) {
        return (
            <AppLoading
                startAsync={setup}
                onFinish={() => setIsReady(true)}
                onError={(err) => console.log(err)}
            />
        )
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name={"Auth"}
                        component={AuthNavigator}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name={"BottomTab"}
                        component={MainBottomTabNavigator}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}