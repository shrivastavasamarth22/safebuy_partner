import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from "react-native";

import {icons, COLORS} from "../constants";

/**
 * @param {String} headerText The text to display at the header of the Top Bar
 * @param {Function} onBackButtonPress The callback to call when we'll press the back button
 * @param {Function} onSearchButtonPress The callback to call when we'll press the search button
 * @param {Boolean} searchEnabled Whether we want to show the search button or not
 * @param {Boolean} lavenderEnabled The background color of the bar
 * @param {Boolean} mascotEnabled Whether we want to show the mascot or not

 */

const {SCREEN_WIDTH} = Dimensions.get("window").width;

const TopBar = ({
                    headerText,
                    onBackButtonPress,
                    searchEnabled,
                    lavenderEnabled,
                    mascotEnabled,
                    onSearchButtonPress
                }) => {
    return (
        <View style={[styles.mainContainer, {backgroundColor: lavenderEnabled ? "#8c24e3" : COLORS.primary}]}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onBackButtonPress}>
                    <Image
                        source={icons.back}
                        style={styles.backIconStyle}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Text style={styles.headerTextStyle}>{headerText}</Text>
                    {mascotEnabled ? (
                        <Image
                            source={icons.mascot}
                            style={styles.mascotIconStyle}
                            resizeMode="cover"
                        />
                    ) : null}
                </View>
            </View>
            <View style={styles.buttonContainer}>
                {searchEnabled ? (
                    <TouchableOpacity onPress={onSearchButtonPress}>
                        <Image
                            source={icons.search}
                            style={styles.searchIconStyle}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: SCREEN_WIDTH,
        height: "9%",
        flexDirection: "row",
        paddingHorizontal: 5,
        alignItems: "center",
        justifyContent: "space-between",
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    backIconStyle: {
        height: 50,
        width: 50,
    },
    headerTextStyle: {
        fontSize: 20,
        color: "white",
        fontFamily: "Roboto_500Medium",
        marginLeft: 10,
    },
    menuIconStyle: {
        height: 30,
        width: 30,
        marginRight: 5,
    },
    searchIconStyle: {
        height: 55,
        width: 55,
        marginRight: 5,
    },
    mascotIconStyle: {
        height: 40,
        width: 40,
        tintColor: COLORS.orange,
        marginLeft: 5,
    }
});

export default TopBar;
