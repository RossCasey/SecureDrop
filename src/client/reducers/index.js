import { combineReducers } from 'redux';
import { coalesceFunks } from 'redux-funk';
import credentials from './credentials';
import drop from './drop';

const rootReducer = coalesceFunks(combineReducers({
    credentials,
    drop,
    funks: () => []
}));

export default rootReducer;