export class IBAN {
    #alpha = Array.from(Array(26)).map((e, i) => i + 65);
    #alphabet = this.#alpha.map((x) => String.fromCharCode(x));

    /**
     * Return true or false when the IBAN is valid or not.
     * @param iban The IBAN that has to be validated.
     * @returns {boolean} Returns the result of the validation.
     */
    validateIBAN(iban) {
        let splittedIBAN = this.#splitIBAN(iban)
        let countryNumber1 = this.#alphabet.indexOf(splittedIBAN.countryCode[0]) + 10
        let countryNumber2 = this.#alphabet.indexOf(splittedIBAN.countryCode[1]) + 10
        let accountNumber = splittedIBAN.accountNumber.padEnd(10, "0")

        let countryDigits = countryNumber1.toString() + countryNumber2.toString()

        let nonModulo = BigInt(splittedIBAN.bankNumber + accountNumber + countryDigits + "00")
        let modulo = parseInt(nonModulo % 97n)
        let calcCheckSum = ('0' + (98 - modulo)).slice(-2)
        return calcCheckSum === splittedIBAN.checkSum
    }
    #splitIBAN(iban) {
        let splitted = {
            countryCode: iban.substr(0,2),
            checkSum: iban.substr(2,2),
            bankNumber: iban.substr(4,8),
            accountNumber: iban.substr(12,10)
        }
        return splitted
    }
}
