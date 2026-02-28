import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
    return (
        <main className="home-container">
            <section className="hero">
                <h1 className="hero-title">3D Binary Search Visualizer</h1>
                <p className="hero-subtitle">
                    Explore the power of binary search algorithms with interactive 3D visualization
                </p>
                <div className="hero-buttons">
                    <Link to="/simulation" className="btn btn-primary">Start Simulation</Link>
                    <Link to="/examples" className="btn btn-secondary">View Examples</Link>
                </div>
            </section>

            <section className="features">
                <h2 className="section-title">Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>Interactive 3D Visualization</h3>
                        <p>Watch binary search come to life in a stunning 3D environment with rotating cubes</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Real-time Animation</h3>
                        <p>Control animation speed and watch each step of the algorithm in detail</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Custom Data</h3>
                        <p>Enter your own data sets and visualize how binary search performs</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📚</div>
                        <h3>Learn & Explore</h3>
                        <p>Understand algorithm complexity and efficiency through interactive examples</p>
                    </div>
                </div>
            </section>

            <section className="how-it-works">
                <h2 className="section-title">How It Works</h2>
                <div className="steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Enter Data</h3>
                        <p>Input your sorted dataset on the Data Entry page</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Start Simulation</h3>
                        <p>Navigate to the Simulation page to visualize the algorithm</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Search & Analyze</h3>
                        <p>Enter a value to search and watch the algorithm in action</p>
                    </div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <h3>Learn</h3>
                        <p>Understand the efficiency and complexity of binary search</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
