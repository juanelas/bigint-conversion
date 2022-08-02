const base64Encode = (bytes) => {
    const CHUNK_SIZE = 0x8000;
    const arr = [];
    for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
        // @ts-expect-error
        arr.push(String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK_SIZE)));
    }
    return btoa(arr.join(''));
};
const base64Decode = (encoded) => {
    return new Uint8Array(atob(encoded)
        .split('')
        .map((c) => c.charCodeAt(0)));
};

/**
 * Base64url for both node.js and brwser javascript. It can work with ArrayBuffer|TypedArray|Buffer
 *
 * @remarks Bowser code obtained from https://github.com/panva/jose/blob/main/src/runtime/browser/base64url.ts
 * @packageDocumentation
 */
/**
 * Base64Url encoding of a buffer input or a string (UTF16 in browsers, UTF8 in node)
 * @param input
 * @param urlsafe - if true Base64 URL encoding is used ('+' and '/' are replaced by '-', '_')
 * @param padding - if false, padding (trailing '=') is removed
 * @returns a string with the base64-encoded representation of the input
 */
function encode(input, urlsafe = false, padding = true) {
    let base64 = '';
    {
        const bytes = (typeof input === 'string')
            ? (new TextEncoder()).encode(input)
            : new Uint8Array(input);
        base64 = base64Encode(bytes);
    }
    if (urlsafe)
        base64 = base64ToBase64url(base64);
    if (!padding)
        base64 = removeBase64Padding(base64);
    return base64;
}
/**
 * Base64url decoding (binary output) of base64url-encoded string
 * @param base64 - a base64 string
 * @param stringOutput - if true a UTF16 (browser) or UTF8 (node) string is returned
 * @returns a buffer or unicode string
 */
