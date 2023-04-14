/// <reference types="node" />
type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;
declare function parseHex(a: string, prefix0x?: boolean, byteLength?: number): string;
declare function bigintToBuf(a: bigint, returnArrayBuffer?: boolean): ArrayBuffer | Buffer;
declare function bufToBigint(buf: ArrayBuffer | TypedArray | Buffer): bigint;
declare function bigintToHex(a: bigint, prefix0x?: boolean, byteLength?: number): string;
declare function hexToBigint(hexStr: string): bigint;
declare function bigintToText(a: bigint): string;
declare function textToBigint(text: string): bigint;
declare function bufToText(buf: ArrayBuffer | TypedArray | Buffer): string;
declare function textToBuf(str: string, returnArrayBuffer?: boolean): ArrayBuffer | Buffer;
declare function bufToHex(buf: ArrayBuffer | TypedArray | Buffer, prefix0x?: boolean, byteLength?: number): string;
declare function hexToBuf(hexStr: string, returnArrayBuffer?: boolean): ArrayBuffer | Buffer;
declare function bigintToBase64(a: bigint, urlsafe?: boolean, padding?: boolean): string;
declare function base64ToBigint(a: string): bigint;

export { TypedArray, base64ToBigint, bigintToBase64, bigintToBuf, bigintToHex, bigintToText, bufToBigint, bufToHex, bufToText, hexToBigint, hexToBuf, parseHex, textToBigint, textToBuf };
