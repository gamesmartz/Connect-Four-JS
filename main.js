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
  $('.column').on('click', dropCoin);
  $('.loadingModal').show();
  $('.modalMain').show();
  $('.modalBG').show();
}

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
    var counter = null; //keeps track of matches found
    var vector = start; //creates new variable equal to start position. Will be used to keep start param from being changed
    var check = []; //starts empty, will store the position to be checked
    for (var i = 0; i < vArr.length; i++) { //first loop, goes through the vArr array
        counter = null;
        for (var k = 0; k < 2;) { //second loop, goes through the indexes of vArr[i]
            check = [vector[0] + vArr[i][k][0], vector[1] + vArr[i][k][1]]; //sets the check variable equal to the cooridnates of the piece to be compared to the last piece added
            if (check[0] > board.length - 1 || check[0] < 0 || check[1] > board[i].length - 1 || check[0] < 0) { //checks to see if we are comparing a position that does not exist in the game board
                vector = start; //if this runs, it means we reached a position not on the board. We need to start searching again from the origin/'start' point
                k++; //this shifts the direction we are serching in, and makes it opposite of the direction we were currently looking
            } else if (board[check[0]][check[1]] === board[start[0]][start[1]]) { //checks to see if the pieces compared were the same
                counter++; //increase the counter (how many mathes have been found consecutively)
                console.log('Input at x: ' + check[0] + ' y: ' + check[1] + ' = ' + board[check[0]][check[1]]);
                vector = check; //change the current vector to the one we just checked, so that we can continue moving in the same direction
            } else if (board[check[0]][check[1]] !== board[start[0]][start[1]]) { //check to see if the start piece matches the adjacent piece if we do not find a match immediately next to the start piece, it cannot be a 4-in-a-row
                vector = start; //if this runs, it means we reached a position not on the board. We need to start searching again from the origin/'start' point
                k++;//this shifts the direction we are serching in, and makes it opposite of the direction we were currently looking
            }
            if (counter >= 3) { //checks to see if we have found at least 3 additional matched pieces
                console.log('You Have Four in a Row!')
                endGame();
            } else if ()
        }
    }
}

var turn = 1;

function dropCoin() {
    var colNum = 3; //$('.column').attr('class');
    var maxRow = board[colNum].length;
    var rowNum = maxRow - 1;
    if (maxRow < 7) {
        if (turn % 2 !== 0) {
            board[colNum].push('1');
            turn += 1;
            checkAtVectors([colNum, rowNum]);
        } else {
            board[colNum].push('2');
            turn += 1;
            checkAtVectors([colNum, rowNum]);
        }
    }
}

function endGame(){
	if (turn % 2 !== 0) {
		$('#EGMHeader').text('Player 1 Wins!!');
	} else {
		$('#EGMHeader').text('Player 2 Wins!!');
	}
		$('#endGameModal').show();
  	$('.playAgainBtn').on('click', resetGame);
}