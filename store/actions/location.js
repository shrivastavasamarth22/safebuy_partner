export const START_RECORDING = 'START_RECORDING';
export const STOP_RECORDING = 'STOP_RECORDING';
export const ADD_GEOPOINT = 'ADD_GEOPOINT';


export const startRecording = () => {

}

export const stopRecording = () => {

}

export const addGeopoint = (geopoint) => {
    return {
        type: ADD_GEOPOINT,
        geopoint
    }
}