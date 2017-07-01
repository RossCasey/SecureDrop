import { call } from 'redux-funk';
import { createDrop } from '../services/dropServices';
import {CREATE_CREDENTIALS_REQUEST, CREATE_CREDENTIALS_SUCCESS, CREATE_CREDENTIALS_FAILURE, CLEAR_CREDENTIALS} from '../actions/credentialActions';

const initialState = {
    list: []
};

const credentialsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CREDENTIALS_REQUEST:
            call(action, [createDrop, [action.payload.data]]);
            return state;
        case CREATE_CREDENTIALS_SUCCESS:
            const {link, password} = action.payload;
            return Object.assign({}, state, {
                list: state.list.concat({link: link, password: password}),
                error: undefined
            });
            return state;
        case CREATE_CREDENTIALS_FAILURE:
            const {error} = action.payload;
            return Object.assign({}, state, {
                error: error
            });
        case CLEAR_CREDENTIALS:
            return Object.assign({}, state, {
                list: [],
                error: undefined
            });
        default:
            return state;
    }
};

export default credentialsReducer;