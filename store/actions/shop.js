export const CHANGE_SHOP_NAME = "CHANGE_SHOP_NAME";
export const CHANGE_PHONE_NUMBER = "CHANGE_PHONE_NUMEBR";
export const CHANGE_SHOP_ADDRESS = "CHANGE_SHOP_ADDRESS";
export const CHANGE_HOLIDAYS = "CHANGE_HOLIDAYS";
export const CHANGE_OPEN_TIME = "CHANGE_OPEN_TIME";
export const CHANGE_CLOSE_TIME = "CHANGE_CLOSE_TIME";
export const CHANGE_ON_LEAVE_STATUS = "CHANGE_ON_LEAVE_STATUS";
export const CHANGE_SHOP_IMAGE = "CHANGE_SHOP_IMAGE";
export const CHANGE_OWNER_IMAGE = "CHANGE_OWNER_IMAGE";

export const changeShopName = (id, newName) => {
    return {
        type: CHANGE_SHOP_NAME,
        payload: {
            id,
            newName,
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
            newMinutes
        },
    };
};

export const changeCloseTime = (id, newHours, newMinutes) => {
    return {
        type: CHANGE_CLOSE_TIME,
        payload: {
            id,
            newHours,
            newMinutes
        },
    };
};

export const changeOnLeaveStatus = (id, fromDate, toDate) => {
    return {
        type: CHANGE_ON_LEAVE_STATUS,
        payload: {
            id,
            fromDate,
            toDate
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
