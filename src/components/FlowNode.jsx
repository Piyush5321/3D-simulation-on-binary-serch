export default function FlowNode({ title, onClick, isSelected }) {
    return (
        <div
            className={`flow-node ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <div className="node-content">{title}</div>
        </div>
    )
}
