[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
{{GITHUB_ACTIONS_BADGES}}

# {{PKG_NAME}}
Convert to/from [ES-2020 native JS implementation of BigInt](https://tc39.es/ecma262/#sec-bigint-objects) from/to:

- `Buffer` (node.js) or `ArrayBuffer|TypedArray` (native js),
- hex `string`,
- utf8-encoded text `string`.

It provides a common interface for the conversions that works for both **node.js** and **native javascript**.

> Note that there is not a directly visible `TypedArray()` constructor, but a set of typed array ones: `Int8Array()`, `Uint8Array()`, `Uint8ClampedArray()`, `Int16Array()`, `Uint16Array()`, `Int32Array()`, `Uint32Array()`, `Float32Array()`, `Float64Array()`, `BigInt64Array()`, `BigUint64Array()`.

## Installation

{{PKG_NAME}} is distributed for [web browsers and/or webviews supporting BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) as an ES6 module or an IIFE file; and for Node.js as a CJS module.

{{PKG_NAME}} can be imported to your project with `npm`:

```bash
npm install {{PKG_NAME}}
```

NPM installation defaults to the ES6 module for browsers and the CJS one for Node.js. For web browsers, you can also directly download the {{IIFE_BUNDLE}} or the {{ESM_BUNDLE}} from the repository.

Import your module as :

 - Node.js
   ```javascript
   const {{PKG_CAMELCASE}} = require('{{PKG_NAME}}')
   ... // your code here
   ```
 - JavaScript native or TypeScript project
   ```javascript
   import * as {{PKG_CAMELCASE}} from '{{PKG_NAME}}'
   ... // your code here
   ```
   > BigInt is [ES-2020](https://tc39.es/ecma262/#sec-bigint-objects). In order to use it with TypeScript you should set `lib` (and probably also `target` and `module`) to `esnext` in `tsconfig.json`.
 - JavaScript native browser ES6 mod
   ```html
   <script type="module">
      import * as {{PKG_CAMELCASE}} from 'lib/index.browser.bundle.mod.js'  // Use you actual path to the broser mod bundle
      ... // your code here
    </script>
   ```
 - JavaScript native browser IIFE
   ```html
   <script src="../../lib/index.browser.bundle.js"></script> <!-- Use you actual path to the browser bundle -->
   <script>
     ... // your code here
   </script>
   ```

## API reference documentation

{{>main}}

* * *