/**
 * A TypedArray object describes an array-like view of an underlying binary data buffer.
 */
export type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;
/**
 * A TypedArray object describes an array-like view of an underlying binary data buffer.
 * @typedef {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|BigInt64Array|BigUint64Array} TypedArray
 */
/**
 * Converts a bigint to an ArrayBuffer
 *
 * @param {bigint} a
 *
 * @returns {ArrayBuffer} An ArrayBuffer with a binary representation of the input bigint
 */
export function bigintToBuf(a: bigint): ArrayBuffer;
/**
 * Converts a bigint to a hexadecimal string
 *
 * @param {bigint} a
 *
 * @returns {str} A hexadecimal representation of the input bigint
 */
export function bigintToHex(a: bigint): any;
/**
 * Converts a bigint representing a binary array of utf-8 encoded text to a string of utf-8 text
 *
 * @param {bigint} a A bigint representing a binary array of utf-8 encoded text.
 *
 * @returns {string} A string text with utf-8 encoding
 */
export function bigintToText(a: bigint): string;
/**
 * Converts an ArrayBuffer, TypedArray or Buffer (node.js) to a bigint
 *
 * @param {ArrayBuffer|TypedArray|Buffer} buf
 *
 * @returns {bigint} A BigInt
 */
export function bufToBigint(buf: ArrayBuffer | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array | Buffer): bigint;
/**
 * Returns the hexadecimal representation of a buffer.
 *
 * @param {ArrayBuffer|TypedArray|Buffer} buf
 *
 * @returns {string} A string with a hexadecimal representation of the input buffer
 */
export function bufToHex(buf: ArrayBuffer | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array | Buffer): string;
/**
 *Converts an ArrayBuffer, TypedArray or Buffer (node.js) containing utf-8 encoded text to a string of utf-8 text
 *
 * @param {ArrayBuffer|TypedArray|Buffer} buf A buffer containing utf-8 encoded text
 *
 * @returns {string} A string text with utf-8 encoding
 */
export function bufToText(buf: ArrayBuffer | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array | Buffer): string;
/**
 * Converts a hexadecimal string to a bigint
 *
 * @param {string} hexStr
 *
 * @returns {bigint} A BigInt
 */
export function hexToBigint(hexStr: string): bigint;
/**
 * Converts a hexadecimal string to a buffer
 *
 * @param {string} hexStr A string representing a number with hexadecimal notation
 *
 * @returns {ArrayBuffer} An ArrayBuffer
 */
export function hexToBuf(hexStr: string): ArrayBuffer;
/**
 * Converts a utf-8 string to a bigint (from its binary representaion)
 *
 * @param {string} text A string text with utf-8 encoding
 *
 * @returns {bigint} A bigint representing a binary array of the input utf-8 encoded text
 */
export function textToBigint(text: string): bigint;
/**
 * Converts a string of utf-8 encoded text to a Buffer (node) or ArrayBuffer (native js)
 *
 * @param {string} str A string of text (with utf-8 encoding)
 *
 * @returns {ArrayBuffer} An ArrayBuffer containing the utf-8 encoded text
 */
export function textToBuf(str: string): ArrayBuffer;
