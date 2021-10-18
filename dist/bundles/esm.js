/**
 * Array of bytes to Base64 string decoding
 * @param sBase64 - a base64-encoded string
 * @returns
 */
function base64DecToArr(sB64Enc) {
    const nInLen = sB64Enc.length;
    const nOutLen = nInLen * 3 + 1 >> 2;
    const taBytes = new Uint8Array(nOutLen);
    for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
        nMod4 = nInIdx & 3;
        nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 6 * (3 - nMod4);
        if (nMod4 === 3 || nInLen - nInIdx === 1) {
            for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
            }
            nUint24 = 0;
        }
    }
    return taBytes;
}
/**
 * Base64 string to array encoding
 * @param aBytes - a buffer
 * @returns a base64-encoded string
 */
function base64EncArr(aBytes) {
    let nMod3 = 2;
    let sB64Enc = '';
    for (var nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
        nMod3 = nIdx % 3;
        if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0) {
            sB64Enc += '\r\n';
        }
        nUint24 |= aBytes[nIdx] << (16 >>> nMod3 & 24);
        if (nMod3 === 2 || aBytes.length - nIdx === 1) {
            sB64Enc += String.fromCharCode(uint6ToB64(nUint24 >>> 18 & 63), uint6ToB64(nUint24 >>> 12 & 63), uint6ToB64(nUint24 >>> 6 & 63), uint6ToB64(nUint24 & 63));
            nUint24 = 0;
        }
    }
    return sB64Enc.substr(0, sB64Enc.length - 2 + nMod3) + (nMod3 === 2 ? '' : nMod3 === 1 ? '=' : '==');
}
function b64ToUint6(nChr) {
    return nChr > 64 && nChr < 91
        ? nChr - 65
        : nChr > 96 && nChr < 123
            ? nChr - 71
            : nChr > 47 && nChr < 58
                ? nChr + 4
                : nChr === 43
                    ? 62
                    : nChr === 47
                        ? 63
                        : 0;
}
function uint6ToB64(nUint6) {
    return nUint6 < 26
        ? nUint6 + 65
        : nUint6 < 52
            ? nUint6 + 71
            : nUint6 < 62
                ? nUint6 - 4
                : nUint6 === 62
                    ? 43
                    : nUint6 === 63
                        ? 47
                        : 65;
}

/**
 * Base64url for both node.js and brwser javascript. It can work with ArrayBuffer|TypedArray|Buffer
 *
 * @remarks Bowser code by https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
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
        base64 = base64EncArr(bytes);
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
        const bytes = base64DecToArr(base64);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNtLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvQGp1YW5lbGFzL2Jhc2U2NC9kaXN0L2VzbS9pbmRleC5icm93c2VyLmpzIiwiLi4vLi4vc3JjL3RzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6WyJiNjQuZW5jb2RlIiwiYjY0LmRlY29kZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsY0FBYyxDQUFDLE9BQU8sRUFBRTtBQUNqQyxJQUFJLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDbEMsSUFBSSxNQUFNLE9BQU8sR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEMsSUFBSSxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1QyxJQUFJLEtBQUssSUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7QUFDNUYsUUFBUSxLQUFLLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUMzQixRQUFRLE9BQU8sSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDN0UsUUFBUSxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksTUFBTSxHQUFHLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDbEQsWUFBWSxLQUFLLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFO0FBQ2hGLGdCQUFnQixPQUFPLENBQUMs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
