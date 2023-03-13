import { Color } from '../models/Color'

export class GameBoard {
    width: number
    height: number

    left: Color[]
    top: Color[]
    right: Color[]
    bottom: Color[]

    tiles: Color[][]

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.left = Array<Color>(height).fill(Color.initial);
        this.right = Array<Color>(height).fill(Color.initial);

        this.top = Array<Color>(width).fill(Color.initial);
        this.bottom = Array<Color>(width).fill(Color.initial);

        this.tiles = new Array<number>(height).fill(1).map(() => {
            return new Array<Color>(width).fill(Color.initial);
        });


    }

    copy(): GameBoard {
        let copy = new GameBoard(this.width, this.height);
        copy.top = [...this.top];
        copy.bottom = [...this.bottom];
        copy.left = [...this.left];
        copy.right = [...this.right];
        copy.tiles = [...this.tiles.map(row => [...row])];

        return copy;
    }

    getColor(row: number, column: number): Color {
        return this.tiles[row][column] || Color.initial;
    }

    // Updates a column or row of tiles with new colors
    updateTiles(edge: GameBoard.Edge, index: number) {
        switch (edge) {
            case GameBoard.Edge.Top:
            case GameBoard.Edge.Bottom:
                for (let y = 0; y < this.left.length; y++) {
                    this.updateShine(y, index);
                }
                break;
            case GameBoard.Edge.Left:
            case GameBoard.Edge.Right:
                for (let x = 0; x < this.top.length; x++) {
                    this.updateShine(index, x);
                }
                break;
        }
    }

    // Gets the four edge colors influencing a tile and calculates its color.
    updateShine(row: number, column: number) {
        const topShine = this.top[column].faded(row, this.left.length);
        const bottomShine = this.bottom[column].faded(this.left.length - row - 1, this.left.length);

        const leftShine = this.left[row].faded(column, this.top.length);
        const rightShine = this.right[row].faded(this.top.length - column - 1, this.top.length);

        const average = Color.average(topShine, bottomShine, leftShine, rightShine);
        this.tiles[row][column] = average;
    }
}

export namespace GameBoard {
    export enum Edge {
        Left = 'LeftEdge',
        Top = 'TopEdge',
        Right = 'RightEdge',
        Bottom = 'BottomEdge'
    }
}