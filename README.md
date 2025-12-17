# NodeJS IBAN

Simple and reliable IBAN validation for NodeJS with full international support.

[![npm version](https://img.shields.io/npm/v/nodejs-iban.svg)](https://www.npmjs.com/package/nodejs-iban)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Why use this package?

- ✅ **Complete coverage** - Supports all 75+ IBAN countries
- ✅ **ISO 13616 compliant** - Follows international standards
- ✅ **Smart normalization** - Handles spaces, lowercase, and formatting
- ✅ **Zero dependencies** - Lightweight and fast
- ✅ **TypeScript ready** - Full type support
- ✅ **Battle-tested** - Proper mod-97 algorithm implementation

## Installation

```bash
npm install nodejs-iban
```

## Quick Start

```javascript
import { IBAN } from 'nodejs-iban'

const iban = new IBAN()

if (iban.validateIBAN('DE89370400440532013000')) {
    console.log('Valid IBAN')
}
```

## Usage Examples

### Basic Validation

```javascript
import { IBAN } from 'nodejs-iban'

const validator = new IBAN()

// German IBAN
validator.validateIBAN('DE89370400440532013000')  // true

// British IBAN
validator.validateIBAN('GB82WEST12345698765432')  // true

// Invalid checksum
validator.validateIBAN('DE89370400440532013001')  // false
```

### Handling User Input

```javascript
const validator = new IBAN()

// Works with spaces (common user input)
validator.validateIBAN('DE89 3704 0044 0532 0130 00')  // true

// Works with lowercase
validator.validateIBAN('de89370400440532013000')  // true

// Works with mixed formatting
validator.validateIBAN('gb82 west 1234 5698 7654 32')  // true
```

### Form Validation Example

```javascript
import { IBAN } from 'nodejs-iban'

const validator = new IBAN()

function validateBankAccount(userInput) {
    if (!userInput || userInput.trim() === '') {
        return { valid: false, error: 'IBAN is required' }
    }
    
    const isValid = validator.validateIBAN(userInput)
    
    if (!isValid) {
        return { valid: false, error: 'Invalid IBAN format' }
    }
    
    return { valid: true }
}

// Usage
const result = validateBankAccount('DE89 3704 0044 0532 0130 00')
console.log(result)  // { valid: true }
```

### Express.js Middleware Example

```javascript
import { IBAN } from 'nodejs-iban'
import express from 'express'

const app = express()
const validator = new IBAN()

app.use(express.json())

app.post('/validate-iban', (req, res) => {
    const { iban } = req.body
    
    if (!iban) {
        return res.status(400).json({ error: 'IBAN is required' })
    }
    
    const isValid = validator.validateIBAN(iban)
    
    res.json({ 
        valid: isValid,
        iban: iban.replace(/\s/g, '').toUpperCase()
    })
})
```

## Supported Countries

This package validates IBANs from all countries that use the IBAN system:

| Country | Code | Length | Country | Code | Length |
|---------|------|--------|---------|------|--------|
| Germany | DE | 22 | France | FR | 27 |
| United Kingdom | GB | 22 | Italy | IT | 27 |
| Spain | ES | 24 | Netherlands | NL | 18 |
| Austria | AT | 20 | Belgium | BE | 16 |
| Switzerland | CH | 21 | Poland | PL | 28 |
| Czech Republic | CZ | 24 | Portugal | PT | 25 |
| Denmark | DK | 18 | Sweden | SE | 24 |
| Finland | FI | 18 | Norway | NO | 15 |

**Plus 60+ more countries** including: Greece, Ireland, Luxembourg, Croatia, Hungary, Romania, Bulgaria, Cyprus, Malta, Slovakia, Slovenia, Lithuania, Latvia, Estonia, and many others.

## How It Works

The validation follows the ISO 13616 standard:

1. **Normalization** - Removes spaces and converts to uppercase
2. **Format check** - Validates country code and basic structure
3. **Length validation** - Checks country-specific IBAN length
4. **Mod-97 algorithm** - Calculates checksum to verify validity

## API

### `validateIBAN(iban: string): boolean`

Validates an IBAN and returns `true` if valid, `false` otherwise.

**Parameters:**
- `iban` (string) - The IBAN to validate (with or without spaces, any case)

**Returns:**
- `boolean` - `true` if the IBAN is valid, `false` otherwise

## Testing

```bash
npm test
```

## Common Issues

**Q: Why does my valid IBAN return false?**  
A: Make sure the IBAN is from a supported country and has the correct length. Some test IBANs found online may have incorrect checksums.

**Q: Can I validate IBANs with special characters?**  
A: The validator automatically removes spaces. Other special characters will result in `false`.

**Q: Does this work with TypeScript?**  
A: Yes, the package is TypeScript-ready and works with ES modules.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT © Joel Ruiz Cabrera

## Links

- [NPM Package](https://www.npmjs.com/package/nodejs-iban)
- [GitHub Repository](https://github.com/joelruizcabrera/nodejs-iban)
- [Report Issues](https://github.com/joelruizcabrera/nodejs-iban/issues)

## Changelog

### v2.0.0
- Complete rewrite with international support
- Added all 75+ IBAN countries
- Improved validation algorithm
- Better input normalization
- ISO 13616 compliant

---


