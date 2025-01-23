let heart = document.querySelector('#heart');
let bigHeart = document.querySelector('#bigheart');
let picArea = document.querySelector('#pic');
let follow = document.querySelector('#nav #part2 button');

let flag = 0;

heart.addEventListener("click", ()=>{
    if(flag == 0){
        
        heart.style.color = "red";
        flag = 1;
    }
    else{
        heart.style.color = "white";
        flag = 0;
    }
})

picArea.addEventListener("dblclick" ,  ()=>{
    bigHeart.style.scale = "5";
    heart.style.color = "red"
    setTimeout(function(){
        bigHeart.style.scale = "0";
        
    },1000)
})

follow.addEventListener("click" , ()=>{
    if(flag==0){
        follow.innerHTML = "following";
        flag = 1;
    }
    else{
        follow.innerHTML = "follow";
        flag = 0;
    }

})