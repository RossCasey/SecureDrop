import {createCredentialsSuccess, createCredentialsFailure} from '../actions/credentialActions';
import {getDropSuccess, getDropFailure, decryptDropSuccess, decryptDropFailure} from '../actions/dropActions';
import {generateKey, encrypt, exportKey, importKey, decrypt} from './encryption';
import {DROP_DOES_NOT_EXIST, INVALID_PASSWORD, SERVER_ERROR} from '../constants/error';
import request from 'superagent';

export function createDrop(data) {
    let key, cipherText, exportedKey;
    return generateKey().then((_key) => {
        key = _key;
        return encrypt(key, data);
    }).then((_cipherText) => {
        cipherText = _cipherText;
        return exportKey(key);
    }).then((_exportedKey) => {
        exportedKey = _exportedKey;
        return request
            .post('/api/v1/drop')
            .send({cipherText});
    }).then((response) => {
        if(response.statusCode === 200) {
            return Promise.resolve(createCredentialsSuccess(response.body.id, exportedKey));
        }
        return Promise.resolve(createCredentialsFailure(SERVER_ERROR));
    }).catch(() => {
        return Promise.resolve(createCredentialsFailure(SERVER_ERROR));
    });
}

export function getDrop(id) {
    return request.get(`/api/v1/drop/${id}`).then((response) => {
        return Promise.resolve(getDropSuccess(response.body.cipherText));
    }).catch((err) => {
        const error = (err.message === 'Not Found') ? DROP_DOES_NOT_EXIST : SERVER_ERROR;
        return Promise.resolve(getDropFailure(error));
    });
}

export function decryptDrop(password, cipherText) {
    return importKey(password).then((key) => {
        return decrypt(key, cipherText);
    }).then((plainText) => {
        return Promise.resolve(decryptDropSuccess(plainText));
    }).catch((err) => {
        console.log(err);
        return Promise.resolve(decryptDropFailure(INVALID_PASSWORD));
    });
}