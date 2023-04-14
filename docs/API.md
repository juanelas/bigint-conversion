# bigint-conversion - v2.4.1

Conversions from/to bingint to TypedArray/Buffer, hex

**`Remarks`**

This module runs perfectly in node.js and browsers

## Table of contents

### Type Aliases

- [TypedArray](API.md#typedarray)

### Functions

- [base64ToBigint](API.md#base64tobigint)
- [bigintToBase64](API.md#biginttobase64)
- [bigintToBuf](API.md#biginttobuf)
- [bigintToHex](API.md#biginttohex)
- [bigintToText](API.md#biginttotext)
- [bufToBigint](API.md#buftobigint)
- [bufToHex](API.md#buftohex)
- [bufToText](API.md#buftotext)
- [hexToBigint](API.md#hextobigint)
- [hexToBuf](API.md#hextobuf)
- [parseHex](API.md#parsehex)
- [textToBigint](API.md#texttobigint)
- [textToBuf](API.md#texttobuf)

## Type Aliases

### TypedArray

Ƭ **TypedArray**: `Int8Array` \| `Uint8Array` \| `Uint8ClampedArray` \| `Int16Array` \| `Uint16Array` \| `Int32Array` \| `Uint32Array` \| `Float32Array` \| `Float64Array` \| `BigInt64Array` \| `BigUint64Array`

A TypedArray object describes an array-like view of an underlying binary data buffer.

#### Defined in

[index.ts:15](https://github.com/juanelas/bigint-conversion/blob/027e20e/src/ts/index.ts#L15)

## Functions

### base64ToBigint

▸ **base64ToBigint**(`a`): `bigint`

Converts a base64 string to bigint.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `string` | base64 string. It accepts standard and URL-safe base64 with and without padding |

#### Returns

`bigint`

a bigint

#### Defined in

[index.ts:225](https://github.com/juanelas/bigint-conversion/blob/027e20e/src/ts/index.ts#L225)

___

### bigintToBase64

▸ **bigintToBase64**(`a`, `urlsafe?`, `padding?`): `string`

Converts an arbitrary-size non-negative bigint to a base64 string

**`Throws`**

Thrown if a < 0

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `a` | `bigint` | `undefined` | a non negative bigint |
| `urlsafe` | `boolean` | `false` | if true Base64 URL encoding is used ('+' and '/' are replaced by '-', '_') |
| `padding` | `boolean` | `true` | if false, padding (trailing '=') is removed |

#### Returns

`string`

a base64 representation of the input bigint

#### Defined in

[index.ts:216](https://github.com/juanelas/bigint-conversion/blob/027e20e/src/ts/index.ts#L216)

___

### bigintToBuf

▸ **bigintToBuf**(`a`, `returnArrayBuffer?`): `ArrayBuffer` \| `Buffer`

Converts an arbitrary-size non-negative bigint to an ArrayBuffer or a Buffer (default for Node.js)

**`Throws`**

RangeError if a < 0.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `a` | `bigint` | `undefined` |  |
| `returnArrayBuffer` | `boolean` | `false` | In Node.js, it forces the output to be an ArrayBuffer instead of a Buffer. |

#### Returns

`ArrayBuffer` \| `Buffer`

an ArrayBuffer or a Buffer with a binary representation of the input bigint

#### Defined in

[index.ts:53](https://github.com/juanelas/bigint-conversion/blob/027e20e/src/ts/index.ts#L53)

___

### bigintToHex

▸ **bigintToHex**(`a`, `prefix0x?`, `byteLength?`): `string`

Converts a non-negative bigint to a hexadecimal string

**`Throws`**

RangeError if a < 0

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `a` | `bigint` | `undefined` | a non negative bigint |
| `prefix0x` | `boolean` | `false` | set to true to prefix the output with '0x' |
| `byteLength?` | `number` | `undefined` | pad the output to have the desired byte length. Notice that the hex length is double the byte length. |

#### Returns

`string`

hexadecimal representation of the input bigint

#### Defined in

[index.ts:86](https://github.com/juanelas/bigint-conversion/blob/027e20e/src/ts/index.ts#L86)

___

### bigintToText

▸ **bigintToText**(`a`): `string`

Converts a non-negative bigint representing a binary array of utf-8 encoded text to a string of utf-8 text

**`Throws`**

RangeError if a < 0.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `bigint` | A non-negative bigint representing a binary array of utf-8 encoded text. |

#### Returns

`string`

a string text with utf-8 encoding

#### Defined in

[index.ts:113](https://github.com/juanelas/bigint-conversion/blob/027e20e/src/ts/index.ts#L113)

___

### bufToBigint

▸ **bufToBigint**(`buf`): `bigint`

Converts an ArrayBuffer, TypedArray or Buffer (node.js) to a bigint

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | [`TypedArray`](API.md#typedarray) \| `ArrayBuffer` \| `Buffer` |

#### Returns

`bigint`

a bigint

#### Defined in

[index.ts:63](https://github.com/juanelas/bigint-conversion/blob/027e20e/src/ts/index.ts#L63)

___

### bufToHex

▸ **bufToHex**(`buf`, `prefix0x?`, `byteLength?`): `string`

Returns the hexadecimal representation of a buffer.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `buf` | [`TypedArray`](API.md#typedarray) \| `ArrayBuffer` \| `Buffer` | `undefined` |  |
| `prefix0x` | `boolean` | `false` | set to true to prefix the output with '0x' |
| `byteLength?` | `number` | `undefined` | pad the output to have the desired byte length. Notice that the hex length is double the byte length. |

#### Returns

`string`

a string with a hexadecimal representation of the input buffer

#### Defined in

[index.ts:165](https://github.com/juanelas/bigint-conversion/blob/027e20e/src/ts/index.ts#L165)

___

### bufToText

▸ **bufToText**(`buf`): `string`

Converts an ArrayBuffer, TypedArray or Buffer (in Node.js) containing utf-8 encoded text to a string of utf-8 text

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buf` | [`TypedArray`](API.md#typedarray) \| `ArrayBuffer` \| `Buffer` | A buffer containing utf-8 encoded text |

#### Returns

`string`

a string text with utf-8 encoding

#### Defined in

[index.ts:136](https://github.com/juanelas/bigint-conversion/blob/027e20e/src/ts/index.ts#L136)

___

### hexToBigint

▸ **hexToBigint**(`hexStr`): `bigint`

Converts a hexadecimal string to a bigint

**`Throws`**

RangeError if input string does not hold an hexadecimal number

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexStr` | `string` |

#### Returns

`bigint`

a bigint

#### Defined in

[index.ts:100](https://github.com/juanelas/bigint-conversion/blob/027e20e/src/ts/index.ts#L100)

___

### hexToBuf

▸ **hexToBuf**(`hexStr`, `returnArrayBuffer?`): `ArrayBuffer` \| `Buffer`

Converts a hexadecimal string to a buffer

**`Throws`**

RangeError if input string does not hold an hexadecimal number

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `hexStr` | `string` | `undefined` | A string representing a number with hexadecimal notation |
| `returnArrayBuffer` | `boolean` | `false` | In Node.js, it forces the output to be an ArrayBuffer instead of a Buffer. |

#### Returns

`ArrayBuffer` \| `Buffer`

An ArrayBuffer or a Buffer

#### Defined in

[index.ts:193](https://github.com/juanelas/bigint-conversion/blob/027e20e/src/ts/index.ts#L193)

___

### parseHex

▸ **parseHex**(`a`, `prefix0x?`, `byteLength?`): `string`

Parses a hexadecimal string for correctness and returns it with or without '0x' prefix, and/or with the specified byte length

**`Throws`**

RangeError if input string does not hold an hexadecimal number

**`Throws`**

RangeError if requested byte length is less than the input byte length

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `a` | `string` | `undefined` | the string with an hexadecimal number to be parsed |
| `prefix0x` | `boolean` | `false` | set to true to prefix the output with '0x' |
| `byteLength?` | `number` | `undefined` | pad the output to have the desired byte length. Notice that the hex length is double the byte length. |

#### Returns

`string`

#### Defined in

[index.ts:28](https://github.com/juanelas/bigint-conversion/blob/027e20e/src/ts/index.ts#L28)

___

### textToBigint

▸ **textToBigint**(`text`): `bigint`

Converts a utf-8 string to a bigint (from its binary representaion)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | A string text with utf-8 encoding |

#### Returns

`bigint`

a bigint representing a binary array of the input utf-8 encoded text

#### Defined in

[index.ts:125](https://github.com/juanelas/bigint-conversion/blob/027e20e/src/ts/index.ts#L125)

___

### textToBuf

▸ **textToBuf**(`str`, `returnArrayBuffer?`): `ArrayBuffer` \| `Buffer`

Converts a string of utf-8 encoded text to an ArrayBuffer or a Buffer (default in Node.js)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `string` | `undefined` | A string of text (with utf-8 encoding) |
| `returnArrayBuffer` | `boolean` | `false` | When invoked in Node.js, it can force the output to be an ArrayBuffer instead of a Buffer. |

#### Returns

`ArrayBuffer` \| `Buffer`

an ArrayBuffer or a Buffer containing the utf-8 encoded text

#### Defined in

[index.ts:149](https://github.com/juanelas/bigint-conversion/blob/027e20e/src/ts/index.ts#L149)
