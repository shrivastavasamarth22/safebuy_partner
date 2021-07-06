import React, {useState} from 'react';
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";
import MainBottomTabNavigator from "./navigation/MainBottomTabNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {createStore, combineReducers} from "redux";
import {Provider} from "react-redux";

import inventoryReducer from './store/reducers/inventory'
import shopReducer from './store/reducers/shop'
import inventoryCartReducer from './store/reducers/inventory-cart'

const rootReducer = combineReducers({
    inventory: inventoryReducer,
    inventoryCart: inventoryCartReducer,
    shop: shopReducer
})

const store = createStore(rootReducer);

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
        await Promise.all([setupFonts()])
        console.log("---- Setup Finished ----")
    } catch (e) {
        console.log("---- Setup Failed ----")
        console.log(e.message)
    }
}

export default function App() {

    const [isReady, setIsReady] = useState(false)

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
                <MainBottomTabNavigator/>
            </NavigationContainer>
        </Provider>
    )
}