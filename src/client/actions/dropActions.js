export const GET_DROP_REQUEST = 'GET_DROP_REQUEST';
export const GET_DROP_SUCCESS = 'GET_DROP_SUCCESS';
export const GET_DROP_FAILURE = 'GET_DROP_FAILURE';
export const DECRYPT_DROP_REQUEST = 'DECRYPT_DROP_REQUEST';
export const DECRYPT_DROP_SUCCESS = 'DECRYPT_DROP_SUCCESS';
export const DECRYPT_DROP_FAILURE = 'DECRYPT_DROP_FAILURE';

export const getDropRequest = (id) => ({
    type: GET_DROP_REQUEST,
    payload: {
        id: id
    }
});

export const getDropSuccess = (data) => ({
    type: GET_DROP_SUCCESS,
    payload: {
        data: data
    }
});

export const getDropFailure = (status, error) => ({
    type: GET_DROP_FAILURE,
    payload: {
        status: status,
        error: error
    }
});

export const decryptDropRequest = (password, cipherText) => ({
    type: DECRYPT_DROP_REQUEST,
    payload: {
        password: password,
        cipherText: cipherText
    }
});

export const decryptDropSuccess = (plainText) => ({
    type: DECRYPT_DROP_SUCCESS,
    payload: {
        plainText: plainText
    }
});

export const decryptDropFailure = (error) => ({
    type: DECRYPT_DROP_FAILURE,
    payload: {
        error: error
    }
});