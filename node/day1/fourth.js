
function show(num){
if(num === 0){
    return 1
}
 else {
    return num * show(num -1)
 }

}

var fact = show(5)
console.log(fact);