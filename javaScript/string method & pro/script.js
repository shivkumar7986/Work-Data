
const intro = "hey, i'am shiv kumar "

useLessWord = "     hey, wssup budddy      "

console.log(intro.length);

console.log(intro.toUpperCase());

console.log(intro.toLowerCase());

console.log(useLessWord)
console.log(useLessWord.trim());
console.log(useLessWord.trimStart());
console.log(useLessWord.trimEnd());

console.log(useLessWord.includes("wssup"));
console.log(useLessWord.indexOf('wssup'));

console.log(useLessWord.replaceAll('u', 'U'));

console.log(intro.concat( useLessWord));


const pin = '6110'

console.log(pin.padStart(16, '*'));
console.log(pin.padEnd(10, '*'));

console.log(intro.charAt(5));
console.log(intro.charCodeAt(6));

console.log(intro.split(' '));

const templateString =`last four digit of my account is ${pin}`
console.log(templateString);