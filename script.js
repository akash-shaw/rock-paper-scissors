function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getHumanChoice(){
    return prompt("Enter rock, paper or scissors").toLowerCase();
}

let humanScore = 0;
let computerScore = 0;


function playRound(humanChoice, computerChoice){
    let isHumanWinner;
    if(computerChoice==humanChoice){
        console.log(`You both lost! ${humanChoice} won.`);
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
        console.log(`${humanChoice} is not an choice`);
        return;
    }
    if(isHumanWinner){
        humanScore += 1;
        console.log(`You won! ${humanChoice} beats ${computerChoice}`);
    }
    else{
        computerScore += 1;
        console.log(`You lost! ${computerChoice} beats ${humanChoice}`);
    }
}

function playGame(){
    for(let i=0; i<5; i++){
        const humanChoice = getHumanChoice();
        const computerChoice = getComputerChoice();
        playRound(humanChoice,computerChoice);
    }
    console.log(`Final ScoreBoard: Human = ${humanScore}, Computer = ${computerScore}`);
}