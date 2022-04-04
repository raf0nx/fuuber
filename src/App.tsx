import { Route, Routes } from 'react-router-dom'

import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home'

const App: React.FC = () => {
  return (
    <main id="app" className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </main>
  )
}

export default App
