import { call } from 'redux-funk';
import { checkBrowserSupported, redirectToSupportedBrowserPage, getDrop } from '../services/dropServices';
import {
    BROWSER_SUPPORTED_FAILURE,
    BROWSER_SUPPORTED_SUCCESS,
    BROWSER_SUPPORTED_REQUEST
} from '../actions/browserActions';

const initialState = {
    supported: false
};

const browserReducer = (state = initialState, action) => {
   switch (action.type) {
       case BROWSER_SUPPORTED_REQUEST: {
           call(action, [checkBrowserSupported, []]);
           const {shouldGetDrop, dropId} = action.payload;
           return Object.assign({}, state, {
               shouldGetDrop: shouldGetDrop,
               dropId: dropId
           });
       }
       case BROWSER_SUPPORTED_SUCCESS:
           const {shouldGetDrop, dropId} = state;
           if(shouldGetDrop) {
               call(action, [getDrop, [dropId]]);
           }
           return Object.assign({}, state, {
               supported: true,
               shouldGetDrop: undefined,
               dropId: undefined
           });
       case BROWSER_SUPPORTED_FAILURE:
            call(action, [redirectToSupportedBrowserPage, []]);
            return state;
       default:
           return state;
   }
};

export default browserReducer;