
import './App.css';
import {Route, Routes} from "react-router-dom"
import { Table } from './components/Table/Table';
import { Login } from './components/Login/Login';
import { Admintable } from './components/Admin/Admintable';
import { Addform } from './components/Addform/Addform';
import { Home } from './components/Home/Home';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/table" element={<Table/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<Admintable/>}/>
        <Route path="/addBook" element={<Addform/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
