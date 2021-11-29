import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import {useSelector} from "react-redux";
import {COLORS} from "../../constants";
import {HeaderBar} from "../../components";

const AccountsScreen = () => {
    const accounts = useSelector(state => state.accounts.accounts)
    console.log(accounts)
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.green}
                barStyle={"light-content"}
            />
            <HeaderBar
                headerText={"Your Accounts"}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default AccountsScreen;