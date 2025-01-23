let crsr = document.querySelector('#crsr');
let main = document.querySelector('#main')

main.addEventListener("mousemove", (dets)=>{
    crsr.style.left = dets.x + "px";
    crsr.style.top = dets.y + "px";
})