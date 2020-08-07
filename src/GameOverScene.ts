class GameOverScene extends Phaser.Scene {
    winner:string;

    constructor() {
        super('GameOverScene');
    }

    init(data){
        this.winner = data;
    }

    preload() {
        this.load.image('playAgainButton', 'assets/playAgainButton.png');
    }

    create() {
        let x = Number(this.game.config.width)/2.5;
        let y = Number(this.game.config.height)/2.5;
        let button = this.add.sprite(x, y, 'playAgainButton');

        x-=button.displayWidth/3;

        let label;
        if (this.winner = 'AI'){
            label = 'ВЫ ПРОИГРАЛИ';
            x-=125;
        } else label = 'ПОБЕДА';

        this.add.text(x,y*0.6,label, { fontSize: "60px", fontFamily: 'Arial' });
        button.setInteractive().on('pointerdown', () => this.scene.start('GameScene'), this);
    }
}

export default GameOverScene;