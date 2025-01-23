let elem = document.querySelectorAll('.elem');
let elemImg = document.querySelector('img');

elem.forEach(function(val){
    console.log(val)
    val.addEventListener("mouseenter", function(){
        val.childNodes[3].style.opacity = 1
    })
    val.addEventListener("mouseleave", function(){
        val.childNodes[3].style.opacity = 0
    })
    val.addEventListener("mousemove", function(dets){
        val.childNodes[3].style.left = dets.x + "px";
        // val.childNodes[3].style.top = dets.y + "px";
    })
})













// elem.addEventListener("mousemove" , (dets)=>{
//     elemImg.style.left = dets.x + "px"
//     elemImg.style.top = dets.y + "px"
// })

// elem.addEventListener("mouseenter",()=>{
//     elemImg.style.opacity = "1"
// })

// elem.addEventListener("mouseleave",()=>{
//     elemImg.style.opacity = "0"
// })