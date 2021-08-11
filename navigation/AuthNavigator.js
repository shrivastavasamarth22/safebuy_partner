import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import {
    AddHelperScreen,
    HelperFormScreen1,
    HelperFormScreen2,
    HelperFormScreen3,
    OtpScreen,
    RegistrationFormScreen,
    RegistrationSuccessScreen,
    ShopCategoryScreen,
    ShopDetailFormScreen,
    CameraScreen2
} from '../screens'

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return(
        <Stack.Navigator initialRouteName={"OtpScreen"}>
            <Stack.Screen
                name={"OtpScreen"}
                component={OtpScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={"ShopCategoryScreen"}
                component={ShopCategoryScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={"RegistrationFormScreen"}
                component={RegistrationFormScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={"ShopDetailFormScreen"}
                component={ShopDetailFormScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={"AddHelperScreen"}
                component={AddHelperScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={"HelperFormScreen1"}
                component={HelperFormScreen1}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={"HelperFormScreen2"}
                component={HelperFormScreen2}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={"HelperFormScreen3"}
                component={HelperFormScreen3}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={"RegistrationSuccessScreen"}
                component={RegistrationSuccessScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={"CameraScreen"}
                component={CameraScreen2}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigator;