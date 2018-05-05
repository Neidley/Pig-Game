/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the
next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they
can change the predifined score of 100. (Hint: you can read that value with the .value
property in JavaScript. This is a good opportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his
current score when one of them is a 1. (Hint: you will need CSS to position the second
dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, lastRoll, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying && winningScore) {
    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'images/dice-' + dice + '.png';


    if (dice === 6 && lastRoll === 6) {
      document.getElementById('double-six').textContent = 'Rolled Double Sixes! Player ' + (activePlayer + 1) + ' score reset!'
      scores[activePlayer] = 0;
      document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
      nextPlayer();
    } else if (dice === 6) {
      lastRoll = 6;
    } else if (dice !== 6) {
      lastRoll = 0;
      document.getElementById('double-six').textContent = '';
    }

    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying && winningScore) {
    // Add CURRENT score to GLOBAL scores
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //Next player
  lastRoll = 0;

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function setWinningScore() {

  winningScore = null;
  document.getElementById('winning-points').textContent = '';
  var winningInput = document.getElementById('my-form')
  winningInput.style.display = 'block';

  winningInput.addEventListener('submit', function(e) {
    e.preventDefault();
    winningScore = document.getElementById("score-to-win").value;
    if (winningScore > 1) {
      winningInput.style.display = 'none';
      document.getElementById('winning-points').textContent = 'Score to win: '+ winningScore;
      document.getElementById('winning-points').style.display = 'block';
    } else if (winningScore <= 1){
      winningScore = null;
      alert('Score to win must be greater than 1!');
    }
  })
}

function init() {
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  setWinningScore();

  document.getElementById('double-six').textContent = '';

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}
