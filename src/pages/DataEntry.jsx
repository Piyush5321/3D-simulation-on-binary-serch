import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { saveDataset } from '../services/firebaseDatabase'
import './DataEntry.css'

export default function DataEntry() {
    const [input, setInput] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!input.trim()) {
            setError('Please enter some numbers')
            return
        }

        const numbers = input.split(',').map(n => {
            const num = parseInt(n.trim())
            return isNaN(num) ? null : num
        }).filter(n => n !== null)

        if (numbers.length === 0) {
            setError('Please enter valid numbers')
            return
        }

        setLoading(true)

        try {
            const sortedNumbers = numbers.sort((a, b) => a - b)

            // Save to Firebase if user is logged in
            if (user) {
                await saveDataset(user.uid, input)
            }

            // Save to localStorage for immediate use
            localStorage.setItem('simulationData', JSON.stringify(sortedNumbers))
            navigate('/simulation')
        } catch (err) {
            setError('Error saving data: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="data-entry-container">
            <div className="data-entry-card">
                <h2 className="data-entry-title">Enter Your Data</h2>
                <p className="data-entry-subtitle">
                    Enter numbers separated by commas to visualize binary search
                </p>

                {error && <div className="data-entry-error">{error}</div>}

                <form onSubmit={handleSubmit} className="data-entry-form">
                    <div className="form-group">
                        <label>Numbers (comma-separated)</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="e.g., 1, 5, 10, 15, 20, 25, 30"
                            rows="6"
                            className="data-entry-textarea"
                        />
                    </div>

                    <div className="data-entry-info">
                        <p>💡 Tip: Enter sorted numbers for best results</p>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Processing...' : 'Start Simulation'}
                    </button>
                </form>

                <div className="data-entry-example">
                    <h3>Example Datasets</h3>
                    <div className="example-buttons">
                        <button
                            onClick={() => setInput('1, 5, 10, 15, 20, 25, 30')}
                            className="example-btn"
                        >
                            Small Dataset
                        </button>
                        <button
                            onClick={() => setInput('2, 5, 8, 12, 15, 19, 23, 28, 31, 35, 40, 45, 50')}
                            className="example-btn"
                        >
                            Medium Dataset
                        </button>
                        <button
                            onClick={() => setInput('1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39')}
                            className="example-btn"
                        >
                            Large Dataset
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
