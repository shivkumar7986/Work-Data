const passwordBox = document.getElementById('password');
const copyBtn = document.getElementById('icon');
const generateBtn = document.getElementById('btn')

const lengthOfPass = 12;
const upperCase = "ABCDEFGHIJKLMNOPQUERSTWXYZ";
const lowerCase = "abcdefghijklmnopquestwxyz";
const numbers  = "0123456789";
const symbol = "@#$^&()_+~*{}[]></-=";
const allChar = upperCase + lowerCase + numbers + symbol ;



function createPass (){
    let password = "";
    password += upperCase[Math.floor(Math.random()* upperCase.length)];
    password += lowerCase[Math.floor(Math.random()* lowerCase.length)];
    password += numbers[Math.floor(Math.random()* numbers.length)];
    password += symbol[Math.floor(Math.random()* symbol.length)];

    while(lengthOfPass > password.length){
        password += allChar[Math.floor(Math.random()*allChar.length)];
    }

    passwordBox.value = password;
}

function copy(){
  passwordBox.select();
  document.execCommand('copy');
}
