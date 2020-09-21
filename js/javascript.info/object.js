// obj method, this

// let user = {
//     name: 'huy',
//     age: 22,
//     //methods
//     sayHi(){
//         // the value of this is the obj, the one use to call method
//         return this.name;
//     }
// }
// console.log(user)
// console.log(user.sayHi())

// 'this' is not bound
// in js, this keyword behaves unlike most other progamming languages, is can be used in any function
// the value of this is evaluated during the run-time, depend on the context

// ex
let user = {name: 'John'};
let admin = {name: 'Smith'};

function sayHi() {
    console.log(this.name);
}

// use the same function with 2 obj
user.f = sayHi;
admin.f = sayHi;

// those call have differents this
// this inside the function is the obj
user.f()
admin.f()
// arrow function have no 'this'



// task