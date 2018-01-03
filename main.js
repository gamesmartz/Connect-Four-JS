var vArr = [
	[[1,0],[-1,0]], //up down vectors
	[[0,1],[0,-1]], //left right vectors
	[[-1,-1],[1,1]], // right angle vectors
	[[1,-1],[-1,1]] //left angle vectors
];

function checkAtVectors(start){
	var counter = null;
	var vector = start;
	var check = [];
	for(var i=0;i<vArr.length;i++){
		counter = null;
		for(var k=0;k<2;){
			check = [vector[0] + vArr[i][k][0],vector[1] + vArr[i][k][1]];
			if(check[0] > board.length-1 || check[0] < 0 || check[1] > board[i].length-1 || check[0] < 0){
				vector = start;
				k++;
				// break;
			} else if (board[check[0]][check[1]] === board[start[0]][start[1]]){
				counter++;
				console.log('Input at x: '+check[0] +' y: '+check[1]+' = '+ board[check[0]][check[1]]);
				vector = check;
			} else if (board[check[0]][check[1]] !== board[start[0]][start[1]]){
				vector = start;
				k++;
			}
			if(counter>=3){
				console.log('You Have Four in a Row!')
				return true;
			}
		}
	}
}