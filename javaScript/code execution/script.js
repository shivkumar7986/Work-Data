var firstName = 'shiv'
let lastName = 'kumar'
let age = 22
const yearOfBirth = 2003

let userIntro = 'Hi, my name is '+ firstName +' ' + lastName


//  happens in two phases: the memory creation phase and the code execution phase. 

// In the memory creation phase, JavaScript scans the code and creates memory for variables, labels them, and assigns them an initial value of undefined. During the code execution phase, the actual values replace the initial undefined values. 

// In your example, you have created four variables: firstName, lastName, age, and yearOfBirth. When the JavaScript engine first encounters these variables, it creates memory for them and assigns them an initial value of undefined. When the actual values are assigned, the type of the value in the memory location changes accordingly. 

// For instance, if you assign a string to firstName, the type of the value in the memory location changes to a string. Similarly, if you assign a number to age, the type of the value in the memory location changes to a number. 

// This process allows for efficient memory management and ensures that the correct data types are used in your code. 