# Secure Drop

## Description
Secure Drop is an application that allows data to be shared securely without the need to setup complicated systems.
Secure Drop uses ever increasing support for WebCrypto to encrypt and decrypt data in the browser so that true end-to-end
encryption is possible.

## Installation Instructions
To install Secure Drop:
1. `git clone git@github.com:RossCasey/SecureDrop.git`
2. `cd SecureDrop`
3. `npm install`
4. `cp .env.example .env`
5. `npm run webpack`
6. `npm start`

## Dependencies
* Node
* NPM
* Sqlite (by default, other database support planned)

## Testing
Secure Drop has a suite of server-side and client side tests.
### Server-side
Run `npm test`
### Client-side
1. Ensure that `APP_ENV` is set to `development` in the `.env`
2. Run `npm run webpack-tests`
3. Open a browser and navigate to `http://localhost:3000/test`