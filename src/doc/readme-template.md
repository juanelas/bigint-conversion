[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/juanelas/bigint-conversion.svg?branch=master)](https://travis-ci.org/juanelas/bigint-conversion)
[![Coverage Status](https://coveralls.io/repos/github/juanelas/bigint-conversion/badge.svg?branch=master)](https://coveralls.io/github/juanelas/bigint-conversion?branch=master)

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

{{>main}}

* * *