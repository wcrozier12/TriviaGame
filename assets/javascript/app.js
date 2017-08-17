$(document).ready(function(){
$('#replay').hide();
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time = 10;
var intervalId;
var timeoutId;
var currentQuestion = 0;

var questions = {
    1: {
        question: "question1",
        answer1: "answer",
        answer2: "answer",
        correctAnswer: "canswer",
        answer3: "answer",  
    },
    2:   {
        question: "question2",
        answer1: "answer",
        answer2: "answer",
        correctAnswer: "canswer",
        answer3: "answer",   
    },
    3: {
        question: "question3",
        answer1: "answer",
        answer2: "answer",
        answer3: "answer",
        correctAnswer: "canswer",   
    },
    4: {
        question: "question4",
        answer1: "answer",
        correctAnswer: "canswer",
        answer2: "answer",
        answer3: "answer",   
    },
    5:  {
        question: "question5",
        answer1: "answer",
        answer2: "answer",
        answer3: "answer",
        correctAnswer: "canswer",   
    }
};
console.log(questions[4]);
var numOfQ = Object.keys(questions).length; //number of questions
var showTime = function(){
    $('#timeRem').html("Time Remaining: " + time);  
};  
var hideTime = function (){
    $('#timeRem').html('');
}
//inserts question into answers div
function insertQuestion (question){
    for(var k in question) {
        answer = $("<div>");
        answer.addClass(k);
        answer.html(question[k]);
        $('.answers').append(answer);
    }
};
//displays the current question, and sets up currentQuestion var for next function call
function displayQuestion() {
    currentQuestion++;
    insertQuestion(questions[currentQuestion])

};
//Begins thirty second timer
function thirtySec(){
    clearStatus();
    time = 10;
    showTime();
    intervalId = setInterval(decrement, 1000);
    $('#start').hide();
};

//When user runs out of time, correct answer appears, next question appears in five sec
function decrement() {
    if (time===0 && currentQuestion < numOfQ){
        answerScreen();
        displayStatus(questions[currentQuestion].correctAnswer, 'Out of Time' );
        unanswered++;
    }
    else if (time > 0){
    showTime();
    time--;
    }
    else{
      unanswered++;
      displayStatus(questions[currentQuestion].correctAnswer, 'Out of Time' );
      finalAnswer();

    }
};
function fiveSec(){
    timeoutId = setTimeout(run, 5000);
}
//displays or clears correct answer, and if the user got it right or if time was up
function displayStatus(correctAnswer, status){
    $('#answerstatus').html(status);
    $('#correctanswer').html(correctAnswer); //maybe image?   
    
};
function clearStatus () {
    $('#answerstatus').html('');
    $('#correctanswer').html('');
}

function userChoice(){
    console.log(currentQuestion);
    if($(this).hasClass('correctAnswer') && (currentQuestion < numOfQ)){
      answerScreen();
      displayStatus(questions[currentQuestion].correctAnswer, 'correct');
      correct++;
    }
    else if (currentQuestion < numOfQ){
      answerScreen();
      displayStatus(questions[currentQuestion].correctAnswer, 'Incorrect');
      incorrect++;
    }
    else if ($(this).hasClass('correctAnswer') && (currentQuestion == numOfQ)){
      correct++;
      finalAnswer();
      displayStatus(questions[currentQuestion].correctAnswer, 'correct');
    }
    else if (currentQuestion == numOfQ) {
      incorrect++;
      finalAnswer();
      displayStatus(questions[currentQuestion].correctAnswer, 'incorrect');
    }
};

function answerScreen(){
    clearInterval(intervalId);
    hideTime();
    fiveSec();
};

function finalAnswer(){
    clearInterval(intervalId);
    hideTime();
    timeoutId = setTimeout(finalScreen(), 5000);
}
function finalScreen() {
    clearInterval(intervalId);
    hideTime();
    $('.answers').html('');
    $('#answerstatus').html('Game Over');
    $('#stats').html("Correct: " + correct + " Incorrect: " +  incorrect + " Unanswered: " + unanswered);
    $('#replay').show();
    resetStats();
}


function run(){
    $('#stats').html('');
    $('#replay').hide();
    thirtySec();
    displayQuestion();
    $('.correctAnswer, .answer1, .answer2, .answer3').on('click', userChoice);
};

function resetStats(){
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    currentQuestion = 0;
}

$('.correctAnswer').on('click', userChoice);
$('#start').on("click", run);
$('#replay').on('click', run);

});