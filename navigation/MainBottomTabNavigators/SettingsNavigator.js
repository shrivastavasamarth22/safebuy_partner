import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import {
    CameraScreen,
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
                name={"CameraScreen"}
                component={CameraScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default SettingsNavigator;