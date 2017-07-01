const Base64Array = require('base64-arraybuffer');
const Base64 = require('base-64');

export function isCryptoSupported() {
    return window.crypto !== undefined;
}

export function generateKey() {
    return window.crypto.subtle.generateKey(
        {
            name: 'AES-GCM',
            length: 128
        },
        true,
        ["encrypt"]
    );
}

export function exportKey(key) {
    return window.crypto.subtle.exportKey(
        'raw',
        key
    ).then((keyBuffer) => {
        const base64 = Base64Array.encode(keyBuffer);
        return base64.substring(0, base64.length - 2); //remove ==
    });
}

export function importKey(string) {
    const buffer = Base64Array.decode(string + '==');
    return window.crypto.subtle.importKey(
        'raw',
        buffer,
        {
            name: 'AES-GCM'
        },
        false,
        ["decrypt"]
    );
}

function getIv() {
    return window.crypto.getRandomValues(new Uint8Array(12));
}

export function encrypt(key, plainText) {
    const iv = getIv();
    return window.crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        key,
        Base64Array.decode(Base64.encode(plainText))
    ).then((cipherTextBuffer) => {
        const cipherText = Base64Array.encode(cipherTextBuffer);
        const ivString = Base64Array.encode(iv);
        return `${ivString}.${cipherText}`;
    });
}

export function decrypt(key, payload) {
    const ivBase64 = payload.substring(0, payload.indexOf('.'));
    const cipherText = payload.substring(payload.indexOf('.') + 1, payload.length);
    const iv = Base64Array.decode(ivBase64);
    const cipherTextBuffer = Base64Array.decode(cipherText);

    return window.crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        key,
        cipherTextBuffer
    ).then((plainTextBuffer) => {
        return Base64.decode(Base64Array.encode(plainTextBuffer))
    }).catch(() => {
        return Promise.reject(new Error('decryption failed'));
    });
}