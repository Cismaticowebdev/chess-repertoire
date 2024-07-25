import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import MyNavbar from './components/MyNavbar'
import MyRepertoires from './views/MyRepertoires';
import Login from './views/Login';
import Signup from './views/Signup';
import RepertoireView from './views/RepertoireView';

function App() {
  return (
    <div>
      <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/myrepertoires' element={<MyRepertoires />}/>
        <Route path="/repertoire/:id" element={<RepertoireView />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
