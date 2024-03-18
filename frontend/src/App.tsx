import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Management from './pages/Management'
import Header from './components/Header'
import Measurements from './components/Measurements'


function App() {

  return (
    <div>
      <BrowserRouter>
          <Navbar></Navbar>
          <Header></Header>
          <div className='absolute left-64 top-12 bottom-0 right-0 bg-slate-100'>
            <Routes>
              <Route path="/" Component={Home}></Route>
              <Route path="/measurements" Component={Measurements}></Route>
              <Route path="/management" Component={Management}></Route>
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App
