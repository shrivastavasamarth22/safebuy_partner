import {LOG_IN, LOG_OUT} from "../actions/auth";

const initialState = {
    isSignedIn: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {...state, isSignedIn: true}
        }

        case LOG_OUT: {
            return {...state, isSignedIn: false}
        }

        default:
            return state;
    }
}