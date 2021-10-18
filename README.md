[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


# @my-scope/my-package-name

Convert to/from non-negative integers represented with [ES-2020 native JS implementation of BigInt](https://tc39.es/ecma262/#sec-bigint-objects) from/to:

- `Buffer` (node.js) or `ArrayBuffer|TypedArray` (native js),
- hex `string`,
- utf8-encoded text `string`,
- standard and url-safe base64 with and without padding.

It provides a common interface for the conversions that works for both **node.js** and **native javascript**.

> Note that there is not a directly visible `TypedArray()` constructor, but a set of typed array ones: `Int8Array()`, `Uint8Array()`, `Uint8ClampedArray()`, `Int16Array()`, `Uint16Array()`, `Int32Array()`, `Uint32Array()`, `Float32Array()`, `Float64Array()`, `BigInt64Array()`, `BigUint64Array()`.

## Usage

`@my-scope/my-package-name` can be imported to your project with `npm`:

```console
npm install @my-scope/my-package-name
```

Then either require (Node.js CJS):

```javascript
const myPackageName = require('@my-scope/my-package-name')
```

or import (JavaScript ES module):

```javascript
import * as myPackageName from '@my-scope/my-package-name'
```

The appropriate version for browser or node is automatically exported.

> BigInt is [ES-2020](https://tc39.es/ecma262/#sec-bigint-objects). In order to use it with TypeScript you should set `target` (and probably also `lib`) to at least `es2020` in `tsconfig.json`.

You can also download the IIFE bundle, the ESM bundle or the UMD bundle and manually add it to your project, or, if you have already installed `@my-scope/my-package-name` in your project, just get the bundles from `node_modules/@my-scope/my-package-name/dist/bundles/`.

## API reference documentation

[Check the API](./docs/API.md)
