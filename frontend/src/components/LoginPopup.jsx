import { useState, useEffect } from "react"
import { assets } from "../assets/frontend_assets/assets"
import { urlAtom, tokenAtom } from "../store/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil"

import axios from "axios"
function LoginPopup({ setLogin }) {
    const [currState, setCurrState] = useState("Log In");
    const url = useRecoilValue(urlAtom);
    const setToken = useSetRecoilState(tokenAtom)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((data) => ({ ...data, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newurl = url;
        if (currState == "Log In") {
            newurl += "/api/user/login"
        } else {
            newurl += "/api/user/register"
        }
        const response = await axios.post(newurl, data);

        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token)
            setLogin(false);
        }
        else {
            alert(response.data.message)
        }
    }


    return (
        <div className="login-popup font-[Outfit] absolute z-10 w-full h-full bg-gray-400/75 grid  ">
            <form className="login-popup-container place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-6 py-6 px-7 rounded-[8px] animate-[fadeIn_1s_ease-out] " onSubmit={handleSubmit}>
                <div className="login-popup-title flex justify-between items-center text-black">
                    <h2>{currState}</h2>
                    <img className="w-4 cursor-pointer hover:rotate-90 duration-500" onClick={() => setLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-input flex flex-col gap-5 ">
                    {
                        currState === "Sign Up" &&
                        <input onChange={handleOnChange} className="border-2 p-2 focus:outline-2 focus:outline-amber-700 border-b-amber-700 duration-500" value={data.name} type="text" name="name" id="name" placeholder="Your Name " required />
                    }
                    <input onChange={handleOnChange} className="border-2 p-2 focus:outline-2 focus:outline-amber-700  border-b-amber-700 duration-500" value={data.email} type="email" name="email" id="email" placeholder="Your Email " required />
                    <input onChange={handleOnChange} className="border-2 p-2 focus:outline-2 focus:outline-amber-700  border-b-amber-700 duration-500" value={data.password} type="password" name="password" id="password" placeholder="Your Password " required />
                </div>
                <button className="p-2 border-2 border-amber-600 text-lg bg-amber-400 rounded-md hover:bg-amber-800 duration-500 hover:text-[#f1f1f1]">{currState === "Sign Up" ? "Create Account" : "Log In"}</button>
                <div className="login-popup-condition flex items-start gap-2">
                    <input className="" type="checkbox" name="" id="" required />
                    <p className="mt-[-10px] text-sm">By continuing, I am agree to the terms of Use & Privacy Policy</p>
                </div>
                {
                    currState === 'Log In' ? <p>Create a new Account?<span className="text-amber-600 font-semibold hover:border-b-2 cursor-pointer hover:border-b-amber-900" onClick={() => { setCurrState("Sign Up") }}>Click here</span></p> : <p>Already have an Account?<span className="text-amber-600 font-semibold hover:border-b-2 cursor-pointer hover:border-b-amber-900" onClick={() => setCurrState("Log In")}>Login here</span></p>
                }
            </form >
        </div >
    )
}


export default LoginPopup