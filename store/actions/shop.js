export const CHANGE_SHOP_NAME = "CHANGE_SHOP_NAME";
export const CHANGE_OWNER_NAME = "CHANGE_OWNER_NAME";
export const CHANGE_PHONE_NUMBER = "CHANGE_PHONE_NUMEBR";
export const CHANGE_SHOP_ADDRESS = "CHANGE_SHOP_ADDRESS";
export const CHANGE_HOLIDAYS = "CHANGE_HOLIDAYS";
export const CHANGE_OPEN_TIME = "CHANGE_OPEN_TIME";
export const CHANGE_CLOSE_TIME = "CHANGE_CLOSE_TIME";
export const CHANGE_ON_LEAVE_STATUS_TO_TRUE = "CHANGE_ON_LEAVE_STATUS_TO_TRUE";
export const CHANGE_ON_LEAVE_STATUS_TO_FALSE =
    "CHANGE_ON_LEAVE_STATUS_TO_FALSE";
export const CHANGE_SHOP_IMAGE = "CHANGE_SHOP_IMAGE";
export const CHANGE_OWNER_IMAGE = "CHANGE_OWNER_IMAGE";
export const CHANGE_HOME_DELIVERY_CAPABLE = 'CHANGE_HOME_DELIVERY_CAPABLE';
export const CHANGE_HOME_DELIVERY_AMOUNT = 'CHANGE_HOME_DELIVERY_AMOUNT'

export const changeShopName = (id, newName) => {
    return {
        type: CHANGE_SHOP_NAME,
        payload: {
            id,
            newName,
        },
    };
};

export const changeOwnerName = (id, newOwnerName) => {
    return {
        type: CHANGE_OWNER_NAME,
        payload: {
            id,
            newOwnerName,
        },
    };
};

export const changePhoneNumber = (id, newNumber) => {
    return {
        type: CHANGE_PHONE_NUMBER,
        payload: {
            id,
            newNumber,
        },
    };
};

export const changeShopAddress = (
    id,
    newAddress1,
    newAddress2,
    newLandmark,
    newPinCode,
    newLat,
    newLng
) => {
    return {
        type: CHANGE_SHOP_ADDRESS,
        payload: {
            id,
            newAddress1,
            newAddress2,
            newLandmark,
            newPinCode,
            newLat,
            newLng,
        },
    };
};

export const changeHolidays = (id, newHolidays) => {
    return {
        type: CHANGE_HOLIDAYS,
        payload: {
            id,
            newHolidays,
        },
    };
};

export const changeOpenTime = (id, newHours, newMinutes) => {
    return {
        type: CHANGE_OPEN_TIME,
        payload: {
            id,
            newHours,
            newMinutes,
        },
    };
};

export const changeCloseTime = (id, newHours, newMinutes) => {
    return {
        type: CHANGE_CLOSE_TIME,
        payload: {
            id,
            newHours,
            newMinutes,
        },
    };
};

export const changeOnLeaveStatusToTrue = (id, fromDate, toDate) => {
    return {
        type: CHANGE_ON_LEAVE_STATUS_TO_TRUE,
        payload: {
            id,
            fromDate,
            toDate,
        },
    };
};

export const changeOnLeaveStatusToFalse = (id) => {
    return {
        type: CHANGE_ON_LEAVE_STATUS_TO_FALSE,
        payload: {
            id,
        },
    };
};

export const changeShopImage = (id, newImageUri) => {
    return {
        type: CHANGE_SHOP_IMAGE,
        payload: {
            id,
            newImageUri,
        },
    };
};

export const changeOwnerImage = (id, newOwnerImageUri) => {
    return {
        type: CHANGE_OWNER_IMAGE,
        payload: {
            id,
            newOwnerImageUri,
        },
    };
};

export const changeHomeDeliveryCapable = (id, newStatus) => {
    return {
        type: CHANGE_HOME_DELIVERY_CAPABLE,
        payload: {
            id,
            newStatus
        }
    }
}

export const changeHomeDeliveryMinOrderAmount = (id, newAmount) => {
    return {
        type: CHANGE_HOME_DELIVERY_AMOUNT,
        payload: {
            id,
            newAmount
        }
    }
}