$(document).ready(function(){
$('#replay').hide();


var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time = 20;
var intervalId;
var timeoutId;
var currentQuestion = 0;

var questions = {
  1: {
    question: "What is the fastest fish in the ocean?",
    answer1: "Marlin",
    answer2: "Wahoo",
    correctAnswer: "Sailfish",
    answer3: "Tuna",
},
  2:   {
    question: "What is the world's largest ocean?",
    answer1: "Atlantic",
    answer2: "Indian",
    correctAnswer: "Pacific",
    answer3: "Arctic",   
},
  3: {
    question: "What percent of the oxygen we breathe is produced by the oceans?",
    answer1: "30%",
    answer2: "50%",
    answer3: "90%",
    correctAnswer: "70%",   
},
  4: {
    question: "This is the largest animal on earth:",
    answer1: "Humpback Whale",
    correctAnswer: "Blue Whale",
    answer2: "Whale Shark",
    answer3: "Sperm Whale",   
},
  5:  {
    question: "What percent of the Earth's surface is covered by oceans?",
    answer1: "82%",
    answer2: "65%",
    answer3: "87%",
    correctAnswer: "71%",   
},
  6:  {
    question: "What is the average depth of the Earth's oceans?",
    correctAnswer: "12,200 ft",
    answer1: "5,800 ft",
    answer2: "2,400 ft",
    answer3: "21,000 ft",   
},
  7:  {
    question: "What percent of humans live on the coast?",
    answer1: "70%",
    answer2: "50%",
    answer3: "40%",
    correctAnswer: "80%",   
},
  8:  {
    question: "Green turtles can migrate more than _____ miles to lay their eggs.",
    answer1: "100",
    answer2: "400",
    correctAnswer: "1400", 
    answer3: "1000",
  
},
  9:  {
    question: "Life began in the seas how long ago?",
    answer1: "1 BYA",
    correctAnswer: "3.2 BYA", 
    answer2: "750 MYA",
    answer3: "5 BYA",
},
  10:  {
    question: "How many hearts do octopus have?",
    answer1: "1",
    answer2: "2",
    correctAnswer: "3",  
    answer3: "4",  
}
};
function lowTime(){
  if (time < 5) {
    $('#timeRem').css({"color":"red", 'font-size': '48px'});
  }
  else{
    $('#timeRem').css({'color':'black', 'font-size':'36px'})
  }
};

var numOfQ = Object.keys(questions).length; //number of questions
function showTime(){
  $('#timeRem').html("Time Remaining: " + time);  
};  
function hideTime(){
  $('#timeRem').html('');
};
function resetStats(){
  correct = 0;
  incorrect = 0;
  unanswered = 0;
  currentQuestion = 0;
}; 
//inserts current question and answers into answers div when called
function insertQuestion (question){
  for(var k in question) {
    answer = $("<div>");
    answer.addClass(k);
    answer.html(question[k]);
    $('.answers').append(answer);
  }
};
function insertImage (){
  $('.answers').append('<img src="' + questions[currentQuestion].image + '/>');
};
//displays the current question, and sets up currentQuestion var for next function call
function displayQuestion() {
  currentQuestion++;
  insertQuestion(questions[currentQuestion])
};
//Begins thirty second timer
function thirtySec(){
  clearStatus();
  time = 20;
  lowTime();
  showTime();
  intervalId = setInterval(decrement, 1000);
  $('#start').hide();
};
//When user runs out of time, correct answer appears, next question appears in five sec
function decrement() {
  if (time===0 && currentQuestion < numOfQ) { 
    answerScreen();
    displayStatus(questions[currentQuestion].correctAnswer, 'Out of Time' );
    unanswered++;
  }
  else if (time > 0) {
    showTime();
    time--;
    lowTime();
  }
  else { //if time runs out and it's the final question
    unanswered++;
    displayStatus(questions[currentQuestion].correctAnswer, 'Out of Time' );
    finalAnswer();
  }
};
//After the user guesses, starts 5 second timeout and then runs the next question
function fiveSec(){
  timeoutId = setTimeout(run, 5000);
};
//displays or clears correct answer, and if the user got it right or if time was up
function displayStatus(correctAnswer, status){
  $('#answerstatus').html(status);
  $('#correctanswer').html(correctAnswer); //maybe image?   
};
function clearStatus () {
  $('#answerstatus').html('');
  $('#correctanswer').html('');
};
//displays answer screen up until last question
function answerScreen(){
  clearInterval(intervalId);
  hideTime();
  fiveSec();
  insertImage();
};
//displays answer screen for last question, which leads to final/replay screen
function finalAnswer() {
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
};

//starts inserts first question, starts 30 sec timer, places click event on answers
function run() {
  $('#stats').html('');
  $('#replay').hide();
  thirtySec();
  displayQuestion();
  $('.correctAnswer, .answer1, .answer2, .answer3').on('click', userChoice);
};

function userChoice(){
  if ($(this).hasClass('correctAnswer') && (currentQuestion < numOfQ)) { //if correct answer and not last question
    correct++;
    answerScreen();
    displayStatus(questions[currentQuestion].correctAnswer, 'correct');
  }
  else if (currentQuestion < numOfQ) { // if incorrect and not last question
    incorrect++;
    answerScreen();
    displayStatus(questions[currentQuestion].correctAnswer, 'Incorrect');
  }
  else if ($(this).hasClass('correctAnswer') && (currentQuestion === numOfQ)) { //if correct and last question
    correct++;
    finalAnswer();
    displayStatus(questions[currentQuestion].correctAnswer, 'correct');
  }
  else if (currentQuestion === numOfQ) { //if incorrect and last question
    incorrect++;
    finalAnswer();
    displayStatus(questions[currentQuestion].correctAnswer, 'Incorrect');
  }
};

$('#start').on("click", run);
$('#replay').on('click', run);
});