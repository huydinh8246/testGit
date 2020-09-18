/*
coding challenge 1
basic operators
BMI
*/
const fetch = require("node-fetch");
const request = require('request');
// var johnHeight, johnMass;
// var markHeight, markMass;

// johnHeight = prompt('enter John height')
// johnMass = prompt('enter John mass')
// markHeight = prompt('enter Mark height')
// markMass = prompt('enter Mark mass')

// function BMI(mass, height) {
//     return mass / (height ** 2)
// }

// let johnBMI = BMI(johnMass, johnHeight)
// let markBMI = BMI(markMass, markHeight)

// console.log("Is Mark's BMI higher than John's?");

// (johnBMI < markBMI)?(console.log('true')) : (console.log('false'))


/*
coding challenge 2
branch
baseball score
*/

// let john = [89,120,103]
// let mike = [116,94,123]

// let total, avr
// total = 0
let a = 'https://usi-saas.vnexpress.net/index/getreplay?siteid=1002565&objectid=4163085&objecttype=1&id=36917262&limit=12&offset=12&cookie_aid=4jzji2cnwz9ikjae.1598590932&sort_by=like&template_type=1'

// fetch(a)
//   .then(response => response.json())
//   .then(data => console.log(data)); 

request(a, function (error, response, body) {
    let a = JSON.parse(body)
    console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
});