# bigint-conversion - v2.2.1

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
- [textToBigint](API.md#texttobigint)
- [textToBuf](API.md#texttobuf)

## Type Aliases

### TypedArray

Ƭ **TypedArray**: `Int8Array` \| `Uint8Array` \| `Uint8ClampedArray` \| `Int16Array` \| `Uint16Array` \| `Int32Array` \| `Uint32Array` \| `Float32Array` \| `Float64Array` \| `BigInt64Array` \| `BigUint64Array`

A TypedArray object describes an array-like view of an underlying binary data buffer.

#### Defined in

[index.ts:15](https://github.com/juanelas/bigint-conversion/blob/4f7200f/src/ts/index.ts#L15)

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

[index.ts:204](https://github.com/juanelas/bigint-conversion/blob/4f7200f/src/ts/index.ts#L204)

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

[index.ts:195](https://github.com/juanelas/bigint-conversion/blob/4f7200f/src/ts/index.ts#L195)

___

### bigintToBuf

▸ **bigintToBuf**(`a`, `returnArrayBuffer?`): `ArrayBuffer` \| `Buffer`

Converts an arbitrary-size non-negative bigint to an ArrayBuffer or a Buffer (default for Node.js)

**`Throws`**

Thrown if a < 0.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `a` | `bigint` | `undefined` |  |
| `returnArrayBuffer` | `boolean` | `false` | In Node.js, it forces the output to be an ArrayBuffer instead of a Buffer. |

#### Returns

`ArrayBuffer` \| `Buffer`

an ArrayBuffer or a Buffer with a binary representation of the input bigint

#### Defined in

[index.ts:28](https://github.com/juanelas/bigint-conversion/blob/4f7200f/src/ts/index.ts#L28)

___

### bigintToHex

▸ **bigintToHex**(`a`): `string`

Converts a non-negative bigint to a hexadecimal string

**`Throws`**

Thrown if a < 0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `bigint` | a non negative bigint |

#### Returns

`string`

hexadecimal representation of the input bigint

#### Defined in

[index.ts:59](https://github.com/juanelas/bigint-conversion/blob/4f7200f/src/ts/index.ts#L59)

___

### bigintToText

▸ **bigintToText**(`a`): `string`

Converts a non-negative bigint representing a binary array of utf-8 encoded text to a string of utf-8 text

**`Throws`**

Thrown if a < 0.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `bigint` | A non-negative bigint representing a binary array of utf-8 encoded text. |

#### Returns

`string`

a string text with utf-8 encoding

#### Defined in

[index.ts:85](https://github.com/juanelas/bigint-conversion/blob/4f7200f/src/ts/index.ts#L85)

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

[index.ts:38](https://github.com/juanelas/bigint-conversion/blob/4f7200f/src/ts/index.ts#L38)

___

### bufToHex

▸ **bufToHex**(`buf`): `string`

Returns the hexadecimal representation of a buffer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `buf` | [`TypedArray`](API.md#typedarray) \| `ArrayBuffer` \| `Buffer` |

#### Returns

`string`

a string with a hexadecimal representation of the input buffer

#### Defined in

[index.ts:135](https://github.com/juanelas/bigint-conversion/blob/4f7200f/src/ts/index.ts#L135)

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

[index.ts:108](https://github.com/juanelas/bigint-conversion/blob/4f7200f/src/ts/index.ts#L108)

___

### hexToBigint

▸ **hexToBigint**(`hexStr`): `bigint`

Converts a hexadecimal string to a bigint

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexStr` | `string` |

#### Returns

`bigint`

a bigint

#### Defined in

[index.ts:71](https://github.com/juanelas/bigint-conversion/blob/4f7200f/src/ts/index.ts#L71)

___

### hexToBuf

▸ **hexToBuf**(`hexStr`, `returnArrayBuffer?`): `ArrayBuffer` \| `Buffer`

Converts a hexadecimal string to a buffer

**`Throws`**

Thrown if hexStr is undefined or not a hexadecimal.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `hexStr` | `string` | `undefined` | A string representing a number with hexadecimal notation |
| `returnArrayBuffer` | `boolean` | `false` | In Node.js, it forces the output to be an ArrayBuffer instead of a Buffer. |

#### Returns

`ArrayBuffer` \| `Buffer`

An ArrayBuffer or a Buffer

#### Defined in

[index.ts:164](https://github.com/juanelas/bigint-conversion/blob/4f7200f/src/ts/index.ts#L164)

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

[index.ts:97](https://github.com/juanelas/bigint-conversion/blob/4f7200f/src/ts/index.ts#L97)

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

[index.ts:121](https://github.com/juanelas/bigint-conversion/blob/4f7200f/src/ts/index.ts#L121)
