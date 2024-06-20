import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Navbar from './components/Navbar'
import MyRepertoires from './views/MyRepertoires';
import Login from './views/Login';
import Signup from './views/Signup';

function App() {
  

  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/myrepertoires' element={<MyRepertoires />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
