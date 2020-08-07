import Board from './Board';
import Human from './Human';
import Cell from './Cell';
import AI from './AI';

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    cellSize:number
    board:Board
    boardSize:number
    human:Human
    ai:AI
    sprites: Phaser.GameObjects.Sprite[][]
    spark:Phaser.GameObjects.Particles.ParticleEmitterManager

    preload() {
        this.load.image('cell', 'assets/cell.png');
        this.load.image('xCell', 'assets/xCell.png');
        this.load.image('oCell', 'assets/oCell.png');
        this.load.image('spark0', 'assets/sparkle1.png');
    }

    create() {
        this.cellSize = 64;
        this.board = new Board();
        this.boardSize = this.board.size;

        this.human = new Human(this.board);
        this.ai = new AI(this.board);

        this.sprites = [];

        this.createBoard(this.board);

        this.spark = this.add.particles('spark0');
        this.spark.setDepth(2);
    }

    createBoard(board) {
        for (let i = 0; i < board.size; i++) {
            this.sprites[i] = [];
            for (let j = 0; j < board.size; j++) {
                this.createCell(i,j);
            }
        }
    }

    createCell(i,j){
        let sprite = this.add.sprite(j * this.cellSize + 100, i * this.cellSize + 100, 'cell');
        let cell = new Cell(i, j, this, null);
        sprite.on('pointerdown', this.handleClick, cell);

        
        sprite.displayWidth = this.cellSize;
        sprite.displayHeight = this.cellSize;
        
        this.sprites[i][j] = sprite;     

        let objOnSprite = {x:5, y:5};        
        sprite.setInteractive();
    }

    handleClick(this: Cell) {
        let cell = this;
        console.log(cell.x);
        console.log(cell.scene);
        let scene:GameScene = cell.scene;

        if (!scene.board.isValidMove(this.x, this.y)) return;

        if (scene.board.winner == 0) {
            scene.human.move(this.x, this.y);
            scene.updateBoard(scene.board);
            scene.ai.move();
            scene.updateBoard(scene.board);
        }
    }

    updateBoard(board) {
        //Если поле увеличилось на 3 клетки
        if (this.boardSize != board.size) {
            this.handleBoardResize();
        }

        for (let i = 0; i < board.size; i++) {
            for (let j = 0; j < board.size; j++) {

                if (board.human[i][j] == board.humanValue) {
                    this.sprites[i][j].setTexture('xCell');
                }
                else if (board.ai[i][j] == board.aiValue) {
                    this.sprites[i][j].setTexture('oCell');
                }
            }
        }

        this.checkForGameOver();
    }

    handleBoardResize(){
        let board = this.board;
        for (let i = 0; i < board.size; i++) {
            if (!this.sprites[i]){
                this.sprites[i] = [];
            }
            for (let j = 0; j < board.size; j++) {
                if (i >= this.boardSize && i < board.size || j >= this.boardSize && j < board.size) {
                    this.createCell(i,j);
                }
            }
        }
        this.boardSize = board.size;        
    }

    checkForGameOver(){
        let board = this.board;

        if (board.winner == board.humanValue) {
            this.handleGameOver('HUMAN');
        }
        else if (board.winner == board.aiValue) {
            this.handleGameOver('AI');
        }
    }

    handleGameOver(winner) {

        let x = Number(this.game.config.width)/1.5;
        let y = Number(this.game.config.height)/4;

        let label = this.add.text(x, y, winner+" WINS!", { fontSize: '72px Arial', fill: '#FFF' });
        label.setOrigin(0.5, 0.5);

        this.tweens.add({
            targets: label,
            alpha: 0,
            ease: 'Power1',
            duration: 3000,
        });

        for (let i = 0; i < 5; i++) {
            this.spark.createEmitter({
                x: this.board.winnerCells[i].y*this.cellSize+100,
                y: this.board.winnerCells[i].x*this.cellSize+100,
                angle: 0,
                speed: { min: -200, max: 500 },
                gravityY: 200,
                scale: { start: 0.2, end: 0.01 },
                lifespan: 400,
                blendMode: 'ADD'
            });
        }

        setTimeout(() => {
            this.scene.start('GameOverScene', winner)
        }, 3000);
    }
}

export default GameScene;