//Select the timer display
var timeEl = document.querySelector(".time");

//Set initial max time remaining
var timeRemaining = 75;

//Every 1000ms remove 1 second from the time remaining and update the time displayed
function setTime() {
    var timerInterval = setInterval(function() {
        console.log(timeRemaining);
        timeRemaining--;
        timeEl.textContent = "Time: " + timeRemaining;

        //Clear time interval if time reaches 0 to end loop
        if (timeRemaining === 0){  
            clearInterval(timerInterval);
        }
    }, 1000);
}

setTime();