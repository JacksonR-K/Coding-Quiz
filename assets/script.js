//Select the timer display
var timeEl = document.querySelector(".time");
//Select the start quiz button
var btnStartEl = document.getElementById("btn-start");
//Select the 'View Highscores' button
var btnViewScoresEl = document.getElementById("view-scores");
//Set initial max time remaining
var timeRemaining = 75;
//Variable to save which question user is on. Used to reference the question array so 0 is actually question 1.
var currQuestion = 0;
//Select the quiz-content div to replace its contents when questions are shown
var quizContentEl = document.getElementById("quiz-content");
//Create an array to hold button objects so they can collectively be updated using a loop in quizStart() and populateQuestion()
var buttons = [];
//Declare timerInterval in the global scope so it can be stopped when the game ends in endGame()
var timerInterval;
//Create an array to reference highscores pulled from local storage. This we will cap at 10 highscores in setHighscore()
var scores = [];

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
        answer: "3. parentheses",
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

//When view highscores is clicked, display the highscores
btnViewScoresEl.addEventListener('click', displayHighscore);

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
    var isCorrectEl = document.createElement("p");
    quizContentEl.appendChild(isCorrectEl);

    //If user is incorrect, remove 10 seconds from their timer
    if (event.target.textContent != questions[currQuestion].answer) {
        timeRemaining -= 10;
        isCorrectEl.textContent = "Wrong!";
    } else {
        isCorrectEl.textContent = "Correct!";
    }

    var clearAns = setTimeout(function () {
        quizContentEl.removeChild(isCorrectEl);
    }, 1000);
    
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
    //Compare score to highscores
    setHighscore();
    //Stop timer
    clearInterval(timerInterval);
    //Update timer display
    timeEl.textContent = "Time: " + timeRemaining;

    quizContentEl.children[0].textContent = "All done!";
    quizContentEl.children[1].textContent = "Your final score is " + timeRemaining + ".";

    //Run this 4 times to remove the 4 buttons containing answer options
    for (var i=0; i<4; i++) {
        quizContentEl.removeChild(quizContentEl.children[2]);
    }
}

//Every 1000ms remove 1 second from the time remaining and update the time displayed
function setTime() {
    timerInterval = setInterval(function() {
        timeRemaining--;
        timeEl.textContent = "Time: " + timeRemaining;

        //Clear time interval if time reaches 0
        if (timeRemaining === 0){  
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function getHighscore() {
    //Save all existing scores (if any) to an array called 'scores' starting from the lowest existing score. Array holds only 10 highest scores
    for (var i=0; i<10; i++){
    //If scores exist add them to an array called 'scores'
    if (localStorage.getItem(i) !== null) {
        scores.push(localStorage.getItem(i));
    }
    }
}

function displayHighscore() {
    getHighscore();
    
    var bodyEl = document.querySelector('body');
    bodyEl.removeChild(bodyEl.children[0]);
    quizContentEl.children[0].textContent = "Highscores";
    quizContentEl.children[1].textContent = "";
    if (quizContentEl.children[2] != null) {
        quizContentEl.removeChild(quizContentEl.children[2]);
    }
    
    for (var i=0; i<scores.length; i++){
        var scoreDisplay = document.createElement("p");
        scoreDisplay.textContent = scores[i];
        bodyEl.appendChild(scoreDisplay);
    }

    var btnBackEl = document.createElement("button");
    btnBackEl.textContent = "Go Back";
    btnBackEl.addEventListener('click', function () { window.location.reload() });
    quizContentEl.appendChild(btnBackEl);

    var clearScoresEl = document.createElement("button");
    clearScoresEl.textContent = "Clear Highscores";
    clearScoresEl.addEventListener('click', function () { localStorage.clear(); scoreDisplay.textContent = ""; });
    quizContentEl.appendChild(clearScoresEl);

}

function setHighscore() {
    //Grab highscores from storage (if any exist)
    getHighscore();
    
    //If no scores exist, add the current score as the high score
    if (scores.length == 0) {
        localStorage.setItem(1, timeRemaining);
    } 
    //Cycle through every possible outcome for where the score lands on the highscores leaderboard and add new score accordingly
    else { 
        for (var i=0; i<scores.length; i++) {
        //Highest possible score but not best score
        if (timeRemaining > scores[i] && timeRemaining <= scores[i+1]) {
            if (scores.length == 10) {
                scores.shift();
            }
            scores.splice(i+1, 0, timeRemaining);
            break;
        }
        //Best score
        else if (timeRemaining > scores[i] && scores[i+1] == undefined) {
            if (scores.length == 10){
                scores.shift();
            }
            scores.push(timeRemaining);
            break;
        }
        //Can go higher on the board. Skips the loop's cycle to compare current score to the next score in the array
        else if (timeRemaining > scores[i]) {
            continue;
        } 
        //Doesn't beat any score
        else {
            if (scores.length == 10) {
                break;
            }
            //Add score anyways since there is room on the leaderboard
            else {
                scores.unshift(timeRemaining);
                break;
            }
        }
        }
    }
    //Sorts the array in reverse so the scores so the highest as a key value of 1 when stored to local storage 
    scores.reverse();
    //Add scores back to storage to update new score if any
    for (var i=0; i<scores.length; i++){
        localStorage.setItem(i+1, scores[i]);
    }
}
