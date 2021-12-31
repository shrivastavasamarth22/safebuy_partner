import {useState, useEffect} from "react";
import {
    Accuracy,
    requestPermissionsAsync,
    watchPositionAsync
} from "expo-location";

export default (shouldTrack, callback) => {
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        let subscriber;
        if (shouldTrack) {
            (async () => {
                let {status} = await requestPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 250,
                    distanceInterval: 5
                }, callback)
            })();
        } else {
            if (subscriber) {
                subscriber.remove();
            }
            subscriber = null;
        }

        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        };

    }, [shouldTrack, callback]);

    return [errorMsg]
}