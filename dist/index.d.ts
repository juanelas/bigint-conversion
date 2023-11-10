/// <reference types="node" />
/**
 * Conversions from/to bingint to TypedArray/Buffer, hex
 *
 * @remarks
 * This module runs perfectly in node.js and browsers
 *
 * @packageDocumentation
 */
/**
 * A TypedArray object describes an array-like view of an underlying binary data buffer.
 */
type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;
/**
 * Parses a hexadecimal string for correctness and returns it with or without '0x' prefix, and/or with the specified byte length
 * @param a - the string with an hexadecimal number to be parsed
 * @param prefix0x - set to true to prefix the output with '0x'
 * @param byteLength - pad the output to have the desired byte length. Notice that the hex length is double the byte length.
 *
 * @returns
 *
 * @throws {@link RangeError} if input string does not hold an hexadecimal number
 * @throws {@link RangeError} if requested byte length is less than the input byte length
 */
declare function parseHex(a: string, prefix0x?: boolean, byteLength?: number): string;
/**
 * Converts an arbitrary-size non-negative bigint to an ArrayBuffer or a Buffer (default for Node.js)
 *
 * @param a
 * @param returnArrayBuffer - In Node.js, it forces the output to be an ArrayBuffer instead of a Buffer.
 *
 * @returns an ArrayBuffer or a Buffer with a binary representation of the input bigint
 *
 * @throws {@link RangeError} if a < 0.
 */
declare function bigintToBuf(a: bigint, returnArrayBuffer?: boolean): ArrayBuffer | Buffer;
/**
 * Converts an ArrayBuffer, TypedArray or Buffer (node.js) to a bigint
 * @param buf
 * @returns a bigint
 */
declare function bufToBigint(buf: ArrayBuffer | TypedArray | Buffer): bigint;
/**
 * Converts a non-negative bigint to a hexadecimal string
 * @param a - a non negative bigint
 * @param prefix0x - set to true to prefix the output with '0x'
 * @param byteLength - pad the output to have the desired byte length. Notice that the hex length is double the byte length.
 *
 * @returns hexadecimal representation of the input bigint
 *
 * @throws {@link RangeError} if a < 0
 */
declare function bigintToHex(a: bigint, prefix0x?: boolean, byteLength?: number): string;
/**
 * Converts a hexadecimal string to a bigint
 *
 * @param hexStr
 *
 * @returns a bigint
 *
 * @throws {@link RangeError} if input string does not hold an hexadecimal number
 */
declare function hexToBigint(hexStr: string): bigint;
/**
 * Converts a non-negative bigint representing a binary array of utf-8 encoded text to a string of utf-8 text
 *
 * @param a - A non-negative bigint representing a binary array of utf-8 encoded text.
 *
 * @returns a string text with utf-8 encoding
 *
 * @throws {@link RangeError} if a < 0.
 */
declare function bigintToText(a: bigint): string;
/**
 * Converts a utf-8 string to a bigint (from its binary representaion)
 *
 * @param text - A string text with utf-8 encoding
 *
 * @returns a bigint representing a binary array of the input utf-8 encoded text
 */
declare function textToBigint(text: string): bigint;
/**
 * Converts an ArrayBuffer, TypedArray or Buffer (in Node.js) containing utf-8 encoded text to a string of utf-8 text
 *
 * @param buf - A buffer containing utf-8 encoded text
 *
 * @returns a string text with utf-8 encoding
 */
declare function bufToText(buf: ArrayBuffer | TypedArray | Buffer): string;
/**
 * Converts a string of utf-8 encoded text to an ArrayBuffer or a Buffer (default in Node.js)
 *
 * @param str - A string of text (with utf-8 encoding)
 * @param returnArrayBuffer - When invoked in Node.js, it can force the output to be an ArrayBuffer instead of a Buffer.
 *
 * @returns an ArrayBuffer or a Buffer containing the utf-8 encoded text
 */
declare function textToBuf(str: string, returnArrayBuffer?: boolean): ArrayBuffer | Buffer;
/**
 * Returns the hexadecimal representation of a buffer.
 *
 * @param buf
 * @param prefix0x - set to true to prefix the output with '0x'
 * @param byteLength - pad the output to have the desired byte length. Notice that the hex length is double the byte length.
 *
 * @returns a string with a hexadecimal representation of the input buffer
 */
declare function bufToHex(buf: ArrayBuffer | TypedArray | Buffer, prefix0x?: boolean, byteLength?: number): string;
/**
 * Converts a hexadecimal string to a buffer
 *
 * @param hexStr - A string representing a number with hexadecimal notation
 * @param returnArrayBuffer - In Node.js, it forces the output to be an ArrayBuffer instead of a Buffer.
 *
 * @returns An ArrayBuffer or a Buffer
 *
 * @throws {@link RangeError} if input string does not hold an hexadecimal number
 */
declare function hexToBuf(hexStr: string, returnArrayBuffer?: boolean): ArrayBuffer | Buffer;
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
declare function bigintToBase64(a: bigint, urlsafe?: boolean, padding?: boolean): string;
/**
 * Converts a base64 string to bigint.
 * @param a base64 string. It accepts standard and URL-safe base64 with and without padding
 * @returns a bigint
 */
declare function base64ToBigint(a: string): bigint;

export { type TypedArray, base64ToBigint, bigintToBase64, bigintToBuf, bigintToHex, bigintToText, bufToBigint, bufToHex, bufToText, hexToBigint, hexToBuf, parseHex, textToBigint, textToBuf };
