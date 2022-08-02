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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNtLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvQGp1YW5lbGFzL2Jhc2U2NC9kaXN0L2VzbS9pbmRleC5icm93c2VyLmpzIiwiLi4vLi4vc3JjL3RzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6WyJiNjQuZW5jb2RlIiwiYjY0LmRlY29kZSJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxZQUFZLEdBQUcsQ0FBQyxLQUFLLEtBQUs7QUFDaEMsSUFBSSxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUM7QUFDOUIsSUFBSSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDbkIsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksVUFBVSxFQUFFO0FBQ3ZEO0FBQ0EsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JGLEtBQUs7QUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM5QixDQUFDLENBQUM7QUFDRixNQUFNLFlBQVksR0FBRyxDQUFDLE9BQU8sS0FBSztBQUNsQyxJQUFJLE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN2QyxTQUFTLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFDbEIsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEMsQ0FBQyxDQUFDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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
