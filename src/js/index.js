'use strict'

/**
 * Converts a bigint to a buffer (node.js) or ArrayBuffer (native js)
 *
 * @param {bigint} a
 *
 * @returns {Buffer|ArrayBuffer} A buffer (node.js) or ArrayBuffer (native js) with a binary representation of the input bigint
 */
export function bigintToBuf (a) {
  return hexToBuf(bigintToHex(a))
}

/**
 * Converts a Buffer (node.js) or ArrayBuffer|TypedArray (native js) to a bigint
 *
 * @param {Buffer|ArrayBuffer|TypedArray} buf
 *
 * @returns {bigint} A BigInt
 */
export function bufToBigint (buf) {
  return BigInt('0x' + bufToHex(buf))
}

/**
 * Converts a bigint to a hexadecimal string
 *
 * @param {bigint} a
 *
 * @returns {str} A hexadecimal representation of the input bigint
 */
export function bigintToHex (a) {
  return a.toString(16)
}

/**
 * Converts a hexadecimal string to a bigint
 *
 * @param {string} hexStr
 *
 * @returns {bigint} A BigInt
 */
export function hexToBigint (hexStr) {
  return BigInt('0x' + hexStr)
}

/**
 * Converts a bigint representing a binary array of utf-8 encoded text to a string of utf-8 text
 *
 * @param {bigint} a A bigint representing a binary array of utf-8 encoded text.
 *
 * @returns {string} A string text with utf-8 encoding
 */
export function bigintToText (a) {
  return bufToText(hexToBuf(a.toString(16)))
}

/**
 * Converts a utf-8 string to a bigint (from its binary representaion)
 *
 * @param {string} text A string text with utf-8 encoding
 *
 * @returns {bigint} A bigint representing a binary array of the input utf-8 encoded text
 */
export function textToBigint (text) {
  return hexToBigint(bufToHex(textToBuf(text)))
}

/**
 * Converts a buffer (node) or a ArrayBuffer (native js) containing utf-8 encoded text to a string of utf-8 text
 *
 * @param {Buffer|ArrayBuffer|TypedArray} buf A buffer containing utf-8 encoded text
 *
 * @returns {string} A string text with utf-8 encoding
 */
export function bufToText (buf) {
  if (process.browser) return new TextDecoder().decode(new Uint8Array(buf))
  else return Buffer.from(buf).toString()
}

/**
 * Converts a string of utf-8 encoded text to a Buffer (node) or ArrayBuffer (native js)
 *
 * @param {string} str A string of text (with utf-8 encoding)
 *
 * @returns {Buffer|ArrayBuffer} A buffer containing the utf-8 encoded text
 */
export function textToBuf (str) {
  if (process.browser) return new TextEncoder().encode(str).buffer
  else return Buffer.from(str)
}

/**
 * Returns the hexadecimal representation of a buffer.
 *
 * @param {Buffer|ArrayBuffer|TypedArray} buf
 *
 * @returns {string} A string with a hexadecimal representation of the input buffer
 */
export function bufToHex (buf) {
  /* eslint-disable no-lone-blocks */
  if (process.browser) {
    let s = ''
    const h = '0123456789abcdef';
    (new Uint8Array(buf)).forEach((v) => {
      s += h[v >> 4] + h[v & 15]
    })
    return s
  } else {
    return Buffer.from(buf).toString('hex')
  }
  /* eslint-enable no-lone-blocks */
}

/**
 * Converts a hexadecimal string to a buffer
 *
 * @param {string} hexStr A string representing a number with hexadecimal notation
 *
 * @returns {Buffer|ArrayBuffer} A Buffer (node) or ArrayBuffer (native js)
 */
export function hexToBuf (hexStr) {
  /* eslint-disable no-lone-blocks */
  if (process.browser) {
    return Uint8Array.from(hexStr.trimLeft('0x').match(/[\da-f]{2}/gi).map((h) => {
      return parseInt(h, 16)
    })).buffer
  } else {
    return Buffer.from(hexStr, 'hex')
  }
  /* eslint-enable no-lone-blocks */
}