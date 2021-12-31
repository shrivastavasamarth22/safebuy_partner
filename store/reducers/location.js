import {START_RECORDING, STOP_RECORDING, ADD_GEOPOINT, ADD_GEOPOINT_TO_POINTS} from "../actions/location";

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

        case START_RECORDING: {
            return {
                ...state,
                recording: true
            }
        }

        case STOP_RECORDING: {
            return {
                ...state,
                recording: false
            }
        }

        case ADD_GEOPOINT_TO_POINTS: {
            return {
                ...state,
                points: [...state.points, action.geopoint],
                currentLocation: action.geopoint
            }
        }

        default:
            return state;
    }
}