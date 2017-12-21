var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { 
    playerPick ('rock')
});
pickPaper.addEventListener('click', function() { 
    playerPick ('paper')
});
pickScissors.addEventListener('click', function() { 
    playerPick ('scissors')
});

var gameState = 'notStarted',
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var howManyWins = 0;   

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            break;
        case 'ended':
            newGameBtn.innerText = 'Jeszcze raz';            
        case 'notStarted':            
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}          

setGameElements(); 


var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame () {
    player.name = prompt('Please enter your name', 'imię gracza');    
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();
        
        playerNameElem.innerHTML = player.name;        
    }
    
    var howManyWinsRequest = prompt('Please enter how many games do you want to play');
    var howManyWinsNumber = parseInt(howManyWinsRequest);
    howManyWins = howManyWinsNumber;

    if (isNaN(howManyWinsNumber) === true || howManyWinsNumber === null) {
        alert('Please again enter how many games do you want to play');
        howManyWinsRequest = prompt('Please enter how many games do you want to play');
        howManyWinsNumber = parseInt(howManyWinsRequest);
        howManyWins = howManyWinsNumber;
    } else {
        console.log("jest Git")
    }

    return howManyWins;    
}

function playerPick(playerPick) {
    console.log(playerPick);
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

var rockLabel = document.getElementById('js-rock-label'),
    paperLabel = document.getElementById('js-paper-label'),
    scissorsLabel = document.getElementById('js-scissors-label');

var rockIcon = '<button id="js-playerPick_paper" class="btn play-btn-style"><i class="fa fa-hand-rock-o" aria-hidden="true"></i></button>';
var paperIcon = '<button id="js-playerPick_paper"  class="btn play-btn-style"><i class="fa fa-hand-paper-o" aria-hidden="true"></i></button>';
var scissorsIcon = '<button id="js-playerPick_paper"  class="btn play-btn-style"><i class="fa fa-hand-scissors-o" aria-hidden="true"></i></button>';

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    
    switch (playerPick) {
        case 'rock':            
            playerPickElem.innerHTML = rockIcon;                      
            break;
        case 'paper':                  
            playerPickElem.innerHTML = paperIcon;            
            break;
        case 'scissors':            
            playerPickElem.innerHTML = scissorsIcon;            
            break;
    }
    
    switch (computerPick) {
        case 'rock':          
            computerPickElem.innerHTML = rockIcon;
            break;
        case 'paper':          
            computerPickElem.innerHTML = paperIcon;
            break;
        case 'scissors':            
            computerPickElem.innerHTML = scissorsIcon;
            break;
                                    }
    
    checkRoundWinner(playerPick, computerPick);
}

function checkRoundWinner (playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = ' ';
    
    var winnerIs = 'player';
    
    if (playerPick === computerPick) {
        winnerIs = 'none';
        playerResultElem.className = '';
        computerResultElem.className = '';
    } else if (
        (computerPick === 'rock' &&  playerPick === 'scissors') ||
        (computerPick === 'scissors' &&  playerPick === 'paper') ||
        (computerPick === 'paper' &&  playerPick === 'rock')) {
        winnerIs = 'computer';
    }
    if (winnerIs === 'player') {
        playerResultElem.innerHTML = 'Win!';
        playerResultElem.className = 'win-style';
        computerResultElem.className = '';
        player.score++;
    } else if (winnerIs === 'computer') {
        computerResultElem.innerHTML = 'Win!';
        computerResultElem.className = 'win-style';
        playerResultElem.className = '';
        computer.score++;        
    }   
    setGamePoints();
    setGameEnd(howManyWins);
    setGameElements();
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function setGameEnd() {         
    if (player.score === howManyWins) {        
        alert('Gratulacje wygrałeś!');
        gameState = 'ended';
    } else if (computer.score === howManyWins) {        
        alert('Przegrałeś! Spróbuj ponownie');
        gameState = 'ended';
    }    
}