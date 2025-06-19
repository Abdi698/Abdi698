let timer;
let startTime = localStorage.getItem("startTime") ? parseInt(localStorage.getItem("startTime")) : null;
let elapsedTime = localStorage.getItem("elapsedTime") ? parseInt(localStorage.getItem("elapsedTime")) : 0;
let running = localStorage.getItem("running") === "true"; // Restore running state
let laps = JSON.parse(localStorage.getItem("laps")) || []; // Restore laps

function update() {
    const time = (running ? Date.now() - startTime : 0) + elapsedTime;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor(time / 1000 / 60 / 60);
    document.querySelector(".counter").innerText =
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startStopwatch() {
    if (!running) {
        startTime = Date.now() - elapsedTime; // Adjust start time to account for elapsed time
        localStorage.setItem("startTime", startTime); // Save start time
        timer = setInterval(update, 1000);
        running = true;
        localStorage.setItem("running", running); // Save running state
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        localStorage.setItem("elapsedTime", elapsedTime); // Save elapsed time
        running = false;
        localStorage.setItem("running", running); // Save running state
    }
}

function resetStopwatch() {
    clearInterval(timer);
    elapsedTime = 0;
    startTime = null;
    running = false;
    laps = [];
    localStorage.setItem("elapsedTime", elapsedTime); // Reset elapsed time in storage
    localStorage.setItem("startTime", startTime); // Reset start time in storage
    localStorage.setItem("running", running); // Reset running state
    localStorage.setItem("laps", JSON.stringify(laps)); // Clear laps in storage
    document.querySelector(".counter").innerText = "00:00:00";
    document.getElementById("laps").innerHTML = "";
}

function recordLap() {
    if (running) {
        const lapTime = document.querySelector(".counter").innerText;
        const lapItem = document.createElement("li");
        lapItem.textContent = lapTime;

        // Create a delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("erase-btn");
        deleteButton.onclick = function () {
            lapItem.remove();
        };

        // Append the delete button to the lap item
        lapItem.appendChild(deleteButton);
        document.getElementById("laps").appendChild(lapItem);
    }
}

// Restore the stopwatch state on page load
window.onload = function () {
    if (elapsedTime > 0) {
        update(); // Update the display with the saved elapsed time
    }
    if (running) {
        startTime = Date.now() - elapsedTime; // Adjust start time to account for elapsed time
        timer = setInterval(update, 1000); // Restart the timer if it was running
    }
};
