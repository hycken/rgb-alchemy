import { Color } from "./Color";
import { GameBoard } from "./GameBoard";
import { Settings } from "./Settings";

interface Closest {
    row: number
    column: number
    score: number
    color: Color
}

export enum GameState {
    Playing = 'Playing',
    Won = 'Won',
    Lost = 'Lost'
}

export class Game {
    private _moves: number = 0
    board: GameBoard
    settings: Settings
    target: Color
    state: GameState = GameState.Playing

    scores: number[][]
    closest: Closest = {
        row: 0,
        column: 0,
        score: 100,
        color: Color.initial
    }

    constructor(settings: Settings) {
        this.settings = settings;
        this.board = new GameBoard(settings.width, settings.height);
        this.scores = new Array<number>(settings.height)
            .fill(1)
            .map(() => new Array<number>(settings.width).fill(100));
        this.target = new Color(...settings.target);
    }

    copy(): Game {
        let copy = new Game(this.settings);
        copy.state = this.state;
        copy._moves = this.moves;
        copy.board = this.board.copy();
        copy.scores = [...this.scores.map(row => [...row])];
        copy.closest = { ...this.closest };
        return copy;
    }

    get moves(): number {
        return this._moves;
    }

    // Updates moves and sets the game state accordingly.
    set moves(value: number) {
        this._moves = value;
        if (this.closest.score < 10) {
            this.state = GameState.Won;
        } else if (value >= this.settings.maxMoves) {
            this.state = GameState.Lost;
        } else {
            this.state = GameState.Playing;
        }
    }

    get movesRemaining(): number {
        return this.settings.maxMoves - this._moves;
    }

    // Handles click or dropped color on source point.
    setPoint(edge: GameBoard.Edge, index: number, color?: Color) {
        if (color) {
            this.update(edge, index, color);
        } else {
            switch (this._moves) {
                case 0: this.update(edge, index, new Color(255, 0, 0)); break;
                case 1: this.update(edge, index, new Color(0, 255, 0)); break;
                case 2: this.update(edge, index, new Color(0, 0, 255)); break;
                default:
                    return;
            }
        }
        this.updateScores();
        this.moves += 1;
    }

    // Sets the color of a source point and updates the shine on affected tiles.
    private update(edge: GameBoard.Edge, index: number, value: Color) {
        switch (edge) {
            case GameBoard.Edge.Left:
                this.board.left[index] = value;
                break;
            case GameBoard.Edge.Top:
                this.board.top[index] = value;
                break;
            case GameBoard.Edge.Right:
                this.board.right[index] = value;
                break;
            case GameBoard.Edge.Bottom:
                this.board.bottom[index] = value;
                break;
        }
        this.board.updateTiles(edge, index);
    }

    // Recalculates the score of all tiles and the new closest tile.
    updateScores() {
        let closest = {
            row: 0,
            column: 0,
            score: 100,
            color: Color.initial
        };
        for (let row = 0; row < this.board.tiles.length; row++) {
            for (let column = 0; column < this.board.tiles[row].length; column++) {
                const color = this.board.tiles[row][column];
                const score = color.distance(this.target) * 100;
                this.scores[row][column] = score;

                if (score >= closest.score) { continue; }
                closest = { row, column, score, color };
            }
        }
        this.closest = closest;
    }
}
