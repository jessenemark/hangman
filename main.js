const words = ['fish', 'cat', 'dog', 'monkey'];
let activeWord;
let activeWordLetters;
let guessedLetters = [];

function generateActiveWordDomElements() {
    let activeWordDom = document.getElementById('activeWord');
    console.log(activeWordDom);
    // Loop over active word letters
    activeWordLetters.forEach((letter, index) => {
        console.log(letter);
        let letterDiv = document.createElement('div');
        letterDiv.className = 'letter-box';
        letterDiv.id = 'letter-' + index;
        letterDiv.innerHTML = letter;
        activeWordDom.appendChild(letterDiv);
    });
};

function generateAlphabet() {
    let guessLettersDom = document.getElementById('guessLetters');
    for (i = 0; i < 26; i++) {
        let letter = document.createElement("div");
        letter.innerHTML = (i+10).toString(36);
        letter.className = 'guess-letter';
        guessLettersDom.appendChild(letter);
      }
};

function loadGame() {
    // pick random word
    let random = Math.round(Math.random() * (words.length - 1));
    activeWord = words[random];
    // create array of active word letters
    activeWordLetters = activeWord.split('');
    // create active word dom elements
    generateActiveWordDomElements();
    generateAlphabet();
};


window.addEventListener("DOMContentLoaded", function() {
    loadGame();
}, false);