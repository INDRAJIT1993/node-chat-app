var expect = require('expect');
var { isRealString}=require('./validation');

describe('validatecheck', () => {
    it('should reject non-string values', () => {
        var res =isRealString(98)
        expect(res).toBe(false);
    })
    it('should reject string with only spaces', () => {
        var res = isRealString('    ')
        expect(res).toBe(false);
    })
    it('should allow string with non spaces character', () => {
        var res = isRealString(' indra   ')
        expect(res).toBe(true);
    })

})
