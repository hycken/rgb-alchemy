import { GameBoard } from '../models/GameBoard';
import React, { ReactNode } from 'react';
import { Settings } from '../models/Settings';
import SourcePoint, { SourcePointProps } from './SourcePoint';
import Tile from './Tile';
import { Color } from '../models/Color';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Draggable from '../containers/Draggable';
import { GameDialog } from './GameDialog';
import { Game } from '../models/Game';

interface GameProps {
    settings: Settings
    restart: () => void
}

interface GameState {
    game: Game,
    lastEdge: GameBoard.Edge
}

// Hosts the board and state of the game.
export class GameView extends React.Component<GameProps, GameState>{

    constructor(props: GameProps) {
        super(props);
        this.state = {
            game: new Game(props.settings),
            lastEdge: GameBoard.Edge.Top
        }
        this.newGame = this.newGame.bind(this);
        this.retry = this.retry.bind(this);
        this.setPoint = this.setPoint.bind(this);
        this.updatePoint = this.updatePoint.bind(this);
    }

    newGame() {
        this.props.restart();
    }

    // Restart the game with the same settings.
    retry() {
        let game = new Game(this.props.settings);
        this.setState({ game });
    }

    // Handles click on one of the circles on the board's edges.
    setPoint(edge: GameBoard.Edge, index: number) {
        let game = this.state.game.copy();
        game.setPoint(edge, index);
        this.setState({ game, lastEdge: edge });
    }

    // Handles a dropped color on one of the circles around the board.
    updatePoint(item: { row: number, column: number }, point: SourcePointProps) {
        let game = this.state.game.copy();
        const color = game.board.getColor(item.row, item.column);
        game.setPoint(point.edge, point.index, color);
        this.setState({ game });
    }

    renderLegend() {
        return <section>
            <dl>
                <dt>User ID: </dt>
                <dd>{this.props.settings.userId}</dd>
                <dt>Moves left:</dt>
                <dd>{this.state.game.movesRemaining}</dd>
                <dt>Target color:</dt>
                <dd><Tile color={this.state.game.target}></Tile></dd>
                <dt>Closest color:</dt>
                <dd><Tile color={this.state.game.closest.color}></Tile> &Delta; = {this.state.game.closest.score.toFixed(2)}%</dd>
            </dl>
        </section>;
    }

    renderTiles() {
        return this.state.game.board.tiles.map((row, rowIndex) => {
            const closest = this.state.game.closest;
            return <tr key={'row' + rowIndex}>
                {this.renderPoint(GameBoard.Edge.Left, rowIndex, this.state.game.board.left[rowIndex])}
                {row.map((tileColor, column) => {
                    const classes = closest.row === rowIndex && closest.column === column ? 'Closest' : '';
                    return <td key={column} className={classes}>
                        <Draggable value={{ row: rowIndex, column }} update={this.updatePoint}>
                            <Tile color={tileColor}></Tile>
                        </Draggable>
                    </td>;
                })}
                {this.renderPoint(GameBoard.Edge.Right, rowIndex, this.state.game.board.right[rowIndex])}
            </tr>;
        });
    }

    renderPoint(edge: GameBoard.Edge, index: number, color: Color): ReactNode {
        const clickable = this.state.game.moves < 3;

        return <th key={edge + index} onClick={event => this.setPoint(edge, index)} className={clickable ? 'Clickable' : ''}>
            <SourcePoint edge={edge} index={index} color={color}></SourcePoint>
        </th>;
    }

    render() {
        return <section className='Game'>
            <DndProvider backend={HTML5Backend}>
                {this.renderLegend()}
                <section className='Board'>
                    <table className={this.state.lastEdge}>
                        <thead>
                            <tr>
                                <th></th>
                                {this.state.game.board.top.map((color, index) => this.renderPoint(GameBoard.Edge.Top, index, color))}
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTiles()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                {this.state.game.board.bottom.map((color, index) => this.renderPoint(GameBoard.Edge.Bottom, index, color))}
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>

                </section>
                <GameDialog game={this.state.game} newGame={this.newGame} retry={this.retry}></GameDialog>
            </DndProvider>
        </section>;
    }
}