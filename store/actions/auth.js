export const LOG_OUT = 'LOG_OUT';
export const LOG_IN = 'LOG_IN';


export const logOut = () => {
    return {
        type: LOG_OUT
    }
}

export const logIn = () => {
    return {
        type: LOG_IN
    }
}