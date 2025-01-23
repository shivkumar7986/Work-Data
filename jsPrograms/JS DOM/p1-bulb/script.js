let btn1 = document.querySelector("#btn1");

let bulb = document.querySelector("#bulb");

let flag = 0;

btn1.addEventListener("click", function () {
  if (flag == 0) {
    bulb.style.backgroundColor = "yellow";
    btn1.innerHTML = "OF";
    btn1.style.backgroundColor = " black";
    btn1.style.color = "white";
    flag = 1;
  }
  else{
    bulb.style.backgroundColor = "white";
    btn1.innerHTML = " ON";
    btn1.style.backgroundColor = " White";
    btn1.style.color = "black";
    flag = 0;
  }

  
});
