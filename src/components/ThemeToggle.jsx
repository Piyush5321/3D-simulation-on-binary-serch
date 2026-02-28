import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useContext(ThemeContext)

    return (
        <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
    )
}