function decode(base64, stringOutput = false) {
    {
        let urlsafe = false;
        if (/^[0-9a-zA-Z_-]+={0,2}$/.test(base64)) {
            urlsafe = true;
        }
        else if (!/^[0-9a-zA-Z+/]*={0,2}$/.test(base64)) {
            throw new Error('Not a valid base64 input');
        }
        if (urlsafe)
            base64 = base64urlToBase64(base64);
        const bytes = base64Decode(base64);
        return stringOutput
            ? (new TextDecoder()).decode(bytes)
            : bytes;
    }
}
function base64ToBase64url(base64) {
    return base64.replace(/\+/g, '-').replace(/\//g, '_');
}
function base64urlToBase64(base64url) {
    return base64url.replace(/-/g, '+').replace(/_/g, '/').replace(/=/g, '');
}
function removeBase64Padding(str) {
    return str.replace(/=/g, '');
}

/**
 * Conversions from/to bingint to TypedArray/Buffer, hex
 *
 * @remarks
 * This module runs perfectly in node.js and browsers
 *
 * @packageDocumentation
 */
/**
 * Converts an arbitrary-size non-negative bigint to an ArrayBuffer or a Buffer (default for Node.js)
 *
 * @param a
 * @param returnArrayBuffer - In Node.js, it forces the output to be an ArrayBuffer instead of a Buffer.
 *
 * @returns an ArrayBuffer or a Buffer with a binary representation of the input bigint
 *
 * @throws {RangeError}
 * Thrown if a < 0.
 */
function bigintToBuf(a, returnArrayBuffer = false) {
    if (a < 0)
        throw RangeError('a should be a non-negative integer. Negative values are not supported');
    return hexToBuf(bigintToHex(a), returnArrayBuffer);
}
/**
 * Converts an ArrayBuffer, TypedArray or Buffer (node.js) to a bigint
 * @param buf
 * @returns a bigint
 */
function bufToBigint(buf) {
    let bits = 8n;
    if (ArrayBuffer.isView(buf))
        bits = BigInt(buf.BYTES_PER_ELEMENT * 8);
    else
        buf = new Uint8Array(buf);
    let ret = 0n;
    for (const i of buf.values()) {
        const bi = BigInt(i);
        ret = (ret << bits) + bi;
    }
    return ret;
}
/**
 * Converts a non-negative bigint to a hexadecimal string
 * @param a - a non negative bigint
 * @returns hexadecimal representation of the input bigint
 *
 * @throws {RangeError}
 * Thrown if a < 0
 */
function bigintToHex(a) {
    if (a < 0)
        throw RangeError('a should be a non-negative integer. Negative values are not supported');
    return a.toString(16);
}
/**
 * Converts a hexadecimal string to a bigint
 *
 * @param hexStr
 *
 * @returns a bigint
 */
function hexToBigint(hexStr) {
    return BigInt('0x' + hexStr);
}
/**
 * Converts a non-negative bigint representing a binary array of utf-8 encoded text to a string of utf-8 text
 *
 * @param a - A non-negative bigint representing a binary array of utf-8 encoded text.
 *
 * @returns a string text with utf-8 encoding
 *
 * @throws {RangeError}
 * Thrown if a < 0.
 */
function bigintToText(a) {
    if (a < 0)
        throw RangeError('a should be a non-negative integer. Negative values are not supported');
    return bufToText(hexToBuf(a.toString(16)));
}
/**
 * Converts a utf-8 string to a bigint (from its binary representaion)
 *
 * @param text - A string text with utf-8 encoding
 *
 * @returns a bigint representing a binary array of the input utf-8 encoded text
 */
function textToBigint(text) {
    return hexToBigint(bufToHex(textToBuf(text)));
}
/**
 * Converts an ArrayBuffer, TypedArray or Buffer (in Node.js) containing utf-8 encoded text to a string of utf-8 text
 *
 * @param buf - A buffer containing utf-8 encoded text
 *
 * @returns a string text with utf-8 encoding
 */
function bufToText(buf) {
    return new TextDecoder().decode(new Uint8Array(buf));
}
/**
 * Converts a string of utf-8 encoded text to an ArrayBuffer or a Buffer (default in Node.js)
 *
 * @param str - A string of text (with utf-8 encoding)
 * @param returnArrayBuffer - When invoked in Node.js, it can force the output to be an ArrayBuffer instead of a Buffer.
 *
 * @returns an ArrayBuffer or a Buffer containing the utf-8 encoded text
 */
function textToBuf(str, returnArrayBuffer = false) {
    return new TextEncoder().encode(str).buffer;
}
/**
 * Returns the hexadecimal representation of a buffer.
 *
 * @param buf
 *
 * @returns a string with a hexadecimal representation of the input buffer
 */
function bufToHex(buf) {
    {
        let s = '';
        const h = '0123456789abcdef';
        if (ArrayBuffer.isView(buf))
            buf = new Uint8Array(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
        else
            buf = new Uint8Array(buf);
        buf.forEach((v) => {
            s += h[v >> 4] + h[v & 15];
        });
        return s;
    }
}
/**
 * Converts a hexadecimal string to a buffer
 *
 * @param hexStr - A string representing a number with hexadecimal notation
 * @param returnArrayBuffer - In Node.js, it forces the output to be an ArrayBuffer instead of a Buffer.
 *
 * @returns An ArrayBuffer or a Buffer
 *
 * @throws {RangeError}
 * Thrown if hexStr is undefined or not a hexadecimal.
 */
function hexToBuf(hexStr, returnArrayBuffer = false) {
    if (hexStr === undefined) {
        throw RangeError('hexStr cannot undefined');
    }
    const hexMatch = hexStr.match(/^(0x)?([\da-fA-F]+)$/);
    if (hexMatch == null) {
        throw RangeError('hexStr must be a hexadecimal string, e.g. \'0x124fe3a\' or \'0214f1b2\'');
    }
    let hex = hexMatch[2];
    hex = (hex.length % 2 === 0) ? hex : '0' + hex;
    {
        return Uint8Array.from(hex.match(/[\da-fA-F]{2}/g).map((h) => {
            return parseInt(h, 16);
        })).buffer;
    }
}
/**
 * Converts an arbitrary-size non-negative bigint to a base64 string
 * @param a - a non negative bigint
 * @param urlsafe - if true Base64 URL encoding is used ('+' and '/' are replaced by '-', '_')
 * @param padding - if false, padding (trailing '=') is removed
 * @returns a base64 representation of the input bigint
 *
 * @throws {RangeError}
 * Thrown if a < 0
 */
function bigintToBase64(a, urlsafe = false, padding = true) {
    return encode(bigintToBuf(a), urlsafe, padding);
}
/**
 * Converts a base64 string to bigint.
 * @param a base64 string. It accepts standard and URL-safe base64 with and without padding
 * @returns a bigint
 */
function base64ToBigint(a) {
    return bufToBigint(decode(a));
}

export { base64ToBigint, bigintToBase64, bigintToBuf, bigintToHex, bigintToText, bufToBigint, bufToHex, bufToText, hexToBigint, hexToBuf, textToBigint, textToBuf };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnJvd3Nlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vbm9kZV9tb2R1bGVzL0BqdWFuZWxhcy9iYXNlNjQvZGlzdC9lc20vaW5kZXguYnJvd3Nlci5qcyIsIi4uLy4uL3NyYy90cy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6bnVsbCwibmFtZXMiOlsiYjY0LmVuY29kZSIsImI2NC5kZWNvZGUiXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sWUFBWSxHQUFHLENBQUMsS0FBSyxLQUFLO0FBQ2hDLElBQUksTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDO0FBQzlCLElBQUksTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ25CLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLFVBQVUsRUFBRTtBQUN2RDtBQUNBLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRixLQUFLO0FBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFDO0FBQ0YsTUFBTSxZQUFZLEdBQUcsQ0FBQyxPQUFPLEtBQUs7QUFDbEMsSUFBSSxPQUFPLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDdkMsU0FBUyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQ2xCLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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
