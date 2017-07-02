import { call } from 'redux-funk';
import { checkBrowserSupported, redirectToSupportedBrowserPage } from '../services/dropServices';
import {
    BROWSER_SUPPORTED_FAILURE,
    BROWSER_SUPPORTED_SUCCESS,
    BROWSER_SUPPORTED_REQUEST
} from '../actions/browserActions';

const browserReducer = (state = {}, action) => {
   switch (action.type) {
       case BROWSER_SUPPORTED_REQUEST:
           call(action, [checkBrowserSupported, []]);
           return state;
       case BROWSER_SUPPORTED_SUCCESS:
           return state;
       case BROWSER_SUPPORTED_FAILURE:
            call(action, [redirectToSupportedBrowserPage, []]);
            return state;
       default:
           return state;
   }
};

export default browserReducer;