import React from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import {COLORS} from "../constants";

/**
 * @param {array} data The data array for the order items
 * */

const TableComponent2 = ({ data }) => {
    return(
        <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
                <View
                    style={[
                        styles.tableColumn,
                        {flex: 1, alignItems: "center"},
                    ]}
                >
                    <Text style={styles.tableHeaderText}>S.No</Text>
                </View>
                <View
                    style={[
                        styles.tableColumn,
                        {flex: 3, alignItems: "center"},
                    ]}
                >
                    <Text style={styles.tableHeaderText}>Name</Text>
                </View>
                <View
                    style={[
                        styles.tableColumn,
                        {flex: 2, alignItems: "center"},
                    ]}
                >
                    <Text style={styles.tableHeaderText}>Qty</Text>
                </View>
                <View
                    style={[
                        styles.tableColumn,
                        {flex: 2, alignItems: "center"},
                    ]}
                >
                    <Text style={styles.tableHeaderText}>Cost</Text>
                </View>
            </View>

            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.itemId.toString()}
                renderItem={({item, index}) => {
                    return (
                        <View style={styles.tableList}>
                            <View style={styles.tableListItemRow}>
                                <View
                                    style={[
                                        styles.tableColumn,
                                        {flex: 1, alignItems: "center"},
                                    ]}
                                >
                                    <Text style={styles.tableColumnText}>{index + 1}</Text>
                                </View>
                                <View
                                    style={[
                                        styles.tableColumn,
                                        {flex: 3, alignItems: "center"},
                                    ]}
                                >
                                    <Text style={styles.tableColumnText}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.tableColumnText}>
                                        {`(${item.hindiName})`}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.tableColumn,
                                        {flex: 2, alignItems: "center"},
                                    ]}
                                >
                                    <Text style={styles.tableColumnText}>
                                        {item.purchaseQty + " " + item.unit}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        styles.tableColumn,
                                        {flex: 2, alignItems: "center"},
                                    ]}
                                >
                                    <Text style={styles.tableColumnText}>{"₹ " + item.purchasePrice}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    tableContainer: {
        width: "100%",
        flex: 1,
        marginBottom: 10,
    },
    tableHeader: {
        flexDirection: "row",
        paddingHorizontal: 5,
        marginBottom: 5,
    },
    tableHeaderText: {
        fontSize: 16,
        color: COLORS.primary,
        fontFamily: "Roboto_500Medium",
        textAlign: 'center'
    },
    tableList: {
        marginBottom: 5,
        paddingVertical: 2,
        backgroundColor: "white",
        borderTopColor: "#eee",
        borderBottomColor: "#eee",
        borderWidth: 0.5
    },
    tableListItemRow: {
        flexDirection: "row",
        paddingHorizontal: 5,
    },
    tableColumnText: {
        fontSize: 14,
        fontFamily: "yantramanav_regular",
        textAlign: "center",
        color: "#262626",
    },
    tableColumn: {
        width: "100%",
        justifyContent: "center",
    },
})

export default TableComponent2