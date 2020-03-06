'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Converts a bigint to a buffer (node.js) or ArrayBuffer (native js)
 * 
 * @param {bigint} a
 * 
 * @returns {Buffer|ArrayBuffer} A buffer (node.js) or ArrayBuffer (native js) with a binary representation of the input bigint
 */
function bigintToBuf(a) {
    return hexToBuf(bigintToHex(a));
}
/**
 * Converts a Buffer (node.js) or ArrayBuffer|TypedArray (native js) to a bigint
 * 
 * @param {Buffer|ArrayBuffer|TypedArray} buf
 * 
 * @returns {bigint} A BigInt
 */
function bufToBigint(buf) {
    return BigInt('0x' + bufToHex(buf));
}
/**
 * Converts a bigint to a hexadecimal string
 * 
 * @param {bigint} a
 * 
 * @returns {str} A hexadecimal representation of the input bigint 
 */
function bigintToHex(a) {
    return a.toString(16);
}
/**
 * Converts a hexadecimal string to a bigint
 * 
 * @param {string} hex_str
 * 
 * @returns {bigint} A BigInt 
 */
function hexToBigint(hex_str) {
    return BigInt('0x' + hex_str);
}
/**
 * Converts a bigint representing a binary array of utf-8 encoded text to a string of utf-8 text
 * 
 * @param {bigint} a A bigint representing a binary array of utf-8 encoded text.
 * 
 * @returns {string} A string text with utf-8 encoding 
 */
function bigintToText(a) {
    return bufToText(hexToBuf(a.toString(16)));
}
/**
 * Converts a utf-8 string to a bigint (from its binary representaion) 
 * 
 * @param {string} text A string text with utf-8 encoding 
 * 
 * @returns {bigint} A bigint representing a binary array of the input utf-8 encoded text
 */
function textToBigint(text) {
    return hexToBigint(bufToHex(textToBuf(text)));
}
/**
 * Converts a buffer (node) or a ArrayBuffer (native js) containing utf-8 encoded text to a string of utf-8 text
 * 
 * @param {Buffer|ArrayBuffer|TypedArray} buf A buffer containing utf-8 encoded text
 * 
 * @returns {string} A string text with utf-8 encoding 
 */
function bufToText(buf) {
    {
        return Buffer.from(buf).toString();
    }
}
/**
 * Converts a string of utf-8 encoded text to a Buffer (node) or ArrayBuffer (native js)
 * 
 * @param {string} str A string of text (with utf-8 encoding)
 * 
 * @returns {Buffer|ArrayBuffer} A buffer containing the utf-8 encoded text
 */
function textToBuf(str) {
    {
        return Buffer.from(str);
    }
}
/**
 * Returns the hexadecimal representation of a buffer.
 * 
 * @param {Buffer|ArrayBuffer|TypedArray} buf
 * 
 * @returns {string} A string with a hexadecimal representation of the input buffer
 */
function bufToHex(buf) {
    {
        return Buffer.from(buf).toString('hex');
    }
}
/**
 * Converts a hexadecimal string to a buffer
 * 
 * @param {string} hex_str A string representing a number with hexadecimal notation
 * 
 * @returns {Buffer|ArrayBuffer} A Buffer (node) or ArrayBuffer (native js) 
 */
function hexToBuf(hex_str) {
    {
        return Buffer.from(hex_str, 'hex');
    }
}

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
