import Board from "./Board";
import Cell from "./Cell";

class Player {
    board:Board
    directions:number[][]
    constructor(board) {
        this.directions = [
            [ -1, 1, 0, 0, 1, -1, -1, 1 ], [ -1, 1, -1, 1, -1, 1, 0, 0 ]
        ];
        this.board = board;
    }

    move(board, player, x, y) {
		let arr = board.getIntBoard(player == board.humanVal);
		board.move(player, x, y);

		for (let i = 0; i < 8; i++) {
			let x1 = x + this.directions[0][i];
			let y1 = y + this.directions[1][i];

			let row = this.getRow(arr, player,x,y,i);

            if (row.length == 5)
            {
                board.winnerCells = row.cells;
                board.winner=player;
            }

			if (board.isValid(x1, 1) && arr[x1][y1] >= 0)
                board.setValue(player, x1, y1, this.getValue(arr, player, x1, y1));
		}
	}


    getValue(intBoard, player, x, y) {
        let value = 0;
        
		for (let i = 0; i < 8; i += 2) {
			let x1 = x + this.directions[0][i];
			let y1 = y + this.directions[1][i];
			let rowLength1 = this.getRow(intBoard, player, x1, y1, i).length;

			x1 = x + this.directions[0][i + 1];
			y1 = y + this.directions[1][i + 1];
			let rowLength2 = this.getRow(intBoard, player, x1, y1, i + 1).length;

            if (rowLength1 + rowLength2 != 0)
                value += Math.pow(10, rowLength1 + rowLength2);
		}

		return value;
    }
    
    getRow(intBoard,player,x,y,index){
        let cells = [];
        let rowLength = 0;
        while (this.board.isValid(x, y) && intBoard[x][y] == player) {
            cells.push(new Cell(x,y, null, null));
            rowLength++;
            x += this.directions[0][index];
            y += this.directions[1][index];
        }

        return { length:rowLength, cells:cells };        
    }

}


export default Player;