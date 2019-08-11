const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = {
    player: 0,
    computer: 0
}

// Play game
function play(e) {
    restart.style.display = "inline-block"
    const playerChoice = (e.target.id);
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    showWinner(winner, computerChoice);
    console.log(playerChoice, computerChoice, winner);
}

// Computer choice
function getComputerChoice(){
    const rand = Math.random();
    if (rand < 0.34) {
        return 'rock';
    } else if (rand <= 0.67) {
        return 'paper'
    } else {
        return 'scissors';
    }
}


// Get game winner
function getWinner(p, c) {
    if (p === c) {
        return 'draw'
    } else if (p === 'rock') {
        if (c === 'paper') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'scissors') {
        if (c === 'rock') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (p === 'paper') {
        if (c === 'scissors') {
            return 'computer';
        } else {
            return 'player';
        }
    }
}

// Score change and Modal
function showWinner(winner, computerChoice) {
    if(winner === 'player') {
        scoreboard.player++;
        result.innerHTML = `
            <h1 class="text-win">You Win!</h1>
            <p>Computer chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong>.</p>
            `;
    } else if (winner === 'computer') {
        scoreboard.computer++;
        result.innerHTML = `
            <h1 class="text-lose">You Lost!</h1>
            <p>Computer chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong>.</p>
            `;
    } else {
        result.innerHTML =   `
            <h1 style="color: var(--primary-color)">It's a Draw!</h1>
            <p>Computer chose <strong>${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</strong>.</p>
            `;
    }
    score.innerHTML = `
        <p>Player: ${scoreboard.player}</p>
        <p>Computer: ${scoreboard.computer}</p>
        `;

    // Best of 5

    if(scoreboard.player === 5) {
        result.innerHTML =   `
        <h1 class="text-win">Game Over!</h1>
        <p>You won 5 Rounds!</strong>.</p>
        <p style="font-size: .95rem">Congratulations! Press Restart Game to play again or see how high you can score!</p>
        `;
    } else if (scoreboard.computer === 5) {
        result.innerHTML =   `
        <h1 class="text-lose">Game Over!</h1>
        <p>Computer Won 5 Rounds!</strong>.</p>
        <p style="font-size: .95rem">You can restart the game or keep going! But wouldn't you rather wanna be a winner?</p>
        `;
    }
    
    modal.style.display = 'block';
}

// Restart game

function restartGame() {
    scoreboard.player = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
    `;
}


// Clear modal
function clearModal(e) {
    if(e.target == modal) {
        modal.style.display = 'none';
    } else {
        setTimeout(function() {
            modal.style.display = 'none';
        }, 3000);
    }
}
// Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);