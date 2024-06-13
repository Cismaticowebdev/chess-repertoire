import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Navbar from './components/Navbar'
import MyRepertoires from './views/MyRepertoires';

function App() {
  

  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/myrepertoires' element={<MyRepertoires />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
