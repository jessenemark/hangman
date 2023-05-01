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

function clearDownActiveWordDomElements () {
    //delete all elements with the class letter-box
    const activeWordDomElements = Array.from(document.getElementsByClassName('letter-box'));

    activeWordDomElements.forEach(element => {
    element.remove();
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
    let letterClicked;
    let endGameDom = document.getElementById('endGamePrompt');
    endGameDom.classList.remove('showing');
    let wrongGuesses = [];

    console.log(e, ' : e');

    if (e) {
        letterClicked = e.target;
        guessedLetters.push(letterClicked.innerText);
        if (guessedLetters.includes(letterClicked)) {
            return;
        }
    }

    // Loop over every alphabet letter and give them the clicked class if they're in guessedLetters
    let alphabetLettersDom = document.getElementsByClassName('guess-letter');
    console.log(alphabetLettersDom, ' : activeWordLetters');
    for (let i = 0; i < alphabetLettersDom.length; i++) {
        let letter = alphabetLettersDom.item(i);
        letter.classList.remove('clicked-letter');
        let guessedLetter = guessedLetters.find(gl => {
            return letter.innerText === gl;
        });
        if (guessedLetter) {
            letter.classList.add('clicked-letter');
        }
    };


    let activeWordLettersDom = document.getElementsByClassName('letter-box');
    let correctLettersLength = 0;
    console.log(activeWordLettersDom, ' : activeWordLetters');
    for (let i = 0; i < activeWordLettersDom.length; i++) {
        let letter = activeWordLettersDom.item(i);
        letter.classList.remove('showing');
        let guessedLetter = guessedLetters.find(gl => {
            return letter.innerText === gl;
        });
        if (guessedLetter) {
            correctLettersLength++;
            letter.classList.add('showing');
        }
    };

    // Work out what number of the guesses are incorrect
    // How many of the letters in guessedLetters are not in activeWordLetters
    wrongGuesses = guessedLetters.filter(letter => {
        return !activeWordLetters.includes(letter);
    })

    // Loop over body parts and remove the class showing from all of them
    for (let i = 0; i < bodyParts.length; i++) {
        let bodyPartDom = document.getElementById(bodyParts[i]);
        bodyPartDom.classList.remove('showing');
    }

    // Loop over the wrong guesses and add showing to a body part for each wrong guess
    for (let i = 0; i < wrongGuesses.length; i++) {
        let bodyPartDom = document.getElementById(bodyParts[i]);
        bodyPartDom.classList.add('showing');
    }

    // Work out if the game is over
    let wonGame = (correctLettersLength === activeWordLetters.length) ? 'Win' : null;
    let lostGame = (bodyParts.length === wrongGuesses.length) ? 'Lose' : null;
    let gameStateDom = document.getElementById('gameState');

    if (wonGame || lostGame) {
        endGameDom.classList.add('showing');
        let answerDom = document.getElementById('answer');
        answerDom.innerText = activeWord;   
        gameStateDom.innerText = wonGame || lostGame;
    }
    
};

function reloadGame() {
    //reset active word, active word letters and guessed letters variables
    guessedLetters = [];
    // select new word
    selectWord();
    clearDownActiveWordDomElements();
    generateActiveWordDomElements();
    updateData();
};

function selectWord() {
    let random = Math.round(Math.random() * (words.length - 1));
    activeWord = words[random];
    activeWordLetters = activeWord.split('');
}

function loadGame() {
    // pick random word
    selectWord();
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