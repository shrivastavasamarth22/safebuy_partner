export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export const signIn = () => {
    return {
        type: SIGN_IN,
        payload: true
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT,
        payload: false
    }
}