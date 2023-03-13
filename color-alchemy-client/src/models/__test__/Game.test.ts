import { Color } from "../Color";
import { Game, GameState } from "../Game"
import { GameBoard } from "../GameBoard";

export { }

describe('Endgame', () => {

    test('Win when score is less than 10%', () => {
        let game = new Game({
            userId: 'test',
            width: 1,
            height: 255,
            maxMoves: 1,
            target: [255, 0, 0]
        });
        game.closest.score = 9;
        game.moves = 1;
        expect(game.state).toBe(GameState.Won);
    })

    test('Lose when score is 10 av out of moves.', () => {
        let game = new Game({
            userId: 'test',
            width: 1,
            height: 255,
            maxMoves: 1,
            target: [255, 0, 0]
        });
        game.closest.score = 10;
        game.moves = 1;
        expect(game.state).toBe(GameState.Lost);
    })
})

