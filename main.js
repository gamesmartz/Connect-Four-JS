var board = [
  [],
  [],
  [],
  [],
  [],
  [],
  []
];
$(document).ready(initializeApp);

function initializeApp() {
  clickHandler();
  startGame();
  $('#playerNum').text("Pirates always go first");
  pirateHover();
}

function startGame() {
  $('#mainModal').show();
  setTimeout(function(){
    $('#mainModal').fadeOut();
  }, 1500);
  setTimeout(function(){
    $('#coinChooseModal').fadeIn();
  }, 1600);
}

function clickHandler() {
  $('.column-display').on('click', dropCoin);
  $('#playAgainBtn').on('click', resetGame);
  $('#resetBtn').on('click', resetGame);
  $('.playerChooseDiv').on('click', 
    function(){
      $('#coinChooseModal').fadeOut();
    }
    // sideSelection();
    );
}

/*function sideSelection {
    var selectedCoin = $(this).attr('id');
    switch (selectedCoin){
        case 'pirate':
            $('').text("Pirates always go first");
            break;
        case 'spanish':
            $('').text("Spanish ");
    }
}*/


var vArr = [ //array of directions. These are essentially instructions for how to adjust the pieces being compared
  [
    [1, 0],
    [-1, 0]
  ], //up down vectors
  [
    [0, 1],
    [0, -1]
  ], //left right vectors
  [
    [-1, -1],
    [1, 1]
  ], // right angle vectors
  [
    [1, -1],
    [-1, 1]
  ] //left angle vectors
];

function checkAtVectors(start) { //start equals the last piece added to the board
  drawGameCheck();
  var counter = null; //keeps track of matches found
  var vector = start; //creates new variable equal to start position. Will be used to keep start param from being changed
  var check = []; //starts empty, will store the position to be checked

  for (var i = 0; i < vArr.length; i++) { //first loop, goes through the vArr array
    counter = null;
    for (var k = 0; k < 2;) { //second loop, goes through the indexes of vArr[i]
      check = [vector[0] + vArr[i][k][0], vector[1] + vArr[i][k][1]]; //sets the check variable equal to the cooridnates of the piece to be compared to the last piece added
      if (check[0] >= board.length - 1 || check[0] < 0 || check[1] > start[0].length || check[1] < 0) { //checks to see if we are comparing a position that does not exist in the game board
        vector = start; //if this runs, it means we reached a position not on the board. We need to start searching again from the origin/'start' point
        k++; //this shifts the direction we are serching in, and makes it opposite of the direction we were currently looking
      } else if (board[check[0]][check[1]] === board[start[0]][start[1]]) { //checks to see if the pieces compared were the same
        counter++; //increase the counter (how many mathes have been found consecutively)
        console.log(counter);
        console.log('Input at x: ' + check[0] + ' y: ' + check[1] + ' = ' + board[check[0]][check[1]]);
        vector = check; //change the current vector to the one we just checked, so that we can continue moving in the same direction
      } else if (board[check[0]][check[1]] !== board[start[0]][start[1]]) { //check to see if the start piece matches the adjacent piece if we do not find a match immediately next to the start piece, it cannot be a 4-in-a-row
        vector = start; //if this runs, it means we reached a position not on the board. We need to start searching again from the origin/'start' point
        k++; //this shifts the direction we are serching in, and makes it opposite of the direction we were currently looking
      }
      if (counter >= 3) { //checks to see if we have found at least 3 additional matched pieces
        console.log('You Have Four in a Row!')
        endGame();
      }
    }
  }
}


var turn = 1;

function dropCoin() {
  var colNum = parseInt($(this).attr('colnum'));
  var maxRow = board[colNum].length;
  if (maxRow < 6) {
    if (turn % 2 !== 0) {
        $('#playerNum').text("Spanish Turn");
        board[colNum].push('1');
        domCreateCoin(this, colNum, board[colNum].length - 1);
        spanishHover();
        checkAtVectors([colNum, board[colNum].length - 1]);
        turn += 1;
    } else {
        $('#playerNum').text("Pirates Turn");
        board[colNum].push('2');
        domCreateCoin(this, colNum, board[colNum].length - 1);
        pirateHover();
        checkAtVectors([colNum, board[colNum].length - 1]);
        turn += 1;
    }
  }
}

