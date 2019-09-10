var expect = require('expect');
var should=expect.should;
const { Users } = require('./users');

describe('Users', () => {
    var userss;
    beforeEach(() => {
        userss = new Users();
        userss.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },
        {
            id: '2',
            name: 'john',
            room: 'React Course'
        },
        {
            id: '3',
            name: 'juli',
            room: 'Node Course'
        }
        ]
    })
    it('should add new user', () => {
        var userss = new Users()
        var user = {
            id: 123,
            name: 'indra',
            room: 'the office group'
        }
        var resuser = userss.addUser(user.id, user.name, user.room);
        expect(userss.users).toEqual([user]);
    })

    it('should return name for node course',()=>{
        var userlist = userss.getUserList('Node Course');
        expect(userlist).toEqual(['Mike','juli'])
    })

    it('should return name for react course', () => {
        var userlist = userss.getUserList('React Course');
        expect(userlist).toEqual(['john'])
    })

    it('should remove a user', () => {
        
    })

    it('should not remove a user', () => {
        
    })

    it('should find a user', () => {
        var userID='2';
        var user = userss.getUser(userID);
        expect(user.id).toBe(userID)

    })

    it('should not find a user', () => {
        var userID = '99';
        var user = userss.getUser(userID);
        expect(undefined).should.toEqual('undefined')
    })

})
