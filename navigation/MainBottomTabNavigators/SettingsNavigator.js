import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import {
    SettingsScreen,
    ShopSettingsScreen,
    HelperSettingsScreen
} from '../../screens'

const SettingsNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName={"SettingsScreen"}>
            <Stack.Screen
                name={"SettingsScreen"}
                component={SettingsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"ShopSettingScreen"}
                component={ShopSettingsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"HelperSettingsScreen"}
                component={HelperSettingsScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default SettingsNavigator