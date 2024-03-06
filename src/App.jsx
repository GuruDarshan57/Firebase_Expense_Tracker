import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Exp from './Pages/Home/Exp'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/expense_tracker' element={<Exp />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
