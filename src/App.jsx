import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Simulation from './pages/Simulation'
import DataEntry from './pages/DataEntry'
import RealTimeExamples from './pages/RealTimeExamples'
import './styles/theme.css'

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/simulation" element={<Simulation />} />
                        <Route path="/data-entry" element={<DataEntry />} />
                        <Route path="/examples" element={<RealTimeExamples />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App
