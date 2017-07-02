import { combineReducers } from 'redux';
import { coalesceFunks } from 'redux-funk';
import credentials from './credentialsReducer';
import drop from './dropReducer';
import browser from './browserReducer';

const rootReducer = coalesceFunks(combineReducers({
    credentials,
    drop,
    browser,
    funks: () => []
}));

export default rootReducer;