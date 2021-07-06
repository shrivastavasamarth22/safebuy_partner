import React from 'react';
import {Image, StyleSheet} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {
    OrdersNavigator,
    AccountsNavigator,
    InventoryNavigator,
    SettingsNavigator
} from './MainBottomTabNavigators'

import {COLORS, icons} from "../constants";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";

const Tab = createBottomTabNavigator()

const MainBottomTabNavigator = () => {

    return (
        <Tab.Navigator
            initialRouteName={"Orders"}
            tabBarOptions={{
                activeTintColor: "#FFF",
                inactiveTintColor: COLORS.darkGreen,
                activeBackgroundColor: COLORS.primary,
                inactiveBackgroundColor: COLORS.primary,
                style: {
                    height: 55,
                },
                tabStyle: {
                    paddingBottom: 5,
                    paddingTop: 10,
                },
                labelStyle: {
                    fontFamily: "Roboto_500Medium",
                    fontSize: 12
                }
            }}
        >
            <Tab.Screen
                name={'Orders'}
                component={OrdersNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <Image
                                source={icons.mascot}
                                style={focused ? styles.activeIconStyle : styles.inactiveIconStyle}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen
                name={'Inventory'}
                component={InventoryNavigator}
                options={({route}) => ({
                    tabBarIcon: ({focused}) => {
                        return (
                            <Image
                                source={icons.inventory_check}
                                style={focused ? styles.activeIconStyle : styles.inactiveIconStyle}
                            />
                        )
                    },
                    tabBarVisible: ((route) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? ""

                        return routeName === "InventoryScreen"
                    })(route),
                })
                }
            />
            <Tab.Screen
                name={'Accounts'}
                component={AccountsNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <Image
                                source={icons.accounts_calc}
                                style={focused ? styles.activeIconStyle : styles.inactiveIconStyle}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen
                name={'Settings'}
                component={SettingsNavigator}
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <Image
                                source={icons.settings_cog}
                                style={focused ? styles.activeIconStyle : styles.inactiveIconStyle}
                            />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    activeIconStyle: {
        tintColor: "white",
        height: 25,
        width: 25,
        alignSelf: 'center',
    },
    inactiveIconStyle: {
        tintColor: COLORS.darkGreen,
        height: 22,
        width: 22,
        alignSelf: 'center'
    }
})

export default MainBottomTabNavigator