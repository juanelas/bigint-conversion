'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
            ? Buffer.from(input, 'utf8')
            : Buffer.from(input);
        base64 = bytes.toString('base64');
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
        const buffer = Buffer.from(base64, 'base64');
        return stringOutput
            ? buffer.toString('utf8')
            : new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.length);
    }
}
function base64ToBase64url(base64) {
    return base64.replace(/\+/g, '-').replace(/\//g, '_');
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
    return Buffer.from(buf).toString();
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
    if (!returnArrayBuffer) {
        return Buffer.from(new TextEncoder().encode(str).buffer);
    }
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
        if (ArrayBuffer.isView(buf))
            buf = new Uint8Array(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
        return Buffer.from(buf).toString('hex');
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
        const b = Buffer.from(hex, 'hex');
        if (!returnArrayBuffer)
            return b;
        else
            return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
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

exports.base64ToBigint = base64ToBigint;
exports.bigintToBase64 = bigintToBase64;
exports.bigintToBuf = bigintToBuf;
exports.bigintToHex = bigintToHex;
exports.bigintToText = bigintToText;
exports.bufToBigint = bufToBigint;
exports.bufToHex = bufToHex;
exports.bufToText = bufToText;
exports.hexToBigint = hexToBigint;
exports.hexToBuf = hexToBuf;
exports.textToBigint = textToBigint;
exports.textToBuf = textToBuf;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubm9kZS5janMiLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9AanVhbmVsYXMvYmFzZTY0L2Rpc3QvZXNtL2luZGV4Lm5vZGUuanMiLCIuLi8uLi9zcmMvdHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOm51bGwsIm5hbWVzIjpbImI2NC5lbmNvZGUiLCJiNjQuZGVjb2RlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxHQUFHLEtBQUssRUFBRSxPQUFPLEdBQUcsSUFBSSxFQUFFO0FBQ3hELElBQUksSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLElBQUk7QUFDSixRQUFRLE1BQU0sS0FBSyxHQUFHLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUTtBQUNoRCxjQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztBQUN4QyxjQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMsUUFBUSxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQyxLQUFLO0FBQ0wsSUFBSSxJQUFJLE9BQU87QUFDZixRQUFRLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQyxJQUFJLElBQUksQ0FBQyxPQUFPO0FBQ2hCLFFBQVEsTUFBTSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdDLElBQUksT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsTUFBTSxDQUFDLE1BQU0sRUFBRSxZQUFZLEdBQUcsS0FBSyxFQUFFO0FBQzlDLElBQUk7QUFDSixRQUFRLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3JELFFBQVEsT0FBTyxZQUFZO0FBQzNCLGNBQWMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDckMsY0FBYyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlFLEtBQUs7QUFDTCxDQUFDO0FBQ0QsU0FBUyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUU7QUFDbkMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUNELFNBQVMsbUJBQW1CLENBQUMsR0FBRyxFQUFFO0FBQ2xDLElBQUksT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNqQzs7QUM5Q0E7Ozs7Ozs7QUFPRztBQVNIOzs7Ozs7Ozs7O0FBVUc7U0FDYSxXQUFXLENBQUUsQ0FBUyxFQUFFLG9CQUE2QixLQUFLLEVBQUE7SUFDeEUsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUFFLFFBQUEsTUFBTSxVQUFVLENBQUMsdUVBQXVFLENBQUMsQ0FBQTtJQUNwRyxPQUFPLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQTtBQUNwRCxDQUFDO0FBRUQ7Ozs7QUFJRztBQUNHLFNBQVUsV0FBVyxDQUFFLEdBQWtDLEVBQUE7SUFDN0QsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ2IsSUFBQSxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQUUsSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLENBQUE7O0FBQ2hFLFFBQUEsR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRTlCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtBQUNaLElBQUEsS0FBSyxNQUFNLENBQUMsSUFBSyxHQUF5QixDQUFDLE1BQU0sRUFBRSxFQUFFO0FBQ25ELFFBQUEsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3BCLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFBO0FBQ3pCLEtBQUE7QUFDRCxJQUFBLE9BQU8sR0FBRyxDQUFBO0FBQ1osQ0FBQztBQUVEOzs7Ozs7O0FBT0c7QUFDRyxTQUFVLFdBQVcsQ0FBRSxDQUFTLEVBQUE7SUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUFFLFFBQUEsTUFBTSxVQUFVLENBQUMsdUVBQXVFLENBQUMsQ0FBQTtBQUNwRyxJQUFBLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUN2QixDQUFDO0FBRUQ7Ozs7OztBQU1HO0FBQ0csU0FBVSxXQUFXLENBQUUsTUFBYyxFQUFBO0FBQ3pDLElBQUEsT0FBTyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFBO0FBQzlCLENBQUM7QUFFRDs7Ozs7Ozs7O0FBU0c7QUFDRyxTQUFVLFlBQVksQ0FBRSxDQUFTLEVBQUE7SUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUFFLFFBQUEsTUFBTSxVQUFVLENBQUMsdUVBQXVFLENBQUMsQ0FBQTtBQUNwRyxJQUFBLE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUM1QyxDQUFDO0FBRUQ7Ozs7OztBQU1HO0FBQ0csU0FBVSxZQUFZLENBQUUsSUFBWSxFQUFBO0lBQ3hDLE9BQU8sV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQy9DLENBQUM7QUFFRDs7Ozs7O0FBTUc7QUFDRyxTQUFVLFNBQVMsQ0FBRSxHQUFrQyxFQUFBO0FBQzNELElBQ0ssT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQ3pDLENBQUM7QUFFRDs7Ozs7OztBQU9HO1NBQ2EsU0FBUyxDQUFFLEdBQVcsRUFBRSxvQkFBNkIsS0FBSyxFQUFBO0FBQ3hFLElBQUEsSUFBbUIsQ0FBQyxpQkFBaUIsRUFBRTtBQUNyQyxRQUFBLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUN6RCxLQUFBO0lBQ0QsT0FBTyxJQUFJLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUE7QUFDN0MsQ0FBQztBQUVEOzs7Ozs7QUFNRztBQUNHLFNBQVUsUUFBUSxDQUFFLEdBQWtDLEVBQUE7QUFDMUQsSUFXTztBQUNMLFFBQUEsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUFFLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7UUFDcEgsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUN4QyxLQUFBO0FBQ0gsQ0FBQztBQUVEOzs7Ozs7Ozs7O0FBVUc7U0FDYSxRQUFRLENBQUUsTUFBYyxFQUFFLG9CQUE2QixLQUFLLEVBQUE7SUFDMUUsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO0FBQ3hCLFFBQUEsTUFBTSxVQUFVLENBQUMseUJBQXlCLENBQUMsQ0FBQTtBQUM1QyxLQUFBO0lBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQ3JELElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtBQUNwQixRQUFBLE1BQU0sVUFBVSxDQUFDLHlFQUF5RSxDQUFDLENBQUE7QUFDNUYsS0FBQTtBQUNELElBQUEsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JCLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQTtBQUM5QyxJQUlPO1FBQ0wsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDakMsUUFBQSxJQUFJLENBQUMsaUJBQWlCO0FBQUUsWUFBQSxPQUFPLENBQUMsQ0FBQTs7QUFDM0IsWUFBQSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDdEUsS0FBQTtBQUNILENBQUM7QUFFRDs7Ozs7Ozs7O0FBU0c7QUFDRyxTQUFVLGNBQWMsQ0FBRSxDQUFTLEVBQUUsT0FBbUIsR0FBQSxLQUFLLEVBQUUsT0FBQSxHQUFtQixJQUFJLEVBQUE7QUFDMUYsSUFBQSxPQUFPQSxNQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUNyRCxDQUFDO0FBRUQ7Ozs7QUFJRztBQUNHLFNBQVUsY0FBYyxDQUFFLENBQVMsRUFBQTtJQUN2QyxPQUFPLFdBQVcsQ0FBQ0MsTUFBVSxDQUFDLENBQUMsQ0FBZSxDQUFDLENBQUE7QUFDakQ7Ozs7Ozs7Ozs7Ozs7OzsifQ==
