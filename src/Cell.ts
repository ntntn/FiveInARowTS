import GameScene from "./GameScene";

class Cell {
    x:number
    y:number
    scene:GameScene
    value:number
    constructor(x, y, scene, value) {
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.value = value;
    }
}

export default Cell;
