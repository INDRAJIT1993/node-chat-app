var expect = require('expect');
var { generateMessage, generateLocationMessage} = require('./message');
describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
        var from = 'john';
        var text = 'some message';
        var message = generateMessage(from,text);
        expect(typeof message.createdat).toBe('number');
        expect(message).toMatchObject({from,text});
    })

})
describe('generateLocationMessage', () => {
    it('should generate correct location url', () => {
        var from = 'Admin';
        var latitude= 15;
        var longitude= 19;
        var url=`https://www.google.com/maps?q=15,19`
        var message = generateLocationMessage(from, latitude, longitude);
        expect(typeof message.createdat).toBe('number');
        expect(message).toMatchObject({ from, url });
    })

})