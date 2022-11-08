import * as b64 from '@juanelas/base64';

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
    return a.toString(16);
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
    return b64.encode(bigintToBuf(a), urlsafe, padding);
}
function base64ToBigint(a) {
    return bufToBigint(b64.decode(a));
}

export { base64ToBigint, bigintToBase64, bigintToBuf, bigintToHex, bigintToText, bufToBigint, bufToHex, bufToText, hexToBigint, hexToBuf, parseHex, textToBigint, textToBuf };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnJvd3Nlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3RzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQTJCTSxTQUFVLFFBQVEsQ0FBRSxDQUFTLEVBQUUsUUFBb0IsR0FBQSxLQUFLLEVBQUUsVUFBbUIsRUFBQTtJQUNqRixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFDaEQsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO0FBQ3BCLFFBQUEsTUFBTSxJQUFJLFVBQVUsQ0FBQyx3RUFBd0UsQ0FBQyxDQUFBO0FBQy9GLEtBQUE7QUFDRCxJQUFBLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNyQixJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7QUFDNUIsUUFBQSxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUMvQixZQUFBLE1BQU0sSUFBSSxVQUFVLENBQUMsd0JBQXdCLFVBQVUsQ0FBQSx5QkFBQSxFQUE0QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBRSxDQUFDLENBQUE7QUFDaEgsU0FBQTtRQUNELEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDeEMsS0FBQTtBQUNELElBQUEsT0FBTyxDQUFDLFFBQVEsSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQTtBQUN0QyxDQUFDO1NBWWUsV0FBVyxDQUFFLENBQVMsRUFBRSxvQkFBNkIsS0FBSyxFQUFBO0lBQ3hFLElBQUksQ0FBQyxHQUFHLENBQUM7QUFBRSxRQUFBLE1BQU0sVUFBVSxDQUFDLHVFQUF1RSxDQUFDLENBQUE7SUFDcEcsT0FBTyxRQUFRLENBQUMsV0FBVyxD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
