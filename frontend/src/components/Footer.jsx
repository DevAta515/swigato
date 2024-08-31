import { assets } from "../assets/frontend_assets/assets"
function Footer() {

    return (
        <div className="footer bg-[#323232] text-[#d9d9d9] flex flex-col items-center gap-5 py-5 px-[8vw] pt-20 font-[Outfit] mt-20 w-full " id="footer">
            <div className='footer-content w-full grid grid-cols-211 gap-20 '>
                <div className="footer-content-left flex flex-col items-start gap-5 ">
                    <img src={assets.logo} alt="" />
                    <p>Here, we are committed to delivering delicious meals right to your doorstep. Our app allows you to explore our diverse menu, place orders with ease, and enjoy the convenience of dining from the comfort of your home. Whether you're craving classic dishes or looking to try something new, we have something for everyone. Thank you for choosing Swigato—where great food meets exceptional service.</p>
                    <div className="social-icons flex gap-4">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center flex flex-col items-start gap-5 ">
                    <h2 className="text-2xl font-semibold text-[#f2f2ff]">Company</h2>
                    <ul>
                        <li className="list-none mb-3">Home</li>
                        <li className="list-none mb-3">About Us</li>
                        <li className="list-none mb-3">Delivery</li>
                        <li className="list-none mb-3">Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right flex flex-col items-start gap-5 ">
                    <h2 className="text-2xl font-semibold text-[#f2f2ff]">Get in Touch</h2>
                    <ul>
                        <li className="list-none mb-3">+1-222-333567</li>
                        <li className="list-none mb-3">contactg@swigato.com</li>
                    </ul>
                </div>
            </div>
            <hr className="w-[100%] h-[0.15rem] my-5 bg-gray-400 border-0" />
            <p className="footer-copyright">Copyright 2024 © Swigato.com All rights reserved. </p>
        </div>
    )
}


export default Footer