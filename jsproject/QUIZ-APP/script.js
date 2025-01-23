
gsap.from(".quizApp" , {
    opacity:0,
    x:50,
    duration: 1.4
   
})
gsap.from(".heading" , {
    opacity:0,
    y:-100,
    duration: 1.4,
   
})













let questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text:"shark" , correct : false},
            {text:"aliphant" , correct : false},
            {text:"blue whale" , correct : true},
            {text:"girraf" , correct : false}
        ]
    },
    {
        question: "Which is the second largest country in the world?",
        answers: [
            {text:"india" , correct : false},
            {text:"africa" , correct : false},
            {text:"russia" , correct : false},
            {text:"canada" , correct : true}
        ]
    },
    {
        question: "which food does't get bad?",
        answers: [
            {text:"apple" , correct : false},
            {text:"honey" , correct : true},
            {text:"oil" , correct : false},
            {text:"onion" , correct : false}
        ]
    },
    {
        question: "in which of the following is fruit",
        answers: [
            {text:"tomoto" , correct : true},
            {text:"potato" , correct : false},
            {text:"onion" , correct : false},
            {text:"brocali" , correct : false}
        ]
    },
    {
        question: "in which year 9/11 was happned",
        answers: [
            {text:"1920" , correct : false},
            {text:"2002" , correct : false},
            {text:"2001" , correct : true},
            {text:"2024" , correct : false}
        ]
    },
    {
        question: "which animal has the highest kill rate?",
        answers: [
            {text:"mosquito" , correct : false},
            {text:"lion" , correct : false},
            {text:"snake" , correct : true},
            {text:"aligator" , correct : false}
        ]
    },
    {
        question: "which animal has the highest kill rate?",
        answers: [
            {text:"mosquito" , correct : false},
            {text:"lion" , correct : false},
            {text:"snake" , correct : true},
            {text:"aligator" , correct : false}
        ]
    },
    {
        question: "fastest human in the world?",
        answers: [
            {text:"khali" , correct : false},
            {text:"usain bolt" , correct : true},
            {text:"virak kohli" , correct : false},
            {text:"ronaldo" , correct : false}
        ]
    },
    {
        question: "which animal have pink sweat?",
        answers: [
            {text:"mosquito" , correct : false},
            {text:"lion" , correct : false},
            {text:"aligator" , correct : false},
            {text:"hippo" , correct : true}
        ]
    },
    {
        question: "which animal has the highest kill rate?",
        answers: [
            {text:"snake" , correct : true},
            {text:"mosquito" , correct : false},
            {text:"lion" , correct : false},
            {text:"aligator" , correct : false}
        ]
    },


]

let questionElem = document.getElementById('question');
let answerElem = document.getElementById('answers');
let nextBtn = document.getElementById('next');
let currentQuestionIndex = 0;
let score = 0;

function startQuiz (){
currentQuestionIndex = 0;
score = 0;
nextBtn.innerHTML = "next";
 shoQuestion();
}

function shoQuestion(){
    resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElem.innerHTML = questionNo + "." + currentQuestion.question; 

  currentQuestion.answers.forEach(answer => {
    let button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerElem.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }

    button.addEventListener("click" , selectAnswer)

  })
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerElem.firstChild){
        answerElem.removeChild(answerElem.firstChild);
    }
}

function selectAnswer(e){
    let selectedBtn = e.target;
    let isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }
    else{
        selectedBtn.classList.add('inCorrect');
    }

    Array.from(answerElem.children).forEach( button =>{
        if(button.dataset.correct === "true"){
            button.classList.add('correct');
        }
        button.disabled= "true";
    });
    nextBtn.style.display = "block"
}

function shoScore(){
    resetState();
    questionElem.innerHTML = `your score ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        shoQuestion();
    }
    else{
        shoScore();
    }
}

nextBtn.addEventListener("click" , ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})

startQuiz();