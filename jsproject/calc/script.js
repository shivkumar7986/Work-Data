let screen = document.getElementById('screen');


function ac(){
    screen.value="";
}


function display(num){
    screen.value += num; 
}

function calc(){
    try{
        screen.value = eval(screen.value);
    }
    catch(err){
        alert("envalid operation")
    }
}

function del(){
    screen.value = screen.value.substring(0, screen.value.length-1)
}