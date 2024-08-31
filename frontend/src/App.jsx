import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { cartSelector } from "./store/atoms"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Footer from "./components/Footer"
import PlaceOrder from "./pages/PlaceOrder"
import LoginPopup from "./components/LoginPopup"
import Verify from "./pages/Verify"
import MyOrders from "./pages/MyOrders"
function App() {
  const [login, setLogin] = useState(false);
  // const cartData = useRecoilValue(cartSelector);
  return (
    <>
      {login && <LoginPopup setLogin={setLogin} />}
      <div className="app">
        <Navbar login={login} setLogin={setLogin}></Navbar>
        <Routes>
          <Route path="/" element={<Home />}  ></Route>
          <Route path="/cart" element={<Cart />}  ></Route>
          <Route path="/place-order" element={<PlaceOrder />}  ></Route>
          <Route path="/verify" element={<Verify />}  ></Route>
          <Route path="/myorders" element={<MyOrders />}  ></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </>
  )
}

export default App
