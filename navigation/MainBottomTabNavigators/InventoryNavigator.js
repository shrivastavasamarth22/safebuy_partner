import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import {
    AddSellingPriceScreen,
    AddPurchaseDetailsScreen,
    AddToStockScreen,
    InventoryHistoryScreen,
    InventoryScreen,
    StockBoughtSummaryScreen,
} from '../../screens'

const Stack = createStackNavigator();

const InventoryNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={"InventoryScreen"}>
            <Stack.Screen
                name={"InventoryScreen"}
                component={InventoryScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"AddToStockScreen"}
                component={AddToStockScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"AddPurchaseDetailsScreen"}
                component={AddPurchaseDetailsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"StockBoughtSummaryScreen"}
                component={StockBoughtSummaryScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"AddSellingPriceScreen"}
                component={AddSellingPriceScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"InventoryHistoryScreen"}
                component={InventoryHistoryScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default InventoryNavigator