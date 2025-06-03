const words = ["APPLE", "ASTRONUT", "ANIMAL", "AGAINST", "ANGULAR", 
"BALL", "BALOON", "BULL", "BUFFALLO", "BANK", 
"CAT", "CART", "CARTOON", "CAPSULE", "CONTINUE",
"DOG", "DONKEY", "DRAGON", "DRESS", "DANCE",
"EGG", "ELEPHANT", "EARTH", "ENVIRONMENT", "ENERGY",
"FAN", "FAITH", "FROG", "FASHION", "FRANCE",
"GOD", "GRAFIEE", "GOOD", "GOODBYE", "GIGGLE",
"HAT", "HORSE", "HEIGHT", "HAIR", "HURT",
"ICE", "IGLOO",  "IRONMAN", "ISOLATED", "INVEST",
"JUG", "JUICE", "JANUARY", "JUSTICE", "JUNGLE",
"KITE", "KIND", "KICK", "KNOWLEDGE", "KING",
"LITTLE", "LIGHT", "LEO", "LETTER", "LONG",
"MAN", "MANGO", "MIGHTY", "MINI", "MIX",
"NIGHT", "NAUGTY", "NINE", "NICE", "NEW",
"OWL", "OUT", "ONE", "ONCE", "OSTRICH", 
"PINE", "PEACOCK", "PEOPLE", "PRETTY", "PRINCE",
"QUIT", "QUICK", "QUEEN", "QUALIFY", "QUANTUM",
"RACE", "ROCK", "REAL", "READY", "RESUME",
"SAME", "SAID", "SAW", "SALE", "SAVE",
"TUTOR", "TUTION", "TENSION", "TERROR", "TARGET",
"UNIQUE", "UNICORN", "UNIVERSE", "USED", "UNDER",
"VAN", "VERY", "VIEW", "VALUE", "VARIES",
"XEROX", "XYLOSE", "XYLOPHONE", "XYLOGRAPH", "XENNON",
"YATCH", "YAWN", "YELLOW", "YEAST", "YONDER",
"ZEBRA", "ZIPPER", "ZERO", "ZINC", "ZIP"];
let selectedWord, guessedWord, attemptsLeft, gameOver, usedLetters = [];

const wordElement = document.getElementById("word");
const messageElement = document.getElementById("message");
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("3d");

function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(selectedWord.length).fill("_");
    attemptsLeft = 6;
    gameOver = false;
    usedLetters = [];
    messageElement.innerText = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGallows();
    updateDisplay();
}

function handleGuess(letter) {
    if (gameOver || usedLetters.includes(letter)) return;
    usedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        selectedWord.split("").forEach((char, index) => {
            if (char === letter) guessedWord[index] = letter;
        });
    } else {
        attemptsLeft--;
        drawHangmanPart(6 - attemptsLeft);
    }

    if (attemptsLeft <= 0) {
        gameOver = true;
        messageElement.innerText = "Game Over! The word was " + selectedWord;
    }

    if (!guessedWord.includes("_")) {
        gameOver = true;
        messageElement.innerText = "Congratulations! You guessed the word!";
    }

    updateDisplay();
}

function updateDisplay() {
    wordElement.innerText = guessedWord.join(" ");
}

function resetGame() {
    initGame();
}

function drawGallows() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'brown';
    ctx.beginPath();
    ctx.moveTo(50, 230);
    ctx.lineTo(150, 230); // Base
    ctx.moveTo(100, 230);
    ctx.lineTo(100, 50); // Pole
    ctx.lineTo(150, 50); // Top bar
    ctx.lineTo(150, 70); // Rope
    ctx.stroke();
}

function drawHangmanPart(step) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'Black';
    switch(step) {
        case 1: // Head
            ctx.beginPath();
            ctx.arc(150, 90, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 2: // Body
            ctx.beginPath();
            ctx.moveTo(150, 110);
            ctx.lineTo(150, 170);
            ctx.stroke();
            break;
        case 3: // Left arm
            ctx.beginPath();
            ctx.moveTo(150, 130);
            ctx.lineTo(130, 150);
            ctx.stroke();
            break;
        case 4: // Right arm
            ctx.beginPath();
            ctx.moveTo(150, 130);
            ctx.lineTo(170, 150);
            ctx.stroke();
            break;
        case 5: // Left leg
            ctx.beginPath();
            ctx.moveTo(150, 170);
            ctx.lineTo(130, 210);
            ctx.stroke();
            break;
        case 6: // Right leg
            ctx.beginPath();
            ctx.moveTo(150, 170);
            ctx.lineTo(170, 210);
            ctx.stroke();
            break;
    }
}

window.addEventListener('keydown', (event) => {
    if (event.key.length === 1 && /^[a-zA-Z]$/.test(event.key)) {
        handleGuess(event.key.toUpperCase());
    }
});

window.onload = initGame;
