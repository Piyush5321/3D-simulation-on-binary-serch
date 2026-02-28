import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext'
import './Navbar.css'

export default function Navbar() {
    const { user, logout } = useContext(AuthContext)
    const { isDark, toggleTheme } = useContext(ThemeContext)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">⚡</span>
                    Binary Search Visualizer
                </Link>

                <ul className="nav-menu">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/data-entry" className="nav-link">Enter Data</Link></li>
                    <li><Link to="/simulation" className="nav-link">Simulation</Link></li>
                    <li><Link to="/examples" className="nav-link">Examples</Link></li>
                </ul>

                <div className="nav-right">
                    <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
                        {isDark ? '☀️' : '🌙'}
                    </button>

                    {user ? (
                        <div className="dropdown">
                            <button
                                className="user-icon-btn"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                title={user.email}
                            >
                                {user.email.charAt(0).toUpperCase()}
                            </button>
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-header">{user.email}</div>
                                    <button onClick={logout} className="dropdown-item">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="nav-link">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    )
}
