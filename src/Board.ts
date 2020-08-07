import Cell from './Cell'

class Board {
    size:number
    human:number[][]
    ai:number[][]
    placed:number
    winner:number
    humanValue:number
    aiValue:number
    winnerCells:Cell[]
    constructor(boardSize = 5) {
        this.size = boardSize;
        this.human = [];
        this.ai = [];
        this.placed = 0;

        for (let i = 0; i < this.size; i++) {
            this.human[i] = []
            this.ai[i] = []
            for (let j = 0; j < this.size; j++) {
                this.human[i][j] = 0;
                this.ai[i][j] = 0;
            }
        }


        this.winner = 0;
        this.humanValue = -1;
        this.aiValue = -2;

        this.winnerCells = [];
    }

    clone() {
        let copy = new Board(this.size);
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                copy.human[i][j] = this.human[i][j];
                copy.ai[i][j] = this.ai[i][j];
            }
        }
        copy.winner = this.winner;
        return copy;
    }

    getIntBoard(isHuman) {
        return isHuman ? this.human : this.ai;
    }

    getValue() {
        let value = 0;
        for (let i = 0; i < this.size; i++)
            for (let j = 0; j < this.size; j++)
                if (this.human[i][j] >= 0)
                    value += this.ai[i][j]-this.human[i][j];
        return value;
    }

    isValid(x, y) {
        return x >= 0 && y >= 0 && x < this.size && y < this.size;
    }

    isValidMove(x, y) {
        return this.isValid(x, y) && this.human[x][y] >= 0;
    }

    move(player, x, y) {
        this.human[x][y] = player;
        this.ai[x][y] = player;
        this.placed++;

        if (this.placed > this.size * this.size * 0.6) {
            this.resizeBoard();
        }
    }

    resizeBoard() {
        for (let i = 0; i < this.size + 3; i++) {
            if (this.human[i] == undefined){
                this.human[i] = [];
                this.ai[i] = [];
            }
            for (let j = 0; j < this.size + 3; j++) {
                if (i >= this.size && i < this.size + 3 || j >= this.size && j < this.size + 3) {
                    this.human[i][j] = 0;
                    this.ai[i][j] = 0;
                }
            }
        }
        this.size += 3;
        console.log(this);
    }

    setValue(player, x, y, value) {
        if (player == this.humanValue)
            this.human[x][y] = value;
        else if (player == this.aiValue)
            this.ai[x][y] = value;
    }
}

export default Board;