import { Route, Routes } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import Home from './pages/Home'

const App: React.FC = () => {
  return (
    <main id="app" className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<LoginPage />} />
      </Routes>
    </main>
  )
}

export default App
