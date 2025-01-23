function show(){
    let num1 = 10;
    let num2 = 25;
    let num3 = 20;

    if(num1>num2 && num1>num3){
        if(num2>num3){
            console.log(num2 + " is second highest")
        }
        else{
            console.log(num3 + " is second highest")
        }
    }
    else if(num2> num3 && num2> num1){
        if(num3>num1){
            console.log(num3 + " is second highest")
        }
        else{
            console.log(num1 + " is second highest")
        }
    }
    else{
        if(num2>num1){
            console.log(num2 + " is second highest")
        }
        else{
            console.log(num1 + " is second highest ")
        }
    }
}

show()