import { useState, useEffect } from 'react'
import CubeGrid3D from './CubeGrid3D'
import ControlPanel from './ControlPanel'
import SpeedSlider from './SpeedSlider'
import { binarySearch3D } from '../algorithms/binarySearch3D'
import './BinarySearchVisualizer.css'

export default function BinarySearchVisualizer({ initialData = [2, 5, 8, 12, 15, 19, 23, 28, 31, 35] }) {
    const [data, setData] = useState(initialData)
    const [searchValue, setSearchValue] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [speed, setSpeed] = useState(500)
    const [steps, setSteps] = useState([])
    const [currentStepIndex, setCurrentStepIndex] = useState(-1)
    const [result, setResult] = useState(null)
    const [eliminatedIndices, setEliminatedIndices] = useState([])

    useEffect(() => {
        setData(initialData)
    }, [initialData])

    const handleSearch = (value) => {
        const sortedData = [...data].sort((a, b) => a - b)
        const searchResult = binarySearch3D(sortedData, value)

        setSearchValue(value)
        setSteps(searchResult.steps)
        setCurrentStepIndex(0)
        setIsSearching(true)
        setIsPaused(false)
        setResult(searchResult)
        setEliminatedIndices([])
    }

    useEffect(() => {
        if (!isSearching || isPaused || currentStepIndex >= steps.length) return

        const delay = 1100 - speed
        const timer = setTimeout(() => {
            // Calculate eliminated indices based on binary search logic
            if (currentStepIndex < steps.length) {
                const step = steps[currentStepIndex]
                const newEliminated = [...eliminatedIndices]

                // Add eliminated indices based on search direction
                if (currentStepIndex > 0) {
                    const prevStep = steps[currentStepIndex - 1]
                    if (data[step.index] < searchValue) {
                        // Eliminate left half
                        for (let i = 0; i <= step.index; i++) {
                            if (!newEliminated.includes(i)) {
                                newEliminated.push(i)
                            }
                        }
                    } else if (data[step.index] > searchValue) {
                        // Eliminate right half
                        for (let i = step.index; i < data.length; i++) {
                            if (!newEliminated.includes(i)) {
                                newEliminated.push(i)
                            }
                        }
                    }
                }
                setEliminatedIndices(newEliminated)
            }

            setCurrentStepIndex(currentStepIndex + 1)
        }, delay)

        return () => clearTimeout(timer)
    }, [isSearching, isPaused, currentStepIndex, steps, speed, data, searchValue, eliminatedIndices])

    useEffect(() => {
        if (currentStepIndex >= steps.length && isSearching) {
            setIsSearching(false)
        }
    }, [currentStepIndex, steps.length, isSearching])

    const handleReset = () => {
        setIsSearching(false)
        setIsPaused(false)
        setCurrentStepIndex(-1)
        setSearchValue(null)
        setSteps([])
        setResult(null)
        setEliminatedIndices([])
    }

    const handlePlayPause = () => {
        if (steps.length > 0) {
            setIsPaused(!isPaused)
        }
    }

    const currentStep = steps[currentStepIndex] || null

    return (
        <div className="visualizer-container">
            <div className="visualizer-card">
                <h2 className="visualizer-title">Binary Search Visualization</h2>
                <CubeGrid3D
                    data={data}
                    currentStep={currentStep?.index || -1}
                    foundIndex={result?.foundIndex || -1}
                    eliminatedIndices={eliminatedIndices}
                    isAnimating={isSearching && !isPaused}
                />
            </div>

            <SpeedSlider speed={speed} onSpeedChange={setSpeed} />
            <ControlPanel
                onSearch={handleSearch}
                onReset={handleReset}
                onPlayPause={handlePlayPause}
                isSearching={isSearching}
                isPaused={isPaused}
            />

            {result && (
                <div className="visualizer-card">
                    <h3 className="result-title">Search Results</h3>
                    <div className="result-info">
                        <p>
                            <span className="result-label">Target Value:</span>
                            <span className="result-value">{searchValue}</span>
                        </p>
                        <p>
                            <span className="result-label">Status:</span>
                            <span className={`result-value ${result.found ? 'found' : 'not-found'}`}>
                                {result.found ? '✓ Found' : '✗ Not Found'}
                            </span>
                        </p>
                        <p>
                            <span className="result-label">Iterations:</span>
                            <span className="result-value">{result.iterations}</span>
                        </p>
                        {result.found && (
                            <p>
                                <span className="result-label">Position:</span>
                                <span className="result-value">{result.foundIndex}</span>
                            </p>
                        )}
                    </div>
                </div>
            )}

            {steps.length > 0 && (
                <div className="visualizer-card">
                    <h3 className="steps-title">Binary Search Steps - Low, Mid, High Values</h3>
                    <div className="steps-table-container">
                        <table className="steps-table">
                            <thead>
                                <tr>
                                    <th>Iteration</th>
                                    <th>Low Index</th>
                                    <th>Low Value</th>
                                    <th>Mid Index</th>
                                    <th>Mid Value</th>
                                    <th>High Index</th>
                                    <th>High Value</th>
                                    <th>Comparison</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {steps.map((step, idx) => (
                                    step.type === 'check' && (
                                        <tr key={idx} className={idx <= currentStepIndex ? 'active' : ''}>
                                            <td>{step.iteration}</td>
                                            <td>{step.left}</td>
                                            <td>{step.lowValue}</td>
                                            <td>{step.mid}</td>
                                            <td className="mid-value">{step.midValue}</td>
                                            <td>{step.right}</td>
                                            <td>{step.highValue}</td>
                                            <td>
                                                {step.comparison === 'equal' && '='}
                                                {step.comparison === 'less' && '<'}
                                                {step.comparison === 'greater' && '>'}
                                            </td>
                                            <td>
                                                {step.comparison === 'equal' && 'Found'}
                                                {step.comparison === 'less' && 'Search Right'}
                                                {step.comparison === 'greater' && 'Search Left'}
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
