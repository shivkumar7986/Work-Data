let rect = document.querySelector('#rect');



rect.addEventListener("mousemove", function(dets){
    let rectLocation = rect.getBoundingClientRect();
    // console.log(rectLocation);
    // console.log(dets.x)
    let insideRectLoc = dets.clientX - rectLocation.x;
    // console.log(insideRectLoc);

    if(insideRectLoc<rectLocation.width/2){
        let redColor = gsap.utils.mapRange(0,250,255,0, insideRectLoc);
        gsap.to(rect,{
            backgroundColor : `rgb(${redColor},0,0)`,
            ease : Power4
        })
    }
    else{
        let blueColor = gsap.utils.mapRange(rectLocation.width/2,rectLocation.width,0,255, insideRectLoc);
        gsap.to(rect,{
            backgroundColor : `rgb(0,0,${blueColor})`,
            ease : Power4
        })
    }
});

rect.addEventListener("mouseleave", function(){
 
    gsap.to(rect, {
        backgroundColor: "white"
    })
})