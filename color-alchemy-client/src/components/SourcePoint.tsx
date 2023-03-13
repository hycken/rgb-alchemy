import { Color } from '../models/Color'
import { useDrop } from 'react-dnd'
import { GameBoard } from '../models/GameBoard'

export interface SourcePointProps {
    edge: GameBoard.Edge
    index: number
    color: Color
}

// Displays a circle to click or drop color on.
export default function SourcePoint(props: SourcePointProps) {
    const [{ isActive }, drop] = useDrop(() => ({
        accept: 'Item',
        drop: () => props,
        collect: (monitor) => ({
            isActive: monitor.canDrop() && monitor.isOver()
        }),
    }))

    const styles = { backgroundColor: props.color.rgb };
    return <div ref={drop} className={'SourcePoint' + (isActive ? ' Active' : '')} style={styles}></div>;
}
