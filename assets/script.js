//Select the timer display
var timeEl = document.querySelector(".time");
//Select the start quiz button
var btnStartEl = document.getElementById("btn-start");
//Set initial max time remaining
var timeRemaining = 75;
//Variable to save which question user is on. Used to reference the question array so 0 is actually question 1.
var currQuestion = 0;
//Select the quiz-content div to replace its contents when questions are shown
var quizContentEl = document.getElementById("quiz-content");
//Create an array to hold button objects so they can collectively be updated using a loop in quizStart() and populateQuestion()
var buttons = [];
/*
Stores questions as objects in an array. Each question has an answer 
property which holds the correct answer and an options property which
holds an array of possible answers to display to the user. These values
will be used to populate each question and check user's answer
*/
var questions = [
    question1 = {
        question: "Commonly used data types DO NOT include: ",
        answer: "3. alerts",
        options: [
            "1. strings",
            "2. booleans",
            "3. alerts",
            "4. numbers"
        ]},
    question2 = {
        question: "The condition in an if / else statement is enclosed within _____.",
        answer: "3. parantheses",
        options: [
            "1. quotes",
            "2. curly brackets",
            "3. parentheses",
            "4. square brackets"
        ]},
    question3 = {
        question: "Arrays in JavaScript can be used to store _____.",
        answer: "4. all of the above",
        options: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above"
        ]},
    question4 = {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        answer: "3. quotes",
        options: [
            "1. commas",
            "2. curly brackets",
            "3. quotes",
            "4. parantheses"
        ]},
    question5 = {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer: "4. console.log",
        options: [
            "1. JavaScript",
            "2. terminal / bash",
            "3. for loops",
            "4. console.log"
        ]}
    ];
    
//When start button is clicked, start quiz
btnStartEl.addEventListener('click', quizStart);

//Start timer and generate first question on screen
function quizStart() {
    //Remove the quiz description
    document.getElementById("quiz-desc").textContent = "";
    //Remove the start button
    quizContentEl.removeChild(document.getElementById("btn-start"));

    //Create 4 buttons in our 'buttons' array to store answer options for the user to pick from
    for (var i=0; i<4; i++){
        buttons[i] = document.createElement("button");
        quizContentEl.appendChild(buttons[i]);
    }

    setTime();
    populateQuestion();
}

//Replace content in quiz-content div with next question
function populateQuestion() {
    //Replace the h2 content with the current question
    quizContentEl.children[0].textContent = questions[currQuestion].question;
    
    //Update content on the buttons with the new options for the question
    for (var i=0; i<4; i++){
        buttons[i].textContent = questions[currQuestion].options[i];
        buttons[i].addEventListener('click', checkAnswer);
    }
}

//Check if the user selected the correct answer
function checkAnswer(event) {
    //If user is incorrect, remove 10 seconds from their timer
    if (event.target.textContent != questions[currQuestion].answer) {
        timeRemaining -= 10;
    }    
    
    currQuestion++;
    
    //If user is out of questions
    if (currQuestion == questions.length) {
        endGame();
    }
    //If user has more questions left, populate the next question onto the screen
    else {
        populateQuestion();
    }
}

function endGame() {
    quizContentEl.children[0].textContent = "All done!";
    quizContentEl.children[1].textContent = "Your final score is " + timeRemaining + ".";

    //Run this 4 times to remove the 4 buttons containing answer options
    for (var i=0; i<4; i++) {
        quizContentEl.removeChild(quizContentEl.children[2]);
    }
}

//Every 1000ms remove 1 second from the time remaining and update the time displayed
function setTime() {
    var timerInterval = setInterval(function() {
        timeRemaining--;
        timeEl.textContent = "Time: " + timeRemaining;

        //Clear time interval if time reaches 0 to end loop
        if (timeRemaining === 0){  
            clearInterval(timerInterval);
        }
    }, 1000);
}



//https://stackoverflow.com/questions/8260156/how-do-i-create-dynamic-variable-names-inside-a-loop