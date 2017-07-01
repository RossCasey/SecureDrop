export const CREATE_CREDENTIALS_REQUEST = 'CREATE_CREDENTIALS_REQUEST';
export const CREATE_CREDENTIALS_SUCCESS = 'CREATE_CREDENTIALS_SUCCESS';
export const CREATE_CREDENTIALS_FAILURE = 'CREATE_CREDENTIALS_SUCCESS';

export function createCredentialsRequest(data) {
    return {
        type: CREATE_CREDENTIALS_REQUEST,
        payload: {
            data: data
        }
    }
}

export function createCredentialsSuccess(link, password) {
    return {
        type: CREATE_CREDENTIALS_SUCCESS,
        payload: {
            link: link,
            password: password
        }
    }
}

export function createCredentialsFailure(errorMessage) {
    return {
        type: CREATE_CREDENTIALS_FAILURE,
        payload: {
            errorMessage: errorMessage
        }
    }
}