import React, { Component } from 'react';
import {SERVER_ERROR, INVALID_DATA, INVALID_PASSWORD, DROP_DOES_NOT_EXIST} from '../constants/errors';

class Error extends Component {
    constructor(props) {
        super(props);
    }

    static getErrorMessage(error) {
        switch(error) {
            case SERVER_ERROR:
                return {type: 'Server Error', message: 'An error occurred while communicating with the server.'};
            case INVALID_DATA:
                return {type: 'Input Error', message: 'Input must not be empty.'};
            case INVALID_PASSWORD:
                return {type: 'Input Error', message: 'Incorrect password.'};
            case DROP_DOES_NOT_EXIST:
                return {type: 'Link Error', message: 'This drop does not exist. It has either been claimed, expired, or never existed.'};
            default:
                return {type: 'Unknown Error', message: 'An unknown error occurred.'};
        }
    }

    render() {
        const error = Error.getErrorMessage(this.props.error);
        return (
            <div className="alert alert-danger">
                <strong>{error.type}:</strong>{` ${error.message}`}
            </div>
        );
    }
}

export default Error;