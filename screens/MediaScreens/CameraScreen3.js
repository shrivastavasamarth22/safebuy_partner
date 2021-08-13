import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, BackHandler} from "react-native";
import {Camera} from "expo-camera";
import {MaterialIcons, Ionicons, AntDesign} from '@expo/vector-icons'
import {useDispatch} from "react-redux";
import {COLORS} from "../../constants";
import * as shopActions from '../../store/actions/shop'


const CameraScreen3 = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

    const dispatch = useDispatch();

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => navigation.goBack());

        (async () => {
            let {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted')
        })()

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", () => false);
    }, [])

    if (hasPermission === null) {
        return <View style={{
            flex: 1,
            backgroundColor: "black"
        }}/>
    }

    if (hasPermission === false) {
        return <Text>No Access to camera</Text>
    }

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync({
                quality: 1
            })
            setImage(data.uri);
        }
    }

    const saveImage = async () => {
        dispatch(shopActions.changeQrImage(1, image))
        navigation.reset({
            index: 0,
            routes: [{name: "ShopDetailFormScreen"}]
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.green}/>
            <View style={styles.cameraContainer}>
                <Camera
                    ref={ref => setCamera(ref)}
                    style={styles.camera}
                    type={type}
                    autoFocus={Camera.Constants.AutoFocus.on}
                    flashMode={flash}
                    ratio={"1:1"}
                />
            </View>

            <View style={styles.controlContainer}>
                <View style={styles.cameraControls}>
                    <TouchableOpacity
                        onPress={() => {
                            setFlash(
                                flash === Camera.Constants.FlashMode.on
                                    ? Camera.Constants.FlashMode.off
                                    : Camera.Constants.FlashMode.on
                            );
                        }}
                        style={{
                            padding: 10,
                        }}
                    >
                        {
                            flash === Camera.Constants.FlashMode.on
                                ? <Ionicons name="flash" size={30} color="#BBB"/>
                                : <Ionicons name="flash-off" size={30} color="#BBB"/>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cameraButton}
                        onPress={takePicture}
                    >
                        <AntDesign name="camera" size={38} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}
                        style={{
                            padding: 10
                        }}
                    >
                        <MaterialIcons name="flip-camera-android" size={30} color="#BBB"/>
                    </TouchableOpacity>
                </View>
            </View>
            {
                image &&
                <View style={styles.imagePreviewContainer}>
                    <View style={styles.previewImageBorderSquared}>
                        <Image
                            source={{uri: image}}
                            style={styles.previewImageSquared}
                        />
                    </View>
                    <View style={styles.previewButtonContainer}>
                        <TouchableOpacity
                            style={styles.previewButton}
                            onPress={() => setImage(null)}
                        >
                            <Text style={styles.previewButtonText}>
                                Retry
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.previewButton}
                            onPress={saveImage}
                        >
                            <Text style={styles.previewButtonText}>
                                Ok
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    cameraContainer: {
        height: "70%",
        alignItems: 'center',
        backgroundColor: '#222'
    },
    camera: {
        aspectRatio: 1,
        width: "50%",
        height: "50%",
        marginTop: "20%"
    },
    controlContainer: {
        width: "100%",
        height: "70%",
        top: "65%",
        backgroundColor: 'white',
        position: 'absolute',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderColor: "#EEE",
        borderWidth: 2,
        alignSelf: 'center',
        paddingHorizontal: 24,
        paddingTop: 10
    },
    cameraControls: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30
    },
    cameraButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primary,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagePreviewContainer: {
        position: "absolute",
        bottom: "40%",
        right: 20,
        justifyContent: 'center',
        flex: 1
    },
    previewButtonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    previewButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        width: 70,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 5
    },
    previewButtonText: {
        fontFamily: 'Roboto_500Medium',
        color: "white",
        fontSize: 14
    },
    previewImageBorderSquared: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    previewImageSquared: {
        width: 130,
        height: 130,
        resizeMode: 'cover',
    },
})

export default CameraScreen3;