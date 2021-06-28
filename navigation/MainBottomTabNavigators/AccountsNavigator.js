import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import {
    AccountsDetailScreen,
    AccountsScreen,
    CreditHistoryScreen,
    ExpenseSummaryScreen,
    RevenueSummaryScreen
} from '../../screens'

const AccountsNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName={"AccountsScreen"}>
            <Stack.Screen
                name={"AccountsScreen"}
                component={AccountsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"AccountsDetailScreen"}
                component={AccountsDetailScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"ExpenseSummaryScreen"}
                component={ExpenseSummaryScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"RevenueSummaryScreen"}
                component={RevenueSummaryScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"CreditHistoryScreen"}
                component={CreditHistoryScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default AccountsNavigator;