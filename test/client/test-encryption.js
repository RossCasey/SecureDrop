const encryption = require('../../src/client/services/encryptionServices');

describe('Encryption', () => {
    describe('#isCryptoSupported()', () => {
        it('should return true if webcryptography is supported', () => {
            expect(encryption.isCryptoSupported()).to.be.ok();
        });
    });

    describe('#generateKey()', () => {
        it('should return a generate AES key', () => {
            return encryption.generateKey().then((key) => {
                expect(key.type).to.equal('secret');
            })
        });
    });

    describe('#encrypt()', () => {
        it('should return base64 encoded data', () => {
            const data = 'abc';
            return encryption.generateKey().then((key) => {
                return encryption.encrypt(key, data).then((cipherText) => {
                    expect(cipherText).to.be.a('string');
                    expect(cipherText).to.not.equal(data);
                });
            });
        });
    });

    describe('#exportKey()', () => {
        it('should return base64 encoded key', () => {
            return encryption.generateKey().then((key) => {
                return encryption.exportKey(key).then((keyString) => {
                    expect(keyString).to.be.a('string');
                });
            });
        });

        it('should return key without trailing ==', () => {
            return encryption.generateKey().then((key) => {
                return encryption.exportKey(key).then((keyString) => {
                    expect(keyString).to.not.contain('==');
                });
            });
        });
    });

    describe('#importKey()', () => {
        it('should return a key', () => {
            return encryption.generateKey().then((key) => {
                return encryption.exportKey(key).then((keyString) => {
                    return encryption.importKey(keyString).then((keyObj) => {
                        expect(keyObj.type).to.equal('secret');
                    });
                });
            });
        });
    });

    describe('#decrypt()', () => {
        it('should encrypt and decrypt a string', () => {
            let key, cipherText;
            return encryption.generateKey().then((_key) => {
                key = _key;
                return encryption.encrypt(key, 'abc');
            }).then((_cipherText) => {
                cipherText = _cipherText;
                return encryption.exportKey(key);
            }).then((password) => {
                return encryption.importKey(password);
            }).then((keyFromPassword) => {
                return encryption.decrypt(keyFromPassword, cipherText);
            }).then((text) => {
                expect(text).to.equal('abc');
            });
        });

        it('should throw an error if attempting to decrypt with bad key', () => {
            let key1, key2, cipherText;
            return encryption.generateKey().then((_key) => {
                key1 = _key;
                return encryption.generateKey();
            }).then((_key) => {
                key2 = _key;
                return encryption.encrypt(key1, 'abc');
            }).then((_cipherText) => {
                cipherText = _cipherText;
                return encryption.exportKey(key2);
            }).then((key2String) => {
                return encryption.importKey(key2String);
            }).then((key2ForDecypting) => {
                return encryption.decrypt(key2ForDecypting, cipherText);
            }).catch((err) => {
                expect(err.message).to.contain('decryption failed');
            });
        });

        it('should throw an error if attempting to use non-imported key for decryption', () => {
            let key;
            return encryption.generateKey().then((_key) => {
                key = _key;
                return encryption.encrypt(key, '123');
            }).then((cipherText) => {
                return encryption.decrypt(key, cipherText)
            }).catch((err) => {
                expect(err.message).to.contain('decryption failed');
            });
        });

        it('should support utf-8 strings', () => {
            let key, cipherText;
            return encryption.generateKey().then((_key) => {
                key = _key;
                return encryption.encrypt(key, 'Iñtërnâtiônàlizætiøn');
            }).then((_cipherText) => {
                cipherText = _cipherText;
                return encryption.exportKey(key);
            }).then((password) => {
                return encryption.importKey(password);
            }).then((keyFromPassword) => {
                return encryption.decrypt(keyFromPassword, cipherText);
            }).then((text) => {
                expect(text).to.equal('Iñtërnâtiônàlizætiøn');
            });
        });
    });
});