'use strict'

//Selecting elements
const score0 = document.querySelector('#score--0')
const score1 = document.querySelector('#score--1')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const btnNew = document.querySelector('.btn--new')
const current0 = document.querySelector('#current--0')
const current1 = document.querySelector('#current--1')
const diceImg = document.querySelector('.dice')
const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')

let scores, currentScore, activePlayer, playing

const init = function () {
  //setting up the start page
  score0.textContent = 0
  score1.textContent = 0
  current0.textContent = 0
  current1.textContent = 0
  diceImg.classList.add('hidden')
  player0.classList.remove('player--winner')
  player1.classList.remove('player--winner')
  player0.classList.add('player--active')
  player1.classList.remove('player--active')
  // //Setting up variables
  scores = [0, 0]
  currentScore = 0
  activePlayer = 0
  playing = true
}

init()
// Switch players
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  activePlayer = activePlayer === 0 ? 1 : 0
  currentScore = 0
  player0.classList.toggle('player--active')
  player1.classList.toggle('player--active')
}

//Roll dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1
    diceImg.classList.remove('hidden')
    diceImg.src = `dice-${dice}.png`
    if (dice !== 1) {
      currentScore += dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore
    } else {
      switchPlayer()
    }
  }
})

//Hold dice
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]
    if (scores[activePlayer] >= 100) {
      playing = false
      diceImg.classList.add('hidden')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner')
    } else {
      switchPlayer()
    }
  }
})

btnNew.addEventListener('click', init)
