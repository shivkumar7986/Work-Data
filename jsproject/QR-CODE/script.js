function amin(){
    let tl = gsap.timeline();

tl.from("#box", {
    y:100,
    duration:1.8,
    opacity:0,
    ease: "elastic"
})

tl.from(".heading",{
    opacity:0,
    duration:1.3,
    ease: "elastic",
    x:100,
    delay : -1
})
tl.from("#inputBox",{
    opacity:0,
    duration:1.3,
    ease:"expo",
    y:50
},"same")
tl.from("#btn",{
    opacity:0,
    duration:1.3,
    // ease: "bounce",
    y:50
},"same")
}
amin();

let inputTxt = document.getElementById('inputBox');
let qrBox = document.getElementById('qrBox');
let qrImg = document.getElementById('qrImg');

function generateQR(){

   if(inputTxt.value.length > 0){
    qrImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + inputTxt.value;
    qrBox.classList.add('show-img');
   }
   else{
    alert("Must enter somthing!")
   }



}



