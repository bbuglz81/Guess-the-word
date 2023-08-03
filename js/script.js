const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterGuess = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span = document.querySelector("span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "Magnolia";

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
    const guess = letterGuess.value;
    console.log(guess);
    letterGuess.value = "";
});

letterFiller(word);