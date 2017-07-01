export const GET_DROP_REQUEST = 'GET_DROP_REQUEST';
export const GET_DROP_SUCCESS = 'GET_DROP_SUCCESS';
export const GET_DROP_FAILURE = 'GET_DROP_FAILURE';
export const DECRYPT_DROP_REQUEST = 'DECRYPT_DROP_REQUEST';
export const DECRYPT_DROP_SUCCESS = 'DECRYPT_DROP_SUCCESS';
export const DECRYPT_DROP_FAILURE = 'DECRYPT_DROP_FAILURE';

export function getDropRequest(id) {
    return {
        type: GET_DROP_REQUEST,
        payload: {
            id: id
        }
    }
}

export function getDropSuccess(data) {
    return {
        type: GET_DROP_SUCCESS,
        payload: {
            data: data
        }
    }
}

export function getDropFailure(error) {
    return {
        type: GET_DROP_FAILURE,
        payload: {
            error: error
        }
    }
}

export function decryptDropRequest(password, cipherText) {
    return {
        type: DECRYPT_DROP_REQUEST,
        payload: {
            password: password,
            cipherText: cipherText
        }
    }
}

export function decryptDropSuccess(plainText) {
    return {
        type: DECRYPT_DROP_SUCCESS,
        payload: {
            plainText: plainText
        }
    }
}

export function decryptDropFailure(error) {
    return {
        type: DECRYPT_DROP_FAILURE,
        payload: {
            error: error
        }
    }
}