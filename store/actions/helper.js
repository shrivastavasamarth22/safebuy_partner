export const ADD_HELPER = 'ADD_HELPER';
export const CHANGE_HELPER_PHONE = 'CHANGE_HELPER_PHONE';
export const CHANGE_HELPER_ADDRESS = 'CHANGE_HELPER_ADDRESS';
export const CHANGE_HELPER_SALARY = 'CHANGE_HELPER_SAlARY';
export const CHANGE_HELPER_STATUS = 'CHANGE_HELPER_STATUS'
export const REMOVE_HELPER = 'REMOVE_HELPER';

export const addHelper = (name, phone, address1, address2, landmark, pinCode, salaryAmount) => {
    return {
        type: ADD_HELPER,
        payload: {
            name,
            phone,
            address1,
            address2,
            landmark,
            pinCode,
            salaryAmount,
        }
    }
}

export const changeHelperPhone = (id, newPhone) => {
    return {
        type: CHANGE_HELPER_PHONE,
        payload: {
            id,
            newPhone
        }
    }
}

export const changeHelperAddress = (
    id,
    newAddress1,
    newAddress2,
    newLandmark,
    newPinCode,
    newLat,
    newLng
) => {
    return {
        type: CHANGE_HELPER_ADDRESS,
        payload: {
            id,
            newAddress1,
            newAddress2,
            newLandmark,
            newPinCode,
            newLat,
            newLng
        }
    }
}

export const changeHelperSalary = (id, newSalaryAmount) => {
    return {
        type: CHANGE_HELPER_SALARY,
        payload: {
            id,
            newSalaryAmount
        }
    }
}

export const changeHelperStatus = (id) => {
    return {
        type: CHANGE_HELPER_STATUS,
        id
    }
}

export const removeHelper = (id) => {
    return {
        type: REMOVE_HELPER,
        id
    }
}