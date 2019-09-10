class Users{
    constructor(){
        this.users=[]
    }
    addUser(id,name,room){
        var user={id,name,room};
        this.users.push(user);
        return user;

    }
    removeUser(id){
        var user = this.getUser(id);
        if(user){
            this.users=this.users.filter((user)=>user.id!=id)
        }
        return user;
    }
    getUser(id){
        return this.users.filter((user)=> user.id===id)[0]

    }
    getUserList(room){
        var users=this.users.filter((gotuser)=>{
            return gotuser.room ===room
        })
        var namesArray=users.map((user)=>{
            return user.name
        })
        return namesArray;
    }
}

module.exports={Users}








// class Person{
//     constructor(name,age){
//         this.name=name,
//         this.age = age
//     }
//     getUserDiscription(){
//         return `${this.name} is ${this.age} years old`
//     }
// }

// const me = new Person('indra',26);
// const userdetails=me.getUserDiscription();
// console.log(userdetails)