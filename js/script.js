const guessedLettersList = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterGuess = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const letterFiller = function (word) {
    const letterFillerSymbol = [];
    for (const letter of word) {
        console.log(letter);
        letterFillerSymbol.push("●");
    }
    wordInProgress.innerText = letterFillerSymbol.join("");
};

letterFiller(word);

button.addEventListener("click", function(e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterGuess.value;
    //console.log(guess);
    const goodGuess = validate(guess);
    //console.log(goodGuess);
    if (goodGuess) {
        makeGuess(guess);
    }
    letterGuess.value = "";
});

const validate = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = `Please enter a letter`;
    }
    else if (input.length > 1) {
        message.innerText = `Please enter only 1 letter at a time`;
    }
    else if (!input.match(acceptedLetter)) {
        message.innerText = `Guess must be a letter`;
    }
    else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that letter";
    }
    else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuesses();
        updateWordInProgress(guessedLetters);
    }
};
const showGuesses = function () {
    guessedLettersList.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const wordReveal = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            wordReveal.push(letter.toUpperCase());
        } 
        else {
            wordReveal.push("●");
        }
    }
    wordInProgress.innerText = wordReveal.join("");
    playerWon();
};

const playerWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">Congratulations, you guessed the word!</p>`;
    }
};