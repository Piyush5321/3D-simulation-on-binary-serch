import { useState, useEffect } from 'react'
import { binarySearch3D } from '../algorithms/binarySearch3D'
import './BinarySearch2D.css'

export default function BinarySearch2D({ initialData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }) {
    const [data, setData] = useState(initialData)
    const [searchValue, setSearchValue] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [steps, setSteps] = useState([])
    const [currentStepIndex, setCurrentStepIndex] = useState(-1)
    const [result, setResult] = useState(null)
    const [visibleIndices, setVisibleIndices] = useState(new Set(initialData.map((_, i) => i)))
    const [lowIndex, setLowIndex] = useState(-1)
    const [highIndex, setHighIndex] = useState(-1)
    const [midIndex, setMidIndex] = useState(-1)
    const [foundIndex, setFoundIndex] = useState(-1)

    useEffect(() => {
        setData(initialData)
        setVisibleIndices(new Set(initialData.map((_, i) => i)))
    }, [initialData])

    const handleSearch = (e) => {
        e.preventDefault()
        const value = parseInt(searchValue)
        if (isNaN(value)) return

        const sortedData = [...data].sort((a, b) => a - b)
        const searchResult = binarySearch3D(sortedData, value)

        setSteps(searchResult.steps)
        setCurrentStepIndex(0)
        setIsSearching(true)
        setIsPaused(false)
        setResult(searchResult)
        setVisibleIndices(new Set(data.map((_, i) => i)))
        setFoundIndex(-1)
    }

    useEffect(() => {
        if (!isSearching || isPaused || currentStepIndex >= steps.length) return

        const delay = 600
        const timer = setTimeout(() => {
            const step = steps[currentStepIndex]

            if (step.type === 'check') {
                setLowIndex(step.left)
                setHighIndex(step.right)
                setMidIndex(step.mid)

                // Calculate which indices to keep visible
                const newVisible = new Set()
                for (let i = step.left; i <= step.right; i++) {
                    newVisible.add(i)
                }
                setVisibleIndices(newVisible)
            } else if (step.type === 'found') {
                setFoundIndex(step.index)
                setLowIndex(-1)
                setHighIndex(-1)
                setMidIndex(-1)
            }

            setCurrentStepIndex(currentStepIndex + 1)
        }, delay)

        return () => clearTimeout(timer)
    }, [isSearching, isPaused, currentStepIndex, steps])

    useEffect(() => {
        if (currentStepIndex >= steps.length && isSearching) {
            setIsSearching(false)
        }
    }, [currentStepIndex, steps.length, isSearching])

    const handleReset = () => {
        setIsSearching(false)
        setIsPaused(false)
        setCurrentStepIndex(-1)
        setSearchValue('')
        setSteps([])
        setResult(null)
        setVisibleIndices(new Set(data.map((_, i) => i)))
        setLowIndex(-1)
        setHighIndex(-1)
        setMidIndex(-1)
        setFoundIndex(-1)
    }

    const handlePlayPause = () => {
        if (steps.length > 0) {
            setIsPaused(!isPaused)
        }
    }

    const getBoxColor = (index) => {
        if (foundIndex === index) return '#4CAF50' // Green for found
        if (index === lowIndex || index === highIndex) return '#FF6B6B' // Red for low/high
        if (index === midIndex) return '#FFD700' // Yellow for mid
        return '#FFFFFF' // White default
    }

    const getBoxBorder = (index) => {
        if (foundIndex === index) return '3px solid #4CAF50'
        if (index === lowIndex || index === highIndex) return '3px solid #FF6B6B'
        if (index === midIndex) return '3px solid #FFD700'
        return '2px solid #333333'
    }

    return (
        <div className="binary-search-2d-container">
            <div className="search-controls">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="number"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Enter number to search"
                        className="search-input"
                        disabled={isSearching}
                    />
                    <button type="submit" className="search-btn" disabled={isSearching}>
                        Search
                    </button>
                </form>

                {isSearching && (
                    <div className="control-buttons">
                        <button onClick={handlePlayPause} className="control-btn">
                            {isPaused ? 'Play' : 'Pause'}
                        </button>
                        <button onClick={handleReset} className="control-btn reset-btn">
                            Reset
                        </button>
                    </div>
                )}

                {!isSearching && steps.length > 0 && (
                    <button onClick={handleReset} className="control-btn reset-btn">
                        Reset
                    </button>
                )}
            </div>

            <div className="visualization-area">
                <div className="boxes-container">
                    {data.map((value, index) => (
                        <div
                            key={index}
                            className={`box ${!visibleIndices.has(index) ? 'hidden' : ''}`}
                            style={{
                                backgroundColor: getBoxColor(index),
                                border: getBoxBorder(index),
                                opacity: visibleIndices.has(index) ? 1 : 0,
                                transform: visibleIndices.has(index) ? 'scale(1)' : 'scale(0.8)',
                            }}
                        >
                            <span className="box-value">{value}</span>
                            <span className="box-index">i:{index}</span>
                        </div>
                    ))}
                </div>
            </div>

            {result && (
                <div className="result-section">
                    <h3>Search Result</h3>
                    <div className="result-details">
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
                <div className="steps-info">
                    <h3>Step {currentStepIndex + 1} of {steps.length}</h3>
                    {steps[currentStepIndex] && steps[currentStepIndex].type === 'check' && (
                        <div className="step-details">
                            <p><span className="label">Low Index:</span> <span className="red">{steps[currentStepIndex].left}</span></p>
                            <p><span className="label">Mid Index:</span> <span className="yellow">{steps[currentStepIndex].mid}</span></p>
                            <p><span className="label">High Index:</span> <span className="red">{steps[currentStepIndex].right}</span></p>
                            <p><span className="label">Mid Value:</span> <span className="yellow">{steps[currentStepIndex].midValue}</span></p>
                            <p><span className="label">Comparison:</span> {steps[currentStepIndex].comparison}</p>
                        </div>
                    )}
                </div>
            )}

            {steps.length > 0 && (
                <div className="steps-table-section">
                    <h3>Binary Search Steps - Low, Mid, High Values</h3>
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
                                            <td>{data[step.left]}</td>
                                            <td>{step.mid}</td>
                                            <td className="mid-value">{step.midValue}</td>
                                            <td>{step.right}</td>
                                            <td>{data[step.right]}</td>
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

            <div className="legend">
                <div className="legend-item">
                    <div className="legend-box" style={{ backgroundColor: '#FF6B6B' }}></div>
                    <span>Low / High Index</span>
                </div>
                <div className="legend-item">
                    <div className="legend-box" style={{ backgroundColor: '#FFD700' }}></div>
                    <span>Mid Index</span>
                </div>
                <div className="legend-item">
                    <div className="legend-box" style={{ backgroundColor: '#4CAF50' }}></div>
                    <span>Found</span>
                </div>
            </div>
        </div>
    )
}
