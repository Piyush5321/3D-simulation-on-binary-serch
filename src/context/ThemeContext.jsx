import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        const saved = localStorage.getItem('theme')
        if (saved) {
            const dark = saved === 'dark'
            setIsDark(dark)
            applyTheme(dark)
        } else {
            applyTheme(true)
        }
    }, [])

    const applyTheme = (dark) => {
        if (dark) {
            document.documentElement.classList.remove('light-theme')
            document.body.classList.remove('light-theme')
        } else {
            document.documentElement.classList.add('light-theme')
            document.body.classList.add('light-theme')
        }
    }

    const toggleTheme = () => {
        const newDark = !isDark
        setIsDark(newDark)
        localStorage.setItem('theme', newDark ? 'dark' : 'light')
        applyTheme(newDark)
    }

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
