
// USING LET


let firstName = 'shiv'
let lastName = 'kumar'
let age = 22
let isHappy = true


firstName = 'sahil' //we can change the value of variable while using  let, here i change the value shiv to sahil of firstName variable

let userIntro = 'My name is ' + firstName + ' ' +lastName + ' '+'And i am'+ ' '+ age+' ' +'years old.'

let a 


// USING CONST

const hoursInDay = 24

//we can't declare const variable without value , it will show error , we need to enter its value on spot.

// hoursInDay = 12 ,we can't change the value of const variable , if you do it will so the error on console and neither change the value , it will remain same.


// USING VAR

var user = 'shiv kumar' // var is the older one
//it's same as let but we can access it every where in program , while the let is block scoped we can't access the variable which is declared in some block . example ->

{
    var person = 'shayam'
}
    var relation = 'my brother name is ' + person

    console.log(relation); //here we can access the variable outside the block

 {
    let friend = 'arun'
 }   
 let budy = 'my friend name is ' + friend 
 //here is showing an error -> friend is not defined
 //we can't access it outside the block

  //ANOTHER DIFFERENCE IS :
  
  // we can console the variable before initialization while using var but is show undefined

  // we can't console the variable before initialization while using LET and it also showing error