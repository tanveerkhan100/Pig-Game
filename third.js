'use strict'

// Starting Elements 
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}

let scores, currentScore, activePlayer, playing;
let init = function (){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    // Starting Conditions 
    score0El.textContent = 0;
    score1El.textContent= 0;
    current0El.textContent = 0;
    current1El.textContent = 0; 
    
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();



// Rolling dice Functionality 
btnRoll.addEventListener('click', function () {
    // 1. Generating a random dice roll 
    if (playing){
    const dice = Math.trunc(Math.random() * 6 ) + 1;
    console.log(dice);

    // 2. Display DiceRoll 
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for Rolled 1
    if (dice !== 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }

    // Switch to next player 
    else {
        switchPlayer();
    }
}
});

btnHold.addEventListener('click', function () {
    if (playing) {
    // add current score to total score 
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];    

    // if score is at least 100, current player win 
    if (scores[activePlayer] >= 100){
        playing = false;

        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('hidden');
        diceEl.classList.add('hidden');
    }
    else{
    // switch player 
    switchPlayer();
    }
}
});

btnNew.addEventListener('click', init);