import './SpeedSlider.css'

export default function SpeedSlider({ speed, onSpeedChange }) {
    const handleChange = (e) => {
        const newSpeed = parseInt(e.target.value)
        onSpeedChange(newSpeed)
    }

    return (
        <div className="speed-slider">
            <h3 className="slider-title">Animation Speed</h3>
            <div className="slider-container">
                <label className="slider-label">Slow</label>
                <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={speed}
                    onChange={handleChange}
                    className="slider-input"
                />
                <label className="slider-label">Fast</label>
                <span className="slider-value">{1100 - speed}ms</span>
            </div>
        </div>
    )
}
