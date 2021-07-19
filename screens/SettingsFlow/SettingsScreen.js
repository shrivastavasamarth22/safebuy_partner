import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {
    HeaderBar,
    ListButton
} from '../../components'
import {COLORS} from "../../constants";

const SettingsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor={COLORS.green}
            />
            <HeaderBar
                headerText={"Settings"}
            />
            <ListButton
                buttonText={"Shop Settings"}
                onPress={() => navigation.navigate("ShopSettingsScreen")}
                style={{
                    marginTop: 5
                }}
            />
            <ListButton
                buttonText={"Helper Settings"}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
})

export default SettingsScreen;