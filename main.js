const words = ['fish', 'cat', 'dog', 'monkey', 'absolute', 'catholic', 'weeping'];
const bodyParts = ['head', 'torso', 'armLeft', 'armRight', 'legLeft', 'legRight'];
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
        letter.addEventListener(`click`, updateData);
        guessLettersDom.appendChild(letter);
      }
};

// Create function to run on each change to check the state of the hangman, active letters
function updateData(e) {
    let letterClicked = e.target;
    let wrongGuesses = [];

    console.log(letterClicked);
    if (guessedLetters.includes(letterClicked)) {
        return;
    }
    letterClicked.classList.add('clicked-letter');
    guessedLetters.push(letterClicked.innerText);
    let activeWordLettersDom = document.getElementsByClassName('letter-box');
    console.log(activeWordLettersDom, ' : activeWordLetters');
    for (let i = 0; i < activeWordLettersDom.length; i++) {
        let letter = activeWordLettersDom.item(i);
        letter.classList.remove('showing');
        let guessedLetter = guessedLetters.find(gl => {
            return letter.innerText === gl;
        });
        if (guessedLetter) {
            letter.classList.add('showing');
        }
    };

    // Work out what number of the guesses are incorrect
    // How many of the letters in guessedLetters are not in activeWordLetters
    wrongGuesses = guessedLetters.filter(letter => {
        return !activeWordLetters.includes(letter);
    })
    for (let i = 0; i < wrongGuesses.length; i++) {
        let bodyPartDom = document.getElementById(bodyParts[i]);
        bodyPartDom.classList.add('showing');
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
    // create alphabet letters
    generateAlphabet();
    // create on click event for letters
    // When you click on one of the letters run updateData(letterClicked)
};


window.addEventListener("DOMContentLoaded", function() {
    loadGame();
}, false);