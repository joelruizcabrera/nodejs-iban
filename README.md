
# NodeJS IBAN

Simple NodeJS validation for IBANs (International Bank Account Number)

[View NPM Package](https://www.npmjs.com/package/nodejs-iban)


## Content

- [Installation](https://github.com/joelruizcabrera/nodejs-iban#installation)
- [Usage](https://github.com/joelruizcabrera/nodejs-iban#usage)

## Installation

Run this to install the package
```bash
  npm install nodejs-iban
```

## Usage
Go to your file and import the package as follows:
```javascript
import {IBAN} from 'nodejs-iban'
let iban = new IBAN()
```
Now you can use the function like that:
```javascript
let isValid = iban.validateIBAN("DE33100000003333333333")
console.log(isValid) => true / false
```
