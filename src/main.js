'use strict';

/**
 * Convert a bigint to a buffer (node.js) or uint8array (native js)
 * 
 * @param {bigint} a
 * 
 * @returns {Buffer|Uint8Array} A buffer (node.js) or uint8array (native js) with a binary representation of the input bigint
 */
export function bigintToBuf(a) {
    return hexToBuf(bigintToHex(a));
};

/**
 * Converts a buffer (node.js) or uint8array (native js) to a bigint
 * 
 * @param {Buffer|Uint8Array} buf buffer (node.js) or uint8array (native js)
 * 
 * @returns {bigint}
 */
export function bufToBigint(buf) {
    return BigInt('0x' + bufToHex(buf));
};

/**
 * Convert a bigint to a hexadecimal string
 * 
 * @param {bigint} a
 * 
 * @returns {str} A hexadecimal representation of the input bigint 
 */
export function bigintToHex(a) {
    return a.toString(16);
};

/**
 * Converts a hexadecimal string to a bigint
 * 
 * @param {string} hex
 * 
 * @returns {bigint} a
 */
export function hexToBigint(hex_str) {
    return BigInt('0x' + hex_str);
};

/**
 * Converts a bigint representing a binary array of utf-8 encoded text to a string of utf-8 text
 * 
 * @param {bigint} a A bigint representing a binary array of utf-8 encoded text.
 * 
 * @returns {string} A string text with utf-8 encoding 
 */
export function bigintToText(a) {
    return bufToText(hexToBuf(a.toString(16)));
};

/**
 * Converts a utf-8 string to a bigint (from its buffer|uint8array binary representaion) 
 * 
 * @param {string} text A string text with utf-8 encoding 
 * 
 * @returns {bigint} A bigint representing a binary array of the input utf-8 encoded text
 */
export function textToBigint(text) {
    return hexToBigint(bufToHex(textToBuf(text)));
};

/**
 * Converts a buffer (node) or a uint8array (native js) containing utf-8 encoded text to a string of utf-8 text
 * 
 * @param {Buffer|Uint8Array} buf A buffer containing utf-8 encoded text
 * 
 * @returns {string} A string text with utf-8 encoding 
 */
export function bufToText(buf) {
    if (process.browser) {
        return new TextDecoder().decode(buf);
    } else {
        return buf.toString();
    }
};

/**
 * Converts a string of textwith utf-8 encoding to a buffer (node) or uint8array (native js)
 * 
 * @param {string} str A string text with utf-8 encoding
 * 
 * @returns {Buffer|Uint8Array} a buffer containing the utf-8 encoded text
 */
export function textToBuf(str) {
    if (process.browser) {
        return new TextEncoder().encode(str);
    } else {
        return Buffer.from(str);
    }
};

/**
 * Returns the hexadecimal representation of a buffer (node) or uint8array (native js)
 * 
 * @param {Buffer|Uint8Array} a buffer containing utf-8 encoded text
 * 
 * @returns {string} A string with a hexadecimal representation of the input buffer
 */
export function bufToHex(buf) {
    if (process.browser) {
        var s = '';
        h = '0123456789abcdef';
        (new Uint8Array(buf)).forEach((v) => { s += h[v >> 4] + h[v & 15]; });
        return s;
    } else {
        return buf.toString('hex');
    }
};

/**
 * Converts a hexadecimal string to a buffer (node) or uint8array (native js)
 * 
 * @param {string} hex_str A hexadecimal string
 * 
 * @returns {Buffer|Uint8Array} a buffer (node) or uint8array (native js) 
 */
export function hexToBuf(hex_str) {
    if (process.browser) {
        return new Uint8Array(hex_str.match(/[\da-f]{2}/gi).map(function (h) {
            return parseInt(h, 16);
        }));
    } else {
        return Buffer.from(hex_str, 'hex');
    }
};