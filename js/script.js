const guessedLettersList = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterGuess = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const wordList = await response.text();
    //console.log(wordList);
    const wordArray = wordList.split("\n");
    //console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    letterFiller(word);
};
getWord();

const letterFiller = function (word) {
    const letterFillerSymbol = [];
    for (const letter of word) {
        console.log(letter);
        letterFillerSymbol.push("●");
    }
    wordInProgress.innerText = letterFillerSymbol.join("");
};

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
        countRemainingGuesses(guess);
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

const countRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `No ${guess}'s, sorry!`;
        remainingGuesses -= 1;
    }
    else {
        message.innerText = `Yup, there's at least one ${guess}`;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>. Good luck next time!`;
        startOver();
    }
    else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    }
    else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const playerWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">Congratulations, you guessed the word!</p>`;
        startOver();
    }
};

const startOver = function () {
    button.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersList.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersList.innerHTML = "";
    message.innerText = "";
    getWord();
    button.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
    playAgainButton.classList.add("hide");
});