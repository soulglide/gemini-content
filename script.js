const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const resultEl = document.getElementById('result').querySelector('p');
const playerHandEl = document.getElementById('player-hand');
const computerHandEl = document.getElementById('computer-hand');
const rockBtn = document.getElementById('rock');
const scissorsBtn = document.getElementById('scissors');
const paperBtn = document.getElementById('paper');

let playerScore = 0;
let computerScore = 0;

const hands = ['✊', '✌️', '✋'];
const choices = ['rock', 'scissors', 'paper'];

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function getHandEmoji(choice) {
    if (choice === 'rock') return '✊';
    if (choice === 'scissors') return '✌️';
    if (choice === 'paper') return '✋';
}

function win(playerChoice, computerChoice) {
    playerScore++;
    playerScoreEl.textContent = playerScore;
    resultEl.textContent = `${getHandEmoji(playerChoice)} vs ${getHandEmoji(computerChoice)} あなたの勝ち！`;
}

function lose(playerChoice, computerChoice) {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    resultEl.textContent = `${getHandEmoji(playerChoice)} vs ${getHandEmoji(computerChoice)} コンピューターの勝ち！`;
}

function draw(playerChoice, computerChoice) {
    resultEl.textContent = `${getHandEmoji(playerChoice)} vs ${getHandEmoji(computerChoice)} あいこ！`;
}

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();

    // Animation
    playerHandEl.textContent = '';
    computerHandEl.textContent = '';
    playerHandEl.classList.add('shake');
    computerHandEl.classList.add('shake');

    setTimeout(() => {
        playerHandEl.classList.remove('shake');
        computerHandEl.classList.remove('shake');

        playerHandEl.textContent = getHandEmoji(playerChoice);
        computerHandEl.textContent = getHandEmoji(computerChoice);

        switch (playerChoice + computerChoice) {
            case 'rockscissors':
            case 'paperrock':
            case 'scissorspaper':
                win(playerChoice, computerChoice);
                break;
            case 'rockpaper':
            case 'paperscissors':
            case 'scissorsrock':
                lose(playerChoice, computerChoice);
                break;
            case 'rockrock':
            case 'paperpaper':
            case 'scissorsscissors':
                draw(playerChoice, computerChoice);
                break;
        }
    }, 500);
}

rockBtn.addEventListener('click', () => playGame('rock'));
scissorsBtn.addEventListener('click', () => playGame('scissors'));
paperBtn.addEventListener('click', () => playGame('paper'));
