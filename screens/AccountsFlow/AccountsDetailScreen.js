import React, {useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import {useSelector} from "react-redux";
import BottomSheet from "reanimated-bottom-sheet";
import {Entypo} from '@expo/vector-icons';
import {TopBar, TableComponent2, SummaryCard2, GradientButton} from '../../components'
import {COLORS} from "../../constants";
import {parseDate} from "../../Functions";

const AccountsDetailScreen = ({navigation, route}) => {
    const {id} = route.params;

    const accounts = useSelector(state => state.accounts.accounts)
    const account = accounts.find(acc => acc.id === id);

    const [visible, setVisible] = useState(false);

    const expenseSheetRef = useRef(null);
    const revenueSheetRef = useRef(null);

    const addAmount = (arr) => {
        let totalAmount = 0;
        if (arr.length === 0) {
            return totalAmount
        } else {
            arr.forEach(obj => {
                totalAmount += obj.totalAmount
            })
            return totalAmount
        }
    }

    const onOpenSheet = (ref) => {
        if (ref.current) {
            ref.current.snapTo(1)
            setVisible(true)
        }
    }

    const onCloseSheet = (ref) => {
        if (ref.current) {
            ref.current.snapTo(0);
            setVisible(false)
        }
    }

    const sales = addAmount(account.sales)
    const expense = account.purchase.totalAmount + addAmount(account.miscExpenses)

    const result = sales - expense

    const expenseSheetContent = () => {
        return (
            <View style={styles.sheetContainer}>
                <Text style={styles.expenseTextStyle}>
                    Total Expenses : ₹ {expense}
                </Text>
                <TableComponent2
                    data={account.purchase.inventoryItems}
                />
                <SummaryCard2
                    totalItems={account.purchase.inventoryItems.length}
                    totalAmount={account.purchase.totalAmount}
                    transportationCost={account.purchase.transportCost}
                />
                <View style={styles.buttonContainer}>
                    <GradientButton
                        text={"Okay"}
                        onPress={() => onCloseSheet(expenseSheetRef)}
                    />
                </View>
            </View>
        )
    }

    const revenueSheetContent = () => {
        return (
            <View style={styles.sheetContainer}>

            </View>
        )
    }

    return (
        <>
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={COLORS.green}
                    barStyle={"light-content"}
                />
                <TopBar
                    headerText={"Details"}
                    onBackButtonPress={navigation.goBack}
                />
                <View style={styles.contentContainer}>
                    <Text style={styles.headingText}>
                        {parseDate(account.date)}
                    </Text>
                    <TouchableNativeFeedback
                        onPress={() => onOpenSheet(expenseSheetRef)}
                    >
                        <View style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                Total Expenses:
                            </Text>
                            <View style={styles.amountContainer}>
                                <Text style={styles.amountTextStyle}>
                                    ₹ {expense}
                                </Text>
                                <Entypo name="chevron-small-right" size={24} color="#555"/>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() => onOpenSheet(revenueSheetRef)}
                    >
                        <View style={styles.buttonStyle}>
                            <Text style={styles.buttonTextStyle}>
                                Total Revenue:
                            </Text>
                            <View style={styles.amountContainer}>
                                <Text style={styles.amountTextStyle}>
                                    ₹ {sales}
                                </Text>
                                <Entypo name="chevron-small-right" size={24} color="#555"/>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.statementContainer}>
                    {
                        result > 0
                            ? (
                                <View style={styles.statementProfitTextContainer}>
                                    <Text style={styles.statementProfitTextStyle}>
                                        Net Profit = ₹ {result}
                                    </Text>
                                </View>
                            )

                            : (
                                <View style={styles.statementLossTextContainer}>
                                    <Text style={styles.statementLossTextStyle}>
                                        Net Loss = ₹ {Math.abs(result)}
                                    </Text>
                                </View>
                            )
                    }
                </View>
            </View>
            {visible ? (
                <TouchableWithoutFeedback
                    onPress={() => {
                        onCloseSheet(expenseSheetRef)
                        onCloseSheet(revenueSheetRef)
                        Keyboard.dismiss();
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            backgroundColor: "black",
                            opacity: 0.6,
                        }}
                    />
                </TouchableWithoutFeedback>
            ) : null}
            <BottomSheet
                ref={expenseSheetRef}
                snapPoints={[0, 600]}
                initialSnap={0}
                enabledContentGestureInteraction={false}
                enabledContentTapInteraction={false}
                renderContent={expenseSheetContent}
            />
            <BottomSheet
                ref={revenueSheetRef}
                snapPoints={[0, 600]}
                initialSnap={0}
                enabledContentGestureInteraction={false}
                enabledContentTapInteraction={false}
                renderContent={revenueSheetContent}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        paddingTop: 20
    },
    headingText: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 18,
        color: '#555',
        marginBottom: 20,
        marginLeft: 12,
    },
    buttonStyle: {
        width: "100%",
        height: 50,
        marginBottom: 10,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.lightGrey
    },
    buttonTextStyle: {
        fontFamily: 'Roboto_500Medium',
        color: COLORS.darkGrey,
        fontSize: 16
    },
    amountContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        height: "100%",
    },
    amountTextStyle: {
        fontFamily: 'Roboto_500Medium',
        color: '#555',
        fontSize: 18,
        marginRight: 10
    },
    statementContainer: {
        flex: 1,
        paddingBottom: 50,
        paddingHorizontal: 24,
        justifyContent: 'flex-end'
    },
    statementProfitTextContainer: {
        paddingVertical: 10,
        width: "100%",
        borderWidth: 2,
        borderRadius: 10,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.primary
    },
    statementProfitTextStyle: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 24,
        color: COLORS.primary
    },
    statementLossTextContainer: {
        paddingVertical: 10,
        width: "100%",
        borderWidth: 2,
        borderRadius: 10,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.red
    },
    statementLossTextStyle: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 24,
        color: COLORS.red
    },
    sheetContainer: {
        height: 600,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
        paddingTop: 25
    },
    expenseTextStyle: {
        fontFamily: 'Roboto_700Bold',
        color: COLORS.primary,
        fontSize: 21,
        alignSelf: 'center',
        marginBottom: 25
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 12
    }
})

export default AccountsDetailScreen;