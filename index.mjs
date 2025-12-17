export class IBAN {
    #lengths = {
        AD: 24, AE: 23, AL: 28, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22,
        BH: 22, BR: 29, BY: 28, CH: 21, CR: 22, CY: 28, CZ: 24, DE: 22,
        DK: 18, DO: 28, EE: 20, EG: 29, ES: 24, FI: 18, FO: 18, FR: 27,
        GB: 22, GE: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21, HU: 28,
        IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28,
        LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19,
        MR: 27, MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29,
        PT: 25, QA: 29, RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24,
        SM: 27, TN: 24, TR: 26, UA: 29, VA: 22, VG: 24, XK: 20
    };

    /**
     * Validates an IBAN according to ISO 13616
     * @param {string} iban - The IBAN to be validated
     * @returns {boolean} true if valid, otherwise false
     */

    validateIBAN(iban) {
        const normalized = iban.replace(/\s/g, '').toUpperCase();
        
        if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(normalized)) {
            return false;
        }
        
        const countryCode = normalized.slice(0, 2);
        const expectedLength = this.#lengths[countryCode];
        
        if (!expectedLength || normalized.length !== expectedLength) {
            return false;
        }
        
        const rearranged = normalized.slice(4) + normalized.slice(0, 4);
        
        const numericString = Array.from(rearranged)
            .map(char => {
                const code = char.charCodeAt(0);
                return code >= 65 && code <= 90 
                    ? (code - 55).toString() 
                    : char;
            })
            .join('');
        
        return this.#mod97(numericString) === 1;
    }

    /**
     * Calculates modulo 97 for large numbers.
     * @param {string} numericString 
     * @returns {number}
     */
    
    #mod97(numericString) {
        let remainder = numericString;
        while (remainder.length > 2) {
            const block = remainder.slice(0, 9);
            remainder = (parseInt(block, 10) % 97) + remainder.slice(block.length);
        }
        return parseInt(remainder, 10) % 97;
    }
}
