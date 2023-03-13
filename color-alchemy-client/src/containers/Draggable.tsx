import { useDrag } from 'react-dnd'

interface DraggableProps<T, I> {
    value: T
    update: (item: T, value: I) => void
    children: JSX.Element
}

// Container for making a component a drag source.
export default function Draggable<T, I>(props: DraggableProps<T, I>): JSX.Element {
    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: 'Item',
            item: { value: props.value },
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            }),
            end: (item, monitor) => {
                const result = monitor.getDropResult<I>();
                if (result === null) { return; }
                props.update(item.value, result);
            }
        }),
        []);

    return <div ref={dragRef} className={'Draggable' + (isDragging ? ' Dragging' : '')}>
        {props.children}
    </div>
}