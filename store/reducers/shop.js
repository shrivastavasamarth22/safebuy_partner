import {
    CHANGE_SHOP_NAME,
    CHANGE_OWNER_NAME,
    CHANGE_PHONE_NUMBER,
    CHANGE_SHOP_ADDRESS,
    CHANGE_HOLIDAYS,
    CHANGE_OPEN_TIME,
    CHANGE_CLOSE_TIME,
    CHANGE_SHOP_IMAGE,
    CHANGE_OWNER_IMAGE,
    CHANGE_QR_IMAGE,
    CHANGE_ON_LEAVE_STATUS_TO_TRUE,
    CHANGE_ON_LEAVE_STATUS_TO_FALSE,
    CHANGE_HOME_DELIVERY_AMOUNT,
    CHANGE_HOME_DELIVERY_CAPABLE
} from "../actions/shop";
import { Shop } from "../../models";

const initialState = {
    shop: new Shop({
        id: 1,
        name: "Gupta Vegetable Shop",
        ownerName: "Prakash Gupta",
        phone: "9893614220",
        address1: "A-3/603 Vishnu Hitech City",
        address2: "Near Dana Pani Restaurant, Bawadiya Kalan",
        landmark: "Bawadiya Railway Crossing",
        city: "Bhopal",
        state: "Madhya Pradesh",
        pinCode: "462026",
        lat: 23.188,
        lng: 77.447,
        category: "vegetable",
        weeklyHolidays: [2, 4],
        openTime: {
            hours: "09",
            minutes: "00",
        },
        closeTime: {
            hours: "20",
            minutes: "00",
        },
        homeDeliveryCapable: false,
        homeDeliveryMinOrderAmount: null,
        onLeaveStatus: false,
        fromLeaveDate: null,
        toLeaveDate: null,
        imageUri: "",
        ownerImageUri: "",
        qrImageUri: ""
    }).lock(),
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_SHOP_NAME: {
            const shop = state.shop.setName(action.payload.newName);
            return { ...state, shop };
        }

        case CHANGE_OWNER_NAME: {
            const shop = state.shop.setOwnerName(action.payload.newOwnerName);
            return { ...state, shop };
        }

        case CHANGE_PHONE_NUMBER: {
            const shop = state.shop.setPhone(action.payload.newNumber);
            return { ...state, shop };
        }

        case CHANGE_SHOP_ADDRESS: {
            const {
                newAddress1,
                newAddress2,
                newLandmark,
                newPinCode,
                newLat,
                newLng,
            } = action.payload;
            const shop = state.shop.setAddress(
                newAddress1,
                newAddress2,
                newLandmark,
                newPinCode,
                newLat,
                newLng
            );
            return { ...state, shop };
        }

        case CHANGE_HOLIDAYS: {
            const shop = state.shop.setWeeklyHolidays(
                action.payload.newHolidays
            );
            return { ...state, shop };
        }

        case CHANGE_OPEN_TIME: {
            const shop = state.shop.setOpenTime({
                hours: action.payload.newHours,
                minutes: action.payload.newMinutes,
            });
            return { ...state, shop };
        }

        case CHANGE_CLOSE_TIME: {
            const shop = state.shop.setCloseTime({
                hours: action.payload.newHours,
                minutes: action.payload.newMinutes,
            });
            return { ...state, shop };
        }

        case CHANGE_ON_LEAVE_STATUS_TO_TRUE: {
            const shop = state.shop.setOnLeaveStatusToTrue(
                action.payload.fromDate,
                action.payload.toDate
            );
            return { ...state, shop };
        }

        case CHANGE_ON_LEAVE_STATUS_TO_FALSE: {
            const shop = state.shop.setOnLeaveStatusToFalse(action.payload.id);
            return { ...state, shop };
        }

        case CHANGE_SHOP_IMAGE: {
            const shop = state.shop.setShopImage(action.payload.newImageUri);
            return { ...state, shop };
        }

        case CHANGE_OWNER_IMAGE: {
            const shop = state.shop.setOwnerImage(action.payload.newOwnerImageUri);
            return { ...state, shop };
        }

        case CHANGE_QR_IMAGE: {
            const shop = state.shop.setQrImage(action.payload.newQrImageUri);
            return { ...state, shop }
        }

        case CHANGE_HOME_DELIVERY_CAPABLE: {
            const shop = state.shop.setHomeDeliveryCapable(action.payload.newStatus)
            return { ...state, shop }
        }

        case CHANGE_HOME_DELIVERY_AMOUNT: {
            const shop = state.shop.setHomeDeliveryMinOrderAmount(action.payload.newAmount)
            return { ...state, shop }
        }

        default:
            return state;
    }
};
