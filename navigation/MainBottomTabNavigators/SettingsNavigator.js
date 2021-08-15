import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import {
    CameraScreen2,
    CameraScreen4,
    HelperSettingsScreen,
    SettingsScreen,
    ShopSettingsScreen,
    HelperForm1,
    HelperForm2,
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
                name={"CameraScreen4"}
                component={CameraScreen4}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"HelperForm1"}
                component={HelperForm1}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={"HelperForm2"}
                component={HelperForm2}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

export default SettingsNavigator;