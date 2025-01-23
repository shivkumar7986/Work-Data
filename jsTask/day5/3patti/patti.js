var startBtn = document.getElementById("startBtn");
var resetBtn = document.getElementById("resetBtn");

var img1 = document.getElementById("img1");
var img2 = document.getElementById("img2");
var img3 = document.getElementById("img3");
var img4 = document.getElementById("img4");
var img5 = document.getElementById("img5");
var img6 = document.getElementById("img6");


const imgArr = ["./cards/2_of_clubs.png", "./cards/2_of_diamonds.png", "./cards/2_of_hearts.png", "./cards/2_of_spades.png",
    "./cards/3_of_clubs.png", "./cards/3_of_diamonds.png", "./cards/3_of_hearts.png", "./cards/3_of_spades.png",
    "./cards/4_of_clubs.png", "./cards/4_of_diamonds.png", "./cards/4_of_hearts.png", "./cards/4_of_spades.png",
    "./cards/5_of_clubs.png", "./cards/5_of_diamonds.png", "./cards/5_of_hearts.png", "./cards/5_of_spades.png",
    "./cards/6_of_clubs.png", "./cards/6_of_diamonds.png", "./cards/6_of_hearts.png", "./cards/6_of_spades.png",
    "./cards/7_of_clubs.png", "./cards/7_of_diamonds.png", "./cards/7_of_hearts.png", "./cards/7_of_spades.png",
    "./cards/8_of_clubs.png", "./cards/8_of_diamonds.png", "./cards/8_of_hearts.png", "./cards/8_of_spades.png",
    "./cards/9_of_clubs.png", "./cards/9_of_diamonds.png", "./cards/9_of_hearts.png", "./cards/9_of_spades.png",
    "./cards/10_of_clubs.png", "./cards/10_of_diamonds.png", "./cards/10_of_hearts.png", "./cards/10_of_spades.png",
    "./cards/ace_of_clubs.png", "./cards/ace_of_diamonds.png", "./cards/ace_of_hearts.png", "./cards/ace_of_spades.png",
    "./cards/jack_of_clubs2.png", "./cards/jack_of_diamonds2.png", "./cards/jack_of_hearts2.png", "./cards/jack_of_spades2.png",
    "./cards/queen_of_clubs2.png", "./cards/queen_of_diamonds2.png", "./cards/queen_of_hearts2.png", "./cards/queen_of_spades2.png",
    "./cards/king_of_clubs2.png", "./cards/king_of_diamonds2.png", "./cards/king_of_hearts2.png", "./cards/king_of_spades2.png",];



startBtn.addEventListener("click", () => {
    let rdm1 = Math.floor(Math.random() * imgArr.length);
    let rdm2 = Math.floor(Math.random() * imgArr.length);
    let rdm3 = Math.floor(Math.random() * imgArr.length);
    let rdm4 = Math.floor(Math.random() * imgArr.length);
    let rdm5 = Math.floor(Math.random() * imgArr.length);
    let rdm6 = Math.floor(Math.random() * imgArr.length);

    img1.src = imgArr[rdm1]
    img2.src = imgArr[rdm2]
    img3.src = imgArr[rdm3]
    img4.src = imgArr[rdm4]
    img5.src = imgArr[rdm5]
    img6.src = imgArr[rdm6]
});


resetBtn.addEventListener("click" , ()=>{
    location.reload()
})



// var p = 1;

// function pack(){

//     document.images[p].src = "./cards/back1.png";

//     if(p < 6){
//         p++;
//         setTimeout("pack()",100)
        

//     }
    
// }

