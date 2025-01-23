 gsap.to("#page2 h1" , {
    transform: "translate(-350%)",
    scrollTrigger:{
        trigger:"#page2",
        scroller:"body",
        markers:false,
        start: "top 0%",
        end: "top -200%",
        scrub:2,
        pin:true
    }
})

gsap.from("#part1 h2",{
    y:-30,
    delay:0.5,
    duration:0.7,
    opacity:0,
})

gsap.from("#part2 h4",{
    y:-30,
    delay:0.5,
    duration:0.7,
    opacity:0,
    stagger:0.3
})

gsap.from("#page1 h1",{
    x:50,
    delay:0.5,
    duration:1.8,
    opacity:0,
    stagger:0.3
})