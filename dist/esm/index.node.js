import * as b64 from '@juanelas/base64';

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
    return b64.encode(bigintToBuf(a), urlsafe, padding);
}
/**
 * Converts a base64 string to bigint.
 * @param a base64 string. It accepts standard and URL-safe base64 with and without padding
 * @returns a bigint
 */
function base64ToBigint(a) {
    return bufToBigint(b64.decode(a));
}

export { base64ToBigint, bigintToBase64, bigintToBuf, bigintToHex, bigintToText, bufToBigint, bufToHex, bufToText, hexToBigint, hexToBuf, textToBigint, textToBuf };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubm9kZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3RzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7O0FBT0c7QUFTSDs7Ozs7Ozs7OztBQVVHO1NBQ2EsV0FBVyxDQUFFLENBQVMsRUFBRSxvQkFBNkIsS0FBSyxFQUFBO0lBQ3hFLElBQUksQ0FBQyxHQUFHLENBQUM7QUFBRSxRQUFBLE1BQU0sVUFBVSxDQUFDLHVFQUF1RSxDQUFDLENBQUE7SUFDcEcsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLENBQUE7QUFDcEQsQ0FBQztBQUVEOzs7O0FBSUc7QUFDRyxTQUFVLFdBQVcsQ0FBRSxHQUFrQyxFQUFBO0lBQzdELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNiLElBQUEsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUFFLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFBOztBQUNoRSxRQUFBLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUU5QixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7QUFDWixJQUFBLEtBQUssTUFBTSxDQUFDLElBQUssR0FBeUIsQ0FBQyxNQUFNLEVBQUUsRUFBRTtBQUNuRCxRQUFBLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNwQixHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQTtBQUN6QixLQUFBO0FBQ0QsSUFBQSxPQUFPLEdBQUcsQ0FBQTtBQUNaLENBQUM7QUFFRDs7Ozs7OztBQU9HO0FBQ0csU0FBVSxXQUFXLENBQUUsQ0FBUyxFQUFBO0lBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFBRSxRQUFBLE1BQU0sVUFBVSxD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
