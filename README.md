# bigint-conversion
Convert to/from native JS implementation of bigint ([ECMA-262](https://tc39.es/ecma262/#sec-bigint-objects)) from/to:

- buffer (node.js) or uint8array (native js),
- hex string,
- utf8 text string.

It provides a common interface for the conversions that works for both node.js and javascript native.

## Installation

bigint-conversion is distributed for [web browsers and/or webviews supporting BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) as an ES6 module or an IIFE file; and for Node.js as a CJS module.

bigint-conversion can be imported to your project with `npm`:

```bash
npm install bigint-conversion
```

NPM installation defaults to the ES6 module for browsers and the CJS one for Node.js.

For web browsers, you can also directly download the [IIFE file](https://raw.githubusercontent.com/juanelas/bigint-conversion/master/dist/bigint-conversion-latest.browser.js) or the [ES6 module](https://raw.githubusercontent.com/juanelas/bigint-conversionmaster/dist/bigint-conversion-latest.browser.mod.min.js) from GitHub.

> BigInt is currently [ECMA-262](https://tc39.es/ecma262/#sec-bigint-objects) and thus in order to use it with TypeScript you should set `lib` (and probably also `target` and `module`) to `esnext` in `tsconfig.json`.

# bigint-conversion JS Doc

## Functions

<dl>
<dt><a href="#bigintToBuf">bigintToBuf(a)</a> ⇒ <code>Buffer</code> | <code>Uint8Array</code></dt>
<dd><p>Convert a bigint to a buffer (node.js) or uint8array (native js)</p>
</dd>
<dt><a href="#bufToBigint">bufToBigint(buf)</a> ⇒ <code>bigint</code></dt>
<dd><p>Converts a buffer (node.js) or uint8array (native js) to a bigint</p>
</dd>
<dt><a href="#bigintToHex">bigintToHex(a)</a> ⇒ <code>str</code></dt>
<dd><p>Convert a bigint to a hexadecimal string</p>
</dd>
<dt><a href="#hexToBigint">hexToBigint(hex)</a> ⇒ <code>bigint</code></dt>
<dd><p>Converts a hexadecimal string to a bigint</p>
</dd>
<dt><a href="#bigintToText">bigintToText(a)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a bigint representing a binary array of utf-8 encoded text to a string of utf-8 text</p>
</dd>
<dt><a href="#textToBigint">textToBigint(text)</a> ⇒ <code>bigint</code></dt>
<dd><p>Converts a utf-8 string to a bigint (from its buffer|uint8array binary representaion)</p>
</dd>
<dt><a href="#bufToText">bufToText(buf)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a buffer (node) or a uint8array (native js) containing utf-8 encoded text to a string of utf-8 text</p>
</dd>
<dt><a href="#textToBuf">textToBuf(str)</a> ⇒ <code>Buffer</code> | <code>Uint8Array</code></dt>
<dd><p>Converts a string of textwith utf-8 encoding to a buffer (node) or uint8array (native js)</p>
</dd>
<dt><a href="#bufToHex">bufToHex(a)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the hexadecimal representation of a buffer (node) or uint8array (native js)</p>
</dd>
<dt><a href="#hexToBuf">hexToBuf(hex_str)</a> ⇒ <code>Buffer</code> | <code>Uint8Array</code></dt>
<dd><p>Converts a hexadecimal string to a buffer (node) or uint8array (native js)</p>
</dd>
</dl>

<a name="bigintToBuf"></a>

## bigintToBuf(a) ⇒ <code>Buffer</code> \| <code>Uint8Array</code>
Convert a bigint to a buffer (node.js) or uint8array (native js)

**Kind**: global function  
**Returns**: <code>Buffer</code> \| <code>Uint8Array</code> - A buffer (node.js) or uint8array (native js) with a binary representation of the input bigint  

| Param | Type |
| --- | --- |
| a | <code>bigint</code> | 

<a name="bufToBigint"></a>

## bufToBigint(buf) ⇒ <code>bigint</code>
Converts a buffer (node.js) or uint8array (native js) to a bigint

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| buf | <code>Buffer</code> \| <code>Uint8Array</code> | buffer (node.js) or uint8array (native js) |

<a name="bigintToHex"></a>

## bigintToHex(a) ⇒ <code>str</code>
Convert a bigint to a hexadecimal string

**Kind**: global function  
**Returns**: <code>str</code> - A hexadecimal representation of the input bigint  

| Param | Type |
| --- | --- |
| a | <code>bigint</code> | 

<a name="hexToBigint"></a>

## hexToBigint(hex) ⇒ <code>bigint</code>
Converts a hexadecimal string to a bigint

**Kind**: global function  
**Returns**: <code>bigint</code> - a  

| Param | Type |
| --- | --- |
| hex | <code>string</code> | 

<a name="bigintToText"></a>

## bigintToText(a) ⇒ <code>string</code>
Converts a bigint representing a binary array of utf-8 encoded text to a string of utf-8 text

**Kind**: global function  
**Returns**: <code>string</code> - A string text with utf-8 encoding  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>bigint</code> | A bigint representing a binary array of utf-8 encoded text. |

<a name="textToBigint"></a>

## textToBigint(text) ⇒ <code>bigint</code>
Converts a utf-8 string to a bigint (from its buffer|uint8array binary representaion)

**Kind**: global function  
**Returns**: <code>bigint</code> - A bigint representing a binary array of the input utf-8 encoded text  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | A string text with utf-8 encoding |

<a name="bufToText"></a>

## bufToText(buf) ⇒ <code>string</code>
Converts a buffer (node) or a uint8array (native js) containing utf-8 encoded text to a string of utf-8 text

**Kind**: global function  
**Returns**: <code>string</code> - A string text with utf-8 encoding  

| Param | Type | Description |
| --- | --- | --- |
| buf | <code>Buffer</code> \| <code>Uint8Array</code> | A buffer containing utf-8 encoded text |

<a name="textToBuf"></a>

## textToBuf(str) ⇒ <code>Buffer</code> \| <code>Uint8Array</code>
Converts a string of textwith utf-8 encoding to a buffer (node) or uint8array (native js)

**Kind**: global function  
**Returns**: <code>Buffer</code> \| <code>Uint8Array</code> - a buffer containing the utf-8 encoded text  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | A string text with utf-8 encoding |

<a name="bufToHex"></a>

## bufToHex(a) ⇒ <code>string</code>
Returns the hexadecimal representation of a buffer (node) or uint8array (native js)

**Kind**: global function  
**Returns**: <code>string</code> - A string with a hexadecimal representation of the input buffer  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Buffer</code> \| <code>Uint8Array</code> | buffer containing utf-8 encoded text |

<a name="hexToBuf"></a>

## hexToBuf(hex_str) ⇒ <code>Buffer</code> \| <code>Uint8Array</code>
Converts a hexadecimal string to a buffer (node) or uint8array (native js)

**Kind**: global function  
**Returns**: <code>Buffer</code> \| <code>Uint8Array</code> - a buffer (node) or uint8array (native js)  

| Param | Type | Description |
| --- | --- | --- |
| hex_str | <code>string</code> | A hexadecimal string |


* * *