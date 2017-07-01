export const CREATE_CREDENTIALS_REQUEST = 'CREATE_CREDENTIALS_REQUEST';
export const CREATE_CREDENTIALS_SUCCESS = 'CREATE_CREDENTIALS_SUCCESS';
export const CREATE_CREDENTIALS_FAILURE = 'CREATE_CREDENTIALS_FAILURE';
export const CLEAR_CREDENTIALS = 'CLEAR_CREDENTIALS';


export const createCredentialsRequest = (data) => ({
    type: CREATE_CREDENTIALS_REQUEST,
    payload: {
        data: data
    }
});

export const createCredentialsSuccess = (link, password) => ({
    type: CREATE_CREDENTIALS_SUCCESS,
    payload: {
        link: link,
        password: password
    }
})

export const createCredentialsFailure = (error) => ({
    type: CREATE_CREDENTIALS_FAILURE,
    payload: {
        error: error
    }
});

export const clearCredentials = () => ({
    type: CLEAR_CREDENTIALS
});