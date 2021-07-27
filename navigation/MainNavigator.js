import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import MainBottomTabNavigator from "./MainBottomTabNavigator";
import AuthNavigator from "./AuthNavigator";

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={"Auth"}>
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
    )
}

export default MainNavigator