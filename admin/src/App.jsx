import { useState } from 'react'
import SideBar from './components/SideBar'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom"
import Add from './pages/Add'
import List from "./pages/List"
import Order from './pages/Order'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [count, setCount] = useState(0);
  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <hr />
      <div className="app-content flex">
        <SideBar></SideBar>
        <Routes>
          <Route path="/add" element={<Add url={url} />}></Route>
          <Route path="/list" element={<List url={url} />}></Route>
          <Route path="/order" element={<Order url={url} />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