var distance = [
  [100],
  [100],
  [100],
  [100],
  [100],
  [100],
  [100]
];
var pirateCoins = [
  './assets/img/coins/pirate-coin-1.png',
  './assets/img/coins/pirate-coin-2.png',
  './assets/img/coins/pirate-coin-3.png',
  './assets/img/coins/pirate-coin-4.png',
  './assets/img/coins/pirate-coin-5.png',
];
var spanishCoins = [
  './assets/img/coins/spanish-coin-1.png',
  './assets/img/coins/spanish-coin-2.png',
  './assets/img/coins/spanish-coin-3.png',
  './assets/img/coins/spanish-coin-4.png',
  './assets/img/coins/spanish-coin-5.png',
];

function randomPirate() {
  var randPCoin;
  for (var i = 0; i < pirateCoins.length; i++) {
    var randPIndex = Math.floor(Math.random() * pirateCoins.length);
    randPCoin = pirateCoins[randPIndex];
  }
  return randPCoin;
}

function randomSpanish() {
  var randSCoin;
  for (var i = 0; i < spanishCoins.length; i++) {
    var randSIndex = Math.floor(Math.random() * spanishCoins.length);
    randSCoin = spanishCoins[randSIndex];
  }
  return randSCoin;

}

function domCreateCoin(column, colNum, rowNum) {
  var pCoin = randomPirate();
  var sCoin = randomSpanish();
  var coinPirate = $('<div>').addClass('chip-display chip' + rowNum);
  var coinPirateImage = $('<img>').attr('src', pCoin).addClass('chip');
  var coinSpanish = $('<div>').addClass('chip-display chip' + rowNum);
  var coinSpanishImage = $('<img>').attr('src', sCoin).addClass('chip');
    coinPirate.append(coinPirateImage);
    coinSpanish.append(coinSpanishImage);
  if (board[colNum][rowNum] === '1') {

    $(column).prepend(coinPirate);
    distance[colNum] -= 16.66;
    coinPirate.animate({
      top: distance[colNum] + '%'
    });
  } else {
    $(column).prepend(coinSpanish);
    distance[colNum] -= 16.66;
    coinSpanish.animate({
      top: distance[colNum] + '%'
    });
  }
  $('.column-display').css("background-image", "url()").css("background-repeat", "no-repeat");
}

function drawGameCheck() {
  if (turn === 42) {
    $('#EGMHeader').text('Everyone lose');
    $('#endGameModal').show();
    $('#resetBtn').on('click', resetGame);
  }
}

function endGame() {
  if (turn % 2 !== 0) {
    $('#EGMHeader').text('Pirates WIN!!');
  } else {
    $('#EGMHeader').text('Spanish WIN!!');
  }
  $('#endGameModal').show();

  $('#resetBtn').on('click', resetGame);
}

function resetGame() {
  $('#endGameModal').hide();

  $('chip').animate({
    bottom: '250px'
  });
  $('.chip-display').remove();

  board = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ];
  turn = 1;
  distance = [
    [100],
    [100],
    [100],
    [100],
    [100],
    [100],
    [100]
  ];
    $('#playerNum').text("Pirates always go first");
}


function pirateHover() {
    $('.column-display').mouseover(function () {
        $(this).css("background-image", "url("+randomPirate()+")").css("background-repeat", "no-repeat")
    });
    $('.column-display').mouseout(function () {
        $(this).css("background-image", "url()").css("background-repeat", "no-repeat")
    });
}

function spanishHover() {
    $('.column-display').hover(function () {
        $(this).css("background-image", "url("+randomSpanish()+")").css("background-repeat", "no-repeat")
    });
    $('.column-display').mouseout(function () {
        $(this).css("background-image", "url()").css("background-repeat", "no-repeat")
    })
}

/*
function pirateHover() {
    $(this).css("background-image", "url("+randomPirate()+")").css("background-repeat", "no-repeat")
}*/
