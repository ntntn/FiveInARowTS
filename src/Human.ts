import Player from './Player';

class Human extends Player {
    move(x, y) {
        super.move(this.board, this.board.humanValue, x, y);
    }
}

export default Human;