import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import { useSelector } from "react-redux";

import MainBottomTabNavigator from "./MainBottomTabNavigator";
import AuthNavigator from "./AuthNavigator";

const Stack = createStackNavigator();



const MainNavigator = () => {
    const isSignedIn = useSelector(state => state.auth.isSignedIn)
    return (
        <Stack.Navigator>
            {
                isSignedIn ? (
                    <>
                        <Stack.Screen
                            name={"BottomTab"}
                            component={MainBottomTabNavigator}
                            options={{
                                headerShown: false
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name={"Auth"}
                            component={AuthNavigator}
                            options={{
                                headerShown: false
                            }}
                        />
                    </>
                )
            }
        </Stack.Navigator>
    )
}

export default MainNavigator