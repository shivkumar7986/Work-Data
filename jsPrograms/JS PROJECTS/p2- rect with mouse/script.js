let rect = document.querySelector("#rect");

window.addEventListener("mousemove", (dets) => {
  var xVal = gsap.utils.mapRange(
    0,
    window.innerWidth
    ,
    800,
    window.innerWidth - 800,
    dets.x
  );
  gsap.to(rect, {
    left: xVal + "px",
    ease: Power3,
  });
});
