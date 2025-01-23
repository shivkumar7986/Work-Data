function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco()

function breakTheTxt() {
    let h1 = document.querySelector("#page1-content .txt");
    let h1Content = h1.textContent;
    let splittedTxt = h1Content.split("");

    var clutter = ""
    splittedTxt.forEach((e) => {
        clutter += `<span>${e}</span>`;
    })
    h1.innerHTML = clutter;
}
breakTheTxt();

function crsrAnim() {
    let crsr = document.querySelector(" #crsr");


    let page1Con = document.getElementById("page1-content");

    page1Con.addEventListener("mousemove", (dets) => {

        console.log(dets.y)
        gsap.to(crsr, {
            x: dets.clientX,
            y: dets.clientY
        })

    })

    page1Con.addEventListener("mouseenter", () => {
        gsap.to(crsr, {
            scale: 1,
            opacity: 1
        })
    })

    page1Con.addEventListener("mouseleave", () => {
        gsap.to(crsr, {
            scale: 0,
            opacity: 0
        })
    })

}
crsrAnim();

function page1Anim(){
    gsap.from("#page1-content nav h3",{
        x:50,
        duration:0.5,
        delay:.5,
        opacity:0
    })
    gsap.from(" .txt span ",{
        stagger: .1,
        y: 300,
        duration: 1,
        // opacity:0
    })
}
page1Anim();

function page2Anim(){
    gsap.from(" .elem h1",{
        y: 120,
        stagger: .2,
        duration:.8,
        opacity:0,
        scrollTrigger:{
            trigger: "#page2",
            scroller: "#main",
            markers: false,
            start: "top 40%",
            end : " top 37%",
            scrub: 2
        }
    })
}
page2Anim();