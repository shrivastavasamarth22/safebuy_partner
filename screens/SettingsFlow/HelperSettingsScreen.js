import React from 'react';
import {View, Text, StyleSheet, StatusBar, Image, FlatList, Alert, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import {TopBar, HelperCard, GradientButton} from '../../components'
import * as helperActions from '../../store/actions/helper'
import {COLORS, icons, images} from "../../constants";
import {LinearGradient} from "expo-linear-gradient";

const HelperSettingsScreen = ({navigation}) => {
    const helpers = useSelector(state => state.helper.helpers)
    const dispatch = useDispatch();
    console.log(helpers)

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

    const onAddPress = () => {
        if (helpers.length === 0) {
            navigation.navigate("HelperForm1")
        } else if (helpers.length === 1) {
            navigation.navigate("HelperForm2")
        }
    }

    const renderList = () => {
        if (helpers.length > 0) {
            return (
                <View>
                    <FlatList
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
                    />
                    {
                        helpers.length === 1
                            ?
                            <TouchableOpacity
                                style={styles.addButtonContainer}
                                onPress={onAddPress}
                            >
                                <LinearGradient
                                    colors={[COLORS.fromPrimaryGradientColor, COLORS.toPrimaryGradientColor]}
                                    start={{x: 0, y: 0}}
                                    end={{x: 1, y: 0}}
                                    style={styles.addButton}
                                >
                                    <Text style={styles.buttonText}>
                                        Add More
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            : null

                    }
                </View>
            )
        } else {
            return (
                <>
                    <Image
                        source={images.helper}
                        style={styles.emptyImageStyle}
                    />
                    <Text style={styles.emptyHeaderStyle}>
                        You have no helpers registered right now
                    </Text>
                    <View style={styles.buttonContainer}>
                        <GradientButton
                            text={"Add Helper"}
                            onPress={onAddPress}
                        />
                    </View>
                </>
            )
        }
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
                {renderList()}
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
    },
    addButtonContainer: {
        alignSelf: 'flex-end',
        marginTop: 20
    },
    addButton: {
        width: 100,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 14,
        color: 'white'
    },
    emptyImageStyle: {
        width: "120%",
        height: "60%",
        position: 'absolute',
        marginTop: "20%",
        left: "-5%",
        backgroundColor: 'white'
    },
    emptyHeaderStyle: {
        position: 'absolute',
        top: "60%",
        fontFamily: 'uber_move_medium',
        fontSize: 24,
        color: '#555',
        textAlign: 'center',
        alignSelf: 'center'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
})

export default HelperSettingsScreen;