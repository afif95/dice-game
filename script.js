'use strict';

// selecting classes
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//selecting ids
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');

// starting
let globalscores, playing, currentscore, activeplayer;

const init = function () {
  globalscores = [0, 0];
  currentscore = 0;
  activeplayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  diceEl.classList.add('hidden');

  //   playing = true;
  //   currentscore = 0;
  //   globalscores.fill(0);
  //   score0El.textContent = 0;
  //   score1El.textContent = 0;
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  //   activeplayer = 0;
  //   diceEl.classList.add('hidden');
};

init();
const switchplayer = function () {
  currentscore = 0;
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  // switch to other player
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice functionality
btnroll.addEventListener('click', function () {
  if (playing) {
    // geenrating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //   display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //   console.log(dice);

    //check for rolled 1: if true, swith to next player
    if (dice !== 1) {
      // add dice to current score
      currentscore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
    } else {
      switchplayer();
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) {
    //add currentscore to active player
    globalscores[activeplayer] += currentscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      globalscores[activeplayer];

    //   check if player's score is >=100
    // finish the game
    if (globalscores[activeplayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      // switch to next player
      switchplayer();
    }
  }
});

btnnew.addEventListener('click', init);
