import {START_RECORDING, STOP_RECORDING, ADD_GEOPOINT} from "../actions/location";

const initialState = {
    points: [],
    recording: false,
    currentLocation: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_GEOPOINT: {
            return {
                ...state,
                currentLocation: action.geopoint
            }
        }

        default:
            return state;
    }
}