import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import {useSelector} from "react-redux";
import {TopBar} from '../../components';
import {COLORS} from '../../constants';
import {parseDate} from "../../Functions";

const ExpenseSummaryScreen = ({ navigation, route }) => {
    const {id} = route.params;
    const accounts = useSelector(state => state.accounts.accounts)

    const account = accounts.find(acc => acc.id === id);

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.green}
                barStyle={"light-content"}
            />
            <TopBar
                headerText={"Expenses"}
                onBackButtonPress={navigation.goBack}
            />
            <Text>This is the Expense Summary Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default ExpenseSummaryScreen;