[![Licence: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Node.js CI](https://github.com/juanelas/bigint-conversion/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/juanelas/bigint-conversion/actions/workflows/build-and-test.yml)

# bigint-conversion

Convert to/from non-negative integers represented with [ES-2020 native JS implementation of BigInt](https://tc39.es/ecma262/#sec-bigint-objects) from/to:

- `Buffer` (node.js) or `ArrayBuffer|TypedArray` (native js),
- hex `string`,
- utf8-encoded text `string`,
- standard and url-safe base64 with and without padding.

It provides a common interface for the conversions that works for both **node.js** and **native javascript**.

> Note that there is not a directly visible `TypedArray()` constructor, but a set of typed array ones: `Int8Array()`, `Uint8Array()`, `Uint8ClampedArray()`, `Int16Array()`, `Uint16Array()`, `Int32Array()`, `Uint32Array()`, `Float32Array()`, `Float64Array()`, `BigInt64Array()`, `BigUint64Array()`.

## Usage

`bigint-conversion` can be imported to your project with `npm`:

```console
npm install bigint-conversion
```

Then either require (Node.js CJS):

```javascript
const bigintConversion = require('bigint-conversion')
```

or import (JavaScript ES module):

```javascript
import * as bigintConversion from 'bigint-conversion'
```

The appropriate version for browser or node is automatically exported.

> BigInt is [ES-2020](https://tc39.es/ecma262/#sec-bigint-objects). In order to use it with TypeScript you should set `target` (and probably also `lib`) to at least `es2020` in `tsconfig.json`.

You can also download the [IIFE bundle](https://raw.githubusercontent.com/juanelas/bigint-conversion/main/dist/bundles/iife.js), the [ESM bundle](https://raw.githubusercontent.com/juanelas/bigint-conversion/main/dist/bundles/esm.min.js) or the [UMD bundle](https://raw.githubusercontent.com/juanelas/bigint-conversion/main/dist/bundles/umd.js) and manually add it to your project, or, if you have already installed `bigint-conversion` in your project, just get the bundles from `node_modules/bigint-conversion/dist/bundles/`.

## API reference documentation

[Check the API](./docs/API.md)
