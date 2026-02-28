import { useState, useEffect } from 'react'
import BinarySearchVisualizer from '../components/BinarySearchVisualizer'
import BinarySearch2D from '../components/BinarySearch2D'
import './Simulation.css'

export default function Simulation() {
    const [data, setData] = useState([2, 5, 8, 12, 15, 19, 23, 28, 31, 35])
    const [visualizationType, setVisualizationType] = useState('2d')

    useEffect(() => {
        const saved = localStorage.getItem('simulationData')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setData(parsed)
                localStorage.removeItem('simulationData')
            } catch (e) {
                console.error('Error parsing saved data:', e)
            }
        }
    }, [])

    return (
        <main className="simulation-container">
            <div className="simulation-header">
                <h1 className="simulation-title">Binary Search Visualizer</h1>
                <p className="simulation-subtitle">
                    Visualize how binary search efficiently finds values in sorted data
                </p>
                <div className="visualization-toggle">
                    <button
                        className={`toggle-btn ${visualizationType === '2d' ? 'active' : ''}`}
                        onClick={() => setVisualizationType('2d')}
                    >
                        2D View (Educational)
                    </button>
                    <button
                        className={`toggle-btn ${visualizationType === '3d' ? 'active' : ''}`}
                        onClick={() => setVisualizationType('3d')}
                    >
                        Advanced View
                    </button>
                </div>
            </div>
            {visualizationType === '2d' ? (
                <BinarySearch2D initialData={data} />
            ) : (
                <BinarySearchVisualizer initialData={data} />
            )}
        </main>
    )
}
