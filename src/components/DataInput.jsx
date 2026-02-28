import { useState } from 'react'

export default function DataInput({ onDataSubmit }) {
    const [input, setInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const numbers = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n))
        if (numbers.length > 0) {
            onDataSubmit(numbers.sort((a, b) => a - b))
            setInput('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="data-input-form">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter numbers separated by commas"
                className="data-input"
            />
            <button type="submit" className="btn btn-primary">Load Data</button>
        </form>
    )
}
