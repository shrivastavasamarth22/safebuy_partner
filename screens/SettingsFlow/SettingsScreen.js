import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useDispatch} from "react-redux";
import {
    HeaderBar,
    ListButton
} from '../../components'
import {COLORS} from "../../constants";
import {Entypo} from "@expo/vector-icons";
import {logOut} from "../../store/actions/auth";

const SettingsScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const onLogOutPress = () => {
        dispatch(logOut())
    }

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
                icon={<Entypo name="chevron-right" size={24} color="#d1d1d6" />}
            />
            <ListButton
                buttonText={"Helper Settings"}
                icon={<Entypo name="chevron-right" size={24} color="#d1d1d6" />}
            />
            <ListButton
                buttonText={"Log Out"}
                icon={<Entypo name="chevron-right" size={24} color="#d1d1d6" />}
                onPress={onLogOutPress}
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