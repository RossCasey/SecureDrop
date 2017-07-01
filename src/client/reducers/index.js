import { combineReducers } from 'redux';
import { coalesceFunks } from 'redux-funk';
import credentials from './credentialsReducer';
import drop from './dropReducer';

const rootReducer = coalesceFunks(combineReducers({
    credentials,
    drop,
    funks: () => []
}));

export default rootReducer;