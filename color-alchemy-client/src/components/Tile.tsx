import { Color } from '../models/Color'

interface TileProps {
    color: Color
}

// Shows a tile with a background color.
export default function Tile(props: TileProps) {
    const color = props.color;
    const styles = { backgroundColor: color.rgb };
    return <div
        className='Tile'
        title={`${color.red}, ${color.green}, ${color.blue}`}
        style={styles}>
    </div>;
}