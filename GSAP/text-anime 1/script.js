function breakTheText (){
    let h1 = document.querySelector( ".txt");
let h1Contant = h1.textContent;

let splittedTxt = h1Contant.split("");

var halfText = splittedTxt.length/2;


var clutter = "";
splittedTxt.forEach(function(e,idx){
    if(idx<halfText){
        clutter += `<span class="a"> ${e}</span>`; 
    }
    else{
        clutter += `<span class="b"> ${e}</span>`;
    }
})

h1.innerHTML = clutter
}

breakTheText();


gsap.from('h1 .a',{
    y:150,
    duration:.8,
    opacity:0,
    ease:"exp0",
    delay:0.5,
    stagger: 0.15
})
gsap.from('h1 .b',{
    y:150,
    duration:.8,
    opacity:0,
    ease:"exp0",
    delay:0.5,
    stagger: -0.15
})
