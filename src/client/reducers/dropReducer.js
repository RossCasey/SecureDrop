import { call } from 'redux-funk';
import { getDrop, decryptDrop } from '../services/dropServices';
import {
    GET_DROP_REQUEST,
    GET_DROP_SUCCESS,
    GET_DROP_FAILURE,

    DECRYPT_DROP_REQUEST,
    DECRYPT_DROP_SUCCESS,
    DECRYPT_DROP_FAILURE
} from '../actions/dropActions';
import {
    AWAITING_PASSWORD,
    DECRYPTED,
    PENDING
} from '../constants/dropStates';

const dropReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_DROP_REQUEST:
            const { id } = action.payload;
            call(action, [getDrop, [id]]);
            return Object.assign({}, state, {
                status: PENDING,
                error: undefined
            });
        case GET_DROP_SUCCESS:
            const { data } = action.payload;
            return Object.assign({}, state, {
                status: AWAITING_PASSWORD,
                cipherText: data
            });
        case GET_DROP_FAILURE:
            const {status, error} = action.payload;
            return Object.assign({}, state, {
                status: status,
                error: error
            });
        case DECRYPT_DROP_REQUEST:
            const {password, cipherText} = action.payload;
            call(action, [decryptDrop, [password, cipherText]]);
            return Object.assign({}, state, {
                status: AWAITING_PASSWORD,
                error: {}
            });
        case DECRYPT_DROP_SUCCESS:
            const {plainText} = action.payload;
            return Object.assign({}, state, {
                status: DECRYPTED,
                plainText: plainText
            });
        case DECRYPT_DROP_FAILURE: { //sigh, Javascript scoping...
            const {error} = action.payload;
            return Object.assign({}, state, {
                status: AWAITING_PASSWORD,
                error: error
            });
        }
        default:
            return state;
    }
};

export default dropReducer;