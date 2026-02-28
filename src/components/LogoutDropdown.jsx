import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function LogoutDropdown() {
    const { user, logout } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)

    if (!user) return null

    return (
        <div className="logout-dropdown">
            <button
                className="dropdown-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                {user.email} ▼
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <button onClick={logout} className="dropdown-item">Logout</button>
                </div>
            )}
        </div>
    )
}
