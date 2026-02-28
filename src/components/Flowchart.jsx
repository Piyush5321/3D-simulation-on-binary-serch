import { useState } from 'react'
import FlowNode from './FlowNode'

export default function Flowchart() {
    const [selectedNode, setSelectedNode] = useState(null)

    const flowData = {
        'search-algorithms': {
            title: 'Search Algorithms',
            examples: ['Finding a name in a phonebook', 'Searching for a contact', 'Looking up a word']
        },
        'linear-search': {
            title: 'Linear Search',
            examples: ['Searching name in attendance sheet', 'Finding contact in phone', 'Checking items in list']
        },
        'binary-search': {
            title: 'Binary Search',
            examples: ['Searching in sorted database', 'Finding a number in sorted array', 'Searching large datasets']
        },
        '2d-binary-search': {
            title: '2D Binary Search',
            examples: ['Finding coordinates in a grid', 'Searching in 2D matrices', 'Image processing']
        },
        '3d-binary-search': {
            title: '3D Binary Search',
            examples: ['Medical CT scan voxel search', 'Game engine spatial data', '3D model vertex searching']
        }
    }

    return (
        <div className="flowchart-container">
            <div className="flowchart">
                <div className="flowchart-row">
                    <FlowNode
                        title="🔍 Search Algorithms"
                        onClick={() => setSelectedNode('search-algorithms')}
                        isSelected={selectedNode === 'search-algorithms'}
                    />
                </div>

                <div className="flowchart-row">
                    <FlowNode
                        title="📍 Linear Search"
                        onClick={() => setSelectedNode('linear-search')}
                        isSelected={selectedNode === 'linear-search'}
                    />
                    <FlowNode
                        title="⚡ Binary Search"
                        onClick={() => setSelectedNode('binary-search')}
                        isSelected={selectedNode === 'binary-search'}
                    />
                </div>

                <div className="flowchart-row">
                    <FlowNode
                        title="📐 2D Binary Search"
                        onClick={() => setSelectedNode('2d-binary-search')}
                        isSelected={selectedNode === '2d-binary-search'}
                    />
                    <FlowNode
                        title="🎯 3D Binary Search"
                        onClick={() => setSelectedNode('3d-binary-search')}
                        isSelected={selectedNode === '3d-binary-search'}
                    />
                </div>
            </div>

            {selectedNode && (
                <div className="flowchart-details">
                    <h3>{flowData[selectedNode].title}</h3>
                    <ul>
                        {flowData[selectedNode].examples.map((example, idx) => (
                            <li key={idx}>{example}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
