let humanScore = 0;
let computerScore = 0;

updateScore();
updateStatus();

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}


function playRound(humanChoice, computerChoice){
    let isHumanWinner;
    if(computerChoice==humanChoice){
        updateStatus(`You both lost! ${humanChoice} won.`);
        return;
    }
    else if(humanChoice=="rock"){
        if(computerChoice=="paper") isHumanWinner=false;
        if(computerChoice=="scissors") isHumanWinner=true;
    }
    else if(humanChoice=="paper"){
        if(computerChoice=="rock") isHumanWinner=true;
        if(computerChoice=="scissors") isHumanWinner=false;
    }
    else if(humanChoice=="scissors"){
        if(computerChoice=="paper") isHumanWinner=true;
        if(computerChoice=="rock") isHumanWinner=false;
    }
    else{
        updateStatus(`${humanChoice} is not an choice`);
        return;
    }
    if(isHumanWinner){
        humanScore += 1;
        updateStatus(`You won! ${humanChoice} beats ${computerChoice}`);
    }
    else{
        computerScore += 1;
        updateStatus(`You lost! ${computerChoice} beats ${humanChoice}`);
    }
}

function playGame(humanChoice){
    const computerChoice = getComputerChoice();
    playRound(humanChoice,computerChoice);
    updateScore();
    checkWinner();
}

function updateScore(){
    const humanResult = document.querySelector(".human-result span");
    const computerResult = document.querySelector(".computer-result span");
    humanResult.textContent = `${humanScore}`;
    computerResult.textContent= `${computerScore}`;
}

function updateStatus(message=""){
    const statusBox = document.querySelector("#status");
    statusBox.textContent = `> ${message}`;
}

function checkWinner(){
    if(humanScore==5){
        updateStatus("You Won the Season!");
        disablePlayButtons();
    }
    else if(computerScore==5){
        updateStatus("Computer Won the Season!");
        disablePlayButtons();
    }
}

function disablePlayButtons(){
    const playButtons = document.querySelectorAll("#btn-container button");
    playButtons.forEach(button => button.disabled = true);
}
function enablePlayButtons(){
    const playButtons = document.querySelectorAll("#btn-container button");
    playButtons.forEach(button => button.disabled = false);
}

function resetGame(){
    enablePlayButtons();
    humanScore=0;
    computerScore=0;
    updateScore();
    updateStatus();
}
const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", resetGame);

const playerButtons = document.querySelector("#btn-container");

playerButtons.addEventListener("click", (e)=>{
    if(e.target.tagName == "BUTTON"){
        playGame(e.target.id);
    }
});

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button=>{
    button.addEventListener("mousedown", e=>{
        button.style.cssText = "transform: scale(0.9);"
    })
    button.addEventListener("mouseup", e=>{
        button.style.cssText = "transform: scale(1);"
    })
})

const powerSwitch = document.querySelector(".power-switch");

powerSwitch.addEventListener("click", e=>{
    const checkBox = document.querySelector("#switch");
    checkBox.checked = !checkBox.checked;

    const powerLED = document.querySelector(".power-led");
    powerLED.classList.toggle("off");
});





function scaleGame() { 
    const container = document.querySelector('.container'); 
    const game = document.querySelector('.game'); 
    const containerWidth = window.innerHeight*(295/591);
    const containerTop = window.innerHeight*(115/591);
    const scale = containerWidth / 550; 

    container.style.width = `${containerWidth}px`;
    container.style.top = `${containerTop}px`;
    // Calculate scale based on the original aspect ratio width 
    game.style.transform = `scale(${scale})`; 

    const overlay = document.querySelector(".overlay");
    overlay.style.cssText = `font-size: ${window.innerHeight*(20/591)}px; top: ${window.innerHeight*(20/591)}px; left: ${window.innerHeight*(20/591)}px`;

    const powerSwitch = document.querySelector(".power-switch");
    powerSwitch.style.cssText = `font-size: ${window.innerHeight*(20/591)}px; top: ${window.innerHeight*(350/591)}px; left: ${(window.innerWidth/2) + (window.innerHeight*(125/591))}px`;

    const powerLED = document.querySelector(".power-led");
    powerLED.style.cssText = `font-size: ${window.innerHeight*(40/591)}px; top: ${window.innerHeight*(328/591)}px; left: ${(window.innerWidth/2) + (window.innerHeight*(148/591))}px`;
}
 // Scale game on page load 
 window.addEventListener('load', scaleGame); 
 // Scale game whenever the window is 
 window.addEventListener('resize', scaleGame);

