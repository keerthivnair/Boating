import './App.css'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Entry from './Entry'
import Register from './Register'
import Login from './Login'

function App() {

  return (
     <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Entry />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </div>
     </Router>
  )
}

export default App 
