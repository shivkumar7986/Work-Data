const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});



function anim(){
    var tl = gsap.timeline();
    tl.from("#nav", {
        y:-20,
        duration:1,
        opacity:0,
        ease: "expo.easeInOut"
    })
       .to(".boundingelem", {
        y:0,
        duration:1,
        ease: "expo.easeInOut",
        stagger: .2
    },anim)
    .to("#herofooter", {
        y:30,
        duration:1,
        opacity:1,
        ease: "expo.easeInOut"
    },anim)
}





function circleMouseFollower(){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform= `translate(${dets.clientX}px, ${dets.clientY}px)`
    })
};

circleMouseFollower();
anim();


document.querySelectorAll(".elem").forEach(function (elem){
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power3,
          duration: 0.5,
        });
      });

    elem.addEventListener("mousemove", function(dets){
       var diff=  dets.clientY - elem.getBoundingClientRect().bottom;
       diffrot = dets.clientX - rotate;
       rotate = dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:" power3",
            top : diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20 , 20 , diffrot * 0.5),
        });
    });
});