'use strict';

// For the browser test builder to work you MUST import the module in a variable that
// is the camelised version of the package name.
const bigintConversion = require('../dist/bigint-conversion-latest.node');
const chai = require('chai');

const inputs = [
    {
        bi: BigInt(1),
        hex: '1'
    },
    {
        bi: BigInt(31),
        hex: '1F'
    },
    {
        bi: BigInt('12485413541784539569456874935679853424678352483761'),
        hex: '88af94e6b1e99f8bf3b01edb619caaa656A5c75b1'
    },
];

describe('hexToBigint', function () {
    for (const input of inputs) {
        describe(`hexToBigint(${input.hex})`, function () {
            it(`should return ${input.bi}`, function () {
                const ret = bigintConversion.hexToBigint(input.hex);
                chai.expect(ret).to.equal(input.bi);
            });
        });
    }
});