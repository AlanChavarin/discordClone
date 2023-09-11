import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import { UserProvider } from './context/UserContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <UserProvider>
      <ToastContainer />
      <h1>Hello World</h1>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
      </div>
    </UserProvider>
  )
}

export default App;
