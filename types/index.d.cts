/// <reference types="node" />
export type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;
export declare function parseHex(a: string, prefix0x?: boolean, byteLength?: number): string;
export declare function bigintToBuf(a: bigint, returnArrayBuffer?: boolean): ArrayBuffer | Buffer;
export declare function bufToBigint(buf: ArrayBuffer | TypedArray | Buffer): bigint;
export declare function bigintToHex(a: bigint, prefix0x?: boolean, byteLength?: number): string;
export declare function hexToBigint(hexStr: string): bigint;
export declare function bigintToText(a: bigint): string;
export declare function textToBigint(text: string): bigint;
export declare function bufToText(buf: ArrayBuffer | TypedArray | Buffer): string;
export declare function textToBuf(str: string, returnArrayBuffer?: boolean): ArrayBuffer | Buffer;
export declare function bufToHex(buf: ArrayBuffer | TypedArray | Buffer, prefix0x?: boolean, byteLength?: number): string;
export declare function hexToBuf(hexStr: string, returnArrayBuffer?: boolean): ArrayBuffer | Buffer;
export declare function bigintToBase64(a: bigint, urlsafe?: boolean, padding?: boolean): string;
export declare function base64ToBigint(a: string): bigint;
//# sourceMappingURL=index.d.ts.map