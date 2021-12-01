import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import {useSelector} from "react-redux";
import {List} from "react-native-paper";
import {Entypo} from '@expo/vector-icons';
import {COLORS, images} from "../../constants";
import {HeaderBar} from "../../components";
import {parseDate} from "../../Functions";


const AccountsScreen = ({ navigation }) => {
    const accounts = useSelector(state => state.accounts.accounts)

    if (accounts.length === 0) {
        return (
            <ImageBackground
                style={styles.backgroundImage}
                source={images.background}
            >
                <StatusBar
                    backgroundColor={COLORS.green}
                    barStyle={"light-content"}
                />
                <HeaderBar
                    headerText={"Your Accounts"}
                />
                <View pointerEvents={"none"} style={{width: "100%", height: "60%"}}>
                    <Image
                        source={images.empty_accounts}
                        style={styles.illustrationStyle}
                    />
                </View>
                <View style={{marginTop: -40}}>
                    <Text style={styles.headerMediumTextStyle}>
                        You have not made any transactions yet...
                    </Text>
                    <Text style={styles.headerBoldTextStyle}>
                        THIS IS WHERE YOU'LL FIND YOUR SHOP ACCOUNTS
                    </Text>
                </View>
            </ImageBackground>
        )
    } else {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={COLORS.green}
                    barStyle={"light-content"}
                />
                <HeaderBar
                    headerText={"Your Accounts"}
                />
                <List.AccordionGroup>
                    <List.Accordion
                        title="Daily Accounts"
                        id="1"
                        titleStyle={styles.titleStyle}
                        style={styles.listButtonStyle}
                        right={({isExpanded}) => {
                            if (!isExpanded) {
                                return <Entypo name="chevron-thin-down" size={16} color={COLORS.darkGrey}/>
                            } else {
                                return <Entypo name="chevron-thin-up" size={16} color={COLORS.darkGrey}/>
                            }
                        }}
                    >
                        <FlatList
                            data={accounts}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => (
                                <>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("AccountDetailScreen", {
                                            id: item.id
                                        })}
                                    >
                                        <List.Item
                                            title={parseDate(item.date)}
                                            titleStyle={styles.listItemTextStyle}
                                            style={styles.listItemStyle}
                                        />
                                    </TouchableOpacity>
                                    <List.Item
                                        title={parseDate(item.date)}
                                        titleStyle={styles.listItemTextStyle}
                                        style={styles.listItemStyle}
                                    />
                                    <List.Item
                                        title={parseDate(item.date)}
                                        titleStyle={styles.listItemTextStyle}
                                        style={styles.listItemStyle}
                                    />
                                </>
                            )}
                        />

                    </List.Accordion>
                    <List.Accordion
                        title="Weekly Accounts"
                        id="2"
                        titleStyle={styles.titleStyle}
                        style={styles.listButtonStyle}
                        right={({isExpanded}) => {
                            if (!isExpanded) {
                                return <Entypo name="chevron-thin-down" size={16} color={COLORS.darkGrey}/>
                            } else {
                                return <Entypo name="chevron-thin-up" size={16} color={COLORS.darkGrey}/>
                            }
                        }}
                    />
                    <List.Accordion
                        title="Monthly Accounts"
                        id="3"
                        titleStyle={styles.titleStyle}
                        style={styles.listButtonStyle}
                        right={({isExpanded}) => {
                            if (!isExpanded) {
                                return <Entypo name="chevron-thin-down" size={16} color={COLORS.darkGrey}/>
                            } else {
                                return <Entypo name="chevron-thin-up" size={16} color={COLORS.darkGrey}/>
                            }
                        }}
                    />
                </List.AccordionGroup>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        backgroundColor: 'white',
    },
    illustrationStyle: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        marginTop: 20
    },
    headerMediumTextStyle: {
        fontFamily: "Roboto_400Regular",
        fontSize: 18,
        marginTop: 60,
        marginBottom: 10,
        textAlign: "center",
        color: COLORS.green,
    },
    headerBoldTextStyle: {
        fontFamily: "Roboto_700Bold",
        fontSize: 19,
        textAlign: "center",
        color: COLORS.green,
    },
    listButtonStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)'
    },
    titleStyle: {
        color: COLORS.darkGrey,
        fontSize: 17,
        fontFamily: 'Roboto_500Medium'
    },
    listItemStyle: {
        backgroundColor: COLORS.orange,
        width: "97%",
        alignSelf: 'center',
        marginVertical: 2,
        borderRadius: 5
    },
    listItemTextStyle: {
        fontFamily: "Roboto_500Medium",
        fontSize: 16,
        color: 'white'
    }
})

export default AccountsScreen;