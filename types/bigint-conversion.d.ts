/**
 * Converts a bigint to a buffer (node.js) or ArrayBuffer (native js)
 *
 * @param {bigint} a
 *
 * @returns {Buffer|ArrayBuffer} A buffer (node.js) or ArrayBuffer (native js) with a binary representation of the input bigint
 */
export function bigintToBuf(a: bigint): ArrayBuffer | Buffer;
/**
 * Converts a Buffer (node.js) or ArrayBuffer|TypedArray (native js) to a bigint
 *
 * @param {Buffer|ArrayBuffer|TypedArray} buf
 *
 * @returns {bigint} A BigInt
 */
export function bufToBigint(buf: any): bigint;
/**
 * Converts a bigint to a hexadecimal string
 *
 * @param {bigint} a
 *
 * @returns {str} A hexadecimal representation of the input bigint
 */
export function bigintToHex(a: bigint): any;
/**
 * Converts a hexadecimal string to a bigint
 *
 * @param {string} hexStr
 *
 * @returns {bigint} A BigInt
 */
export function hexToBigint(hexStr: string): bigint;
/**
 * Converts a bigint representing a binary array of utf-8 encoded text to a string of utf-8 text
 *
 * @param {bigint} a A bigint representing a binary array of utf-8 encoded text.
 *
 * @returns {string} A string text with utf-8 encoding
 */
export function bigintToText(a: bigint): string;
/**
 * Converts a utf-8 string to a bigint (from its binary representaion)
 *
 * @param {string} text A string text with utf-8 encoding
 *
 * @returns {bigint} A bigint representing a binary array of the input utf-8 encoded text
 */
export function textToBigint(text: string): bigint;
/**
 * Converts a buffer (node) or a ArrayBuffer (native js) containing utf-8 encoded text to a string of utf-8 text
 *
 * @param {Buffer|ArrayBuffer|TypedArray} buf A buffer containing utf-8 encoded text
 *
 * @returns {string} A string text with utf-8 encoding
 */
export function bufToText(buf: any): string;
/**
 * Converts a string of utf-8 encoded text to a Buffer (node) or ArrayBuffer (native js)
 *
 * @param {string} str A string of text (with utf-8 encoding)
 *
 * @returns {Buffer|ArrayBuffer} A buffer containing the utf-8 encoded text
 */
export function textToBuf(str: string): ArrayBuffer | Buffer;
/**
 * Returns the hexadecimal representation of a buffer.
 *
 * @param {Buffer|ArrayBuffer|TypedArray} buf
 *
 * @returns {string} A string with a hexadecimal representation of the input buffer
 */
export function bufToHex(buf: any): string;
/**
 * Converts a hexadecimal string to a buffer
 *
 * @param {string} hexStr A string representing a number with hexadecimal notation
 *
 * @returns {Buffer|ArrayBuffer} A Buffer (node) or ArrayBuffer (native js)
 */
export function hexToBuf(hexStr: string): ArrayBuffer | Buffer;
