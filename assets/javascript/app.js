$(document).ready(function(){


var correct = 0;
var incorrect = 0;
var unanswered = 0;
var number = 30;
var intervalId;
var timeoutId;
var showTime = function(){
    $('#timeRem').html("Time Remaining: " + number);  
};
var hideTime = function (){
    $('#timeRem').hide();
}
var clockRunning = false;

var questions = {
    question1: {
        question: "question1",
        answer1: "answer",
        answer2: "answer",
        correctAnswer: "answer",
        answer4: "answer",  
    },
    question2:   {
        question: "question2",
        answer1: "answer",
        answer2: "answer",
        correctAnswer: "answer",
        answer4: "answer",   
    },
    question3: {
        question: "question3",
        answer1: "answer",
        answer2: "answer",
        answer3: "answer",
        correctAnswer: "answer",   
    },
    question4: {
        question: "question4",
        answer1: "answer",
        correctAnswer: "answer",
        answer3: "answer",
        answer4: "answer",   
    },
    question5:  {
        question: "question5",
        answer1: "answer",
        answer2: "answer",
        answer3: "answer",
        correctAnswer: "answer",   
    }
};

 
//inserts question into answers div
function insertQuestion (question){
    for(var k in question) {
        answer = $("<div>");
        answer.addClass(k);
        answer.html(question[k]);
        $('.answers').append(answer);
    }
};


function decrement() {
    if (number===0){
        displayStatus(questions.question1.correctAnswer, 'Out of Time' )
        hideTime();
        clockRunning = false;
        timeoutId = setTimeout(run, 5000);

        
    }
    else{
    showTime();
    number--;
    }


};



function thirtySec(){
    number = 30;
    showTime();
    intervalId = setInterval(decrement, 1000);
    $('#start').hide();
    clockRunning=true;
};

function displayStatus(correctAnswer, status){
    $('#answerstatus').html(status);
    $('#correctanswer').html(correctAnswer); //maybe image?
};





function run(){
  for (var k in questions){
      if (questions.hasOwnProperty(k) && clockRunning === false){
        insertQuestion(questions[k]);
        thirtySec();
      }
}
};



$('#start').on("click", run);


});