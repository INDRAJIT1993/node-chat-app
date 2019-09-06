var expect = require('expect');
var { generateMessage} = require('./message');
describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
        var from = 'john';
        var text = 'some message';
        var message = generateMessage(from,text);
        expect(typeof message.createdat).toBe('number');
        expect(message).toMatchObject({from,text});
    })

})