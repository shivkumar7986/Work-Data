let rect = document.querySelector("#rect");

const btn = document.querySelector("#throttle");

const throttleFunction = (func, delay) => {
  let prev = 0;
  return (...args) => {
    let now = new Date().getTime();

    // console.log(now - prev, delay);

    if (now - prev > delay) {
      prev = now;

      return func(...args);
    }
  };
};
rect.addEventListener(
  "mousemove",
  throttleFunction((dets) => {
    var div = document.createElement("div");
    div.classList.add("imgDiv");
    div.style.left = dets.x + "px";
    div.style.top = dets.y + "px";

    var img = document.createElement("img");
    img.setAttribute(
      "src",
      "https://images.unsplash.com/photo-1719216323962-ea9b315ad9bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    );
    div.appendChild(img);

    gsap.to(img, {
        
      y: 0,
      ease: Power3,
      duration: 0.5,
    });
    gsap.to(img, {
        
      y: 200,
      ease: Power1,
      delay:.4,
      duration: 0.2,
    });

    document.body.appendChild(div);
    setTimeout(function () {
      div.remove();
    }, 2000);
  }, 400)
);
