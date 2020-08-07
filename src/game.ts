import 'phaser';
import GameScene from './GameScene';
import GameOverScene from './GameOverScene';


const config = {
    type: Phaser.AUTO,
    backgroundColor: 'rgb(44,110,199)',
    width: 1200,
    height: 900,
    scale: {
        mode: Phaser.Scale.RESIZE,
    },
    scene: [GameScene, GameOverScene]
};

const game = new Phaser.Game(config);