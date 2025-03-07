const choices = ['rock', 'paper', 'scissors'];

const choiceIcons = {
    rock: '<img src="images/stone.png" class="w-12 h-12 object-contain">',
    paper: '<img src="images/paper.png" class="w-12 h-12 object-contain">',
    scissors: '<img src="images/scissors.png" class="w-12 h-12 object-contain">'
};

const resultDiv = document.getElementById('result');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const buttons = document.querySelectorAll('.btn');
const resetButton = document.getElementById('reset-btn');
const playerChoiceDiv = document.getElementById('player-choice');
const computerChoiceDiv = document.getElementById('computer-choice');

let playerScore = 0;
let computerScore = 0;


document.getElementById('rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));
resetButton.addEventListener('click', resetGame);



function playGame(playerChoice) {
    if (playerScore >= 10 || computerScore >= 10) {
        resultDiv.textContent = `Game Over! Player ${playerScore >= 10 ? 'wins' : 'loses'}!`;

        disableButtons();
        resetButton.classList.remove('hidden');
        return;
    }

    const computerChoice = getComputerChoice();
    const winner = determineWinner(playerChoice, computerChoice);

    // Display choice
    playerChoiceDiv.innerHTML = choiceIcons[playerChoice];
    computerChoiceDiv.innerHTML = choiceIcons[computerChoice];

    resultDiv.textContent = `${winner}`;
    updateScores(winner);
}

function resetGame() {
    window.location.reload();
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}


function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        resultDiv.style.backgroundColor = "#788efa";
        return "It's a tie!";
    }

    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        resultDiv.style.backgroundColor = "#81ffa0";
        return "You win!";
    } else {
        resultDiv.style.backgroundColor = "#ff7373";
        return "Computer wins!";
    }
}

// Function to update scores
function updateScores(winner) {
    if (winner === "You win!") {
        playerScore++;
        playerScoreElement.textContent = playerScore;
    } else if (winner === "Computer wins!") {
        computerScore++;
        computerScoreElement.textContent = computerScore;
    }
}

// Function to disable buttons
function disableButtons() {
    buttons.forEach(button => button.disabled = true);
}

