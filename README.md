[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# bigint-conversion
Convert to/from [ES-2020 native JS implementation of BigInt](https://tc39.es/ecma262/#sec-bigint-objects) from/to:

- `Buffer` (node.js) or `ArrayBuffer|TypedArray` (native js),
- hex `string`,
- utf8-encoded text `string`.

It provides a common interface for the conversions that works for both **node.js** and **native javascript**.

> Note that there is not a directly visible `TypedArray()` constructor, but a set of typed array ones: `Int8Array()`, `Uint8Array()`, `Uint8ClampedArray()`, `Int16Array()`, `Uint16Array()`, `Int32Array()`, `Uint32Array()`, `Float32Array()`, `Float64Array()`, `BigInt64Array()`, `BigUint64Array()`.

## Installation

bigint-conversion is distributed for [web browsers and/or webviews supporting BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) as an ES6 module or an IIFE file; and for Node.js as a CJS module.

bigint-conversion can be imported to your project with `npm`:

```bash
npm install bigint-conversion
```

NPM installation defaults to the ES6 module for browsers and the CJS one for Node.js.

For web browsers, you can also directly download the [IIFE file](https://raw.githubusercontent.com/juanelas/bigint-conversion/master/dist/index.browser.bundle.iife.js) or the [ES6 module](https://raw.githubusercontent.com/juanelas/bigint-conversionmaster/dist/index.browser.bundle.mod.js) from GitHub.

> BigInt is [ES-2020](https://tc39.es/ecma262/#sec-bigint-objects). In order to use it with TypeScript you should set `lib` (and probably also `target` and `module`) to `esnext` in `tsconfig.json`.

# bigint-conversion JS Doc

### Functions

<dl>
<dt><a href="#bigintToBuf">bigintToBuf(a)</a> ⇒ <code>ArrayBuffer</code></dt>
<dd><p>Converts a bigint to an ArrayBuffer</p>
</dd>
<dt><a href="#bufToBigint">bufToBigint(buf)</a> ⇒ <code>bigint</code></dt>
<dd><p>Converts an ArrayBuffer, TypedArray or Buffer (node.js) to a bigint</p>
</dd>
<dt><a href="#bigintToHex">bigintToHex(a)</a> ⇒ <code>str</code></dt>
<dd><p>Converts a bigint to a hexadecimal string</p>
</dd>
<dt><a href="#hexToBigint">hexToBigint(hexStr)</a> ⇒ <code>bigint</code></dt>
<dd><p>Converts a hexadecimal string to a bigint</p>
</dd>
<dt><a href="#bigintToText">bigintToText(a)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a bigint representing a binary array of utf-8 encoded text to a string of utf-8 text</p>
</dd>
<dt><a href="#textToBigint">textToBigint(text)</a> ⇒ <code>bigint</code></dt>
<dd><p>Converts a utf-8 string to a bigint (from its binary representaion)</p>
</dd>
<dt><a href="#bufToText">bufToText(buf)</a> ⇒ <code>string</code></dt>
<dd><p>Converts an ArrayBuffer, TypedArray or Buffer (node.js) containing utf-8 encoded text to a string of utf-8 text</p>
</dd>
<dt><a href="#textToBuf">textToBuf(str)</a> ⇒ <code>ArrayBuffer</code></dt>
<dd><p>Converts a string of utf-8 encoded text to a Buffer (node) or ArrayBuffer (native js)</p>
</dd>
<dt><a href="#bufToHex">bufToHex(buf)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the hexadecimal representation of a buffer.</p>
</dd>
<dt><a href="#hexToBuf">hexToBuf(hexStr)</a> ⇒ <code>ArrayBuffer</code></dt>
<dd><p>Converts a hexadecimal string to a buffer</p>
</dd>
</dl>

### Typedefs

<dl>
<dt><a href="#TypedArray">TypedArray</a> : <code>Int8Array</code> | <code>Uint8Array</code> | <code>Uint8ClampedArray</code> | <code>Int16Array</code> | <code>Uint16Array</code> | <code>Int32Array</code> | <code>Uint32Array</code> | <code>Float32Array</code> | <code>Float64Array</code> | <code>BigInt64Array</code> | <code>BigUint64Array</code></dt>
<dd><p>A TypedArray object describes an array-like view of an underlying binary data buffer.</p>
</dd>
</dl>

<a name="bigintToBuf"></a>

### bigintToBuf(a) ⇒ <code>ArrayBuffer</code>
Converts a bigint to an ArrayBuffer

**Kind**: global function  
**Returns**: <code>ArrayBuffer</code> - An ArrayBuffer with a binary representation of the input bigint  

| Param | Type |
| --- | --- |
| a | <code>bigint</code> | 

<a name="bufToBigint"></a>

### bufToBigint(buf) ⇒ <code>bigint</code>
Converts an ArrayBuffer, TypedArray or Buffer (node.js) to a bigint

**Kind**: global function  
**Returns**: <code>bigint</code> - A BigInt  

| Param | Type |
| --- | --- |
| buf | <code>ArrayBuffer</code> \| [<code>TypedArray</code>](#TypedArray) \| <code>Buffer</code> | 

<a name="bigintToHex"></a>

### bigintToHex(a) ⇒ <code>str</code>
Converts a bigint to a hexadecimal string

**Kind**: global function  
**Returns**: <code>str</code> - A hexadecimal representation of the input bigint  

| Param | Type |
| --- | --- |
| a | <code>bigint</code> | 

<a name="hexToBigint"></a>

### hexToBigint(hexStr) ⇒ <code>bigint</code>
Converts a hexadecimal string to a bigint

**Kind**: global function  
**Returns**: <code>bigint</code> - A BigInt  

| Param | Type |
| --- | --- |
| hexStr | <code>string</code> | 

<a name="bigintToText"></a>

### bigintToText(a) ⇒ <code>string</code>
Converts a bigint representing a binary array of utf-8 encoded text to a string of utf-8 text

**Kind**: global function  
**Returns**: <code>string</code> - A string text with utf-8 encoding  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>bigint</code> | A bigint representing a binary array of utf-8 encoded text. |

<a name="textToBigint"></a>

### textToBigint(text) ⇒ <code>bigint</code>
Converts a utf-8 string to a bigint (from its binary representaion)

**Kind**: global function  
**Returns**: <code>bigint</code> - A bigint representing a binary array of the input utf-8 encoded text  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | A string text with utf-8 encoding |

<a name="bufToText"></a>

### bufToText(buf) ⇒ <code>string</code>
Converts an ArrayBuffer, TypedArray or Buffer (node.js) containing utf-8 encoded text to a string of utf-8 text

**Kind**: global function  
**Returns**: <code>string</code> - A string text with utf-8 encoding  

| Param | Type | Description |
| --- | --- | --- |
| buf | <code>ArrayBuffer</code> \| [<code>TypedArray</code>](#TypedArray) \| <code>Buffer</code> | A buffer containing utf-8 encoded text |

<a name="textToBuf"></a>

### textToBuf(str) ⇒ <code>ArrayBuffer</code>
Converts a string of utf-8 encoded text to a Buffer (node) or ArrayBuffer (native js)

**Kind**: global function  
**Returns**: <code>ArrayBuffer</code> - An ArrayBuffer containing the utf-8 encoded text  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | A string of text (with utf-8 encoding) |

<a name="bufToHex"></a>

### bufToHex(buf) ⇒ <code>string</code>
Returns the hexadecimal representation of a buffer.

**Kind**: global function  
**Returns**: <code>string</code> - A string with a hexadecimal representation of the input buffer  

| Param | Type |
| --- | --- |
| buf | <code>ArrayBuffer</code> \| [<code>TypedArray</code>](#TypedArray) \| <code>Buffer</code> | 

<a name="hexToBuf"></a>

### hexToBuf(hexStr) ⇒ <code>ArrayBuffer</code>
Converts a hexadecimal string to a buffer

**Kind**: global function  
**Returns**: <code>ArrayBuffer</code> - An ArrayBuffer  

| Param | Type | Description |
| --- | --- | --- |
| hexStr | <code>string</code> | A string representing a number with hexadecimal notation |

<a name="TypedArray"></a>

### TypedArray : <code>Int8Array</code> \| <code>Uint8Array</code> \| <code>Uint8ClampedArray</code> \| <code>Int16Array</code> \| <code>Uint16Array</code> \| <code>Int32Array</code> \| <code>Uint32Array</code> \| <code>Float32Array</code> \| <code>Float64Array</code> \| <code>BigInt64Array</code> \| <code>BigUint64Array</code>
A TypedArray object describes an array-like view of an underlying binary data buffer.

**Kind**: global typedef  

* * *