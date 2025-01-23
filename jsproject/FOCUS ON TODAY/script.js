let sunImg = document.querySelector('.sun');

gsap.to(sunImg, {
    rotate: 360,
    repeat: -1,
    duration: 2,
    yoyo: true,
    ease: Power4
})

let allMinCir = document.querySelectorAll('.minCir');
let allInputField = document.querySelectorAll('.addGoal input');
let errorMsg = document.querySelector('.errorMsg');
let progressVal = document.querySelector('.progressVal');
let barHeading = document.querySelector('.barHeading h5');
let clearBtn = document.querySelector('.clear');
let completed = document.querySelector('.completed');


const allBarHeadings = [
    'raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D'
]


var allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first: {
        name: "",
        completed : false
    },
    second: {
        name: "",
        completed : false
    },
    third: {
        name: "",
        completed : false
    }
};


let completedGoalsCount = Object.values(allGoals).filter((goals) => goals.completed).length;
progressVal.style.width = `${completedGoalsCount / 3 * 100}%`
progressVal.firstElementChild.innerText = `${completedGoalsCount}/3 completed `;
barHeading.innerText = allBarHeadings[completedGoalsCount];




clearBtn.addEventListener("click" , ()=>{
    localStorage.clear();
    location.reload();
    
})



allMinCir.forEach((cir) => {
    cir.addEventListener("click", () => {


        const allGoalAdded = [...allInputField].every(function (input) {
            return input.value
        })
        if (allGoalAdded) {
            cir.parentElement.classList.toggle('completed');
            const inputId = cir.nextElementSibling.id;
            allGoals[inputId].completed = !allGoals[inputId].completed;
            completedGoalsCount = Object.values(allGoals).filter((goals) => goals.completed).length;
            progressVal.style.width = `${completedGoalsCount / 3 * 100}%`
            barHeading.innerText = allBarHeadings[completedGoalsCount];
            progressVal.firstElementChild.innerText = `${completedGoalsCount}/3 completed `;
            localStorage.setItem("allGoals", JSON.stringify(allGoals));

        }
        else {
            errorMsg.style.display = "block"
        }


    })
})

allInputField.forEach((input) => {

    // console.log(allGoals[input.id]);
    input.value = allGoals[input.id].name;

    

    if (allGoals[input.id].completed) {
        input.parentElement.classList.add('completed')
    }

    input.addEventListener("focus", () => {
        errorMsg.style.display = "none"
    })

    input.addEventListener("input", (i) => {

        if (allGoals[input.id].completed) {
            i.target.value = allGoals[input.id].name;
            return
        }
        allGoals[input.id].name = i.target.value
        localStorage.setItem("allGoals", JSON.stringify(allGoals));

    })
})

