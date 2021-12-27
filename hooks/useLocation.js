import {useState, useEffect} from "react";
import {
    Accuracy,
    requestPermissionsAsync,
    watchPositionAsync
} from "expo-location";

export default (shouldTrack, callback) => {
    const [errorMsg, setErrorMsg] = useState(null);
    const [subscriber, setSubscriber] = useState(null);

    useEffect(() => {
        if (shouldTrack) {
            (async () => {
                let {status} = await requestPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
                const sub = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 250,
                    distanceInterval: 5
                }, callback)
                setSubscriber(sub)
            })();
        } else {
            subscriber.remove();
            setSubscriber(null);
        }

    }, [shouldTrack]);

    return [errorMsg]
}