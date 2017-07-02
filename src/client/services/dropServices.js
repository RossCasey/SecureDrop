import {createCredentialsSuccess, createCredentialsFailure} from '../actions/credentialActions';
import {getDropSuccess, getDropFailure, decryptDropSuccess, decryptDropFailure, getDropRequest} from '../actions/dropActions';
import {browserSupportedSuccess, browserSupportedFailure} from '../actions/browserActions';
import {generateKey, encrypt, exportKey, importKey, decrypt, isCryptoSupported} from './encryptionServices';
import {DROP_DOES_NOT_EXIST, INVALID_PASSWORD, SERVER_ERROR, INVALID_DATA, BROWSER_NOT_SUPPORTED} from '../constants/errors';
import {UNRECOVERABLE, AWAITING_PASSWORD} from '../constants/dropStates';
import {postDrop, getDropById} from './apiServices';

export function createDrop(data) {
    if(data.length === 0) {
        return Promise.resolve(createCredentialsFailure(INVALID_DATA));
    }
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
        return Promise.resolve(createCredentialsSuccess(createDropLink(dropId), exportedKey));
    }).catch(() => {
        return Promise.resolve(createCredentialsFailure(SERVER_ERROR));
    });
}

function createDropLink(dropId) {
    const protocol = window.location.protocol;
    const host = window.location.host;
    return `${protocol}//${host}/drop/${dropId}`;
}

export function getDrop(id) {
    return getDropById(id).then((cipherText) => {
        return Promise.resolve(getDropSuccess(cipherText));
    }).catch((err) => {
        const notFound = (err.message === 'Not Found');
        if(notFound) {
            return Promise.resolve(getDropFailure(UNRECOVERABLE, DROP_DOES_NOT_EXIST));
        }
        return Promise.resolve(getDropFailure(AWAITING_PASSWORD, SERVER_ERROR));
    });
}

export function decryptDrop(password, cipherText) {
    return importKey(password).then((key) => {
        return decrypt(key, cipherText);
    }).then((plainText) => {
        return Promise.resolve(decryptDropSuccess(plainText));
    }).catch(() => {
        return Promise.resolve(decryptDropFailure(INVALID_PASSWORD));
    });
}

export function checkBrowserSupported() {
    if(isCryptoSupported()) {
        return Promise.resolve(browserSupportedSuccess());
    }
    return Promise.resolve(browserSupportedFailure());
}

export function redirectToSupportedBrowserPage() {
    window.location = '/supportedBrowsers';
}