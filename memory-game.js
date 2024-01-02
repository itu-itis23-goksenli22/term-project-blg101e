const cards = ['A.png', 'H.png', 'M.png', 'E.png', 'T.png'];
let shuffledCards = [];
let playerSequence = [];
let score = 0;
let gameStarted = false;

function createCard(letter) {
    const card = document.createElement('div');
    card.classList.add('card');

    const imagePath = `images/${letter}`;
    const image = new Image();
    image.src = imagePath;
    image.alt = letter;

    card.appendChild(image);

    return card;
}

function displayInitialImages() {
    const memoryGameSection = document.getElementById('game-container');
    memoryGameSection.innerHTML = '';
    cards.forEach((letter) => {
        const card = createCard(letter);
        memoryGameSection.appendChild(card);
    });
}

function displayInitialCards() {
    displayInitialImages();

    setTimeout(() => {
        document.querySelectorAll('.card').forEach((card) => {
            card.innerHTML = '';
            card.style.backgroundColor = '#ddd';
        });
        startGame();
    }, 2000);
}

function startGame() {
    document.getElementById('start-game-btn').disabled = true;
    document.getElementById('restart-btn').disabled = false;

    if (gameStarted) {
        return;
    }

    score = 0;
    playerSequence = [];
    updateScore();

    shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    const memoryGameSection = document.getElementById('game-container');
    memoryGameSection.innerHTML = '';
    shuffledCards.forEach((letter) => {
        const card = createCard(letter);
        card.addEventListener('click', () => handleCardClick(card, letter));
        memoryGameSection.appendChild(card);
    });

    //STARTING GAME 2 SECONDS AFTER
    setTimeout(() => {
        document.querySelectorAll('.card').forEach((card) => {
            card.innerHTML = ''; // Clear the content of the card
            card.style.backgroundColor = '#ddd';
        });

        //ALLOW START AFTER WAITING TIME
        gameStarted = false;
    }, 2000);
}

function handleCardClick(card, clickedLetter) {
    const expectedLetter = cards[playerSequence.length];

    if (clickedLetter === expectedLetter) {
        playerSequence.push(clickedLetter);
        score += 20;
        updateScore();

        if (playerSequence.length === cards.length) {
            score = 100;
            updateScore();

            setTimeout(() => {
                alert('Congratulations! You WON the game!');
            }, 1000);
        }
    } else {
        alert('Wrong attempt! Game Over!');
        document.getElementById('restart-btn').disabled = false;
    }

    setTimeout(() => {
        card.innerHTML = '';
        card.style.backgroundColor = '#ddd';
    }, 500);
}

function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}/100`;
}

function restartGame() {
    document.getElementById('restart-btn').disabled = true;
    displayInitialCards();
}

document.addEventListener('DOMContentLoaded', () => {
    displayInitialImages();
    document.getElementById('start-game-btn').addEventListener('click', displayInitialCards);
    document.getElementById('restart-btn').addEventListener('click', restartGame);
});
