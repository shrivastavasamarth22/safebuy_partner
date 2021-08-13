import React from 'react';
import {View, Text, StyleSheet, StatusBar, Image, FlatList, Alert} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import {TopBar, HelperCard} from '../../components'
import * as helperActions from '../../store/actions/helper'
import {COLORS, icons} from "../../constants";

const HelperSettingsScreen = ({navigation}) => {
    const helpers = useSelector(state => state.helper.helpers)
    const dispatch = useDispatch();

    const onRemovePress = (id) => {
        Alert.alert(
            "Do you really want to remove this helper?",
            "This action cannot be undone",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                    }
                },
                {
                    text: "Yes",
                    onPress: () => dispatch(helperActions.removeHelper(id))
                }
            ]
        )
    }

    const onControlPress = (id) => {
        dispatch(helperActions.changeHelperStatus(id));
        navigation.reset({
            index: 0,
            routes: [
                {name: "HelperSettingsScreen"}
            ]
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.green}
                barStyle={"light-content"}
            />
            <TopBar
                headerText={"Helper Settings"}
                onBackButtonPress={() => navigation.navigate("SettingsScreen")}
            />
            <View style={styles.contentContainer}>
                <View style={styles.headingContainer}>
                    <Image
                        source={icons.helper_icon}
                        style={styles.helperIcon}
                    />
                    <Text style={styles.headerStyle}>
                        My Helpers
                    </Text>
                </View>
                {
                    helpers.length > 0
                        ? <FlatList
                            data={helpers}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => {
                                const status = item.controlStatus
                                return (
                                    <HelperCard
                                        helper={item}
                                        controlStatus={status}
                                        onRemovePress={() => onRemovePress(item.id)}
                                        onControlPress={() => onControlPress(item.id)}
                                    />
                                )
                            }}
                        /> : null
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
        backgroundColor: 'white'
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    helperIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    headerStyle: {
        marginLeft: 10,
        fontFamily: 'Roboto_500Medium',
        fontSize: 20,
        color: '#555'
    }
})

export default HelperSettingsScreen;