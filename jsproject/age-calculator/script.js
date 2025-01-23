let userInputDate = document.getElementById('date');
let result = document.getElementById('result');
userInputDate.max = new Date().toISOString().split("T")[0];

function calculateAge() {
    let birthDate = new Date(userInputDate.value);

    let d1 = birthDate.getDate();
    let m1 = birthDate.getMonth() + 1;
    let y1 = birthDate.getFullYear();


    let todayDate = new Date();

    let d2 = todayDate.getDate();
    let m2 = todayDate.getMonth() + 1;
    let y2 = todayDate.getFullYear();


    let d3, m3, y3;
    y3 = y2 - y1;

    if (m2 >= m1) {
        m3 = m2 - m1;
    }
    else {
        y3--;
        m3 = 12 + m2 - m1;
    }

    if (d2 >= d1) {
        d3 = d2 - d1;

    }
    else {
        m3--;
        d3 = getDaysInMonths(2024,7) + d2 - d1;
    }

    if(m3 < 0){
        m3 = 11;
        y--;
    }

    result.innerHTML = `you are <span> ${y3} </span> years , <span> ${m3} </span>  month and <span> ${d3} </span>  days old!`;
}

function getDaysInMonths (year , month){
    return new Date(year,month,0).getDate();
}

