import { Color } from "../Color";
import { GameBoard } from "../GameBoard";
export { }

describe('Test shine examples from documentation', () => {
    test('Simple 4x1 red', () => {
        let board = new GameBoard(4, 1);
        board.left[0] = new Color(255, 0, 0);
        board.updateTiles(GameBoard.Edge.Left, 0);

        const colors = board.tiles[0];
        expect(colors[0].red).toBe(Math.round(255 * 4 / 5));
        expect(colors[1].red).toBe(Math.round(255 * 3 / 5));
        expect(colors[2].red).toBe(Math.round(255 * 2 / 5));
        expect(colors[3].red).toBe(Math.round(255 * 1 / 5));
    })

    test('Example from documentation', () => {
        let board = new GameBoard(10, 4);
        board.left[1] = new Color(255, 0, 0);
        board.updateTiles(GameBoard.Edge.Left, 1);
        board.right[1] = new Color(0, 255, 0);
        board.updateTiles(GameBoard.Edge.Right, 1);
        board.top[6] = new Color(0, 0, 255);
        board.updateTiles(GameBoard.Edge.Top, 6);

        const color = board.getColor(1, 6);

        expect(color.red).toBe(93);
        expect(color.green).toBe(162);
        expect(color.blue).toBe(153);

    })

    test('Example from documentation rotated 90˚', () => {
        let board = new GameBoard(4, 10);
        board.top[2] = new Color(255, 0, 0);
        board.updateTiles(GameBoard.Edge.Top, 2);
        board.bottom[2] = new Color(0, 255, 0);
        board.updateTiles(GameBoard.Edge.Bottom, 2);
        board.right[6] = new Color(0, 0, 255);
        board.updateTiles(GameBoard.Edge.Right, 6);

        const color = board.getColor(6, 2);

        expect(color.red).toBe(93);
        expect(color.green).toBe(162);
        expect(color.blue).toBe(153);

    })

})
