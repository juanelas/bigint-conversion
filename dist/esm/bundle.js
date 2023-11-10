function e(e,r=!1,t=!0){let n="";n=(e=>{const r=[];for(let t=0;t<e.length;t+=32768)r.push(String.fromCharCode.apply(null,e.subarray(t,t+32768)));return btoa(r.join(""))})("string"==typeof e?(new TextEncoder).encode(e):new Uint8Array(e));return r&&(n=function(e){return e.replace(/\+/g,"-").replace(/\//g,"_")}(n)),t||(n=n.replace(/=/g,"")),n}function r(e,r=!1){{let t=!1;if(/^[0-9a-zA-Z_-]+={0,2}$/.test(e))t=!0;else if(!/^[0-9a-zA-Z+/]*={0,2}$/.test(e))throw new Error("Not a valid base64 input");t&&(e=e.replace(/-/g,"+").replace(/_/g,"/").replace(/=/g,""));const n=new Uint8Array(atob(e).split("").map((e=>e.charCodeAt(0))));return r?(new TextDecoder).decode(n):n}}

function parseHex(a, prefix0x = false, byteLength) {
    const hexMatch = a.match(/^(0x)?([\da-fA-F]+)$/);
    if (hexMatch == null) {
        throw new RangeError('input must be a hexadecimal string, e.g. \'0x124fe3a\' or \'0214f1b2\'');
    }
    let hex = hexMatch[2];
    if (byteLength !== undefined) {
        if (byteLength < hex.length / 2) {
            throw new RangeError(`expected byte length ${byteLength} < input hex byte length ${Math.ceil(hex.length / 2)}`);
        }
        hex = hex.padStart(byteLength * 2, '0');
    }
    return (prefix0x) ? '0x' + hex : hex;
}
function bigintToBuf(a, returnArrayBuffer = false) {
    if (a < 0)
        throw RangeError('a should be a non-negative integer. Negative values are not supported');
    return hexToBuf(bigintToHex(a), returnArrayBuffer);
}
function bufToBigint(buf) {
    let bits = 8n;
    if (ArrayBuffer.isView(buf))
        bits = BigInt(buf.BYTES_PER_ELEMENT * 8);
    else
        buf = new Uint8Array(buf);
    let ret = 0n;
    for (const i of buf.values()) {
        const bi = BigInt(i);
        ret = (ret << bits) + bi;
    }
    return ret;
}
function bigintToHex(a, prefix0x = false, byteLength) {
    if (a < 0)
        throw RangeError('a should be a non-negative integer. Negative values are not supported');
    return parseHex(a.toString(16), prefix0x, byteLength);
}
function hexToBigint(hexStr) {
    return BigInt(parseHex(hexStr, true));
}
function bigintToText(a) {
    if (a < 0)
        throw RangeError('a should be a non-negative integer. Negative values are not supported');
    return bufToText(hexToBuf(a.toString(16)));
}
function textToBigint(text) {
    return hexToBigint(bufToHex(textToBuf(text)));
}
function bufToText(buf) {
    return new TextDecoder().decode(new Uint8Array(buf));
}
function textToBuf(str, returnArrayBuffer = false) {
    return new TextEncoder().encode(str).buffer;
}
function bufToHex(buf, prefix0x = false, byteLength) {
    {
        let s = '';
        const h = '0123456789abcdef';
        if (ArrayBuffer.isView(buf))
            buf = new Uint8Array(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
        else
            buf = new Uint8Array(buf);
        buf.forEach((v) => {
            s += h[v >> 4] + h[v & 15];
        });
        return parseHex(s, prefix0x, byteLength);
    }
}
function hexToBuf(hexStr, returnArrayBuffer = false) {
    let hex = parseHex(hexStr);
    hex = parseHex(hexStr, false, Math.ceil(hex.length / 2));
    {
        return Uint8Array.from(hex.match(/[\da-fA-F]{2}/g).map((h) => {
            return parseInt(h, 16);
        })).buffer;
    }
}
function bigintToBase64(a, urlsafe = false, padding = true) {
    return e(bigintToBuf(a), urlsafe, padding);
}
function base64ToBigint(a) {
    return bufToBigint(r(a));
}

export { base64ToBigint, bigintToBase64, bigintToBuf, bigintToHex, bigintToText, bufToBigint, bufToHex, bufToText, hexToBigint, hexToBuf, parseHex, textToBigint, textToBuf };
//# sourceMappingURL=bundle.js.map
