
const infoBox = document.querySelector(".infoBox");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quizBox");
const resultBox = document.querySelector(".resultBox");
const optionList = document.querySelector(".optionList");
const timeLine = document.querySelector("header .timeLine");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const nav = document.querySelector(".topnav");
const celeb = document.querySelector(".celebBox");

infoBox.classList.add("activeInfo"); 
continueBtn.style.pointerEvents = "none";
continueBtn.style.opacity ="0.7";
setTimeout(function(){
    continueBtn.style.opacity ="1";
    continueBtn.style.pointerEvents = "auto";
},1000);
exitBtn.onclick = ()=>{
    location.href = "/quiz";
}

continueBtn.onclick = ()=>{
    infoBox.classList.remove("activeInfo"); 
    quizBox.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
    startTimer(15); 
    startTimerLine(0); 
    
}
let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
const restart_quiz = resultBox.querySelector(".buttons .restart");
const quit_quiz = resultBox.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    resultBox.classList.remove("activeResult"); 
    infoBox.classList.add("activeInfo");
    continueBtn.onclick = ()=>{
        infoBox.classList.remove("activeInfo");
        quizBox.classList.add("activeQuiz"); 
        timeValue = 15; 
        que_count = 0;
        que_numb = 1;
        userScore = 0;
        widthValue = 0;
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
        
    }
   
}

quit_quiz.onclick = ()=>{
    window.location.reload(); 
    location.href = "/quiz";
}
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .totalQues");

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue);
        startTimerLine(widthValue); 
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine);
        showResult(); 
    }
}

function showQuetions(index){
    const quesText = document.querySelector(".quesText");
    // disable navbar once quiz starts
    nav.style.pointerEvents = "none";
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    quesText.innerHTML = que_tag; 
    optionList.innerHTML = option_tag; 
    
    const option = optionList.querySelectorAll(".option");
   
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = optionList.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct");
    
    }else{
        answer.classList.add("incorrect"); 
      
        for(i=0; i < allOptions; i++){
            if(optionList.children[i].textContent == correcAns){  
                optionList.children[i].setAttribute("class", "option correct"); 
       
            }
        }
    }
    for(i=0; i < allOptions; i++){
        optionList.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}
function showResult(){
    nav.style.pointerEvents = "auto";
    const scoreText = resultBox.querySelector(".score_text");
    points= userScore*10;
    scoreText.innerHTML = '<h2>Great Work! You have scored </h2>  <b> '+ points +' </b> <h2>  points.</h2>';
    infoBox.classList.remove("activeInfo"); 
    quizBox.classList.remove("activeQuiz"); 
    resultBox.classList.add("activeResult"); 
    fetch('/quizScore', {
            method: "POST",
            body:userScore,
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        fetch('/quizScore')
        .then(function (response) {
            return response.text();
        }).then(function (text) {
            celeb.innerHTML = `
                <h1>Great work! You have scored ${text} points in total.</h1>
            `
        });
}
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 
            const allOptions = optionList.children.length; 
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(optionList.children[i].textContent == correcAns){ 
                    optionList.children[i].setAttribute("class", "option correct"); 
                    
                }
            }
            for(i=0; i < allOptions; i++){
                optionList.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show"); 
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        timeLine.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}
function queCounter(index){
    
    let totalQueCounTag = '<p>'+ index +'</p><p>/'+ questions.length +'</p>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
    bottom_ques_counter.style.display= "inline-flex";
}

