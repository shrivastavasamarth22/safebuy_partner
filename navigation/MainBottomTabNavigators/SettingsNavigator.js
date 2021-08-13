import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import {
    CameraScreen2,
    CameraScreen3,
    HelperSettingsScreen,
    SettingsScreen,
    ShopSettingsScreen,
} from '../../screens'

const Stack = createStackNavigator();

const SettingsNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={"SettingsScreen"}>
            <Stack.Screen
                name={"SettingsScreen"}
                component={SettingsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"HelperSettingsScreen"}
                component={HelperSettingsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"ShopSettingsScreen"}
                component={ShopSettingsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"CameraScreen2"}
                component={CameraScreen2}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"CameraScreen3"}
                component={CameraScreen3}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default SettingsNavigator;