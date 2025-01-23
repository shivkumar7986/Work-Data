
let btn = document.querySelector('button');
let sts = document.querySelector('h2');


let flag = 0;

btn.addEventListener("click" , ()=>{
    if(flag == 0){
        sts.innerHTML = " friend";
        sts.style.color = "green";
        btn.innerHTML = "remove friend";
        flag = 1;
    }
    else{
        sts.innerHTML = " un friend";
        sts.style.color = "red";
        btn.innerHTML = "add friend";
        flag = 0;
    }
})