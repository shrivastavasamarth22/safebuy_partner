import {Helper} from '../../models'
import {ADD_HELPER, CHANGE_HELPER_PHONE, REMOVE_HELPER, CHANGE_HELPER_STATUS} from "../actions/helper";

const randomId = () => {
    return Math.random().toString(36).substr(2, 4).toUpperCase();
}

const initialState = {
    helpers: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_HELPER: {
            const helper = new Helper({
                id: randomId(),
                name: action.payload.name,
                phone: action.payload.phone,
                address1: action.payload.address1,
                address2: action.payload.address2,
                landmark: action.payload.landmark,
                city: "Bhopal",
                state: "Madhya Pradesh",
                pinCode: action.payload.pinCode,
                lat: 23.188,
                lng: 77.447,
                assignedOrders: [],
                controlStatus: false,
                salaryAmount: action.payload.salaryAmount,
                salaryStatus: false
            })

            return {
                ...state,
                helpers: state.helpers.concat(helper)
            }
        }

        case CHANGE_HELPER_PHONE: {
            const helpers = state.helpers;
            const helper = helpers.find(helper => helper.id === action.payload.id);
            const helperIndex = helpers.findIndex(helper => helper.id === action.payload.id);
            helper.lock();
            helpers[helperIndex] = helper.setPhone(action.payload.newPhone)

            return {
                ...state,
                helpers
            }
        }

        case REMOVE_HELPER: {
            const helpers = state.helpers;
            const newList = helpers.filter(helper => helper.id !== action.id)
            return {
                ...state,
                helpers: newList
            }
        }

        case CHANGE_HELPER_STATUS: {
            const helpers = state.helpers;
            const index = helpers.findIndex(helper => helper.id === action.id);
            const helper = helpers[index];
            const status = helper.controlStatus
            helper.controlStatus = !status;
            helpers[index] = helper;
            return {
                ...state,
                helpers
            }
        }



        default:
            return state;
    }


}