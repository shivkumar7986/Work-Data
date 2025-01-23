exports.myDate = ()=>{
   return Date();
};

exports.sum = (a,b)=>{
    return a+b;
};

exports.fact = (a)=>{
    let factorial = 1;
    for(let i = 1 ; i<=a ; i++){
        factorial = factorial*i
    }
    return factorial;
};