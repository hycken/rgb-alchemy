import { Game, GameState } from "../models/Game";

interface GameDialogProps {
    game: Game

    newGame: () => void
    retry: () => void
}

// Shows the result at the end of the game.
export function GameDialog(props: GameDialogProps) {
    if (props.game.state === GameState.Playing) { return <></>; }

    return <div className={'Dialog'}>
        <section>
            <header>You {GameState.Won}!</header>
            <p>Your closest guess was {props.game.closest.score.toFixed(2)}% away from the target</p>
            <p>You used {props.game.moves} / {props.game.settings.maxMoves} guesses</p>
            <button onClick={props.newGame}>New Game</button>
            <button onClick={props.retry}>Try Again</button>
        </section>
    </div>
}
