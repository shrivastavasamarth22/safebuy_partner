import React from "react";
import { View, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { icons } from "../constants";
const { SCREEN_WIDTH } = Dimensions.get("window");

/**
 * @param {String} searchText The search input which comes to the text input field
 * @param {func} onChangeText The callback to call when text changes in the textfield
 * @param {func} onArrowPress The callback to call when we press the arrow
 * @param {string} placeholder The placeholder for the text input
 */

const SearchBar = ({ searchText, onChangeText, onArrowPress, placeholder }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.searchBox}>
                <Image
                    source={icons.search}
                    style={styles.searchIconStyle}
                    resizeMode="contain"
                />
                <TextInput
                    style={styles.searchTextStyle}
                    placeholder={placeholder}
                    value={searchText}
                    onChangeText={onChangeText}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: SCREEN_WIDTH,
        alignItems: "center",
        justifyContent: "center",
        height: 65,
        paddingHorizontal: 10,
    },
    searchBox: {
        flexDirection: "row",
        width: "100%",
        height: "75%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        elevation: 2,
        borderRadius: 2,
        paddingHorizontal: 5,
        paddingRight: 10
    },
    searchIconStyle: {
        height: 50,
        width: 50,
        tintColor: "#95989A",
        marginRight: 10,
    },
    searchTextStyle: {
        height: 50,
        flex: 1,
        fontFamily: "Roboto_400Regular",
        fontSize: 16,
    },
    arrowIconStyle: {
        height: 20,
        width: 20,
        tintColor: "#95989A",
        marginRight: 10,
        resizeMode: "contain",
    },
});

export default SearchBar;
