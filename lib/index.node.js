'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

/**
 * A TypedArray object describes an array-like view of an underlying binary data buffer.
 * @typedef {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|BigInt64Array|BigUint64Array} TypedArray
 */

/**
 * Converts a bigint to an ArrayBuffer or a Buffer (default for Node.js)
 *
 * @param {bigint} a
 * @param {boolean} [returnArrayBuffer = false] In Node JS forces the output to be an ArrayBuffer instead of a Buffer (default).
 *
 * @returns {ArrayBuffer|Buffer} An ArrayBuffer or a Buffer with a binary representation of the input bigint
 */
function bigintToBuf (a, returnArrayBuffer = false) {
  return hexToBuf(bigintToHex(a), returnArrayBuffer)
}

/**
 * Converts an ArrayBuffer, TypedArray or Buffer (node.js) to a bigint
 *
 * @param {ArrayBuffer|TypedArray|Buffer} buf
 *
 * @returns {bigint} A BigInt
 */
function bufToBigint (buf) {
  return BigInt('0x' + bufToHex(buf))
}

/**
 * Converts a bigint to a hexadecimal string
 *
 * @param {bigint} a
 *
 * @returns {str} A hexadecimal representation of the input bigint
 */
function bigintToHex (a) {
  return a.toString(16)
}

/**
 * Converts a hexadecimal string to a bigint
 *
 * @param {string} hexStr
 *
 * @returns {bigint} A BigInt
 */
function hexToBigint (hexStr) {
  return BigInt('0x' + hexStr)
}

/**
 * Converts a bigint representing a binary array of utf-8 encoded text to a string of utf-8 text
 *
 * @param {bigint} a A bigint representing a binary array of utf-8 encoded text.
 *
 * @returns {string} A string text with utf-8 encoding
 */
function bigintToText (a) {
  return bufToText(hexToBuf(a.toString(16)))
}

/**
 * Converts a utf-8 string to a bigint (from its binary representaion)
 *
 * @param {string} text A string text with utf-8 encoding
 *
 * @returns {bigint} A bigint representing a binary array of the input utf-8 encoded text
 */
function textToBigint (text) {
  return hexToBigint(bufToHex(textToBuf(text)))
}

/**
 *Converts an ArrayBuffer, TypedArray or Buffer (in Node.js) containing utf-8 encoded text to a string of utf-8 text
 *
 * @param {ArrayBuffer|TypedArray|Buffer} buf A buffer containing utf-8 encoded text
 *
 * @returns {string} A string text with utf-8 encoding
 */
function bufToText (buf) {
  return Buffer.from(buf).toString()
}

/**
 * Converts a string of utf-8 encoded text to an ArrayBuffer or a Buffer (default in Node.js)
 *
 * @param {string} str A string of text (with utf-8 encoding)
 * @param {boolean} [returnArrayBuffer = false] In Node JS forces the output to be an ArrayBuffer instead of a Buffer (default).
 *
 * @returns {ArrayBuffer|Buffer} An ArrayBuffer or a Buffer containing the utf-8 encoded text
 */
function textToBuf (str, returnArrayBuffer = false) {
  if (!returnArrayBuffer) {
    return Buffer.from(new TextEncoder().encode(str).buffer)
  }
  return new TextEncoder().encode(str).buffer
}

/**
 * Returns the hexadecimal representation of a buffer.
 *
 * @param {ArrayBuffer|TypedArray|Buffer} buf
 *
 * @returns {string} A string with a hexadecimal representation of the input buffer
 */
function bufToHex (buf) {
  /* eslint-disable no-lone-blocks */
  return Buffer.from(buf).toString('hex')
  /* eslint-enable no-lone-blocks */
}

/**
 * Converts a hexadecimal string to a buffer
 *
 * @param {string} hexStr A string representing a number with hexadecimal notation
 * @param {boolean} [returnArrayBuffer = false] In Node JS forces the output to be an ArrayBuffer instead of a Buffer (default).
 *
 * @returns {ArrayBuffer|Buffer} An ArrayBuffer or a Buffer
 */
function hexToBuf (hexStr, returnArrayBuffer = false) {
  hexStr = !(hexStr.length % 2) ? hexStr : '0' + hexStr
  /* eslint-disable no-lone-blocks */
  {
    const b = Buffer.from(hexStr, 'hex')
    if (!returnArrayBuffer) return b
    else return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)
  }
  /* eslint-enable no-lone-blocks */
}

exports.bigintToBuf = bigintToBuf
exports.bigintToHex = bigintToHex
exports.bigintToText = bigintToText
exports.bufToBigint = bufToBigint
exports.bufToHex = bufToHex
exports.bufToText = bufToText
exports.hexToBigint = hexToBigint
exports.hexToBuf = hexToBuf
exports.textToBigint = textToBigint
exports.textToBuf = textToBuf
