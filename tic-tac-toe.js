let Buttons = document.querySelectorAll('#game-grid .btn');
let crossScore = parseInt(document.getElementById('score-X').textContent);
let circleScore = parseInt(document.getElementById('score-O').textContent);
let displayScore = document.getElementsByClassName('.info');
let playerTurn = document.getElementById('turn');
let currentplayer = 'X';
let winner = document.getElementById('winner');

playerTurn.textContent = 'X';

function setupGame() {    
  Buttons.forEach(button => {
  
    button.addEventListener('mouseover',  function(){
      if (currentplayer === 'X') {
        button.classList.add('shadowX');
      } else {
        button.classList.add('shadowO');
      }
    });

    button.addEventListener('mouseleave', function() {
      button.classList.remove('shadowX', 'shadowO');
    });

    button.addEventListener('click', function() {
      if (currentplayer === 'X') {
        button.classList.add('goX');
        playerTurn.textContent = 'O';     
      } else {
        button.classList.add('goCircle');
        playerTurn.textContent = 'X';
      }
      button.classList.remove('shadowX', 'shadowO');
    
      button.disabled = true;
      currentplayer = currentplayer === 'X' ? 'O' : 'X';
      checkScore();
    });
 
  });
};

function checkScore() {
  let winningCombinations = [
    [0, 1, 2],[3, 4, 5],
    [6, 7, 8],[0, 3, 6],
    [1, 4, 7],[2, 5, 8],
    [0, 4, 8],[2, 4, 6]
  ];

  let isdraw = true;
  
  winningCombinations.forEach(array => {

    let circleWins = array.every(cell => Buttons[cell].classList.contains('goCircle'));
    let crossWins = array.every(cell => Buttons[cell].classList.contains('goX'));
  
    function declareWinner(player){
      winner.textContent = `${player} Wins`;
      Buttons.forEach(button => button.disabled = true);
      isdraw = false;
    }
  
    if (circleWins) {
      declareWinner('Circle');
      document.getElementById('score-O').innerHTML = ++circleScore;
      
    } else if (crossWins) {
      declareWinner('Cross');
      document.getElementById('score-X').innerHTML = ++crossScore; 
    }
   
  });

  if (isdraw){
    let allDisabled = true;
    Buttons.forEach(index => {
      if(!index.disabled){
           allDisabled = false;
      }
    })
    if (allDisabled){
      winner.innerHTML = 'It is a draw';
    }
  } 
}

function again() {
  Buttons.forEach(button => {
    button.classList.remove('goX', 'goCircle');
    button.disabled = false;
  });
  currentplayer = 'X';
  playerTurn.textContent = 'X';
  winner.textContent = '';
}
setupGame();