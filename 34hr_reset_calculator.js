// 34hr Reset Calculator
// 34hr_reset_calculator.js

const nowBtn = document.getElementById("nowBtn");
const calcBtn = document.getElementById("calcBtn");

function calculateReset(start) {
    const resetEnd = new Date(
        start.getTime() + 34 * 60 * 60 * 1000
    );

    const startTime = document.getElementById("startTime");
    const result = document.getElementById("result");

    // Options for date and time with toLocaleString()
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false
    }

    startTime.textContent = "Your reset started at: " + start.toLocaleString('en-US', options);
    result.textContent = "Your reset ends at: " + resetEnd.toLocaleString('en-US', options);
}

nowBtn.addEventListener("click", function () {
    // Start reset now
    const start = new Date();
    calculateReset(start);
});

calcBtn.addEventListener("click", function () {
    // Calculate the 34hr Reset
    const start = new Date(document.getElementById("start").value);
    calculateReset(start);
});