let humanScore = 0;
let computerScore = 0;
let timeoutID;  // status timeout to avoid overlap

// preloading audio files
const audioFiles = [
    "media/switchon.mp3",
    "media/switchoff.mp3",
    "media/buttonpress.mp3",
    "media/reset.mp3",
    "media/win.mp3",
    "media/lose.mp3"
];
audioFiles.forEach((file) => {
    const audio = new Audio(file);
    audio.preload = "auto";
});

// updating initial score to 0 and status to default param
updateScore();
updateStatus();

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// game algo, helper to playGame()
function playRound(humanChoice, computerChoice) {
    let isHumanWinner;
    if (computerChoice == humanChoice) {
        updateStatus(`Both of you lost! ${humanChoice} won`);
        return;
    }
    else if (humanChoice == "rock") {
        if (computerChoice == "paper") isHumanWinner = false;
        if (computerChoice == "scissors") isHumanWinner = true;
    }
    else if (humanChoice == "paper") {
        if (computerChoice == "rock") isHumanWinner = true;
        if (computerChoice == "scissors") isHumanWinner = false;
    }
    else if (humanChoice == "scissors") {
        if (computerChoice == "paper") isHumanWinner = true;
        if (computerChoice == "rock") isHumanWinner = false;
    }
    else {
        updateStatus(`${humanChoice} is not an choice`);
        return;
    }
    if (isHumanWinner) {
        humanScore += 1;
        updateStatus(`You won! ${humanChoice} beats ${computerChoice}`);
    }
    else {
        computerScore += 1;
        updateStatus(`You lost! ${computerChoice} beats ${humanChoice}`);
    }
}

//play one single round
function playGame(humanChoice) {
    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
    updateScore();
    checkWinner();
}

//updates both variables and text
function updateScore() {
    const humanResult = document.querySelector(".human-result span");
    const computerResult = document.querySelector(".computer-result span");
    humanResult.textContent = `${humanScore}`;
    computerResult.textContent = `${computerScore}`;
}
// updates status
function updateStatus(message = "") {
    const statusBox = document.querySelector("#status");

    //avoid overlap of two text typewriter
    if (timeoutID) {
        clearTimeout(timeoutID);
    }

    //console feel
    statusBox.textContent = "> ";
    let i = 0;

    //typewriting effect
    function typeWriter() {
        if (i < message.length) {
            statusBox.textContent += message[i];
            i++;
            timeoutID = setTimeout(typeWriter, 25); //calculate timeout
        } else {
            timeoutID = null;
        }
    }

    typeWriter();
}

//checks whole season winner, if found disables buttons
function checkWinner() {
    if (humanScore == 5) {
        const winAudio = new Audio("media/win.mp3");
        winAudio.play();
        updateStatus("You Won the Game!");
        disablePlayButtons();
    }
    else if (computerScore == 5) {
        const loseAudio = new Audio("media/lose.mp3");
        loseAudio.play();
        updateStatus("Computer Won the Game!");
        disablePlayButtons();
    }
}

function disablePlayButtons() {
    const playButtons = document.querySelectorAll("#btn-container button");
    playButtons.forEach(button => button.disabled = true);
    const buttonImages = document.querySelectorAll(".choice-btn img");
    buttonImages.forEach(buttonImage => buttonImage.style.opacity = "25%");
}
function enablePlayButtons() {
    const playButtons = document.querySelectorAll("#btn-container button");
    playButtons.forEach(button => button.disabled = false);
    const buttonImages = document.querySelectorAll(".choice-btn img");
    buttonImages.forEach(buttonImage => buttonImage.style.opacity = "100%");
}

//resets the game
function resetGame() {
    const resetAudio = new Audio("media/reset.mp3");
    resetAudio.play();
    enablePlayButtons();
    humanScore = 0;
    computerScore = 0;
    updateScore();
    updateStatus();
}
const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", resetGame);

//takes player input
const playerButtons = document.querySelector("#btn-container");

playerButtons.addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON" || e.target.tagName == "IMG") {
        const buttonPress = new Audio("media/buttonpress.mp3");
        buttonPress.play();
        playGame(e.target.classList[0]);
    }
});

// power switch action and sound
const powerSwitch = document.querySelector(".power-switch");
powerSwitch.addEventListener("click", e => {
    const checkBox = document.querySelector("#switch");
    const powerLED = document.querySelector(".power-led");
    const switchOnSound = new Audio("media/switchon.mp3");
    const switchOffSound = new Audio("media/switchoff.mp3");
    checkBox.checked = !checkBox.checked;
    powerLED.classList.toggle("on");
    if (checkBox.checked) {
        switchOnSound.play();
    }
    else {
        switchOffSound.play();
    }
});

//scale the .game according to window size
function scaleGame() {
    const container = document.querySelector('.container');
    const game = document.querySelector('.game');
    const containerWidth = window.innerHeight * (295 / 591);
    const containerTop = window.innerHeight * (115 / 591);
    const scale = containerWidth / 550;

    container.style.width = `${containerWidth}px`;
    container.style.top = `${containerTop}px`;
    // Calculate scale based on the original aspect ratio width 
    game.style.transform = `scale(${scale})`;

    const overlay = document.querySelector(".overlay");
    overlay.style.cssText = `font-size: ${window.innerHeight * (20 / 591)}px; top: ${window.innerHeight * (20 / 591)}px; left: ${window.innerHeight * (20 / 591)}px`;

    const powerSwitch = document.querySelector(".power-switch");
    powerSwitch.style.cssText = `font-size: ${window.innerHeight * (20 / 591)}px; top: ${window.innerHeight * (350 / 591)}px; left: ${(window.innerWidth / 2) + (window.innerHeight * (125 / 591))}px`;

    const powerLED = document.querySelector(".power-led");
    powerLED.style.cssText = `font-size: ${window.innerHeight * (40 / 591)}px; top: ${window.innerHeight * (328 / 591)}px; left: ${(window.innerWidth / 2) + (window.innerHeight * (148 / 591))}px`;
}
window.addEventListener('load', scaleGame);
window.addEventListener('resize', scaleGame);

