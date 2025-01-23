
var word = "mango";

const arr = [];

for(let i in word){
    arr.push(word[i])
}

var reverse = '';

while( arr.length > 0){
    reverse += arr.pop()
}

console.log(reverse)