import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import TemperaturePage from './pages/TemperaturePage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#121212]">
        <nav className="glass-strong p-6 mb-8">
          <div className="max-w-7xl mx-auto flex gap-6">
            <Link 
              to="/" 
              className="text-white font-bold text-lg hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/temperature" 
              className="text-white font-bold text-lg hover:text-blue-400 transition-colors"
            >
              Temperature Logger
            </Link>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/temperature" element={<TemperaturePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
