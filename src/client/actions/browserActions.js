export const BROWSER_SUPPORTED_REQUEST = 'BROWSER_SUPPORTED_REQUEST';
export const BROWSER_SUPPORTED_SUCCESS = 'BROWSER_SUPPORTED_SUCCESS';
export const BROWSER_SUPPORTED_FAILURE = 'BROWSER_SUPPORTED_FAILURE';

export const browserSupportedRequest = (shouldGetDrop, dropId) => ({
    type: BROWSER_SUPPORTED_REQUEST,
    payload: {
        shouldGetDrop: shouldGetDrop,
        dropId: dropId
    }
});

export const browserSupportedSuccess = () => ({
    type: BROWSER_SUPPORTED_SUCCESS,
});

export const browserSupportedFailure = () => ({
    type: BROWSER_SUPPORTED_FAILURE
});