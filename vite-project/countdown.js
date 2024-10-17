let countdown = 7;
const timerElement = document.getElementById('timer');


function updateCountdown() {
    if (countdown > 0) {
        timerElement.textContent = countdown;
        countdown--;
    } else {
        clearInterval(timerInterval);
        timerElement.textContent = "7 seconds passed";
        timerElement.classList.add('red');
    }
}

const timerInterval = setInterval(updateCountdown, 1000);