let humanScore = 0;
let computerScore = 0;

updateScore();

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
    const result = document.querySelector("#result");
    result.textContent = `You: ${humanScore}, Computer: ${computerScore}`
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
    console.log(e.target.id);
    playGame(e.target.id);
});

function updateStatus(message=""){
    const statusBox = document.querySelector("#status");
    statusBox.textContent = message;
}