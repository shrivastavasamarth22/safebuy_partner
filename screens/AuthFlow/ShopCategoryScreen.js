import React, { useEffect }  from 'react';
import {View, Text, StyleSheet, BackHandler, StatusBar} from 'react-native';
import {HeaderBar} from "../../components";

const ShopCategoryScreen = () => {
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
        return () =>
            BackHandler.removeEventListener('hardwareBackPress', () => false)
    }, [])


    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={'#6d0fbc'}
                barStyle={'light-content'}
            />
            <HeaderBar
                headerText={"Shop Category"}
                isLavender={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default ShopCategoryScreen;