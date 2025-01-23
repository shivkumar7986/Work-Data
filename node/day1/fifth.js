

const data = [
    {"id" : 100, "name" : "samsung" , "price":124000},
    {"id" : 101, "name" : "apple" , "price":100000},
    {"id" : 102, "name" : "realme" , "price":24000},
    {"id" : 103, "name" : "redmi" , "price":34000},
    {"id" : 104, "name" : "vivo" , "price":20000}
]

var sum = 0;

for(let i in data){
    // console.log(data[i].price)

    sum += data[i].price
}
console.log(sum)





