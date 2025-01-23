
var tl = gsap.timeline();

tl.from("h2",{
    y:-30,
    duration: 1.5,
    delay:0.5,
    opacity:0
},"anim")

tl.from("h4",{
    y:-20,
    duration:1.5,
    opacity:0,
    stagger:0.3
},"anim")

tl.from("h1",{
    y:50,
    opacity:0,
    duration:1.5,
    repeat:-1,
    yoyo: true
    
})