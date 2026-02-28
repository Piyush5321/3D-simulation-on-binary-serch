import { useState } from 'react'
import './ControlPanel.css'

export default function ControlPanel({ onSearch, onReset, onPlayPause, isSearching, isPaused }) {
    const [searchValue, setSearchValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const value = parseInt(searchValue)
        if (!isNaN(value)) {
            onSearch(value)
            setSearchValue('')
        }
    }

    return (
        <div className="control-panel">
            <h3 className="control-title">Search Controls</h3>
            <form onSubmit={handleSubmit} className="control-form">
                <input
                    type="number"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Enter value to search"
                    className="control-input"
                />
                <button type="submit" className="btn btn-primary" disabled={isSearching}>
                    {isSearching ? 'Searching...' : 'Search'}
                </button>
                {isSearching && (
                    <button type="button" className="btn btn-secondary" onClick={onPlayPause}>
                        {isPaused ? '▶ Play' : '⏸ Pause'}
                    </button>
                )}
                <button type="button" className="btn btn-secondary" onClick={onReset}>
                    ↻ Reset
                </button>
            </form>
        </div>
    )
}
