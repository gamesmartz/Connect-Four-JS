var board = [
	[1,0,1,0],
	[0,1,1,0],
	[0,0,1,0],
	[0,0,1,1],
];

var vArr = [
	[[1,0],[-1,0]], //up down vectors
	[[0,1],[0,-1]], //left right vectors
	[[-1,-1],[1,1]], // right angle vectors
	[[1,-1],[-1,1]] //left angle vectors
];

// board[i].length - checking columns
// board.length - checking rows

function checkAtVectors(start){
	var counter = null;
	var vector = start;
	var check = [];
	for(var i=0;i<vArr.length;i++){
		for(var k=0;k<vArr[i][k].length;k++){
			check = [vector[0] + vArr[i][k][0],vector[1] + vArr[i][k][1]];
			if(board[check[0]] > board.length || board[check[0]][check[1]] ){
				break;
			} else if (board[check[0]][check[1]] === board[start[0]][start[1]]){
				counter++;
				console.log('Input at x: '+check[0] +' y: '+check[1]+' = '+ board[check[0]][check[1]]);
				vector = check;
				i--;
				break;
			}
		}
	}
	if(counter>=4){
		return true;
	} else {
		return false;
	}
}