import { assets } from "../assets/frontend_assets/assets"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { cartAtom, tokenAtom } from "../store/atoms";
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useNavigate } from "react-router-dom"

function Navbar({ login, setLogin }) {
    const [menu, setMenu] = useState("Home");
    const cart = useRecoilValue(cartAtom);
    const token = useRecoilValue(tokenAtom);
    const setToken = useSetRecoilState(tokenAtom);
    const navigate = useNavigate();
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, [token]);
    const logout = () => {
        localStorage.removeItem("token");
        console.log(localStorage.getItem("token"));
        setToken("");
        navigate("/")

    }
    return (
        <>
            <div className="navbar flex pt-[20px] justify-between items-center font-[Outline]">
                <Link to="/">
                    <img src={assets.logo} className="logo w-[150px]" alt="" />
                </Link>
                <ul className="navbar-menu flex list-none gap-[20px] text-[#49557e] text-lg font-[Outfit] ">
                    <Link to="/" onClick={() => {
                        navigate("/")
                        setMenu("Home")
                    }}
                        className={menu == "Home" ? "   hover:cursor-pointer " : " hover:cursor-pointer"}>Home</Link>
                    <a href="#explore-menu" onClick={() => {
                        navigate("/")
                        setMenu("Menu")
                    }}
                        className={menu == "Menu" ? "   hover:cursor-pointer" : "hover:cursor-pointer"}>Menu</a>
                    <a href="#app-download" onClick={() => {
                        navigate("/")
                        setMenu("Mobile-app")
                    }}
                        className={menu == "Mobile-app" ? "  hover:cursor-pointer" : "hover:cursor-pointer"}>Mobile-app</a>
                    <a href="#footer" onClick={() => setMenu("Contact Us")} className={menu == "Contact Us" ? "   hover:cursor-pointer" : "hover:cursor-pointer"}>Contact Us</a>
                </ul>
                <div className="navbar-right flex items-center gap-[40px]">
                    <img src={assets.search_icon} alt="" />
                    <div className="navbar-search-icon relative">
                        <Link to="/cart">
                            <img src={assets.basket_icon} alt="" />
                        </Link>
                        {Object.keys(cart).length > 0 && <div className="dot absolute min-w-[10px] min-h-[10px] bg-red-400 rounded-[100%] top-[-8px] right-[-8px] "></div>}
                    </div>

                    {
                        !token ? <button className="bg-transparent text-[16px] text-[#49557e] border-2 border-red-400 py-2 px-6 cursor-pointer rounded-full hover:bg-red-300 duration-300"
                            onClick={() => setLogin(true)}
                        >Log In</button> :
                            <div className="navbar-profile relative group">
                                <img src={assets.profile_icon} alt="" />
                                <ul className="profle-dropdown absolute hidden z-10 left-0 w-36 text-lg text-center items-start justify-start cursor-pointer group-hover:flex group-hover:flex-col group-hover:gap-1 group-hover:bg-gray-200 group-hover:py-3 group-hover:px-3 group-hover:rounded-[4px] group-hover:border-2 group-hover:border-red-400 group-hover:outline-2 group-hover:outline-white">
                                    <Link to="/myorders" className="flex items-center gap-2 cursor-pointe hover:scale-105"><img className="w-[20px] " src={assets.bag_icon} alt="" /><p className="">Orders</p></Link>
                                    <hr className="h-[2px] w-full bg-red-400" />
                                    <li onClick={logout} className="flex items-center gap-2 cursor-pointer hover:scale-105"><img className="w-[20px] " src={assets.logout_icon} alt="" /><p className="">Log Out</p></li>
                                </ul>
                            </div>
                    }

                </div>
            </div >

        </>
    )
}


export default Navbar