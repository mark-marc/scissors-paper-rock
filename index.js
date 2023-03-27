const choices = ["rock", "paper", "scissors"];
let winners = [];

function resetGame(){
    winners = [];
    document.querySelector(".playerScore").textContent = "Score: 0";
    document.querySelector(".computerScore").textContent = "Score: 0";
    document.querySelector(".ties").textContent = "Ties: 0";
    document.querySelector(".winner").textContent = "";
    document.querySelector(".playerChoice").textContent = "";
    document.querySelector(".computerChoice").textContent = "";
    document.querySelector(".reset").style.display = "none";

}

function startGame(){
    //Play the game until someone wins 5 times
    let imgs = document.querySelectorAll('img');
    imgs.forEach((img) => 
    img.addEventListener(('click'), () => {
        if(img.id){
            playRound(img.id)
        }
    })
    )

}


function playRound(playerSelection) {
    let wins = checkWins()
    if(wins >= 5){
        return
    }
    
    const computerChoice = computerSelection();

    const winner = checkWinner(playerSelection, computerChoice);
    winners.push(winner);
    tallyWins();
    displayRound(playerSelection, computerChoice, winner)
    wins = checkWins();
    if(wins == 5){
        displayEnd()
    }
}

function displayEnd(){
    let playerWins = winners.filter(item => item == "Player").length;
    if(playerWins == 5){
        document.querySelector(".winner").textContent = "You won 5 Games, Congrats!"
    } else {
        document.querySelector(".winner").textContent = "Sorry, the computer won 5 times";

    }
    document.querySelector('.reset').style.display = 'flex'
}

function displayRound(playerSelection, computerChoice, winner){
    document.querySelector('.playerChoice').textContent = `You chose ${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)}`
    document.querySelector('.computerChoice').textContent = `The computer chose ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}`
    
    displayRoundWinner(winner)
}

function displayRoundWinner(winner){
    if(winner == "Player"){
        document.querySelector(".winner").textContent = "You won the round!"
    } else if (winner == "Computer") {
        document.querySelector(".winner").textContent = "The Computer Won the Round";
    } else {
        document.querySelector(".winner").textContent = "The round was a tie"
    }
}

function tallyWins(){
    let playerWins = winners.filter(item => item == "Player").length;
    let computerWins = winners.filter(item => item == "Computer").length;
    let ties = winners.filter((item) => item == "Tie").length;
    document.querySelector('.playerScore').textContent = `Score: ${playerWins}`
    document.querySelector('.computerScore').textContent = `Score: ${computerWins}`
    document.querySelector('.ties').textContent = `Ties: ${ties}`

}


function computerSelection(){
    //todo - update the dom with computer selection
    let choice = choices[Math.floor(Math.random() * choices.length)]

    document.querySelector(`.${choice}`).classList.add("active");

    setTimeout(() => {
        document.querySelector(`.${choice}`).classList.remove("active");
    }, 700)

    return choice
};


function checkWins (){
    let playerWins = winners.filter(item => item == "Player").length;
    let computerWins = winners.filter(item => item == "Computer").length;
    return Math.max(playerWins, computerWins);
}

function checkWinner(choicePlayer, choiceComputer){
    if(choicePlayer === choiceComputer){
        return 'Tie';
    } else if(
     (choicePlayer === "rock" && choiceComputer === "scissors") ||
     (choicePlayer === "paper" && choiceComputer === "rock") || 
     (choicePlayer === "scissors" && choiceComputer === "paper"))
    {
        return "Player";  
    } else {
        return "Computer";
    }
}

function logWins(){
    let playerWins = winners.filter(item => item == "Player").length;
    let computerWins = winners.filter(item => item == "Computer").length;
    let ties = winners.filter((item) => item == "Tie").length;
    
}

startGame()




