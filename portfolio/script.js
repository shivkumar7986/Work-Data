function menu() {
  var menuBtn = document.getElementById("menuBtn");
  var cross = document.getElementById("cross")

  console.log(cross)
  var menu = document.getElementById("menu")

  menuBtn.addEventListener("click", () => {
    menu.style.top = 0
  })

  cross.addEventListener("click", () => {
    menu.style.top = "-70vh"
  })
}
menu();


function loco() {
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
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
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




gsap.from("#logo", {
  x: -30,
  duration: 1,
  delay: 0.5,
  opacity: 0
})
gsap.from("#menuBtn", {
  x: 30,
  duration: 1,
  delay: 0.5,
  opacity: 0
})

gsap.from("#headings ", {
  y: "80",
  // opacity: 0,
  duration: 1.5,
  ease: Expo.easeInOut
})

Shery.textAnimate("#headings h5" /* Element to target.*/, {
  //Parameters are optional.
  style: 1,
  y: 10,
  delay: 0.1,
  duration: 2,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  multiplier: 0.1,
});

Shery.textAnimate("#headings h1" /* Element to target.*/, {
  //Parameters are optional.
  style: 2,
  y: 10,
  delay: 0.1,
  duration: 2,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  multiplier: 0.1,
});
Shery.mouseFollower({
  //Parameters are optional.
  skew: true,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 1,
});

Shery.hoverWithMediaCircle("#headings" /* Element to target.*/, {
  images: ["image1.jpg", "image2.jpg", "image3.jpg"] /*OR*/,
  //videos: ["video1.mp4", "video2.mp4"],
});



function page2Anim() {
  gsap.from(" .elem h1", {
    y: 120,
    stagger: .2,
    duration: .8,
    opacity: 0,
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      markers: false,
      start: "top 40%",
      end: " top 37%",
      scrub: 2
    }
  })
}
page2Anim();

function page3Anim() {
  gsap.from("#p3btm", {
    y: 150,
    stagger: 1,
    duration: 1,
    opacity: 0,
    scrollTrigger: {
      trigger: "#page3 #p3top",
      scroller: "#main",
      markers: false,
      start: "top 40%",
      end: "top 30%",
      scrub: 3
    }
  })
}
page3Anim()

function page3ImgAnim() {

  Shery.imageEffect(" #limg .proj1 ", {
    style: 5,

    config: { "a": { "value": 0.92, "range": [0, 30] }, "b": { "value": -0.79, "range": [-1, 1] }, "zindex": { "value": "10000", "range": [-9999999, 9999999] }, "aspect": { "value": 1.7778273134851006 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": false }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.09, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 1 }, "noise_speed": { "value": 0.2, "range": [0, 10] }, "metaball": { "value": 0.2, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0.002, "range": [0, 0.1] }, "noise_height": { "value": 0.5, "range": [0, 2] }, "noise_scale": { "value": 10, "range": [0, 100] } }

  })

  Shery.imageEffect("#rimg .proj2", {
    style: 2,

    config: { "resolutionXY": { "value": 100 }, "distortion": { "value": true }, "mode": { "value": -3 }, "mousemove": { "value": 3 }, "modeA": { "value": 1 }, "modeN": { "value": 0 }, "speed": { "value": 4.36, "range": [-500, 500], "rangep": [-10, 10] }, "frequency": { "value": -215.38, "range": [-800, 800], "rangep": [-50, 50] }, "angle": { "value": 0.5, "range": [0, 3.141592653589793] }, "waveFactor": { "value": 1.4, "range": [-3, 3] }, "color": { "value": 10212607 }, "pixelStrength": { "value": 3, "range": [-20, 100], "rangep": [-20, 20] }, "quality": { "value": 5, "range": [0, 10] }, "contrast": { "value": 1, "range": [-25, 25] }, "brightness": { "value": 1, "range": [-1, 25] }, "colorExposer": { "value": 0.18, "range": [-5, 5] }, "strength": { "value": 0.2, "range": [-40, 40], "rangep": [-5, 5] }, "exposer": { "value": 8, "range": [-100, 100] }, "zindex": { "value": "1000", "range": [-9999999, 9999999] }, "aspect": { "value": 0.7500224889437122 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": false }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.18, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.2, "range": [0, 10] }, "metaball": { "value": 0.2, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0.002, "range": [0, 0.1] }, "noise_height": { "value": 0.5, "range": [0, 2] }, "noise_scale": { "value": 10, "range": [0, 100] } }
  })



  Shery.imageEffect("#limg .proj3", {
    style: 3,
    config: { "uFrequencyX": { "value": 8.4, "range": [0, 100] }, "uFrequencyY": { "value": 3.05, "range": [0, 100] }, "uFrequencyZ": { "value": 28.24, "range": [0, 100] }, "geoVertex": { "range": [1, 64], "value": 64 }, "zindex": { "value": "1000", "range": [-9999999, 9999999] }, "aspect": { "value": 1.3333407829049122 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": false }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.15, "range": [1, 5] }, "scrollType": { "value": 0 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 1 }, "noise_speed": { "value": 0.2, "range": [0, 10] }, "metaball": { "value": 0.2, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0.002, "range": [0, 0.1] }, "noise_height": { "value": 0.5, "range": [0, 2] }, "noise_scale": { "value": 10, "range": [0, 100] } }
  })

  Shery.imageEffect("#rimg .proj4", {
    style: 6,
    config: { "noiseDetail": { "value": 9.16, "range": [0, 100] }, "distortionAmount": { "value": 7.71, "range": [0, 10] }, "scale": { "value": 100, "range": [0, 100] }, "speed": { "value": 0.21, "range": [0, 1] }, "zindex": { "value": "1000", "range": [-9999999, 9999999] }, "aspect": { "value": 0.5625042319899655 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": false }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.43, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.2, "range": [0, 10] }, "metaball": { "value": 0.2, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0.002, "range": [0, 0.1] }, "noise_height": { "value": 0.5, "range": [0, 2] }, "noise_scale": { "value": 10, "range": [0, 100] } }
  })
}

page3ImgAnim()


function page4Anim(){
  gsap.to("#p4top h1" , {
    transform : "translate(-100%)",
    ease : "power1",
    scrollTrigger : {
      trigger : ".proj4",
      scroller : "#main",
      markers : false,
      start: " top 100%",
      end: " top -300%",
      scrub : 2,
      
    }
  })
}

page4Anim()