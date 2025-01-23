var size = 4;

for(let i = 1; i<=size ; i++){
    var s = '';

    for(let p = 1 ; p<= size - i ; p++){
        s += '  ';        
    }
    
    for(let j = 1; j< 2*i ; j++ ){
        s += j + " "
        
    }
    
    
    console.log(s)

}