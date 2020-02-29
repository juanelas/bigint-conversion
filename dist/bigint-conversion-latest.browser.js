var bigintConversion = (function (exports) {
    'use strict';

    /**
     * Convert a bigint to a hexadecimal string
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
     * @param {string} hex
     * 
     * @returns {bigint} a
     */
    function hexToBigint(hex_str) {
        return BigInt('0x' + hex_str);
    }

    /**
     * Converts a buffer (node) or a uint8array (native js) containing utf-8 encoded text to a string of utf-8 text
     * 
     * @param {Buffer|Uint8Array} buf A buffer containing utf-8 encoded text.
     * 
     * @returns {string} A string text with utf-8 encoding 
     */
    function bufToText(buf) {
        {
            return new TextDecoder().decode(buf);
        }
    }

    /**
     * Converts a string of textwith utf-8 encoding to a buffer (node) or uint8array (native js)
     * 
     * @param {string} str A string text with utf-8 encoding
     * 
     * @returns {Buffer|Uint8Array} a buffer containing the utf-8 encoded text.
     */
    function textToBuf(str) {
        {
            return new TextEncoder().encode(str);
        }
    }

    /**
     * Returns the hexadecimal representation of a buffer (node) or uint8array (native js)
     * 
     * @param {Buffer|Uint8Array} a buffer containing utf-8 encoded text.
     * 
     * @returns {string} A string with a hexadecimal representation of the input buffer
     */
    function bufToHex(buf) {
        {
            var s = '', h = '0123456789abcdef';
            (new Uint8Array(buf)).forEach((v) => { s += h[v >> 4] + h[v & 15]; });
            return s;
        }
    }

    /**
     * Converts a hexadecimal string to a buffer (node) or uint8array (native js)
     * 
     * @param {string} hex_str A hexadecimal string
     * 
     * @returns {Buffer|Uint8Array} a buffer (node) or uint8array (native js) 
     */
    function hexToBuf(hex_str) {
        {
            return new Uint8Array(hex_str.match(/[\da-f]{2}/gi).map(function (h) {
                return parseInt(h, 16);
            }));
        }
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
     * Converts a utf-8 string to a bigint (from its buffer|uint8array binary representaion) 
     * 
     * @param {string} text A string text with utf-8 encoding 
     * 
     * @returns {bigint} A bigint representing a binary array of the input utf-8 encoded text.
     */
    function textToBigint(text) {
        return hexToBigint(bufToHex(textToBuf(text)));
    }

    exports.bigintToHex = bigintToHex;
    exports.bigintToText = bigintToText;
    exports.bufToHex = bufToHex;
    exports.bufToText = bufToText;
    exports.hexToBigint = hexToBigint;
    exports.hexToBuf = hexToBuf;
    exports.textToBigint = textToBigint;
    exports.textToBuf = textToBuf;

    return exports;

}({}));
