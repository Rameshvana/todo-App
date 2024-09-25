import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './Components/Login'
import Signup from './Components/Signup';
import Home from './Components/Home';

const  App = () =>  (
   <BrowserRouter>
     <Routes>
       <Route path='/login' element={<Login></Login>}/>
       <Route path='/' element={<Home></Home>} />
       <Route path='signup' element={<Signup></Signup>}/>
     </Routes>
   </BrowserRouter>
  
)

export default App;
