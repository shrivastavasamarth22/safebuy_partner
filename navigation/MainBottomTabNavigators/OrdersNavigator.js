import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import {
    OfflineOrderScreen,
    OfflineOrderSummaryScreen,
    OrderExpandedScreen,
    OrdersScreen
} from '../../screens'

const OrdersNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName={"OrdersScreen"}>
            <Stack.Screen
                name={"OrdersScreen"}
                component={OrdersScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"OrderExpandedScreen"}
                component={OrderExpandedScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"OfflineOrderScreen"}
                component={OfflineOrderScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"OfflineOrderSummaryScreen"}
                component={OfflineOrderSummaryScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default OrdersNavigator;