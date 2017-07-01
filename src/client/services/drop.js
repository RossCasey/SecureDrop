import {createCredentialsSuccess, createCredentialsFailure} from '../actions/credentialActions';
import {getDropSuccess, getDropFailure, decryptDropSuccess, decryptDropFailure} from '../actions/dropActions';
import {generateKey, encrypt, exportKey, importKey, decrypt} from './encryption';
import {DROP_DOES_NOT_EXIST, INVALID_PASSWORD, SERVER_ERROR} from '../constants/error';
import {postDrop, getDropById} from './api';

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
        return postDrop(cipherText);
    }).then((dropId) => {
        return Promise.resolve(createCredentialsSuccess(dropId, exportedKey));
    }).catch(() => {
        return Promise.resolve(createCredentialsFailure(SERVER_ERROR));
    });
}

export function getDrop(id) {
    return getDropById(id).then((cipherText) => {
        return Promise.resolve(getDropSuccess(cipherText));
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
        return Promise.resolve(decryptDropFailure(INVALID_PASSWORD));
    });
}